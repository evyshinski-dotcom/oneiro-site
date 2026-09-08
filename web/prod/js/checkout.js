import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

  (function () {
    const config = window.ONEIRO_CONFIG;

    if (!config) {
      console.error('ONEIRO_CONFIG is not loaded');
      document.documentElement.classList.remove('oneiro-auth-pending');
      return;
    }

    const SUPABASE_URL = config.supabase.url;
    const SUPABASE_PUBLISHABLE_KEY = config.supabase.anonKey;

    const PROMO_STATE_WEBHOOK_URL = config.n8n.generatePaymentData;
    const APPLY_PROMO_WEBHOOK_URL = config.n8n.setPromo;

	const searchParams = new URLSearchParams(window.location.search);
	const rawOneiroApp = (searchParams.get('oneiroapp') || '').trim().toLowerCase();
	const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';

	const NEXT = config.routes.checkout;
    const APPLY_PROMO_TIMEOUT_MS = 30000;
    const PROMO_STATE_TIMEOUT_MS = 20000;

    const state = {
      sb: null,
      session: null,
      sleepUser: null,
      loading: true,
      applyingPromo: false,
      syncingState: false,
      promoApplied: false,
      currentPromo: '',
      promoRate: '',
      finalPrice: 550,
      basePrice: 550,
      paymentLink: '',
      promoStateRequestId: 0
    };

    const els = {
      loading: document.getElementById('oneiro-tariff-loading'),
      error: document.getElementById('oneiro-tariff-error'),
      app: document.getElementById('oneiro-tariff-app'),
      priceMain: document.getElementById('ot-price-main'),
      promoInput: document.getElementById('ot-promo-input'),
      promoBtn: document.getElementById('ot-promo-btn'),
      promoSuccessIcon: document.getElementById('ot-promo-success-icon'),
      promoMessage: document.getElementById('ot-promo-message'),
      recurrent: document.getElementById('ot-recurrent'),
      consentSubscription: document.getElementById('ot-consent-subscription'),
      consentOffer: document.getElementById('ot-consent-offer'),
      payBtn: document.getElementById('ot-pay-btn'),
      pageNote: document.getElementById('ot-page-note'),
      subscriptionAgreementLink: document.getElementById('ot-link-subscription-agreement'),
      publicOfferLink: document.getElementById('ot-link-public-offer'),
      privacyLink: document.getElementById('ot-link-privacy')
    };

    function applyConfiguredLinks() {
      if (els.subscriptionAgreementLink) {
        els.subscriptionAgreementLink.href = config.routes.subscriptionAgreement;
      }
      if (els.publicOfferLink) {
        els.publicOfferLink.href = config.routes.publicOffer;
      }
      if (els.privacyLink) {
        els.privacyLink.href = config.routes.privacy;
      }
    }

    function updateTopOffset() {
      const topRec = document.querySelector('#rec1914738151');
      const topH = topRec ? Math.round(topRec.getBoundingClientRect().height) : 88;
      document.documentElement.style.setProperty('--oneiro-topbar-h', topH + 'px');
    }

    function showPage() {
      document.documentElement.classList.remove('oneiro-auth-pending');
      els.loading.style.display = 'none';
      els.error.style.display = 'none';
      els.app.style.display = '';
    }

    function showError(message) {
      document.documentElement.classList.remove('oneiro-auth-pending');
      els.loading.style.display = 'none';
      els.app.style.display = 'none';
      els.error.style.display = 'block';
      els.error.textContent = message || 'Не удалось загрузить страницу оплаты.';
    }

    function buildLoginUrl() {
  const params = new URLSearchParams();
  params.set('next', NEXT);

  if (isOneiroApp) {
    params.set('oneiroapp', 'true');
  }

  return config.routes.login + '?' + params.toString();
}

function redirectToLogin() {
  window.location.replace(buildLoginUrl());
}

    function escapeHtml(str) {
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

function extractErrorMessage(json, text, fallback = 'Произошла ошибка.') {
  if (typeof json === 'string' && json.trim()) {
    return json.trim();
  }

  if (json && typeof json === 'object') {
    const candidates = [
      json.body,
      json.message,
      json.error,
      json.text,
      json.details,
      json.description,
      json.data?.body,
      json.data?.message,
      json.response?.body,
      json.response?.message
    ];

    for (const value of candidates) {
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }

  if (typeof text === 'string' && text.trim()) {
    return text.trim();
  }

  return fallback;
}

    function normalizeBoolean(value, fallback = false) {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
        if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
      }
      if (typeof value === 'number') return value === 1;
      return fallback;
    }

    function normalizePromoData(data) {
      return {
        user_promo: typeof data?.user_promo === 'string' ? data.user_promo : '',
        promo_rate:
          data?.promo_rate === '' || data?.promo_rate == null
            ? ''
            : Number(data.promo_rate),
        final_price:
          Number.isFinite(Number(data?.final_price))
            ? Number(data.final_price)
            : state.basePrice,
        payment_link:
          typeof data?.payment_link === 'string'
            ? data.payment_link.trim()
            : '',
        recurrent:
          data?.recurrent == null
            ? null
            : normalizeBoolean(data.recurrent, !!els.recurrent.checked)
      };
    }

    function formatPrice(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return '550 ₽';
      return `${n} ₽`;
    }

    function setPromoMessage(type, html) {
      els.promoMessage.className = 'ot-promo-message';
      if (!html) {
        els.promoMessage.style.display = 'none';
        els.promoMessage.innerHTML = '';
        return;
      }
      els.promoMessage.style.display = 'block';
      els.promoMessage.classList.add(type);
      els.promoMessage.innerHTML = html;
    }

    function setPromoControlsLoading(isLoading) {
      state.applyingPromo = !!isLoading;
      els.promoInput.disabled = !!isLoading || state.promoApplied;
      els.promoBtn.disabled = !!isLoading;
    }

    function setStateSyncLoading(isLoading) {
      state.syncingState = !!isLoading;
      els.recurrent.disabled = !!isLoading;
    }

    function updatePayButtonState() {
      const canPay =
        !!els.consentSubscription.checked &&
        !!els.consentOffer.checked &&
        !state.loading &&
        !state.applyingPromo &&
        !state.syncingState &&
        !!state.paymentLink;

      els.payBtn.disabled = !canPay;
      els.payBtn.textContent = `Перейти к оплате – ${formatPrice(state.finalPrice)}`;
      els.priceMain.textContent = `${formatPrice(state.basePrice)} в месяц`;
    }

    function getRecurrentValue() {
      return !!els.recurrent.checked;
    }

    function buildPromoStateUrl() {
      const url = new URL(PROMO_STATE_WEBHOOK_URL);
      url.searchParams.set('recurrent', String(getRecurrentValue()));
      url.searchParams.set('auto_renew', String(getRecurrentValue()));
      return url.toString();
    }

    function getAuthHeaders(extra = {}) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.session.access_token}`,
        tg_userid: String(state.sleepUser.tg_userid),
        email: state.sleepUser.email || state.session.user?.email || '',
        token: state.session.access_token,
        recurrent: String(getRecurrentValue()),
        auto_renew: String(getRecurrentValue()),
        ...extra
      };
    }

    function renderPromoStateFromData(rawData, options = {}) {
      const data = normalizePromoData(rawData);
      const fromApply = !!options.fromApply;
      const preserveMessage = !!options.preserveMessage;

      state.currentPromo = data.user_promo || '';
      state.promoRate = data.promo_rate;
      state.finalPrice = data.final_price;
      state.paymentLink = data.payment_link || '';
      state.promoApplied = !!state.currentPromo;

      if (data.recurrent !== null) {
        els.recurrent.checked = data.recurrent;
      }

      els.promoInput.value = state.currentPromo || '';
      els.pageNote.style.display = 'none';
      els.pageNote.textContent = '';

      if (state.promoApplied) {
        els.promoInput.disabled = true;
        els.promoBtn.style.display = 'none';
        els.promoSuccessIcon.style.display = 'inline-flex';

        const promoRateText =
          state.promoRate === '' || state.promoRate == null
            ? ''
            : `${state.promoRate}%`;

const successText = [
  'Поздравляем! У вас действует промокод',
  promoRateText ? ` на первый месяц: ${promoRateText}.` : '.',
  `<br>К оплате: <span class="ot-final-price">${formatPrice(state.finalPrice)}</span>`,
  ` <span class="ot-old-price">${formatPrice(state.basePrice)}</span>`
].join('');

        setPromoMessage('is-success', successText);
      } else {
        els.promoInput.disabled = false;
        els.promoBtn.style.display = '';
        els.promoSuccessIcon.style.display = 'none';

        if (!fromApply && !preserveMessage) {
          setPromoMessage('', '');
        }
      }

      updatePayButtonState();
    }

    async function getValidSession() {
      let { data, error } = await state.sb.auth.getSession();
      let session = data?.session || null;

      if (error || !session?.access_token) return null;

      const expiresAt = session.expires_at || 0;
      const now = Math.floor(Date.now() / 1000);
      const willExpireSoon = expiresAt && (expiresAt - now < 60);

      if (willExpireSoon) {
        const refreshed = await state.sb.auth.refreshSession();
        session = refreshed.data?.session || null;
      }

      return session;
    }

    async function loadSleepUser(authUserId) {
      const { data: sleepUser, error } = await state.sb
        .from('sleep_users')
        .select('id, tg_userid, email')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

      if (error) throw new Error('Ошибка чтения sleep_users');
      if (!sleepUser?.tg_userid) throw new Error('Не найден tg_userid пользователя');

      return sleepUser;
    }

    async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 30000) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        const text = await response.text();
        let json = null;

        try {
          json = text ? JSON.parse(text) : null;
        } catch (e) {
          json = null;
        }

        return { response, json, text };
      } finally {
        clearTimeout(timer);
      }
    }

    async function loadPromoState(options = {}) {
  const requestId = ++state.promoStateRequestId;
  const silent = !!options.silent;
  const preserveMessage = !!options.preserveMessage;

  if (!silent) {
    setStateSyncLoading(true);
    updatePayButtonState();
  }

  try {
    const { response, json, text } = await fetchJsonWithTimeout(
      buildPromoStateUrl(),
      {
        method: 'GET',
        headers: getAuthHeaders()
      },
      PROMO_STATE_TIMEOUT_MS
    );

    if (!response.ok) {
      throw new Error(
        extractErrorMessage(
          json,
          text,
          `Не удалось получить данные тарифа. Код ошибки: ${response.status}`
        )
      );
    }

    if (requestId !== state.promoStateRequestId) return;

    renderPromoStateFromData(json || {}, { preserveMessage });
  } finally {
    if (!silent && requestId === state.promoStateRequestId) {
      setStateSyncLoading(false);
      updatePayButtonState();
    }
  }
}

    async function syncPromoStateAfterApply() {
      await loadPromoState({ preserveMessage: false });
    }

async function applyPromo() {
  if (state.applyingPromo || state.promoApplied) return;

  const promo = String(els.promoInput.value || '').trim();
  if (!promo) {
    setPromoMessage('is-error', 'Введите промокод.');
    return;
  }

  setPromoControlsLoading(true);
  setPromoMessage('is-loading', 'Применение промокода...');

  try {
    const payload = {
      promo_code: promo,
      user_promo: promo,
      tg_userid: String(state.sleepUser.tg_userid),
      email: state.sleepUser.email || state.session.user?.email || '',
      recurrent: getRecurrentValue(),
      auto_renew: getRecurrentValue()
    };

    const { response, json, text } = await fetchJsonWithTimeout(
      APPLY_PROMO_WEBHOOK_URL,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      },
      APPLY_PROMO_TIMEOUT_MS
    );

    if (response.ok) {
      if (json && typeof json === 'object') {
        renderPromoStateFromData(json, { fromApply: true });
      }
      await syncPromoStateAfterApply();
      return;
    }

    els.promoInput.disabled = false;
    els.promoBtn.style.display = '';
    els.promoSuccessIcon.style.display = 'none';

    const errorMessage = extractErrorMessage(
      json,
      text,
      `Не удалось применить промокод. Код ошибки: ${response.status}`
    );

    setPromoMessage('is-error', escapeHtml(errorMessage));
    return;
  } catch (e) {
    const message =
      e && e.name === 'AbortError'
        ? 'Сервер слишком долго не отвечает. Попробуйте ещё раз.'
        : 'Не удалось применить промокод. Попробуйте ещё раз.';

    els.promoInput.disabled = false;
    els.promoBtn.style.display = '';
    els.promoSuccessIcon.style.display = 'none';
    setPromoMessage('is-error', escapeHtml(message));
  } finally {
    setPromoControlsLoading(false);

    if (state.promoApplied) {
      els.promoInput.disabled = true;
      els.promoBtn.style.display = 'none';
      els.promoSuccessIcon.style.display = 'inline-flex';
    }
    updatePayButtonState();
  }
}

    async function handleRecurrentChange() {
      if (state.loading || state.syncingState || state.applyingPromo) return;

      const promoMessageHtml = els.promoMessage.innerHTML;
      const promoMessageClass = els.promoMessage.className;
      const hasPromoMessage = !!promoMessageHtml;

      els.pageNote.style.display = 'none';
      els.pageNote.textContent = '';

      try {
        await loadPromoState({ preserveMessage: false });
      } catch (e) {
        if (hasPromoMessage) {
          els.promoMessage.className = promoMessageClass || 'ot-promo-message';
          els.promoMessage.style.display = 'block';
          els.promoMessage.innerHTML = promoMessageHtml;
        }
        els.pageNote.style.display = 'block';
        els.pageNote.textContent = 'Не удалось обновить данные тарифа. Попробуйте ещё раз.';
      }
    }

    function bindEvents() {
      els.promoBtn.addEventListener('click', applyPromo);

      els.promoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyPromo();
        }
      });

      els.promoInput.addEventListener('input', function () {
        if (!state.applyingPromo && !state.promoApplied) {
          setPromoMessage('', '');
        }
      });

      els.recurrent.addEventListener('change', handleRecurrentChange);
      els.consentSubscription.addEventListener('change', updatePayButtonState);
      els.consentOffer.addEventListener('change', updatePayButtonState);

      els.payBtn.addEventListener('click', function () {
        if (els.payBtn.disabled) return;

        if (!state.paymentLink) {
          els.pageNote.style.display = 'block';
          els.pageNote.textContent = 'Не удалось получить ссылку на оплату. Попробуйте обновить страницу.';
          return;
        }

        els.pageNote.style.display = 'none';
        window.location.href = state.paymentLink;
      });

      state.sb.auth.onAuthStateChange((event, newSession) => {
        if (event === 'SIGNED_OUT' || !newSession?.access_token) {
          redirectToLogin();
        }
      });

      window.addEventListener('resize', updateTopOffset);

      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(updateTopOffset);
        const topRec = document.querySelector('#rec1914738151');
        if (topRec) ro.observe(topRec);
      }
    }

    async function init() {
      try {
        applyConfiguredLinks();
        updateTopOffset();

        state.sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: {
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true
          }
        });

        state.session = await getValidSession();
        if (!state.session) {
          redirectToLogin();
          return;
        }

        const authUserId = state.session.user?.id || '';
        if (!authUserId) {
          redirectToLogin();
          return;
        }

        state.sleepUser = await loadSleepUser(authUserId);

        bindEvents();
        await loadPromoState();

        state.loading = false;
        updatePayButtonState();
        showPage();
      } catch (e) {
        console.error('[oneiro-tariff] init error', e);
        showError(e?.message || 'Не удалось загрузить страницу оплаты.');
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
