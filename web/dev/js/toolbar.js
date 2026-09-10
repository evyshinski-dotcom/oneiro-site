(function () {
  const config =
    window.ONEIRO_CONFIG;

  if (!config) {
    console.error(
      'ONEIRO_CONFIG is not loaded'
    );
    return;
  }

  const USER_INFO_URL =
    config.n8n.getUserInfo;

  let currentContext =
    window.OneiroUserContext ||
    null;

  let inFlightPromise =
    null;

  let lastLoadedValue =
    null;


  // =========================================================
  // Toolbar elements
  // =========================================================

  function getProfileLink() {
    return document.querySelector(
      [
        '.oneiro-toolbar-item[aria-label="Профиль"]',
        '.oneiro-toolbar-item[aria-label="Вход"]',
      ].join(',')
    );
  }


  function getProfileText() {
    return getProfileLink()
      ?.querySelector(
        '.oneiro-toolbar-text'
      );
  }


  // =========================================================
  // Login URL
  // =========================================================

  function buildLoginUrl() {
    const params =
      new URLSearchParams();

    params.set(
      'next',
      window.location.pathname +
      window.location.search
    );

    const currentParams =
      new URLSearchParams(
        window.location.search
      );

    const rawOneiroApp =
      (
        currentParams.get(
          'oneiroapp'
        ) || ''
      )
        .trim()
        .toLowerCase();

    const isOneiroApp =
      rawOneiroApp === 'true' ||
      rawOneiroApp === '1';

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
  // Links
  // =========================================================

  function applyProfileMode() {
    const profileLink =
      getProfileLink();

    const profileText =
      getProfileText();

    if (!profileLink) {
      return;
    }

    const isAnonymous =
      currentContext
        ?.isAnonymous === true;

    if (isAnonymous) {
      profileLink.setAttribute(
        'href',
        buildLoginUrl()
      );

      profileLink.setAttribute(
        'aria-label',
        'Вход'
      );

      if (profileText) {
        profileText.textContent =
          'Вход';
      }

      return;
    }

    profileLink.setAttribute(
      'href',
      config.popups.profile
    );

    profileLink.setAttribute(
      'aria-label',
      'Профиль'
    );

    if (profileText) {
      profileText.textContent =
        'Профиль';
    }
  }


  function applyConfiguredLinks() {
    applyProfileMode();

    const timecalcLink =
      document.querySelector(
        '.oneiro-toolbar-item[aria-label="Калькулятор времени"]'
      );

    if (timecalcLink) {
      timecalcLink.setAttribute(
        'href',
        config.popups.timecalc
      );
    }
  }


  // =========================================================
  // Height
  // =========================================================

  function updateToolbarHeight() {
    const toolbar =
      document.getElementById(
        'oneiro-bottom-toolbar'
      );

    if (!toolbar) {
      return;
    }

    const bottomGap = 12;
    const shadowGap = 12;

    const h =
      Math.round(
        toolbar
          .getBoundingClientRect()
          .height
      ) +
      bottomGap +
      shadowGap;

    document
      .documentElement
      .style
      .setProperty(
        '--oneiro-bottombar-h',
        h + 'px'
      );
  }


  // =========================================================
  // Counter
  // =========================================================

  function getCounterEl() {
    return document.getElementById(
      'oneiro-requests-left'
    );
  }


  function setCounterValue(
    value,
    opts = {}
  ) {
    const el =
      getCounterEl();

    if (!el) {
      return;
    }

    el.classList.remove(
      'is-loading',
      'is-error'
    );

    if (opts.loading) {
      el.classList.add(
        'is-loading'
      );
    }

    if (opts.error) {
      el.classList.add(
        'is-error'
      );
    }

    el.textContent =
      value;
  }


  function getByPath(
    obj,
    path
  ) {
    try {
      return path
        .split('.')
        .reduce(
          (acc, key) => {
            if (
              acc == null
            ) {
              return undefined;
            }

            return acc[key];
          },

          obj
        );

    } catch (e) {
      return undefined;
    }
  }


  function extractRequestsLeft(
    payload
  ) {
    const root =
      Array.isArray(payload)
        ? payload[0]
        : payload;

    if (
      !root ||
      typeof root !== 'object'
    ) {
      return null;
    }

    const candidatePaths = [
      'subscription.limit',
      'limit',
      'requests_left',
      'remaining_requests',
      'messages_left',
      'user_limit',
      'user.limit',
      'data.subscription.limit',
      'data.limit',
      'result.subscription.limit',
      'result.limit',
    ];

    for (
      const path
      of candidatePaths
    ) {
      const value =
        getByPath(
          root,
          path
        );

      if (
        typeof value ===
          'number' &&
        Number.isFinite(value)
      ) {
        return value;
      }

      if (
        typeof value ===
          'string' &&
        value.trim() !== '' &&
        !isNaN(
          Number(value)
        )
      ) {
        return Number(value);
      }
    }

    return null;
  }


  // =========================================================
  // Initial counter from context
  // =========================================================

  function applyInitialCounterFromContext() {
    if (!currentContext) {
      return false;
    }

    /*
     * chat.js уже вызвал getUserInfo.
     * Используем тот же ответ и не делаем
     * второй HTTP-запрос при загрузке.
     */
    if (currentContext.userInfo) {
      const value =
        extractRequestsLeft(
          currentContext.userInfo
        );

      if (value != null) {
        lastLoadedValue =
          value;

        setCounterValue(
          String(value)
        );

        return true;
      }
    }

    /*
     * Fallback на значение,
     * полученное напрямую из sleep_users.
     */
    if (
      typeof currentContext
        .limit === 'number'
    ) {
      lastLoadedValue =
        currentContext.limit;

      setCounterValue(
        String(
          currentContext.limit
        )
      );

      return true;
    }

    return false;
  }


  // =========================================================
  // Checkout
  // =========================================================

  function buildCheckoutUrl() {
    const current =
      new URL(
        window.location.href
      );

    const checkout =
      new URL(
        config.routes.checkout,
        window.location.origin
      );

    const keysToKeep = [
      'yclid',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'yrclid',
      'ybaip',
    ];

    for (
      const key
      of keysToKeep
    ) {
      const value =
        current.searchParams.get(
          key
        );

      if (value) {
        checkout
          .searchParams
          .set(
            key,
            value
          );
      }
    }

    /*
     * Сохраняем oneiroapp,
     * чтобы checkout → login
     * корректно вернул пользователя
     * в приложение.
     */
    if (
      current
        .searchParams
        .get('oneiroapp')
    ) {
      checkout
        .searchParams
        .set(
          'oneiroapp',
          current
            .searchParams
            .get('oneiroapp')
        );
    }

    return (
      checkout.pathname +
      checkout.search
    );
  }


  // =========================================================
  // getUserInfo webhook
  // =========================================================

  function buildRequestUrl() {
    const url =
      new URL(
        USER_INFO_URL
      );

    if (
      currentContext?.tgUserId
    ) {
      url.searchParams.set(
        'tg_userid',
        currentContext.tgUserId
      );
    }

    if (
      currentContext?.authUserId
    ) {
      url.searchParams.set(
        'auth_user_id',
        currentContext.authUserId
      );
    }

    if (
      currentContext?.sleepUserId
    ) {
      url.searchParams.set(
        'sleep_user_id',
        currentContext.sleepUserId
      );
    }

    if (
      currentContext?.ssaid
    ) {
      url.searchParams.set(
        'ssaid',
        currentContext.ssaid
      );
    }

    return url.toString();
  }


  async function refreshRequestsLeft(
    force = false
  ) {
    if (
      !currentContext
        ?.accessToken
    ) {
      if (
        lastLoadedValue != null
      ) {
        setCounterValue(
          String(
            lastLoadedValue
          )
        );

      } else if (
        typeof currentContext
          ?.limit === 'number'
      ) {
        setCounterValue(
          String(
            currentContext.limit
          )
        );

      } else {
        setCounterValue('—');
      }

      return null;
    }

    if (
      inFlightPromise &&
      !force
    ) {
      return inFlightPromise;
    }

    setCounterValue(
      lastLoadedValue != null
        ? String(
            lastLoadedValue
          )
        : '…',

      {
        loading: true,
      }
    );

    inFlightPromise =
      (async () => {
        try {
          const response =
            await fetch(
              buildRequestUrl(),
              {
                method: 'GET',

                headers: {
                  token:
                    currentContext
                      .accessToken,

                  tg_userid:
                    String(
                      currentContext
                        .tgUserId ||
                      ''
                    ),

                  ssaid:
                    String(
                      currentContext
                        .ssaid ||
                      ''
                    ),

                  Accept:
                    'application/json',
                },

                credentials:
                  'omit',

                cache:
                  'no-store',
              }
            );

          if (!response.ok) {
            throw new Error(
              'HTTP ' +
              response.status
            );
          }

          const payload =
            await response.json();

          const nextValue =
            extractRequestsLeft(
              payload
            );

          if (
            nextValue == null
          ) {
            throw new Error(
              'Не найдено поле с остатком запросов в ответе webhook'
            );
          }

          lastLoadedValue =
            nextValue;

          setCounterValue(
            String(
              nextValue
            )
          );

          return nextValue;

        } catch (error) {
          console.error(
            'Не удалось обновить остаток запросов',
            error
          );

          if (
            lastLoadedValue !=
            null
          ) {
            setCounterValue(
              String(
                lastLoadedValue
              )
            );

          } else if (
            typeof currentContext
              ?.limit ===
              'number'
          ) {
            setCounterValue(
              String(
                currentContext
                  .limit
              )
            );

          } else {
            setCounterValue(
              '—',
              {
                error: true,
              }
            );
          }

          return null;

        } finally {
          inFlightPromise =
            null;
        }
      })();

    return inFlightPromise;
  }


  // =========================================================
  // Public toolbar API
  // =========================================================

  window.OneiroToolbar = {
    setRequestsLeft(value) {
      if (
        value == null ||
        value === ''
      ) {
        return;
      }

      lastLoadedValue =
        value;

      setCounterValue(
        String(value)
      );
    },


    setUserContext(ctx) {
      if (
        !ctx ||
        typeof ctx !==
          'object'
      ) {
        return;
      }

      currentContext =
        ctx;

      applyProfileMode();
    },


    refreshRequestsLeft,
  };


  // =========================================================
  // Context events
  // =========================================================

  window.addEventListener(
    'oneiro:user-context-ready',

    function (event) {
      if (!event?.detail) {
        return;
      }

      currentContext =
        event.detail;

      applyProfileMode();

      const initialized =
        applyInitialCounterFromContext();

      /*
       * Обычно сюда не попадём:
       * userInfo уже должен прийти
       * из chat.js.
       *
       * Но если ранний getUserInfo
       * не сработал, toolbar делает
       * резервную попытку.
       */
      if (!initialized) {
        refreshRequestsLeft(
          true
        );
      }
    }
  );


  window.addEventListener(
    'oneiro:refresh-requests-left',

    function () {
      refreshRequestsLeft(
        true
      );
    }
  );


  // =========================================================
  // Plus
  // =========================================================

  const plusBtn =
    document.getElementById(
      'oneiro-toolbar-plus'
    );

  if (plusBtn) {
    plusBtn.addEventListener(
      'click',

      function () {
        window.location.href =
          buildCheckoutUrl();
      }
    );
  }


  // =========================================================
  // Init
  // =========================================================

  function initToolbar() {
    applyConfiguredLinks();
    updateToolbarHeight();

    if (
      window.OneiroUserContext
    ) {
      currentContext =
        window.OneiroUserContext;

      applyProfileMode();

      const initialized =
        applyInitialCounterFromContext();

      /*
       * Fallback только если chat.js
       * вообще не передал ни userInfo,
       * ни исходный limit.
       */
      if (!initialized) {
        refreshRequestsLeft(
          true
        );
      }
    }
  }


  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      initToolbar
    );
  } else {
    initToolbar();
  }

  window.addEventListener(
    'load',
    updateToolbarHeight
  );

  window.addEventListener(
    'resize',
    updateToolbarHeight
  );
})();