(function () {
  const config = window.ONEIRO_CONFIG;

  if (!config) {
    console.error('ONEIRO_CONFIG is not loaded');
    return;
  }

  const USER_INFO_URL = config.n8n.getUserInfo;


  function applyConfiguredLinks() {
    const profileLink = document.querySelector(
      '.oneiro-toolbar-item[aria-label="Профиль"]'
    );
    const timecalcLink = document.querySelector(
      '.oneiro-toolbar-item[aria-label="Калькулятор времени"]'
    );

    if (profileLink) {
      profileLink.setAttribute('href', config.popups.profile);
    }

    if (timecalcLink) {
      timecalcLink.setAttribute('href', config.popups.timecalc);
    }
  }

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
  const checkout = new URL(config.routes.checkout, window.location.origin);

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
    
    if (currentContext?.ssaid) {
  url.searchParams.set('ssaid', currentContext.ssaid);
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
            ssaid: String(currentContext.ssaid || ''),
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
      applyConfiguredLinks();
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
    applyConfiguredLinks();
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
