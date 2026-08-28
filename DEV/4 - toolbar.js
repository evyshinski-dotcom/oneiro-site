<style>
:root {
  --oneiro-bottombar-h: 92px;
  --oneiro-chat-maxw: 900px;
}

/* контейнер тулбара */
#oneiro-bottom-toolbar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;

  width: min(calc(100% - 40px), var(--oneiro-chat-maxw));
  min-height: 56px;

  background: #ffffff;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgba(21, 18, 38, 0.16);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 30000;
  box-sizing: border-box;
  overflow: hidden;
}

/* внутренняя раскладка */
.oneiro-toolbar-inner {
  width: 100%;
  min-height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 8px 14px;
  box-sizing: border-box;

  font-family: 'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}

/* общий стиль кнопок */
.oneiro-toolbar-item,
.oneiro-toolbar-item:link,
.oneiro-toolbar-item:visited {
  width: auto;
  min-height: 40px;
  padding: 8px 12px;
  border-radius: 999px;
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  flex: 0 0 auto;

  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #000 !important;
  text-decoration: none !important;
  white-space: nowrap;

  background: #f6f7fb;
  border: none;
  cursor: pointer;
  transition: background .15s ease, opacity .15s ease;
}

.oneiro-toolbar-item:hover {
  background: #eef1f8;
}

/* счетчик */
.oneiro-toolbar-counter {
  width: auto;
  min-height: 40px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  flex: 0 0 auto;
  box-sizing: border-box;
}

.oneiro-toolbar-counter-label {
  font-size: 13px;
  line-height: 1.02;
  font-weight: 400;
  color: #000;
  white-space: normal;
  text-align: left;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 auto;
}

.oneiro-toolbar-counter-badge {
  min-height: 40px;
  padding: 8px 10px 8px 12px;
  border-radius: 999px;
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  background: #f6f7fb;
  border: none;
  flex: 0 0 auto;
}

.oneiro-toolbar-counter-value {
  min-width: 12px;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: #000;
  text-align: center;
}

.oneiro-toolbar-counter-value.is-loading {
  opacity: .55;
}

.oneiro-toolbar-counter-value.is-error {
  color: #b42318;
}

/* маленький плюс */
.oneiro-toolbar-counter-plus {
  appearance: none;
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  border-radius: 50%;
  border: 1px solid #000;
  background: #ffffff;
  color: #000;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  line-height: 1;
  font-weight: 400;

  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  transition: background .15s ease, opacity .15s ease;
}

.oneiro-toolbar-counter-plus:hover {
  background: #eef1f8;
}

/* иконки */
.oneiro-toolbar-icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.oneiro-toolbar-icon svg {
  width: 30px;
  height: 30px;
  stroke: #000;
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.oneiro-toolbar-icon--calc svg {
  width: 30px;
  height: 30px;
  stroke-width: 1;
}

/* подписи кнопок */
.oneiro-toolbar-text {
  display: inline;
}

/* индивидуальная ширина кнопок */
.oneiro-toolbar-item[aria-label="Профиль"] {
  padding-left: 10px;
  padding-right: 10px;
}

.oneiro-toolbar-item[aria-label="Калькулятор времени"] {
  padding-left: 16px;
  padding-right: 16px;
}

/* адаптив */
@media (max-width: 640px) {
  #oneiro-bottom-toolbar {
    width: min(calc(100% - 20px), var(--oneiro-chat-maxw));
  }

  .oneiro-toolbar-inner {
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 10px;
    box-sizing: border-box;
  }

  .oneiro-toolbar-item,
  .oneiro-toolbar-item:link,
  .oneiro-toolbar-item:visited {
    min-height: 38px;
    padding: 8px;
    font-size: 12px;
    gap: 0;
  }

  .oneiro-toolbar-counter {
    gap: 8px;
  }

  .oneiro-toolbar-counter-label {
    font-size: 12px;
    line-height: 1.02;
  }

  .oneiro-toolbar-counter-badge {
    min-height: 38px;
    padding: 8px 8px 8px 10px;
    gap: 6px;
  }

  .oneiro-toolbar-counter-value {
    font-size: 12px;
  }

  .oneiro-toolbar-counter-plus {
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    font-size: 15px;
  }

  .oneiro-toolbar-text {
    display: none;
  }

  .oneiro-toolbar-item[aria-label="Профиль"],
  .oneiro-toolbar-item[aria-label="Калькулятор времени"] {
    width: 38px;
    min-width: 38px;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

<div id="oneiro-bottom-toolbar">
  <div class="oneiro-toolbar-inner">

    <div class="oneiro-toolbar-counter" aria-label="Доступно запросов">
      <span class="oneiro-toolbar-counter-label">
        <span>Осталось</span>
        <span>запросов</span>
      </span>

      <span class="oneiro-toolbar-counter-badge">
        <span class="oneiro-toolbar-counter-value" id="oneiro-requests-left">—</span>

        <button
          class="oneiro-toolbar-counter-plus"
          id="oneiro-toolbar-plus"
          type="button"
          aria-label="Увеличить лимит"
        >
          +
        </button>
      </span>
    </div>
    
        <a class="oneiro-toolbar-item" href="#popup:profile" aria-label="Профиль">
      <span class="oneiro-toolbar-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.2"></circle>
          <path d="M5.5 18c1.6-3.2 11.4-3.2 13 0"></path>
        </svg>
      </span>
      <span class="oneiro-toolbar-text">Профиль</span>
    </a>

    <a class="oneiro-toolbar-item" href="#popup:timecalc" aria-label="Калькулятор времени">
      <span class="oneiro-toolbar-icon oneiro-toolbar-icon--calc">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5"></rect>
          <path d="M12 3.5v17"></path>
          <path d="M3.5 12h17"></path>
          <path d="M8 6.5v3"></path>
          <path d="M6.5 8h3"></path>
          <path d="M14.5 8h3"></path>
          <path d="M6.8 14.8l2.4 2.4"></path>
          <path d="M9.2 14.8l-2.4 2.4"></path>
          <path d="M14.5 16h3"></path>
          <circle cx="16" cy="14.2" r="0.7" fill="currentColor" stroke="none"></circle>
          <circle cx="16" cy="17.8" r="0.7" fill="currentColor" stroke="none"></circle>
        </svg>
      </span>
      <span class="oneiro-toolbar-text">Калькулятор времени</span>
    </a>

  </div>
</div>

<script>
(function () {
  const USER_INFO_URL = 'https://ivagulin.dedyn.io/webhook/dev/oneiro/getUserInfo';

  let currentContext = window.OneiroUserContext || null;
  let inFlightPromise = null;
  let lastLoadedValue = null;

  function updateToolbarHeight() {
    const toolbar = document.getElementById('oneiro-bottom-toolbar');
    if (!toolbar) return;

    const bottomGap = 12;
    const shadowGap = 12;
    const h = Math.round(toolbar.getBoundingClientRect().height) + bottomGap + shadowGap;

    document.documentElement.style.setProperty('--oneiro-bottombar-h', h + 'px');
  }

  function getCounterEl() {
    return document.getElementById('oneiro-requests-left');
  }

  function setCounterValue(value, opts = {}) {
    const el = getCounterEl();
    if (!el) return;

    el.classList.remove('is-loading', 'is-error');

    if (opts.loading) {
      el.classList.add('is-loading');
    }

    if (opts.error) {
      el.classList.add('is-error');
    }

    el.textContent = value;
  }

  function getByPath(obj, path) {
    try {
      return path.split('.').reduce((acc, key) => {
        if (acc == null) return undefined;
        return acc[key];
      }, obj);
    } catch (e) {
      return undefined;
    }
  }

  function extractRequestsLeft(payload) {
    const root = Array.isArray(payload) ? payload[0] : payload;
    if (!root || typeof root !== 'object') return null;

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

    for (const path of candidatePaths) {
      const value = getByPath(root, path);

      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }

      if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
        return Number(value);
      }
    }

    return null;
  }
  
  function buildCheckoutUrl() {
  const current = new URL(window.location.href);
  const checkout = new URL('/dev-checkout', window.location.origin);

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

  for (const key of keysToKeep) {
    const value = current.searchParams.get(key);
    if (value) {
      checkout.searchParams.set(key, value);
    }
  }

  return checkout.pathname + checkout.search;
}

  function buildRequestUrl() {
    const url = new URL(USER_INFO_URL);

    if (currentContext?.tgUserId) {
      url.searchParams.set('tg_userid', currentContext.tgUserId);
    }

    if (currentContext?.authUserId) {
      url.searchParams.set('auth_user_id', currentContext.authUserId);
    }

    if (currentContext?.sleepUserId) {
      url.searchParams.set('sleep_user_id', currentContext.sleepUserId);
    }

    return url.toString();
  }

  async function refreshRequestsLeft(force = false) {
    if (!currentContext?.accessToken) {
      if (lastLoadedValue != null) {
        setCounterValue(String(lastLoadedValue));
      } else if (typeof currentContext?.limit === 'number') {
        setCounterValue(String(currentContext.limit));
      } else {
        setCounterValue('—');
      }
      return null;
    }

    if (inFlightPromise && !force) {
      return inFlightPromise;
    }

    setCounterValue(lastLoadedValue != null ? String(lastLoadedValue) : '…', { loading: true });

    inFlightPromise = (async () => {
      try {
        const response = await fetch(buildRequestUrl(), {
          method: 'GET',
          headers: {
            token: currentContext.accessToken,
            tg_userid: String(currentContext.tgUserId || ''),
            Accept: 'application/json',
          },
          credentials: 'omit',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        const payload = await response.json();
        const nextValue = extractRequestsLeft(payload);

        if (nextValue == null) {
          throw new Error('Не найдено поле с остатком запросов в ответе webhook');
        }

        lastLoadedValue = nextValue;
        setCounterValue(String(nextValue));
        return nextValue;
      } catch (error) {
        console.error('Не удалось обновить остаток запросов', error);

        if (lastLoadedValue != null) {
          setCounterValue(String(lastLoadedValue));
        } else if (typeof currentContext?.limit === 'number') {
          setCounterValue(String(currentContext.limit));
        } else {
          setCounterValue('—', { error: true });
        }

        return null;
      } finally {
        inFlightPromise = null;
      }
    })();

    return inFlightPromise;
  }

  window.OneiroToolbar = {
    setRequestsLeft(value) {
      if (value == null || value === '') return;
      lastLoadedValue = value;
      setCounterValue(String(value));
    },
    setUserContext(ctx) {
      if (!ctx || typeof ctx !== 'object') return;
      currentContext = ctx;
    },
    refreshRequestsLeft,
  };

  window.addEventListener('oneiro:user-context-ready', function (event) {
    if (event?.detail) {
      currentContext = event.detail;

      if (typeof currentContext.limit === 'number' && lastLoadedValue == null) {
        lastLoadedValue = currentContext.limit;
        setCounterValue(String(currentContext.limit));
      }

      refreshRequestsLeft(true);
    }
  });

  window.addEventListener('oneiro:refresh-requests-left', function () {
    refreshRequestsLeft(true);
  });

const plusBtn = document.getElementById('oneiro-toolbar-plus');
if (plusBtn) {
  plusBtn.addEventListener('click', function () {
    window.location.href = buildCheckoutUrl();
  });
}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateToolbarHeight();
      if (window.OneiroUserContext) {
        currentContext = window.OneiroUserContext;
        if (typeof currentContext.limit === 'number') {
          lastLoadedValue = currentContext.limit;
          setCounterValue(String(currentContext.limit));
        }
        refreshRequestsLeft(true);
      }
    });
  } else {
    updateToolbarHeight();
    if (window.OneiroUserContext) {
      currentContext = window.OneiroUserContext;
      if (typeof currentContext.limit === 'number') {
        lastLoadedValue = currentContext.limit;
        setCounterValue(String(currentContext.limit));
      }
      refreshRequestsLeft(true);
    }
  }

  window.addEventListener('load', updateToolbarHeight);
  window.addEventListener('resize', updateToolbarHeight);
})();
</script>