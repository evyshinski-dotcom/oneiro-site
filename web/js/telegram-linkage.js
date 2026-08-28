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

    const WEBHOOK_URL = config.n8n.postTGlinkRequest;
    const searchParams = new URLSearchParams(window.location.search);
	const rawOneiroApp = (searchParams.get('oneiroapp') || '').trim().toLowerCase();
	const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';

	const NEXT = config.routes.telegramLinkage;
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
