<style>
  html.oneiro-auth-pending body {
    opacity: 0;
  }

  :root {
    --oneiro-topbar-h: 88px;
    --tl-page-bg: #ffffff;
    --tl-hero-bg: #F8F8FB;
    --tl-form-bg: #ffffff;
    --tl-text: #000000;
    --tl-muted: #6f6f76;
    --tl-line: rgba(0, 0, 0, 0.35);
    --tl-primary: #2a195b;
    --tl-primary-hover: #241451;
    --tl-error: #c43d3d;
    --tl-success: #2d7a46;
  }

  #oneiro-tg-linkage-root,
  #oneiro-tg-linkage-root * {
    box-sizing: border-box;
    font-family: TildaSans, Arial, sans-serif;
  }

  #oneiro-tg-linkage-root {
    width: 100%;
    min-height: calc(100vh - var(--oneiro-topbar-h));
    background: var(--tl-page-bg);
    color: var(--tl-text);
  }

  .otl-shell {
    width: 100%;
    min-height: calc(100vh - var(--oneiro-topbar-h));
    padding: 0;
  }

  .otl-loading,
  .otl-error {
    width: 100%;
    max-width: 640px;
    margin: 120px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 16px;
    line-height: 1.45;
  }

  .otl-error {
    color: var(--tl-error);
  }

  .otl-app {
    width: 100%;
  }

  .otl-hero {
    width: 100%;
    background: var(--tl-hero-bg);
    text-align: center;
    padding: 120px 20px;
  }

  .otl-hero-inner {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }

  .otl-kicker {
    margin: 0 0 28px;
    font-size: 12px;
    line-height: 1.35;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .otl-title {
    margin: 0;
    font-size: 52px;
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .otl-subtitle {
    max-width: 640px;
    margin: 32px auto 0;
    font-size: 16px;
    line-height: 1.55;
    font-weight: 400;
  }

  .otl-form-section {
    width: 100%;
    background: var(--tl-form-bg);
    padding: 105px 20px;
  }

  .otl-form-wrap {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .otl-label {
    display: block;
    margin: 0 0 14px;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
  }

  .otl-input {
    width: 100%;
    height: 56px;
    border: 0;
    border-bottom: 1px solid var(--tl-line);
    background: transparent;
    border-radius: 0;
    outline: none;
    padding: 0 0 10px;
    color: var(--tl-text);
    font-size: 16px;
    line-height: 1.4;
    box-shadow: none;
    appearance: none;
  }

  .otl-input::placeholder {
    color: rgba(0, 0, 0, 0.45);
    opacity: 1;
  }

  .otl-input:focus {
    border-bottom-color: rgba(0, 0, 0, 0.65);
  }

  .otl-actions {
    display: flex;
    justify-content: center;
    margin-top: 36px;
  }

  .otl-btn {
    min-width: 252px;
    height: 58px;
    border: 0;
    border-radius: 999px;
    background: var(--tl-primary);
    color: #ffffff;
    font-size: 16px;
    line-height: 1;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s ease, opacity 0.18s ease, transform 0.18s ease;
    padding: 0 28px;
  }

  .otl-btn:hover:not(:disabled) {
    background: var(--tl-primary-hover);
  }

  .otl-btn:active:not(:disabled) {
    transform: translateY(1px);
  }

  .otl-btn:disabled {
    opacity: 0.65;
    cursor: default;
  }

  .otl-note {
    text-align: center;
    margin: 28px auto 0;
    max-width: 520px;
    font-size: 14px;
    line-height: 1.55;
    color: #333333;
  }

  .otl-status {
    display: none;
    text-align: center;
    margin: 18px auto 0;
    max-width: 520px;
    font-size: 14px;
    line-height: 1.55;
  }

  .otl-status.is-loading {
    display: block;
    color: var(--tl-muted);
  }

  .otl-status.is-error {
    display: block;
    color: var(--tl-error);
  }

  .otl-status.is-success {
    display: block;
    color: var(--tl-success);
  }

  @media (max-width: 767px) {
    .otl-hero {
      padding: 72px 20px;
    }

    .otl-kicker {
      font-size: 11px;
      letter-spacing: 0.18em;
      margin-bottom: 20px;
    }

    .otl-title {
      font-size: 36px;
      line-height: 1.14;
    }

    .otl-subtitle {
      margin-top: 22px;
      font-size: 15px;
      line-height: 1.55;
      max-width: 100%;
    }

    .otl-form-section {
      padding: 72px 20px;
    }

    .otl-form-wrap {
      max-width: 100%;
    }

    .otl-label {
      font-size: 15px;
      margin-bottom: 10px;
    }

    .otl-input {
      height: 52px;
      font-size: 15px;
    }

    .otl-actions {
      margin-top: 30px;
    }

    .otl-btn {
      width: 100%;
      max-width: 280px;
      min-width: 0;
      height: 54px;
      font-size: 15px;
      padding: 0 22px;
    }

    .otl-note,
    .otl-status {
      font-size: 13px;
      line-height: 1.55;
      max-width: 100%;
    }
  }
</style>

<script>
  document.documentElement.classList.add('oneiro-auth-pending');
</script>

<div id="oneiro-tg-linkage-root">
  <div class="otl-shell">
    <div id="otl-loading" class="otl-loading">Загрузка...</div>

    <div id="otl-error" class="otl-error" style="display:none;"></div>

<div id="otl-app" class="otl-app" style="display:none;">
  <section class="otl-hero">
    <div class="otl-hero-inner">
      <p class="otl-kicker">Единый профиль для общения с ботом на сайте и в Telegram</p>
      <h1 class="otl-title">Привязать Telegram</h1>
    </div>
  </section>

  <section class="otl-form-section">
    <div class="otl-form-wrap">
      <form id="otl-form" novalidate>
        <label class="otl-label" for="otl-telegram-link">Ссылка на ваш профиль в Telegram</label>
        <input
          id="otl-telegram-link"
          class="otl-input"
          type="url"
          inputmode="url"
          autocomplete="off"
          placeholder="https://t.me/vash_username_v_telegram"
          required
        />

        <div class="otl-actions">
          <button id="otl-submit" class="otl-btn" type="submit">Отправить запрос</button>
        </div>

        <div id="otl-status" class="otl-status"></div>

        <div class="otl-note">
          Запрос обрабатывается в течение 24 часов. При необходимости мы напишем вам на email.
        </div>
      </form>
    </div>
  </section>
</div>
  </div>
</div>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

  (function () {
    const SUPABASE_URL = 'https://byimggpbeemlrtkzjuyr.supabase.co';
    const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2EoT9T3U_4TOal3RJLzA5g_NTHekBX4';

    const WEBHOOK_URL = 'https://ivagulin.dedyn.io/webhook/oneiro/postTGlinkRequest';
    const NEXT = '/telegram-linkage';
    const LOGIN_URL = '/login?next=' + encodeURIComponent(NEXT);
    const SUBMIT_TIMEOUT_MS = 30000;

    const state = {
      sb: null,
      session: null,
      sleepUser: null,
      submitting: false
    };

    const els = {
      loading: document.getElementById('otl-loading'),
      error: document.getElementById('otl-error'),
      app: document.getElementById('otl-app'),
      form: document.getElementById('otl-form'),
      input: document.getElementById('otl-telegram-link'),
      submit: document.getElementById('otl-submit'),
      status: document.getElementById('otl-status')
    };

    function updateTopOffset() {
      const topRec = document.querySelector('#rec1914738151');
      const topH = topRec ? Math.round(topRec.getBoundingClientRect().height) : 88;
      document.documentElement.style.setProperty('--oneiro-topbar-h', topH + 'px');
    }

    function escapeHtml(str) {
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
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
      els.error.textContent = message || 'Не удалось загрузить страницу.';
    }

    function redirectToLogin() {
      window.location.replace(LOGIN_URL);
    }

    function setStatus(type, message) {
      els.status.className = 'otl-status' + (type ? ' ' + type : '');
      els.status.innerHTML = message || '';
      els.status.style.display = message ? 'block' : 'none';
    }

    function setSubmitting(isSubmitting) {
      state.submitting = !!isSubmitting;
      els.submit.disabled = state.submitting;
      els.input.disabled = state.submitting;

      if (state.submitting) {
        els.submit.textContent = 'Отправляем...';
      } else {
        els.submit.textContent = 'Отправить запрос';
      }
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
        .select('id, email, tg_userid, tg_username')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

      if (error) throw new Error('Ошибка чтения sleep_users');
      if (!sleepUser?.id) throw new Error('Пользователь не найден');

      return sleepUser;
    }

    function normalizeTelegramLink(raw) {
      const value = String(raw || '').trim();

      if (!value) return '';

      if (/^https?:\/\//i.test(value)) {
        return value;
      }

      if (value.startsWith('@')) {
        return 'https://t.me/' + value.slice(1);
      }

      if (/^[A-Za-z0-9_]{5,32}$/.test(value)) {
        return 'https://t.me/' + value;
      }

      return value;
    }

    function isValidTelegramLink(value) {
      try {
        const url = new URL(value);
        const host = url.hostname.replace(/^www\./i, '').toLowerCase();

        if (host !== 't.me' && host !== 'telegram.me') return false;

        const pathname = url.pathname.replace(/^\/+|\/+$/g, '');
        if (!pathname) return false;

        return true;
      } catch (e) {
        return false;
      }
    }

    async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
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

        return { response, text, json };
      } finally {
        clearTimeout(timer);
      }
    }

    async function submitRequest(e) {
      e.preventDefault();
      if (state.submitting) return;

      setStatus('', '');

      const telegramLink = normalizeTelegramLink(els.input.value);

      if (!telegramLink) {
        setStatus('is-error', 'Укажите ссылку на Telegram-профиль.');
        return;
      }

      if (!isValidTelegramLink(telegramLink)) {
        setStatus(
          'is-error',
          'Укажите корректную ссылку на Telegram-профиль. Например: https://t.me/username'
        );
        return;
      }

      const authUserId = state.session?.user?.id || '';
      if (!authUserId) {
        redirectToLogin();
        return;
      }

      const payload = {
        telegram_link: telegramLink,
        auth_user_id: authUserId,
        sleep_user_id: state.sleepUser?.id || null,
        email: state.sleepUser?.email || state.session?.user?.email || ''
      };

      try {
        setSubmitting(true);
        setStatus('is-loading', 'Отправляем запрос...');

        const { response, text, json } = await fetchWithTimeout(
          WEBHOOK_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token: state.session.access_token
            },
            body: JSON.stringify(payload)
          },
          SUBMIT_TIMEOUT_MS
        );

        if (!response.ok) {
          const message =
            (json && (json.message || json.error)) ||
            text ||
            `${response.status}`;
          throw new Error(message);
        }

        els.input.value = telegramLink;
        setStatus(
          'is-success',
          'Спасибо! Запрос отправлен.'
        );
      } catch (err) {
        const message =
          err?.name === 'AbortError'
            ? 'Сервер слишком долго не отвечает. Попробуйте ещё раз.'
            : (err?.message || 'Не удалось отправить запрос.');
        setStatus('is-error', escapeHtml(message));
      } finally {
        setSubmitting(false);
      }
    }

    function bindEvents() {
      els.form.addEventListener('submit', submitRequest);

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
        showPage();
      } catch (e) {
        console.error('[telegram-linkage] init error', e);
        showError(e?.message || 'Не удалось загрузить страницу.');
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>