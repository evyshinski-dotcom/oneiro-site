document
  .documentElement
  .classList
  .add(
    'oneiro-auth-pending'
  );

(function () {
  const config =
    window.ONEIRO_CONFIG;

  if (!config) {
    console.error(
      'ONEIRO_CONFIG is not loaded'
    );

    document
      .documentElement
      .classList
      .remove(
        'oneiro-auth-pending'
      );

    return;
  }

  const SUPABASE_URL =
    config.supabase.url;

  const SUPABASE_PUBLISHABLE_KEY =
    config.supabase.anonKey;

  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const ssaidFromUrl =
    (
      searchParams.get(
        'ssaid'
      ) || ''
    ).trim();

  if (ssaidFromUrl) {
    try {
      localStorage.setItem(
        'oneiro:ssaid',
        ssaidFromUrl
      );
    } catch (e) {
      console.warn(
        'Не удалось сохранить SSAID',
        e
      );
    }
  }

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


  // =========================================================
  // URLs
  // =========================================================

  function buildCurrentNext() {
    return (
      window.location.pathname +
      window.location.search
    );
  }


  function buildLoginUrl() {
    const params =
      new URLSearchParams();

    params.set(
      'next',
      buildCurrentNext()
    );

    if (isOneiroApp) {
      params.set(
        'oneiroapp',
        'true'
      );
    }

    return (
      config.routes.login +
      '?' +
      params.toString()
    );
  }


  // =========================================================
  // UI
  // =========================================================

  function showPage() {
    document
      .documentElement
      .classList
      .remove(
        'oneiro-auth-pending'
      );
  }


  function redirectToLogin() {
    window.location.replace(
      buildLoginUrl()
    );
  }


  // =========================================================
  // Supabase library
  // =========================================================

  function loadSupabaseJs(
    cb
  ) {
    if (
      window.supabase &&
      window.supabase.createClient
    ) {
      cb();
      return;
    }

    const s =
      document.createElement(
        'script'
      );

    s.src =
      'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

    s.async =
      true;

    s.onload =
      cb;

    s.onerror =
      redirectToLogin;

    document.head.appendChild(
      s
    );
  }


  // =========================================================
  // Auth check
  // =========================================================

  loadSupabaseJs(
    async () => {
      try {
        const sb =
          window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
              auth: {
                detectSessionInUrl:
                  true,

                persistSession:
                  true,

                autoRefreshToken:
                  true,
              },
            }
          );

        const {
          data,
          error
        } =
          await sb.auth.getSession();

        const session =
          data?.session || null;

        if (
          error ||
          !session?.access_token
        ) {
          redirectToLogin();
          return;
        }

        /*
         * Anonymous session НЕ даёт
         * доступ к permanent-only
         * страницам.
         */
        if (
          session
            .user
            ?.is_anonymous === true
        ) {
          redirectToLogin();
          return;
        }

        showPage();

      } catch (e) {
        console.error(
          'Auth error:',
          e?.message,
          e
        );

        redirectToLogin();
      }
    }
  );
})();