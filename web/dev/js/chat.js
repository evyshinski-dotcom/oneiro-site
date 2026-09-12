import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.11.0/dist/chat.bundle.es.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

(async function () {
  const config = window.ONEIRO_CONFIG;

  if (!config) {
    console.error('ONEIRO_CONFIG is not loaded');
    return;
  }

  const SUPABASE_URL = config.supabase.url;
  const SUPABASE_PUBLISHABLE_KEY = config.supabase.anonKey;
  const WEBHOOK_URL = config.n8n.chat;

  const sb = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  const searchParams =
    new URLSearchParams(window.location.search);

  const rawOneiroApp =
    (searchParams.get('oneiroapp') || '')
      .trim()
      .toLowerCase();

  const isOneiroApp =
    rawOneiroApp === 'true' ||
    rawOneiroApp === '1';

  const ssaid =
    (searchParams.get('ssaid') || '').trim();


  // =========================================================
  // Device ID
  // =========================================================

  function getWebDeviceId() {
    const key =
      'oneiro:web_device_id';

    let id =
      localStorage.getItem(key);

    if (!id) {
      id =
        crypto.randomUUID();

      localStorage.setItem(
        key,
        id
      );
    }

    return (
      'web:' + id
    );
  }


  const deviceId =
    isOneiroApp
      ? ssaid
      : getWebDeviceId();


  // =========================================================
  // Ошибка загрузки чата
  // =========================================================

  function fail(message, error) {
    console.error(message, error || '');

    const target =
      document.querySelector('#n8n-chat');

    if (target) {
      target.innerHTML =
        '<div style="padding:16px;font-family:inherit;">' +
        'Не удалось загрузить чат. Пожалуйста, обновите страницу.' +
        '</div>';
    }
  }


  // =========================================================
  // Проверка зарегистрированного пользователя по SSAID
  // и device ID
  // =========================================================

  async function hasPermanentUserForDeviceId() {
    if (!deviceId) {
      return false;
    }

    const {
      data,
      error
    } = await sb.rpc(
      'has_permanent_user_for_ssaid',
      {
        p_ssaid:
          deviceId,
      }
    );

    if (error) {
      throw error;
    }

    return data === true;
  }


  // =========================================================
  // Supabase session
  // =========================================================

  async function getValidSession() {
    const {
      data,
      error
    } = await sb.auth.getSession();

    let session =
      data?.session || null;

    if (
      error ||
      !session?.access_token
    ) {
      return null;
    }

    const expiresAt =
      session.expires_at || 0;

    const now =
      Math.floor(Date.now() / 1000);

    const willExpireSoon =
      expiresAt &&
      expiresAt - now < 60;

    if (willExpireSoon) {
      const refreshed =
        await sb.auth.refreshSession();

      session =
        refreshed.data?.session || null;
    }

    return session;
  }


  async function getOrCreateSession() {
    let session =
      await getValidSession();

    if (session?.access_token) {
      return session;
    }

    /*
     * Перед созданием нового anonymous user
     * проверяем, не принадлежит ли device ID
     * permanent-пользователю.
     */
    const hasPermanentUser =
      await hasPermanentUserForDeviceId();

    if (hasPermanentUser) {
      const params =
        new URLSearchParams();

      let next =
        config.routes.chat;

      /*
       * В Android возвращаем в чат
       * вместе с oneiroapp и SSAID.
       *
       * В браузере deviceId лежит
       * в localStorage.
       */
      if (
        isOneiroApp &&
        ssaid
      ) {
        const chatParams =
          new URLSearchParams();

        chatParams.set(
          'oneiroapp',
          'true'
        );

        chatParams.set(
          'ssaid',
          ssaid
        );

        next =
          config.routes.chat +
          '?' +
          chatParams.toString();
      }

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

      window.location.replace(
        config.routes.login +
        '?' +
        params.toString()
      );

      return null;
    }

    const {
      data,
      error
    } = await sb.auth.signInAnonymously();

    if (error) {
      throw error;
    }

    session =
      data?.session || null;

    if (!session?.access_token) {
      throw new Error(
        'Anonymous session was not created'
      );
    }

    return session;
  }


  // =========================================================
  // sleep_users
  // =========================================================

  function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }


  async function loadSleepUser(
    authUserId,
    attempts = 5
  ) {
    let lastError = null;

    for (
      let attempt = 1;
      attempt <= attempts;
      attempt += 1
    ) {
      const {
        data,
        error
      } = await sb
        .from('sleep_users')
        .select(
          'id, tg_userid, email, "limit"'
        )
        .eq(
          'auth_user_id',
          authUserId
        )
        .maybeSingle();

      if (error) {
        lastError = error;
      } else if (data) {
        return data;
      }

      if (attempt < attempts) {
        await wait(150 * attempt);
      }
    }

    if (lastError) {
      throw lastError;
    }

    return null;
  }


  // =========================================================
  // Получение userInfo + регистрация device ID
  // =========================================================

  async function loadUserInfoThroughN8n({
    accessToken,
    authUserId,
    sleepUser
  }) {
    const url =
      new URL(
        config.n8n.getUserInfo
      );

    url.searchParams.set(
      'tg_userid',
      String(
        sleepUser.tg_userid || ''
      )
    );

    url.searchParams.set(
      'auth_user_id',
      authUserId
    );

    url.searchParams.set(
      'sleep_user_id',
      String(
        sleepUser.id
      )
    );

    if (deviceId) {
      url.searchParams.set(
        'ssaid',
        deviceId
      );
    }

    const response =
      await fetch(
        url.toString(),
        {
          method: 'GET',

          headers: {
            token:
              accessToken,

            tg_userid:
              String(
                sleepUser.tg_userid || ''
              ),

            ssaid:
              String(
                deviceId || ''
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
        'getUserInfo HTTP ' +
        response.status
      );
    }

    return await response.json();
  }


  // =========================================================
  // Данные из Android-приложения
  // =========================================================

  function getSleepsFromApp() {
    if (!isOneiroApp) {
      return {
        raw: '',
        parsed: [],
        currentTime: null,
        birthday: null,
        available: false,
        error: null,
      };
    }

    try {
      if (
        !window.OneiroApp ||
        typeof window.OneiroApp.getSleeps !==
          'function'
      ) {
        return {
          raw: '',
          parsed: [],
          currentTime: null,
          birthday: null,
          available: false,
          error:
            'OneiroApp.getSleeps is not available',
        };
      }

      const raw =
        window.OneiroApp.getSleeps() || '';

      if (!raw) {
        return {
          raw: '',
          parsed: [],
          currentTime: null,
          birthday: null,
          available: true,
          error: null,
        };
      }

      const data =
        JSON.parse(raw);

      const parsed =
        Array.isArray(data?.sleepItems)
          ? data.sleepItems.map(
              item => ({
                id:
                  item?.id ?? null,

                startDate:
                  item?.startDate ?? '',

                endDate:
                  item?.endDate ?? '',

                isNight:
                  item?.isNight === true,

                comment:
                  item?.comment ?? '',
              })
            )
          : [];

      return {
        raw,
        parsed,
        currentTime:
          data?.currentTime ?? null,
        birthday:
          data?.birthday ?? null,
        available: true,
        error: null,
      };

    } catch (e) {
      console.error(
        'Ошибка получения снов из приложения',
        e
      );

      return {
        raw: '',
        parsed: [],
        currentTime: null,
        birthday: null,
        available: false,
        error: String(
          e?.message ||
          e ||
          'unknown error'
        ),
      };
    }
  }


  // =========================================================
  // Авторизация / anonymous signup
  // =========================================================

  let session;

  try {
    session =
      await getOrCreateSession();
  } catch (e) {
    fail(
      'Ошибка авторизации',
      e
    );
    return;
  }

  if (!session) {
    return;
  }

  const authUserId =
    session.user?.id || '';

  const email =
    session.user?.email || '';

  const accessToken =
    session.access_token;

  const isAnonymous =
    session.user?.is_anonymous === true;

  if (!authUserId) {
    fail(
      'Supabase session не содержит user.id'
    );
    return;
  }


  // =========================================================
  // Получаем sleep_users
  // =========================================================

  let sleepUser;

  try {
    sleepUser =
      await loadSleepUser(authUserId);
  } catch (e) {
    fail(
      'Ошибка чтения sleep_users',
      e
    );
    return;
  }

  if (!sleepUser) {
    fail(
      'Для auth-пользователя не найдена строка в sleep_users'
    );
    return;
  }


  // =========================================================
  // Запускаем getUserInfo сразу, но НЕ блокируем загрузку чата
  // =========================================================

  const userInfoPromise =
    loadUserInfoThroughN8n({
      accessToken,
      authUserId,
      sleepUser,
    })
      .catch(e => {
        console.warn(
          'Не удалось получить userInfo через getUserInfo',
          e
        );

        return null;
      });


  // =========================================================
  // User context
  // =========================================================

  const pid =
    parseInt(
      document
        .querySelector('#allrecords')
        ?.dataset
        ?.tildaProjectId || '0',
      10
    );

  const stableSessionId =
    String(sleepUser.tg_userid);

  try {
    localStorage.setItem(
      'n8n-chat/sessionId',
      stableSessionId
    );
  } catch (e) {
    console.warn(
      'Не удалось записать sessionId',
      e
    );
  }

  const appSleeps =
    getSleepsFromApp();

  const oneiroUserContext = {
    accessToken,
    authUserId,

    sleepUserId:
      sleepUser.id,

    tgUserId:
      String(
        sleepUser.tg_userid || ''
      ),

    email:
      sleepUser.email ||
      email ||
      '',

    limit:
      sleepUser.limit ?? null,

    /*
     * userInfo догружается параллельно.
     * Для стартового toolbar достаточно
     * sleepUser.limit.
     */
    userInfo:
      null,

    isAnonymous,

    projectId:
      pid,

    oneiroapp:
      isOneiroApp,

    ssaid:
      deviceId,

    appSleepsAvailable:
      appSleeps.available,

    appSleeps:
      appSleeps.parsed,
  };

  window.OneiroUserContext =
    oneiroUserContext;

  window.dispatchEvent(
    new CustomEvent(
      'oneiro:user-context-ready',
      {
        detail:
          oneiroUserContext,
      }
    )
  );


  // =========================================================
  // n8n chat
  // =========================================================

  createChat({
    webhookUrl:
      WEBHOOK_URL,

    webhookConfig: {
      method: 'POST',

      headers: {
        Authorization:
          `Bearer ${accessToken}`,
      },
    },

    target:
      '#n8n-chat',

    mode:
      'fullscreen',

    chatInputKey:
      'chatInput',

    chatSessionKey:
      'sessionId',

    loadPreviousSession:
      true,

    metadata: {
      projectId:
        pid,

      auth_user_id:
        authUserId,

      sleep_user_id:
        sleepUser.id,

      tg_userid:
        sleepUser.tg_userid,

      email:
        sleepUser.email ||
        email ||
        '',

      limit:
        sleepUser.limit,

      token:
        accessToken,

      is_anonymous:
        isAnonymous,

      oneiroapp:
        isOneiroApp,

      ssaid:
        deviceId,

      app_sleeps_available:
        appSleeps.available,

      app_sleeps_error:
        appSleeps.error,

      app_sleeps:
        appSleeps.parsed,

      app_sleeps_current_time:
        appSleeps.currentTime,

      app_sleeps_birthday:
        appSleeps.birthday,

      app_sleeps_raw:
        appSleeps.raw,
    },

    showWelcomeScreen:
      false,

    allowFileUploads:
      false,

    defaultLanguage:
      'ru',

    i18n: {
      ru: {
        title: '',
        subtitle: '',
        footer: '',
        getStarted:
          'New Conversation',
        inputPlaceholder:
          'Напишите ваш вопрос здесь',
      },
    },

    initialMessages: [
      'Привет! Я — Oneiro, ваш консультант по сну.',
      'Расскажите, пожалуйста, немного о ребёнке (или детях): имя, дата рождения, пол. Например: «Маша, дата рождения - 02.02.2025, девочка». Это поможет сделать мои ответы более точными и персональными 💜',
    ],

    enableStreaming:
      false,
  });


  // =========================================================
  // Догружаем userInfo в фоне
  // =========================================================

  userInfoPromise
    .then(userInfo => {
      if (!userInfo) {
        return;
      }

      oneiroUserContext.userInfo =
        userInfo;

      window.OneiroUserContext =
        oneiroUserContext;

      /*
       * Не переиспользуем
       * oneiro:user-context-ready:
       * это initial event.
       *
       * Для фонового userInfo —
       * отдельное событие.
       */
      window.dispatchEvent(
        new CustomEvent(
          'oneiro:user-info-ready',
          {
            detail: {
              userInfo,
            },
          }
        )
      );
    });


  // =========================================================
  // Fix textarea height after send
  // +
  // фиксируем реальные отправки пользователя
  // =========================================================

  const chatRoot =
    document.querySelector(
      '#n8n-chat'
    );

  /*
   * Количество пользовательских сообщений,
   * для которых мы ещё ждём bot response.
   *
   * Initial/history bot messages сюда
   * не относятся и поэтому больше
   * не вызывают getUserInfo.
   */
  let pendingBotResponses =
    0;

  let lastTrackedOutgoingText =
    '';

  let lastTrackedOutgoingAt =
    0;


  function getChatTextarea() {
    return chatRoot
      ?.querySelector(
        'textarea[data-test-id="chat-input"]'
      ) || null;
  }


  function registerOutgoingMessage() {
    const textarea =
      getChatTextarea();

    const text =
      (
        textarea?.value || ''
      ).trim();

    if (!text) {
      return;
    }

    /*
     * Защита от двойного учёта:
     * один и тот же send иногда может
     * породить несколько DOM events.
     */
    const now =
      Date.now();

    if (
      text ===
        lastTrackedOutgoingText &&
      now -
        lastTrackedOutgoingAt <
        800
    ) {
      return;
    }

    lastTrackedOutgoingText =
      text;

    lastTrackedOutgoingAt =
      now;

    pendingBotResponses +=
      1;
  }


  if (chatRoot) {
    /*
     * Отправка кнопкой.
     */
    chatRoot.addEventListener(
      'click',

      event => {
        const sendButton =
          event.target.closest(
            '.chat-input-send-button'
          );

        if (!sendButton) {
          return;
        }

        if (
          sendButton.disabled ||
          sendButton.getAttribute(
            'aria-disabled'
          ) === 'true'
        ) {
          return;
        }

        registerOutgoingMessage();

        setTimeout(() => {
          const textarea =
            getChatTextarea();

          if (
            !textarea ||
            textarea.value !== ''
          ) {
            return;
          }

          textarea.style.height =
            'var(--chat--textarea--height)';
        }, 0);
      },

      true
    );


    /*
     * Отправка Enter.
     *
     * Shift+Enter остаётся переносом строки.
     * IME/composition не считаем отправкой.
     */
    chatRoot.addEventListener(
      'keydown',

      event => {
        if (
          event.key !== 'Enter' ||
          event.shiftKey ||
          event.isComposing
        ) {
          return;
        }

        registerOutgoingMessage();
      },

      true
    );
  }


  // =========================================================
  // Toolbar counter
  // =========================================================

  function refreshToolbarCounter() {
    if (
      window.OneiroToolbar &&
      typeof window
        .OneiroToolbar
        .refreshRequestsLeft ===
        'function'
    ) {
      window
        .OneiroToolbar
        .refreshRequestsLeft();
    } else {
      window.dispatchEvent(
        new CustomEvent(
          'oneiro:refresh-requests-left'
        )
      );
    }
  }


  const chatTarget =
    document.querySelector(
      '#n8n-chat'
    );

  if (chatTarget) {
    let refreshTimer = null;
    let lastBotMessageSignature = '';

    const observer =
      new MutationObserver(() => {
        const botMessages =
          chatTarget.querySelectorAll(
            [
              '.chat-message-from-bot',
              '.message-from-bot',
              '[data-from="bot"]',
              '[data-role="assistant"]',
              '.n8n-chat__message--bot',
              '.chat-message.bot',
            ].join(',')
          );

        if (!botMessages.length) {
          return;
        }

        const lastBotMessage =
          botMessages[
            botMessages.length - 1
          ];

        const text =
          (
            lastBotMessage
              .textContent || ''
          ).trim();

        if (!text) {
          return;
        }

        /*
         * Signature обновляем ВСЕГДА.
         *
         * Благодаря этому сообщения,
         * появившиеся при initial render
         * или восстановлении истории,
         * становятся baseline и не будут
         * приняты за ответ на следующее
         * пользовательское сообщение.
         */
        if (
          text ===
          lastBotMessageSignature
        ) {
          return;
        }

        lastBotMessageSignature =
          text;

        /*
         * Если пользователь ничего
         * не отправлял, это initial/history
         * bot message. Счётчик не обновляем.
         */
        if (
          pendingBotResponses <= 0
        ) {
          return;
        }

        /*
         * Один новый bot response
         * закрывает одно ожидаемое
         * пользовательское сообщение.
         */
        pendingBotResponses =
          Math.max(
            0,
            pendingBotResponses - 1
          );

        clearTimeout(
          refreshTimer
        );

        refreshTimer =
          setTimeout(() => {
            refreshToolbarCounter();
          }, 500);
      });

    observer.observe(
      chatTarget,
      {
        childList: true,
        subtree: true,
        characterData: true,
      }
    );
  }


  // =========================================================
  // Supabase auth changes
  // =========================================================

  sb.auth.onAuthStateChange(
    (
      event,
      newSession
    ) => {
      if (
        event === 'SIGNED_OUT' ||
        !newSession?.access_token
      ) {
        try {
          localStorage.removeItem(
            'n8n-chat/sessionId'
          );
        } catch (e) {}

        /*
         * На /chat logout больше не ведёт
         * на login.
         *
         * Перезагружаем страницу:
         * chat.js создаст новую anonymous
         * session.
         */
        window.location.reload();
        return;
      }

      if (
        newSession?.access_token &&
        window.OneiroUserContext
      ) {
        window
          .OneiroUserContext
          .accessToken =
            newSession.access_token;

        window
          .OneiroUserContext
          .isAnonymous =
            newSession
              .user
              ?.is_anonymous === true;

        window
          .OneiroUserContext
          .email =
            newSession
              .user
              ?.email ||
            window
              .OneiroUserContext
              .email ||
            '';

        window.dispatchEvent(
          new CustomEvent(
            'oneiro:user-context-ready',
            {
              detail:
                window
                  .OneiroUserContext,
            }
          )
        );
      }
    }
  );
})();