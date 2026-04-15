<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.11.0/dist/chat.bundle.es.js';
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

  (async function () {
    const SUPABASE_URL = 'https://mvhojfybibxppyrdgzzc.supabase.co';
    const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_E9xJ0O9l3Frwog9qREIsXg_agRUx9oF';
    const WEBHOOK_URL = 'https://ivagulin.dedyn.io/webhook/57607eb8-5004-4dec-ae86-4972c652b50f/chat';

    const sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    });

    const searchParams = new URLSearchParams(window.location.search);
    const rawOneiroApp = (searchParams.get('oneiroapp') || '').trim().toLowerCase();
    const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';

    const next = '/dev-chat';

    function buildLoginUrl() {
      const params = new URLSearchParams();
      params.set('next', next);

      if (isOneiroApp) {
        params.set('oneiroapp', 'true');
      }

      return '/dev-login?' + params.toString();
    }

    function goToLogin() {
      window.location.replace(buildLoginUrl());
    }

    function fail(message, error) {
      console.error(message, error || '');
      const target = document.querySelector('#n8n-chat');
      if (target) {
        target.innerHTML =
          '<div style="padding:16px;font-family:inherit;">Не удалось загрузить чат. Пожалуйста, обновите страницу.</div>';
      }
    }

    async function getValidSession() {
      let { data, error } = await sb.auth.getSession();
      let session = data?.session || null;

      if (error || !session?.access_token) {
        return null;
      }

      const expiresAt = session.expires_at || 0;
      const now = Math.floor(Date.now() / 1000);
      const willExpireSoon = expiresAt && (expiresAt - now < 60);

      if (willExpireSoon) {
        const refreshed = await sb.auth.refreshSession();
        session = refreshed.data?.session || null;
      }

      return session;
    }

    const session = await getValidSession();
    if (!session) {
      goToLogin();
      return;
    }

    const authUserId = session.user?.id || '';
    const email = session.user?.email || '';
    const accessToken = session.access_token;

    if (!authUserId) {
      goToLogin();
      return;
    }

    const { data: sleepUser, error: sleepUserError } = await sb
      .from('sleep_users')
      .select('id, tg_userid, email, "limit"')
      .eq('auth_user_id', authUserId)
      .maybeSingle();

    if (sleepUserError) {
      fail('Ошибка чтения sleep_users', sleepUserError);
      return;
    }

    if (!sleepUser) {
      fail('Для auth-пользователя не найдена строка в sleep_users');
      return;
    }

    const pid = parseInt(
      document.querySelector('#allrecords')?.dataset?.tildaProjectId || '0',
      10
    );

    const stableSessionId = String(sleepUser.tg_userid);

    try {
      localStorage.setItem('n8n-chat/sessionId', stableSessionId);
    } catch (e) {
      console.warn('Не удалось записать sessionId', e);
    }

    const oneiroUserContext = {
      accessToken,
      authUserId,
      sleepUserId: sleepUser.id,
      tgUserId: String(sleepUser.tg_userid || ''),
      email: sleepUser.email || email || '',
      limit: sleepUser.limit ?? null,
      projectId: pid,
      oneiroapp: isOneiroApp,
    };

    window.OneiroUserContext = oneiroUserContext;

    window.dispatchEvent(
      new CustomEvent('oneiro:user-context-ready', {
        detail: oneiroUserContext,
      })
    );

    createChat({
      webhookUrl: WEBHOOK_URL,
      webhookConfig: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      target: '#n8n-chat',
      mode: 'fullscreen',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {
        projectId: pid,
        auth_user_id: authUserId,
        sleep_user_id: sleepUser.id,
        tg_userid: sleepUser.tg_userid,
        email: sleepUser.email || email,
        limit: sleepUser.limit,
        token: accessToken,
        oneiroapp: isOneiroApp,
      },
      showWelcomeScreen: false,
      allowFileUploads: false,
      defaultLanguage: 'ru',
      i18n: {
        ru: {
          title: '',
          subtitle: '',
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Напишите ваш вопрос здесь',
        },
      },
      initialMessages: [
        'Привет! Я — Oneiro, ваш консультант по сну.',
        'Расскажите, пожалуйста, немного о ребёнке (или детях): имя, дата рождения, пол. Например: «Маша, дата рождения - 02.02.2025, девочка». Это поможет сделать мои ответы более точными и персональными 💜',
      ],
      enableStreaming: false,
    });

    function refreshToolbarCounter() {
      if (
        window.OneiroToolbar &&
        typeof window.OneiroToolbar.refreshRequestsLeft === 'function'
      ) {
        window.OneiroToolbar.refreshRequestsLeft();
      } else {
        window.dispatchEvent(new CustomEvent('oneiro:refresh-requests-left'));
      }
    }

    setTimeout(refreshToolbarCounter, 250);

    const chatTarget = document.querySelector('#n8n-chat');

    if (chatTarget) {
      let refreshTimer = null;
      let lastBotMessageSignature = '';

      const observer = new MutationObserver(() => {
        const botMessages = chatTarget.querySelectorAll(
          [
            '.chat-message-from-bot',
            '.message-from-bot',
            '[data-from="bot"]',
            '[data-role="assistant"]',
            '.n8n-chat__message--bot',
            '.chat-message.bot'
          ].join(',')
        );

        if (!botMessages.length) return;

        const lastBotMessage = botMessages[botMessages.length - 1];
        const text = (lastBotMessage.textContent || '').trim();

        if (!text) return;
        if (text === lastBotMessageSignature) return;

        lastBotMessageSignature = text;

        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
          refreshToolbarCounter();
        }, 500);
      });

      observer.observe(chatTarget, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    sb.auth.onAuthStateChange((event, newSession) => {
      if (event === 'SIGNED_OUT' || !newSession?.access_token) {
        try {
          localStorage.removeItem('n8n-chat/sessionId');
        } catch (e) {}

        goToLogin();
        return;
      }

      if (newSession?.access_token && window.OneiroUserContext) {
        window.OneiroUserContext.accessToken = newSession.access_token;

        window.dispatchEvent(
          new CustomEvent('oneiro:user-context-ready', {
            detail: window.OneiroUserContext,
          })
        );
      }
    });
  })();
</script>