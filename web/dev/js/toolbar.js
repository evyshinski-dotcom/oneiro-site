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
  // Free requests hint
  // =========================================================

  let freeRequestsHintShown =
    false;


  function getFreeRequestsHintStorageKey() {
    const authUserId =
      currentContext
        ?.authUserId;

    if (!authUserId) {
      return null;
    }

    return (
      'oneiro:free-requests-hint-seen:' +
      authUserId
    );
  }


  function hasSeenFreeRequestsHint() {
    const key =
      getFreeRequestsHintStorageKey();

    if (!key) {
      return false;
    }

    try {
      return (
        localStorage.getItem(
          key
        ) === '1'
      );
    } catch (e) {
      return false;
    }
  }


  function markFreeRequestsHintSeen() {
    const key =
      getFreeRequestsHintStorageKey();

    if (!key) {
      return;
    }

    try {
      localStorage.setItem(
        key,
        '1'
      );
    } catch (e) {
      // ignore
    }
  }


  function getRequestsWord(
    value
  ) {
    const n =
      Math.abs(
        Number(value)
      );

    const mod10 =
      n % 10;

    const mod100 =
      n % 100;

    if (
      mod10 === 1 &&
      mod100 !== 11
    ) {
      return 'запрос';
    }

    if (
      mod10 >= 2 &&
      mod10 <= 4 &&
      (
        mod100 < 12 ||
        mod100 > 14
      )
    ) {
      return 'запроса';
    }

    return 'запросов';
  }


function positionFreeRequestsHint() {
  const hint =
    document.getElementById(
      'oneiro-free-requests-hint'
    );

  const counterBadge =
    document.querySelector(
      '.oneiro-toolbar-counter-badge'
    );

  const counterValue =
    document.getElementById(
      'oneiro-requests-left'
    );

  if (
    !hint ||
    !counterBadge ||
    !counterValue
  ) {
    return;
  }

  const badgeRect =
    counterBadge.getBoundingClientRect();

  const valueRect =
    counterValue.getBoundingClientRect();

  const hintRect =
    hint.getBoundingClientRect();

  const viewportPadding =
    12;

  /*
   * Плашка располагается
   * над блоком счётчика.
   */
  let left =
    badgeRect.left +
    badgeRect.width / 2 -
    hintRect.width / 2;

  left =
    Math.max(
      viewportPadding,
      Math.min(
        left,
        window.innerWidth -
          hintRect.width -
          viewportPadding
      )
    );

  let top =
    badgeRect.top -
    hintRect.height -
    30;

  top =
    Math.max(
      12,
      top
    );

  hint.style.left =
    left + 'px';

  hint.style.top =
    top + 'px';


  /*
   * Центрируем ОСТРИЁ стрелки
   * точно над числом остатка запросов.
   */
  const arrow =
    hint.querySelector(
      '.oneiro-free-hint-arrow'
    );

  if (!arrow) {
    return;
  }

  const valueCenter =
    valueRect.left +
    valueRect.width / 2;

  const arrowLeft =
    valueCenter - left;

  arrow.style.left =
    Math.max(
      24,
      Math.min(
        hintRect.width - 24,
        arrowLeft
      )
    ) + 'px';
}


  function createFreeRequestsHint(
    value
  ) {
    if (
      freeRequestsHintShown ||
      hasSeenFreeRequestsHint()
    ) {
      return;
    }

    const counter =
      document.querySelector(
        '.oneiro-toolbar-counter-badge'
      );

    if (!counter) {
      return;
    }

    const existingHint =
      document.getElementById(
        'oneiro-free-requests-hint'
      );

    if (existingHint) {
      return;
    }

    const hint =
      document.createElement(
        'div'
      );

    hint.id =
      'oneiro-free-requests-hint';

    hint.setAttribute(
      'role',
      'status'
    );

    hint.innerHTML = `
      <div class="oneiro-free-hint-icon">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
      d="M10.5 4.5
         C11.2 8.3 13.2 10.3 17 11
         C13.2 11.7 11.2 13.7 10.5 17.5
         C9.8 13.7 7.8 11.7 4 11
         C7.8 10.3 9.8 8.3 10.5 4.5Z"
    />

    <!-- маленькая звезда -->
    <path
      d="M23 5
         C23.4 7.2 24.6 8.4 26.8 8.8
         C24.6 9.2 23.4 10.4 23 12.6
         C22.6 10.4 21.4 9.2 19.2 8.8
         C21.4 8.4 22.6 7.2 23 5Z"
    />
        </svg>
      </div>

      <div class="oneiro-free-hint-text">
        <span>Вам доступно</span>
        <strong>
          ${value} бесплатных ${getRequestsWord(value)}
        </strong>
      </div>

      <button
        type="button"
        class="oneiro-free-hint-close"
        aria-label="Закрыть"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 6L18 18"></path>
          <path d="M18 6L6 18"></path>
        </svg>
      </button>

      <div
<div
  class="oneiro-free-hint-arrow"
  aria-hidden="true"
>
  <svg
    viewBox="0 0 44 44"
  >
    <!-- тело стрелки -->
    <path
      d="M8 3 C8 16 13 27 22 34"
    />

    <!-- наконечник -->
    <path
      d="M13 32 L22 34 L19 25"
    />
  </svg>
</div>
    `;

    document.body.appendChild(
      hint
    );

    const closeBtn =
      hint.querySelector(
        '.oneiro-free-hint-close'
      );

    closeBtn?.addEventListener(
      'click',

      function () {
        markFreeRequestsHintSeen();

        hint.classList.add(
          'is-hiding'
        );

        setTimeout(
          function () {
            hint.remove();
          },
          180
        );
      }
    );

    freeRequestsHintShown =
      true;

    requestAnimationFrame(
      function () {
        positionFreeRequestsHint();

        requestAnimationFrame(
          function () {
            hint.classList.add(
              'is-visible'
            );
          }
        );
      }
    );
  }


  function maybeShowFreeRequestsHint(
    value
  ) {
    if (
      currentContext
        ?.isAnonymous !== true
    ) {
      return;
    }

    if (
      typeof value !== 'number' ||
      !Number.isFinite(value) ||
      value <= 0
    ) {
      return;
    }

    createFreeRequestsHint(
      value
    );
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

        maybeShowFreeRequestsHint(
          value
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

      maybeShowFreeRequestsHint(
        currentContext.limit
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
    function () {
      updateToolbarHeight();
      positionFreeRequestsHint();
    }
  );

  window.addEventListener(
    'resize',
    function () {
      updateToolbarHeight();
      positionFreeRequestsHint();
    }
  );
})();	