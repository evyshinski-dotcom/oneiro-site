<link rel="preconnect" href="https://cdn.jsdelivr.net"> <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> <style>
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

/* Сильно уменьшили всю белую плашку */
.oneiro-login-card{
  position:relative;
  width:min(650px, calc(100% - 340px));
  min-height:440px;
  margin-right:150px;
  background:#f7f7f8;
  border-radius:44px;
  box-shadow:0 10px 28px rgba(0,0,0,.28);
  padding:52px 210px 52px 52px; /* справа сильно меньше воздуха */
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
  justify-content:center; /* было flex-start */
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
}

.oneiro-login-button:hover{
  background:#29195c;
}

.oneiro-login-button:disabled{
  opacity:.72;
  cursor:default;
}

.oneiro-login-button{
  margin: 0 auto; /* гарантирует центр */
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
}

.oneiro-login-message.is-error,
.oneiro-login-message.is-success,
.oneiro-login-message.is-loading{
  color:#111111;
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

@media (max-width: 700px){
  .oneiro-login-page{
    padding:14px;
    align-items:flex-start;
  }
  
  .oneiro-login-legal{
    margin-top:5px;
    margin-bottom:10px; /* поднимает выше картинки */
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


</style> <div class="oneiro-login-page"> <div class="oneiro-login-shell"> <div class="oneiro-login-card"> <div class="oneiro-login-content"> <h1 class="oneiro-login-title">Онейро</h1> <p class="oneiro-login-subtitle">
          Введите email, чтобы получить ссылку для входа
        </p> <div class="oneiro-login-field"> <input
            id="oneiro-email"
            class="oneiro-login-input"
            type="email"
            inputmode="email"
            autocomplete="email"
            placeholder="Ваш email"
          /> </div> <div class="oneiro-login-button-row"> <button id="oneiro-button" class="oneiro-login-button" type="button">
            Получить ссылку
          </button> </div> <div id="oneiro-message" class="oneiro-login-message" aria-live="polite"></div> <div class="oneiro-login-legal">
  Регистрируясь в системе, вы соглашаетесь с условиями
  <a href="http://oneiro-mom.ru/privacy" target="_blank">политики конфиденциальности</a>
  и
  <a href="http://oneiro-mom.ru/user-terms" target="_blank">пользовательского соглашения</a>.
</div></div> </div> <div class="oneiro-login-illustration-wrap" aria-hidden="true"> <img
        class="oneiro-login-illustration"
        src="https://static.tildacdn.com/tild3166-3532-4335-a632-363961396337/MomAndBaby.png"
        alt=""
      /> </div> </div> </div> <script>
(function(){
  const sb = window.supabase.createClient(
    'https://ivagulin.dedyn.io/supabase',
    'sb_publishable_2EoT9T3U_4TOal3RJLzA5g_NTHekBX4',
    {
      auth:{ detectSessionInUrl:true }
    }
  );

  const next = new URLSearchParams(window.location.search).get('next') || '/chat';

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

  async function sendMagicLink(){
    const email = (emailInput && emailInput.value ? emailInput.value : '').trim();

    if(!email){
      showMessage('Введите email', 'error');
      return;
    }

    setLoadingState(true);
    showMessage('Отправляем письмо...', 'loading');

    try {
      const { error } = await sb.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin + '/login?next=' + encodeURIComponent(next)
        }
      });

      if (error) {
        showMessage('Не удалось отправить письмо', 'error');
        return;
      }

      showMessage('Письмо отправлено ✨ Проверьте почту', 'success');
    } catch (e) {
      showMessage('Не удалось отправить письмо', 'error');
    } finally {
      setLoadingState(false);
    }
  }

  async function checkSession(){
    const { data } = await sb.auth.getSession();
    if(data && data.session){
      window.location.replace(next);
    }
  }

  function setLoadingState(isLoading){
    if (!button) return;
    button.disabled = !!isLoading;
  }

  function showMessage(text, state){
    if (!message) return;
    message.innerText = text || '';
    message.classList.remove('is-error', 'is-success', 'is-loading');
    if (state) {
      message.classList.add('is-' + state);
    }
  }

  checkSession();
})();
</script>