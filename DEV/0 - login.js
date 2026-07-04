<link rel="preconnect" href="https://cdn.jsdelivr.net">

<style>
html, body{
  margin:0;
  padding:0;
  min-height:100%;
  background:#e9e9ec;
}

body{
  font-family:'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}

.oneiro-login-page,
.oneiro-login-page *,
.oneiro-login-page *::before,
.oneiro-login-page *::after{
  box-sizing:border-box;
  font-family:'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}

.oneiro-login-page{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px;
  background:#e9e9ec;
  overflow:hidden;
}

.oneiro-login-shell{
  position:relative;
  width:min(1040px, 100%);
  min-height:620px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.oneiro-login-card{
  position:relative;
  width:min(650px, calc(100% - 340px));
  min-height:440px;
  margin-right:150px;
  background:#f7f7f8;
  border-radius:44px;
  box-shadow:0 10px 28px rgba(0,0,0,.28);
  padding:52px 210px 52px 52px;
  display:flex;
  align-items:center;
}

.oneiro-login-content{
  width:100%;
  max-width:320px;
}

.oneiro-login-title{
  margin:0 0 28px;
  text-align:center;
  font-size:32px;
  line-height:1.2;
  font-weight:500;
  color:#111111;
}

.oneiro-login-subtitle{
  margin:0 0 40px;
  font-size:14px;
  line-height:1.45;
  font-weight:400;
  color:#444444;
}

.oneiro-login-field{
  margin-bottom:34px;
}

.oneiro-login-input{
  width:100%;
  height:44px;
  border:none;
  border-bottom:1px solid #444444;
  border-radius:0;
  outline:none;
  padding:0 0 8px;
  background:transparent;
  color:#111111;
  font-size:16px;
  line-height:1.4;
  font-weight:400;
  box-shadow:none;
  appearance:none;
}

.oneiro-login-input::placeholder{
  color:#2d2f45;
  opacity:1;
}

.oneiro-login-input:focus{
  border-bottom-color:#33206f;
}

.oneiro-login-button-row{
  display:flex;
  justify-content:center;
}

.oneiro-login-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:38px;
  padding:0 30px;
  min-width:250px;
  max-width:100%;
  border:none;
  border-radius:999px;
  background:#33206f;
  color:#ffffff;
  text-decoration:none;
  font-size:13px;
  line-height:1;
  font-weight:500;
  cursor:pointer;
  transition:background .18s ease, opacity .18s ease;
  -webkit-tap-highlight-color:transparent;
  margin:0 auto;
}

.oneiro-login-button:hover{
  background:#29195c;
}

.oneiro-login-button:disabled{
  opacity:.72;
  cursor:default;
}

.oneiro-login-message{
  width:100%;
  margin-top:16px;
  min-height:20px;
  font-size:13px;
  line-height:1.45;
  font-weight:400;
  color:#111111;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  gap:8px;
}

.oneiro-login-message.is-error,
.oneiro-login-message.is-success,
.oneiro-login-message.is-loading{
  color:#111111;
}

.oneiro-login-message.is-loading::before{
  content:"";
  width:14px;
  height:14px;
  border:2px solid rgba(17,17,17,.2);
  border-top-color:#33206f;
  border-radius:50%;
  animation:oneiro-spin .8s linear infinite;
  flex:0 0 auto;
}

@keyframes oneiro-spin{
  to{ transform:rotate(360deg); }
}

.oneiro-login-illustration-wrap{
  position:absolute;
  top:50%;
  right:0;
  width:520px;
  height:520px;
  transform:translateY(-50%);
  border-radius:50%;
  overflow:hidden;
  z-index:2;
  background:none !important;
  box-shadow:none !important;
  filter:none !important;
}

.oneiro-login-illustration{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  background:none !important;
}

@media (max-width: 1000px){
  .oneiro-login-shell{
    width:min(900px, 100%);
    min-height:unset;
  }

  .oneiro-login-card{
    width:100%;
    margin-right:0;
    min-height:unset;
    padding:40px 30px 300px;
  }

  .oneiro-login-content{
    max-width:none;
  }

  .oneiro-login-button{
    min-width:0;
    width:auto;
  }

  .oneiro-login-illustration-wrap{
    top:auto;
    right:50%;
    bottom:-72px;
    transform:translateX(50%);
    width:360px;
    height:360px;
  }
}

.oneiro-login-legal{
  margin-top:18px;
  font-size:11px;
  line-height:1.45;
  color:#8b8b94;
  text-align:center;
}

.oneiro-login-legal a{
  color:#8b8b94;
  text-decoration:underline;
}

.oneiro-login-legal a:hover{
  color:#5f5f69;
}

.oneiro-preloader{
  position:fixed;
  inset:0;
  z-index:99999;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#e9e9ec;
  transition:opacity .35s ease, visibility .35s ease;
}

.oneiro-preloader.is-hidden{
  opacity:0;
  visibility:hidden;
  pointer-events:none;
}

.oneiro-preloader-text{
  font-family:'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  font-size:18px;
  line-height:1.4;
  font-weight:500;
  color:#33206f;
  animation:oneiro-pulse 1.25s ease-in-out infinite;
}

@keyframes oneiro-pulse{
  0%, 100% { opacity:.35; transform:scale(.98); }
  50% { opacity:1; transform:scale(1); }
}

@media (max-width: 700px){
  .oneiro-login-page{
    padding:14px;
    align-items:flex-start;
  }

  .oneiro-login-legal{
    margin-top:5px;
    margin-bottom:10px;
  }

  .oneiro-login-shell{
    width:100%;
    padding:0;
  }

  .oneiro-login-card{
    border-radius:28px;
    padding:28px 22px 250px;
  }

  .oneiro-login-title{
    margin-bottom:22px;
    font-size:26px;
  }

  .oneiro-login-subtitle{
    margin-bottom:28px;
    font-size:13px;
  }

  .oneiro-login-field{
    margin-bottom:28px;
  }

  .oneiro-login-illustration-wrap{
    bottom:-52px;
    width:300px;
    height:300px;
  }
}
</style>

<div id="oneiro-preloader" class="oneiro-preloader">
  <div class="oneiro-preloader-text">Онейро загружается...</div>
</div>

<div class="oneiro-login-page">
  <div class="oneiro-login-shell">
    <div class="oneiro-login-card">
      <div class="oneiro-login-content">
        <h1 class="oneiro-login-title">Онейро</h1>
        <p class="oneiro-login-subtitle">
          Введите email, чтобы получить ссылку для входа
        </p>

        <div class="oneiro-login-field">
          <input
            id="oneiro-email"
            class="oneiro-login-input"
            type="email"
            name="email"
            inputmode="email"
            autocomplete="email"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            placeholder="Ваш email"
          />
        </div>

        <div class="oneiro-login-button-row">
          <button id="oneiro-button" class="oneiro-login-button" type="button">
            Получить ссылку
          </button>
        </div>

        <div id="oneiro-message" class="oneiro-login-message" aria-live="polite"></div>

        <div class="oneiro-login-legal">
          Регистрируясь в системе, вы соглашаетесь с условиями
          <a href="https://oneiro-mom.ru/privacy" target="_blank">политики конфиденциальности</a>
          и
          <a href="https://oneiro-mom.ru/user-terms" target="_blank">пользовательского соглашения</a>.
        </div>
      </div>
    </div>

    <div class="oneiro-login-illustration-wrap" aria-hidden="true">
      <img
        class="oneiro-login-illustration"
        src="https://static.tildacdn.com/tild3166-3532-4335-a632-363961396337/MomAndBaby.png"
        alt=""
      />
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
  const sb = window.supabase.createClient(
    'https://ivagulin.dedyn.io/supabase-dev',
    'sb_publishable_E9xJ0O9l3Frwog9qREIsXg_agRUx9oF',
    {
      auth: { detectSessionInUrl: true }
    }
  );

  const searchParams = new URLSearchParams(window.location.search);
  const next = searchParams.get('next') || '/dev-chat';
  const rawOneiroApp = (searchParams.get('oneiroapp') || '').trim().toLowerCase();
  const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';

  const emailInput = document.getElementById('oneiro-email');
  const button = document.getElementById('oneiro-button');
  const message = document.getElementById('oneiro-message');

  if (button) {
    button.addEventListener('click', sendMagicLink);
  }

  if (emailInput) {
    emailInput.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMagicLink();
      }
    });
  }

  function buildWebLoginUrl(){
    const params = new URLSearchParams();
    params.set('next', next);

    if (isOneiroApp) {
      params.set('oneiroapp', 'true');
    }

    return window.location.origin + window.location.pathname + '?' + params.toString();
  }

  function buildEmailRedirectTo(){
    const webLoginUrl = buildWebLoginUrl();

    if (isOneiroApp) {
      return 'oneiroapp://open?url=' + encodeURIComponent(webLoginUrl);
    }

    return webLoginUrl;
  }
  
function getEmailProviderUrl(email){
  const domain = (email.split('@')[1] || '').trim().toLowerCase();

  const providers = {
    'mail.ru': 'https://e.mail.ru/inbox/',
    'list.ru': 'https://e.mail.ru/inbox/',
    'bk.ru': 'https://e.mail.ru/inbox/',

    'gmail.com': 'https://mail.google.com/mail/u/0/#inbox',

    'yandex.ru': 'https://mail.yandex.ru/',
    'ya.ru': 'https://mail.yandex.ru/',

    'icloud.com': 'https://www.icloud.com/mail/'
  };

  const webMailUrl = providers[domain];

  // Для приложения всегда отдаем ссылку
  if (isOneiroApp) {
    return 'mailapp:' + (webMailUrl || '');
  }

  // Для браузера только для известных провайдеров
  return webMailUrl || null;
}

function showSuccessMessage(email){
  const mailUrl = getEmailProviderUrl(email);

  if (!mailUrl) {
    showMessage('Письмо отправлено ✨ Проверьте почту', 'success');
    return;
  }

  showHtmlMessage(
  'Письмо отправлено ✨ <a class="oneiro-login-mail-link" href="' + mailUrl + '">Открыть почту</a>',
  'success'
);
}

function showHtmlMessage(html, state){
  if (!message) return;
  message.innerHTML = html || '';
  message.classList.remove('is-error', 'is-success', 'is-loading');
  if (state) {
    message.classList.add('is-' + state);
  }
}

  async function sendMagicLink(){
    const email = (emailInput && emailInput.value ? emailInput.value : '').trim();

    if(!email){
      showMessage('Введите email', 'error');
      return;
    }

    if (emailInput && !emailInput.checkValidity()) {
      showMessage('Введите корректный email', 'error');
      return;
    }

    setLoadingState(true);
    showMessage('Отправляем письмо...', 'loading');

    try {
      const { error } = await sb.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: buildEmailRedirectTo()
        }
      });

      if (error) {
        showMessage('Не удалось отправить письмо', 'error');
        return;
      }

      showSuccessMessage(email);
    } catch (e) {
      showMessage('Не удалось отправить письмо', 'error');
    } finally {
      setLoadingState(false);
    }
  }

  async function checkSession(){
    const { data } = await sb.auth.getSession();
    if (data && data.session) {
      window.location.replace(next);
    }
  }

  function setLoadingState(isLoading){
    if (button) {
      button.disabled = !!isLoading;
    }

    if (emailInput) {
      emailInput.disabled = !!isLoading;
    }
  }

  function showMessage(text, state){
    if (!message) return;
    message.textContent = text || '';
    message.classList.remove('is-error', 'is-success', 'is-loading');
    if (state) {
      message.classList.add('is-' + state);
    }
  }

  checkSession();
  
  function hidePreloader(){
  const preloader = document.getElementById('oneiro-preloader');
  if (preloader) {
    preloader.classList.add('is-hidden');
    setTimeout(function(){
      preloader.remove();
    }, 500);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hidePreloader);
} else {
  hidePreloader();
}
})();
</script>
