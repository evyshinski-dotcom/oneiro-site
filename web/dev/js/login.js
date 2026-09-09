(function () {
  const config =
    window.ONEIRO_CONFIG;

  if (!config) {
    console.error(
      'ONEIRO_CONFIG is not loaded'
    );
    return;
  }

  if (!window.supabase) {
    console.error(
      'Supabase library is not loaded'
    );
    return;
  }

  const sb =
    window.supabase.createClient(
      config.supabase.url,
      config.supabase.anonKey,
      {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );

  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const next =
    searchParams.get('next') ||
    config.routes.chat;

  const rawOneiroApp =
    (
      searchParams.get(
        'oneiroapp'
      ) || ''
    )
      .trim()
      .toLowerCase();

  const isOneiroApp =
    rawOneiroApp === 'true' ||
    rawOneiroApp === '1';

  const emailInput =
    document.getElementById(
      'oneiro-email'
    );

  const button =
    document.getElementById(
      'oneiro-button'
    );

  const message =
    document.getElementById(
      'oneiro-message'
    );


  // =========================================================
  // Events
  // =========================================================

  if (button) {
    button.addEventListener(
      'click',
      sendMagicLink
    );
  }

  if (emailInput) {
    emailInput.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMagicLink();
        }
      }
    );
  }


  // =========================================================
  // Redirect URLs
  // =========================================================

  function buildWebLoginUrl() {
    const params =
      new URLSearchParams();

    params.set(
      'next',
      next
    );

    if (isOneiroApp) {
      params.set(
        'oneiroapp',
        'true'
      );
    }

    return (
      window.location.origin +
      window.location.pathname +
      '?' +
      params.toString()
    );
  }


  function buildEmailRedirectTo() {
    const webLoginUrl =
      buildWebLoginUrl();

    if (isOneiroApp) {
      return (
        'oneiroapp://open?url=' +
        encodeURIComponent(
          webLoginUrl
        )
      );
    }

    return webLoginUrl;
  }


  // =========================================================
  // Email providers
  // =========================================================

  function getEmailProviderUrl(
    email
  ) {
    const domain =
      (
        email.split('@')[1] ||
        ''
      )
        .trim()
        .toLowerCase();

    const providers = {
      'mail.ru':
        'https://e.mail.ru/inbox/',

      'list.ru':
        'https://e.mail.ru/inbox/',

      'bk.ru':
        'https://e.mail.ru/inbox/',

      'gmail.com':
        'https://mail.google.com/mail/u/0/#inbox',

      'yandex.ru':
        'https://mail.yandex.ru/',

      'ya.ru':
        'https://mail.yandex.ru/',

      'icloud.com':
        'https://www.icloud.com/mail/',
    };

    const webMailUrl =
      providers[domain];

    if (isOneiroApp) {
      return (
        'mailapp:' +
        (webMailUrl || '')
      );
    }

    return webMailUrl || null;
  }


  // =========================================================
  // Messages
  // =========================================================

  function showSuccessMessage(
    email
  ) {
    const mailUrl =
      getEmailProviderUrl(
        email
      );

    if (!mailUrl) {
      showMessage(
        'Письмо отправлено ✨ Проверьте почту',
        'success'
      );

      return;
    }

    showHtmlMessage(
      'Письмо отправлено ✨ ' +
      '<a class="oneiro-login-mail-link" href="' +
      mailUrl +
      '">' +
      'Открыть почту' +
      '</a>',

      'success'
    );
  }


  function showHtmlMessage(
    html,
    state
  ) {
    if (!message) {
      return;
    }

    message.innerHTML =
      html || '';

    message.classList.remove(
      'is-error',
      'is-success',
      'is-loading'
    );

    if (state) {
      message.classList.add(
        'is-' + state
      );
    }
  }


  function showMessage(
    text,
    state
  ) {
    if (!message) {
      return;
    }

    message.textContent =
      text || '';

    message.classList.remove(
      'is-error',
      'is-success',
      'is-loading'
    );

    if (state) {
      message.classList.add(
        'is-' + state
      );
    }
  }


  // =========================================================
  // Session
  // =========================================================

  async function getCurrentSession() {
    const {
      data,
      error
    } = await sb.auth.getSession();

    if (error) {
      console.warn(
        'Не удалось получить session',
        error
      );

      return null;
    }

    return (
      data?.session ||
      null
    );
  }


  function isAnonymousSession(
    session
  ) {
    return (
      session
        ?.user
        ?.is_anonymous === true
    );
  }


  // =========================================================
  // Existing account login
  // =========================================================

  async function sendExistingAccountMagicLink(
    email
  ) {
    return sb.auth.signInWithOtp({
      email,

      options: {
        shouldCreateUser: false,

        emailRedirectTo:
          buildEmailRedirectTo(),
      },
    });
  }


  // =========================================================
  // New / ordinary login
  // =========================================================

  async function sendRegularMagicLink(
    email
  ) {
    return sb.auth.signInWithOtp({
      email,

      options: {
        /*
         * Сохраняем существующее поведение:
         * если аккаунта ещё нет,
         * Supabase создаёт permanent user.
         */
        shouldCreateUser: true,

        emailRedirectTo:
          buildEmailRedirectTo(),
      },
    });
  }


  // =========================================================
  // Anonymous → permanent
  // =========================================================

  async function convertAnonymousUser(
    email
  ) {
    const {
      error: updateError
    } =
      await sb.auth.updateUser(
        {
          email,
        },

        {
          emailRedirectTo:
            buildEmailRedirectTo(),
        }
      );

    /*
     * Email свободен:
     * Supabase отправил письмо
     * для подтверждения email текущего
     * anonymous user.
     */
    if (!updateError) {
      return {
        error: null,
      };
    }

    /*
     * Если email уже принадлежит другому
     * аккаунту, updateUser не может
     * присоединить его к anonymous user.
     *
     * Тогда отправляем magic link
     * именно для существующего аккаунта.
     *
     * shouldCreateUser:false гарантирует,
     * что новый пользователь здесь
     * создан не будет.
     */
    console.info(
      'Anonymous email linking failed; trying existing account login',
      updateError
    );

    return sendExistingAccountMagicLink(
      email
    );
  }


  // =========================================================
  // Submit
  // =========================================================

  async function sendMagicLink() {
    const email =
      (
        emailInput &&
        emailInput.value
          ? emailInput.value
          : ''
      ).trim();

    if (!email) {
      showMessage(
        'Введите email',
        'error'
      );
      return;
    }

    if (
      emailInput &&
      !emailInput.checkValidity()
    ) {
      showMessage(
        'Введите корректный email',
        'error'
      );
      return;
    }

    setLoadingState(true);

    showMessage(
      'Отправляем письмо...',
      'loading'
    );

    try {
      const session =
        await getCurrentSession();

      let result;

      if (
        isAnonymousSession(
          session
        )
      ) {
        result =
          await convertAnonymousUser(
            email
          );
      } else {
        result =
          await sendRegularMagicLink(
            email
          );
      }

      if (result?.error) {
        console.error(
          'Magic link error:',
          result.error
        );

        showMessage(
          'Не удалось отправить письмо',
          'error'
        );

        return;
      }

      showSuccessMessage(
        email
      );

    } catch (e) {
      console.error(
        'Magic link error:',
        e
      );

      showMessage(
        'Не удалось отправить письмо',
        'error'
      );

    } finally {
      setLoadingState(false);
    }
  }


  // =========================================================
  // Existing session on page load
  // =========================================================

  async function checkSession() {
    try {
      const session =
        await getCurrentSession();

      if (!session) {
        return;
      }

      /*
       * Anonymous user должен остаться
       * на странице login, чтобы
       * привязать email.
       */
      if (
        isAnonymousSession(
          session
        )
      ) {
        return;
      }

      /*
       * Permanent user уже вошёл.
       */
      window.location.replace(
        next
      );

    } catch (e) {
      console.error(
        'Session check error:',
        e
      );
    }
  }


  // =========================================================
  // UI state
  // =========================================================

  function setLoadingState(
    isLoading
  ) {
    if (button) {
      button.disabled =
        !!isLoading;
    }

    if (emailInput) {
      emailInput.disabled =
        !!isLoading;
    }
  }


  // =========================================================
  // Preloader
  // =========================================================

  function hidePreloader() {
    const preloader =
      document.getElementById(
        'oneiro-preloader'
      );

    if (preloader) {
      preloader.classList.add(
        'is-hidden'
      );

      setTimeout(
        function () {
          preloader.remove();
        },
        500
      );
    }
  }


  // =========================================================
  // Init
  // =========================================================

  checkSession();

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      hidePreloader
    );
  } else {
    hidePreloader();
  }

})();