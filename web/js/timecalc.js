(function () {
  const config = window.ONEIRO_CONFIG;

  if (!config) {
    console.error('ONEIRO_CONFIG is not loaded');
    return;
  }

  const WEBHOOK_URL = config.n8n.timeCalc;
  const ROOT_ID = 'oneiro-timecalc-popup';
  const POPUP_HASH = config.popups.timecalc;
  const REQUEST_TIMEOUT_MS = 30000;

  const state = {
    sessionData: null,
    loading: false,
    resizeObserver: null
  };

  init();

  function init() {
    setPopupViewportHeight();
    bindHeightObservers();
    bindActions();
    bindPopupOpen();
    bindHashFallback();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setPopupViewportHeight);
    } else {
      setPopupViewportHeight();
    }

    window.addEventListener('resize', setPopupViewportHeight);
    window.addEventListener('orientationchange', setPopupViewportHeight);
  }

  function getEls() {
    return {
      popupRoot: document.getElementById(ROOT_ID),
      input: document.getElementById('ot-expression-input'),
      calcBtn: document.getElementById('ot-calc-btn'),
      result: document.getElementById('ot-result')
    };
  }

  function getClosestPopupContainer(node) {
    if (!node) return null;
    return (
      node.closest('.t-popup__container') ||
      node.closest('.t-popup__content') ||
      node.closest('.t396__artboard') ||
      node.closest('.t-rec') ||
      node.parentElement
    );
  }

  function setPopupViewportHeight() {
    const popup = document.getElementById(ROOT_ID);
    if (!popup) return;

    const container = getClosestPopupContainer(popup);
    const rect = container && container.getBoundingClientRect ? container.getBoundingClientRect() : null;

    let height = 0;
    if (rect && rect.height) height = rect.height;
    if (!height && container && container.clientHeight) height = container.clientHeight;
    if (!height) height = window.innerHeight || document.documentElement.clientHeight || 0;

    popup.style.setProperty('--oneiro-popup-height', `${Math.max(height, 100)}px`);

    if (container) {
      container.style.background = '#f4f4f6';
      container.style.overflow = 'hidden';
    }
    if (popup.parentElement) {
      popup.parentElement.style.background = '#f4f4f6';
    }
  }

  function bindHeightObservers() {
    const popup = document.getElementById(ROOT_ID);
    const container = getClosestPopupContainer(popup);
    if (!container || typeof ResizeObserver === 'undefined') return;

    if (state.resizeObserver) {
      try { state.resizeObserver.disconnect(); } catch (e) {}
    }

    state.resizeObserver = new ResizeObserver(() => {
      setPopupViewportHeight();
    });

    state.resizeObserver.observe(container);
    state.resizeObserver.observe(popup);
  }

  function bindActions() {
    const els = getEls();
    if (!els.calcBtn || !els.input) return;

    els.calcBtn.addEventListener('click', handleCalculate);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCalculate();
      }
    });
  }

  function bindPopupOpen() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest(`a[href="${POPUP_HASH}"]`);
      if (!link) return;

      setTimeout(() => {
        setPopupViewportHeight();
        resetPopupState();
      }, 300);

      setTimeout(setPopupViewportHeight, 700);
    });
  }

  function bindHashFallback() {
    if (window.location.hash === POPUP_HASH) {
      setTimeout(() => {
        setPopupViewportHeight();
        resetPopupState();
      }, 300);
    }

    window.addEventListener('hashchange', function () {
      if (window.location.hash === POPUP_HASH) {
        setTimeout(() => {
          setPopupViewportHeight();
          resetPopupState();
        }, 300);
      }
    });
  }

  function resetPopupState() {
    const els = getEls();
    if (!els.result || !els.input || state.loading) return;

    els.result.className = 'ot-result-value ot-result-placeholder';
    els.result.textContent = 'Введите выражение и нажмите «Посчитать» — здесь появится результат.';
  }

  function setResultText(text, mode) {
    const els = getEls();
    if (!els.result) return;

    els.result.className = 'ot-result-value';
    if (mode === 'placeholder') els.result.classList.add('ot-result-placeholder');
    if (mode === 'loading') els.result.classList.add('ot-loading');
    if (mode === 'error') els.result.classList.add('ot-error');

    els.result.textContent = text;
    setTimeout(setPopupViewportHeight, 0);
  }

  function setButtonLoading(isLoading) {
    const els = getEls();
    if (!els.calcBtn) return;

    els.calcBtn.disabled = isLoading;
    els.calcBtn.textContent = isLoading ? 'Считаем...' : 'Посчитать';
  }

  async function createSupabaseClientIfNeeded() {
    if (window.supabase && window.supabase.createClient) return;

    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function getSupabaseClient() {
    await createSupabaseClientIfNeeded();

    if (window.__oneiroTimeCalcSb) return window.__oneiroTimeCalcSb;

    window.__oneiroTimeCalcSb = window.supabase.createClient(
      config.supabase.url,
      config.supabase.anonKey,
      {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true
        }
      }
    );

    return window.__oneiroTimeCalcSb;
  }

  async function getSessionData(forceRefresh) {
    if (!forceRefresh && state.sessionData?.tg_userid && state.sessionData?.token) {
      return state.sessionData;
    }

    const sb = await getSupabaseClient();
    let { data, error } = await sb.auth.getSession();
    let session = data?.session || null;

    if (error || !session?.access_token) {
      throw new Error('Не найдена активная сессия');
    }

    const expiresAt = session.expires_at || 0;
    const now = Math.floor(Date.now() / 1000);
    if (expiresAt && expiresAt - now < 60) {
      const refreshed = await sb.auth.refreshSession();
      session = refreshed?.data?.session || null;
    }

    if (!session?.access_token || !session?.user?.id) {
      throw new Error('Сессия невалидна');
    }

    const authUserId = session.user.id;
    const accessToken = session.access_token;
    const emailFromSession = session.user.email || '';

    const { data: sleepUser, error: sleepUserError } = await sb
      .from('sleep_users')
      .select('tg_userid, email')
      .eq('auth_user_id', authUserId)
      .maybeSingle();

    if (sleepUserError) throw new Error('Ошибка чтения sleep_users');
    if (!sleepUser?.tg_userid) throw new Error('Не найден tg_userid пользователя');

    state.sessionData = {
      tg_userid: String(sleepUser.tg_userid),
      email: sleepUser.email || emailFromSession || '',
      token: accessToken
    };

    return state.sessionData;
  }

  function tryParseJson(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }

  function extractWebhookErrorMessage(responseText, status) {
    const fallback = ` ${status}`;
    if (!responseText) return fallback;

    const parsed = tryParseJson(responseText);

    if (Array.isArray(parsed) && parsed[0]) {
      if (typeof parsed[0].error_message === 'string' && parsed[0].error_message.trim()) {
        return parsed[0].error_message.trim();
      }
      if (typeof parsed[0].message === 'string' && parsed[0].message.trim()) {
        return parsed[0].message.trim();
      }
      if (typeof parsed[0].error === 'string' && parsed[0].error.trim()) {
        return parsed[0].error.trim();
      }
    }

    if (parsed && typeof parsed === 'object') {
      if (typeof parsed.error_message === 'string' && parsed.error_message.trim()) {
        return parsed.error_message.trim();
      }
      if (typeof parsed.message === 'string' && parsed.message.trim()) {
        return parsed.message.trim();
      }
      if (typeof parsed.error === 'string' && parsed.error.trim()) {
        return parsed.error.trim();
      }
    }

    if (typeof responseText === 'string' && responseText.trim()) {
      return responseText.trim();
    }

    return fallback;
  }

  function fetchWithTimeout(url, options, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    return fetch(url, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(timer));
  }

  async function handleCalculate() {
    const els = getEls();
    if (!els.input || !els.calcBtn || !els.result || state.loading) return;

    const expression = String(els.input.value || '').trim();

    if (!expression) {
      setResultText('Введите выражение для расчёта.', 'error');
      els.input.focus();
      return;
    }

    state.loading = true;
    setButtonLoading(true);
    setResultText('Считаем...', 'loading');

    try {
      const sessionData = await getSessionData(true);

      const payload = {
        expression: expression,
        text: expression,
        query: expression
      };

      const response = await fetchWithTimeout(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            tg_userid: sessionData.tg_userid,
            email: sessionData.email,
            token: sessionData.token
          },
          body: JSON.stringify(payload)
        },
        REQUEST_TIMEOUT_MS
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(extractWebhookErrorMessage(responseText, response.status));
      }

      const trimmed = String(responseText || '').trim();

      if (!trimmed) {
        throw new Error('Сервис не вернул результат расчёта');
      }

      setResultText(trimmed, 'result');
    } catch (e) {
      if (e && e.name === 'AbortError') {
        setResultText('Сервер отвечает слишком долго. Попробуйте ещё раз.', 'error');
      } else {
        setResultText(e?.message || 'Не удалось выполнить расчёт.', 'error');
      }
      console.error('[oneiro-timecalc] Ошибка расчёта', e);
    } finally {
      state.loading = false;
      setButtonLoading(false);
    }
  }
})();
