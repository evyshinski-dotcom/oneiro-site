<style>
  html.oneiro-auth-pending body { opacity: 0; }
</style>

<script>
  document.documentElement.classList.add('oneiro-auth-pending');
</script>

<script>
(function () {
  const SUPABASE_URL = "https://ivagulin.dedyn.io/supabase";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2EoT9T3U_4TOal3RJLzA5g_NTHekBX4";

  const searchParams = new URLSearchParams(window.location.search);
  const rawOneiroApp = (searchParams.get('oneiroapp') || '').trim().toLowerCase();
  const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';

  function buildCurrentNext() {
    return window.location.pathname + window.location.search;
  }

  function buildLoginUrl() {
    const params = new URLSearchParams();
    params.set('next', buildCurrentNext());

    if (isOneiroApp) {
      params.set('oneiroapp', 'true');
    }

    return "/login?" + params.toString();
  }

  function showPage() {
    document.documentElement.classList.remove('oneiro-auth-pending');
  }

  function redirectToLogin() {
    window.location.replace(buildLoginUrl());
  }

  function loadSupabaseJs(cb) {
    if (window.supabase && window.supabase.createClient) return cb();

    const s = document.createElement('script');
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.async = true;
    s.onload = cb;
    s.onerror = redirectToLogin;
    document.head.appendChild(s);
  }

  loadSupabaseJs(async () => {
    try {
      const sb = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
          auth: {
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true
          }
        }
      );

      const { data, error } = await sb.auth.getSession();
      if (error || !data || !data.session) return redirectToLogin();

      showPage();
    } catch (e) {
      redirectToLogin();
    }
  });
})();
</script>