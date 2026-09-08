(function () {
	  const config = window.ONEIRO_CONFIG;

	  if (!config) {
		console.error('ONEIRO_CONFIG is not loaded');
		return;
	  }

	  const PROFILE_WEBHOOK_URL = config.n8n.getUserInfo;
	  const UPDATE_CHILDREN_WEBHOOK_URL = config.n8n.updateBabyInfo;
	  const CANCEL_AUTORENEW_WEBHOOK_URL = config.n8n.cancelAutorenew;
	  const ACTIVATE_CERTIFICATE_WEBHOOK_URL = config.n8n.activateCertificate;
	  const SAVE_TIMEOUT_MS = 30000;
	  const LOGIN_PAGE_PATH = config.routes.login;
	  const CHILDREN_SAVE_GENERIC_ERROR = 'К сожалению, в настоящий момент не удается обновить информацию о ваших малышах. Попробуйте еще раз позже';
	  const CANCEL_AUTORENEW_SUCCESS_MESSAGE = 'Автопродление подписки остановлено, новые списания производиться не будут. Доступ к Oneiro сохранится до конца текущего оплаченного периода.';
	  const ACTIVATE_CERTIFICATE_SUCCESS_MESSAGE = 'Сертификат активирован. Подписка обновлена 💜';

	  const ROOT_ID = 'oneiro-profile-popup';
	  const STYLE_ID = 'oneiro-profile-popup-style';

	  const state = {
		loading: false,
		loadedOnce: false,
		editingChildren: false,
		savingChildren: false,
		loggingOut: false,
		cancelingAutorenew: false,
		activatingCertificate: false,
		sessionData: null,
		currentProfile: null,
		lastRenderedChildrenText: '',
		resizeObserver: null,
	  };

	  const mountNode =
		(document.currentScript && document.currentScript.parentElement) ||
		document.body;

injectStyles();
renderMarkup();
init();


	  function injectStyles() {
		if (document.getElementById(STYLE_ID)) return;

		const style = document.createElement('style');
		style.id = STYLE_ID;
		style.textContent = `
		  #${ROOT_ID}{
			--oneiro-popup-height: 100vh;
			width:100%;
			height:var(--oneiro-popup-height);
			min-height:var(--oneiro-popup-height);
			overflow-y:auto;
			overflow-x:hidden;
			-webkit-overflow-scrolling:touch;
			scrollbar-width:thin;
			font-family:'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
			color:#111111;
			background:#f4f4f6;
			box-sizing:border-box;
		  }

		  #${ROOT_ID}::-webkit-scrollbar{
			width:6px;
		  }

		  #${ROOT_ID}::-webkit-scrollbar-thumb{
			background:#d7dbe7;
			border-radius:999px;
		  }

		  #${ROOT_ID},
		  #${ROOT_ID} *,
		  #${ROOT_ID} *::before,
		  #${ROOT_ID} *::after{
			font-family:'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
			box-sizing:border-box;
		  }

		  #${ROOT_ID} .op-wrap{
			width:100%;
			max-width:480px;
			min-height:100%;
			margin:0 auto;
			padding:12px 10px 14px;
			background:#f4f4f6;
		  }

		  #${ROOT_ID} .op-card{
			background:#fbfbfc;
			border-radius:20px;
			padding:14px 18px;
			margin-bottom:12px;
		  }

		  #${ROOT_ID} .op-card:last-child{
			margin-bottom:0;
		  }

		  #${ROOT_ID} .op-section-title,
		  #${ROOT_ID} .op-children-title{
			font-size:16px;
			font-weight:500;
			margin-bottom:12px;
		  }

		  #${ROOT_ID} .op-children-title{
			margin-bottom:12px;
		  }

		  #${ROOT_ID} .op-status-row{
			display:flex;
			align-items:center;
			gap:8px;
			font-size:16px;
			font-weight:500;
			margin-bottom:12px;
		  }

		  #${ROOT_ID} .op-dot{
			width:10px;
			height:10px;
			border-radius:50%;
			background:#09b34d;
			flex:0 0 auto;
		  }

		  #${ROOT_ID} .op-dot.is-inactive{
			background:#b8bcc7;
		  }

		  #${ROOT_ID} .op-info{
			margin-left:18px;
		  }

		  #${ROOT_ID} .op-info.op-info-plain{
			margin-left:0;
		  }

		  #${ROOT_ID} .op-line{
			font-size:14px;
			line-height:1.4;
			padding:0 0 7px;
			margin:0 0 7px;
			border-bottom:1px solid #e3e6f0;
			word-break:break-word;
		  }

		  #${ROOT_ID} .op-line:last-child{
			border-bottom:none;
			margin-bottom:0;
			padding-bottom:0;
		  }

		  #${ROOT_ID} .op-bottom{
			margin-top:12px;
			display:flex;
			justify-content:flex-end;
			align-items:center;
			gap:12px;
		  }

		  #${ROOT_ID} .op-action-btn{
			display:inline-flex;
			align-items:center;
			justify-content:center;
			gap:8px;
			min-height:36px;
			padding:0 14px;
			border-radius:999px;
			background:#f3f5fb;
			color:#2d2f45;
			text-decoration:none;
			font-size:13px;
			font-weight:500;
			width:max-content;
			max-width:100%;
			border:none;
			cursor:pointer;
			transition:background .18s ease, opacity .18s ease;
			white-space:nowrap;
		  }

		  #${ROOT_ID} .op-action-btn:hover{
			background:#e9edf8;
		  }

		  #${ROOT_ID} .op-action-btn:disabled{
			opacity:.55;
			cursor:default;
		  }

		  #${ROOT_ID} .op-btn-icon{
			display:inline-flex;
			align-items:center;
			justify-content:center;
			width:16px;
			height:16px;
			flex:0 0 auto;
		  }

		  #${ROOT_ID} .op-btn-icon svg{
			display:block;
			width:16px;
			height:16px;
			stroke:currentColor;
		  }

		  #${ROOT_ID} .op-buy-star{
			font-size:14px;
			line-height:1;
		  }

		  #${ROOT_ID} .op-sub-actions{
			flex-direction:column;
			align-items:flex-end;
		  }

		  #${ROOT_ID} .op-sub-body{
			display:grid;
			grid-template-columns:minmax(0, 1fr) 208px;
			gap:18px;
			align-items:start;
		  }

		  #${ROOT_ID} .op-info-sub{
			margin-left:18px;
		  }

		  #${ROOT_ID} .op-sub-actions .op-action-btn{
			width:208px;
		  }

		  

		  #${ROOT_ID} .op-sub-actions #op-buy-btn{
			background:#2A195B;
			color:#fff;
		  }

		  #${ROOT_ID} .op-sub-actions #op-buy-btn:hover{
			background:#382678;
		  }

		  #${ROOT_ID} .op-sub-actions #op-activate-cert-btn{
			background:#f3f5fb;
			color:#2d2f45;
			border:1px solid rgba(42,25,91,.06);
		  }

		  #${ROOT_ID} .op-certificate-form{
			width:300px;
			max-width:100%;
			margin:10px 0 0 auto;
			padding:0;
			background:transparent;
			border:none;
		  }

		  

		  #${ROOT_ID} .op-certificate-label{
			margin:0 0 6px;
			font-size:12px;
			line-height:1.35;
			color:#7a8197;
		  }

		  #${ROOT_ID} .op-certificate-field{
			width:100%;
			height:38px;
			padding:0 13px;
			border-radius:14px;
			border:1px solid #d9deeb;
			background:#fff;
			color:#111;
			font-size:14px;
			outline:none;
		  }

		  #${ROOT_ID} .op-certificate-field:focus{
			border-color:#bfc8e3;
			box-shadow:0 0 0 3px rgba(191,200,227,.18);
		  }

		  #${ROOT_ID} .op-certificate-actions{
			margin-top:10px;
			display:flex;
			justify-content:flex-end;
		  }

		  #${ROOT_ID} .op-certificate-actions .op-action-btn{
			width:172px;
		  }

		  #${ROOT_ID} .op-certificate-note{
			margin-top:10px;
			font-size:12px;
			line-height:1.45;
			color:#7a8197;
		  }

		  #${ROOT_ID} .op-certificate-note.is-error{
			color:#b24c63;
		  }

		  #${ROOT_ID} .op-certificate-note.is-success{
			color:#281561;
		  }

		  #${ROOT_ID} .op-child{
			font-size:14px;
			line-height:1.45;
			margin-bottom:8px;
			color:#2d2f45;
			word-break:break-word;
		  }

		  #${ROOT_ID} .op-child:last-child{
			margin-bottom:0;
		  }

		  #${ROOT_ID} .op-loading,
		  #${ROOT_ID} .op-error,
		  #${ROOT_ID} .op-empty{
			font-size:13px;
			line-height:1.5;
			color:#666c80;
		  }

		  #${ROOT_ID} .op-empty{
			background:#f7f8fc;
			border:1px solid #e1e6f2;
			border-radius:14px;
			padding:12px 14px;
		  }

		  #${ROOT_ID} .op-hidden{
			display:none !important;
		  }

		  #${ROOT_ID} .op-children-list{
			position:relative;
			min-height:24px;
			overflow-wrap:anywhere;
		  }

		  #${ROOT_ID} .op-children-list.is-editing{
			background:#f7f8fc;
			border:1px solid #d9deeb;
			border-radius:14px;
			padding:12px 14px;
			outline:none;
			cursor:text;
			white-space:pre-wrap;
		  }

		  #${ROOT_ID} .op-children-list.is-editing:focus{
			border-color:#bfc8e3;
			box-shadow:0 0 0 3px rgba(191,200,227,.18);
		  }

		  #${ROOT_ID} .op-children-list.is-saving{
			opacity:.72;
		  }

		  #${ROOT_ID} .op-inline-note{
			margin-top:10px;
			font-size:12px;
			line-height:1.45;
			color:#7a8197;
		  }

		  #${ROOT_ID} .op-inline-note.is-error{
			color:#b24c63;
		  }

		  #${ROOT_ID} .op-inline-note.is-success{
	  color:#281561;
	}

		  #${ROOT_ID} .op-inline-hint{
			margin-top:10px;
			padding:10px 12px;
			background:#f7f3ff;
			border:1px solid #e7dcff;
			border-radius:14px;
			font-size:12px;
			line-height:1.45;
			color:#6d5c97;
		  }

		  #${ROOT_ID} .op-inline-hint b{
			font-weight:600;
		  }

		  #${ROOT_ID} .op-global-note{
			margin:0 0 12px;
			padding:12px 14px;
			border-radius:14px;
			font-size:13px;
			line-height:1.45;
			background:#fff3f5;
			color:#b24c63;
			border:1px solid #f0c8d2;
		  }
		  
		  #${ROOT_ID} .op-global-note.is-success{
	  background:#f4f0ff;
	  color:#281561;
	  border-color:#e4dafc;
	}

		  #${ROOT_ID} .op-tg-status-row,
		  #${ROOT_ID} .op-inline-row{
			display:flex;
			align-items:center;
			justify-content:flex-start;
			gap:8px;
			flex-wrap:wrap;
		  }

		  #${ROOT_ID} .op-tg-status-text,
		  #${ROOT_ID} .op-inline-row-text{
			min-width:0;
			flex:0 1 auto;
		  }

#${ROOT_ID} .op-tg-link-btn{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:0;
  background:transparent;
  color:#7f869b;
  text-decoration:none;
  font-size:13px;
  font-weight:500;
  border:none;
  white-space:nowrap;
  transition:opacity .18s ease, color .18s ease;
  flex:0 0 auto;
}

#${ROOT_ID} .op-tg-link-btn:hover{
  color:#2d2f45;
  opacity:.9;
}

#${ROOT_ID} .op-tg-link-arrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:10px;
  height:10px;
  flex:0 0 auto;
  color:currentColor;
}

#${ROOT_ID} .op-tg-link-arrow svg{
  display:block;
  width:10px;
  height:10px;
  stroke:currentColor;
}

		  #${ROOT_ID} .op-tg-link-btn:hover{
			background:#f8f8fb;
			border-color:#d8ddea;
		  }

		  #${ROOT_ID} .op-inline-x-btn{
			display:inline;
			padding:0;
			margin:0;
			border:none;
			background:transparent;
			color:#7f869b;
			cursor:pointer;
			line-height:1;
			font-size:18px;
			font-weight:400;
			transition:opacity .18s ease, color .18s ease;
			vertical-align:baseline;
		  }

		  #${ROOT_ID} .op-inline-x-btn:hover{
			color:#2d2f45;
		  }

		  #${ROOT_ID} .op-inline-x-btn:disabled{
			opacity:.45;
			cursor:default;
		  }

		  @media (max-width:640px){
			#${ROOT_ID} .op-wrap{
			  max-width:100%;
			  padding:12px;
			}

			#${ROOT_ID} .op-action-btn{
			  max-width:100%;
			}

			#${ROOT_ID} .op-sub-actions{
			  align-items:stretch;
			}

			#${ROOT_ID} .op-sub-body{
			  grid-template-columns:1fr;
			  gap:12px;
			}

			#${ROOT_ID} .op-certificate-form{
			  width:100%;
			  margin-left:0;
			}

			#${ROOT_ID} .op-sub-actions .op-action-btn,
			#${ROOT_ID} .op-certificate-actions .op-action-btn{
			  width:100%;
			}
		  }
		`;
		document.head.appendChild(style);
	  }

	  function renderMarkup() {
		let root = document.getElementById(ROOT_ID);
		if (!root) {
		  root = document.createElement('div');
		  root.id = ROOT_ID;
		  mountNode.appendChild(root);
		}

		root.innerHTML = `
		  <div class="op-wrap">
			<div class="op-global-note op-hidden" id="op-global-note"></div>

			<div class="op-card">
			  <div class="op-section-title">Персональные данные</div>

			  <div class="op-info op-info-plain">
				<div class="op-line" id="op-email-line">Email: —</div>
				<div class="op-line" id="op-tg-username-line">Telegram аккаунт: —</div>
				<div class="op-empty op-hidden" id="op-tg-link-help"></div>
			  </div>

			  <div class="op-bottom">
				<button class="op-action-btn" id="op-logout-btn" type="button">
				  <span class="op-btn-icon" aria-hidden="true">${getLogoutIconSvg()}</span>
				  <span>Выход</span>
				</button>
			  </div>
			</div>

			<div class="op-card">
			  <div class="op-children-title">Малыши</div>

			  <div class="op-children-list" id="op-children-list">
				<div class="op-loading">Загрузка данных...</div>
			  </div>

			  <div class="op-inline-hint op-hidden" id="op-children-hint">
				Имя, дата рождения, пол — например:
				<b>Маша, 02.02.2025, девочка</b>
			  </div>

			  <div class="op-inline-note op-hidden" id="op-children-note"></div>

			  <div class="op-bottom">
				<button class="op-action-btn" id="op-edit-children-btn" type="button">
				  <span class="op-btn-icon" aria-hidden="true">${getEditIconSvg()}</span>
				  <span>Редактировать</span>
				</button>
			  </div>
			</div>

			<div class="op-card">
			  <div class="op-status-row">
				<span class="op-dot" id="op-sub-dot"></span>
				<span id="op-sub-title">Загрузка...</span>
			  </div>

			  <div class="op-sub-body">
				<div class="op-info op-info-sub">
				  <div class="op-line" id="op-limit-line">Осталось сообщений: —</div>
				  <div class="op-line" id="op-valid-till-line">Действует до: —</div>
				  <div class="op-line" id="op-recurrent-line">
					<div class="op-inline-row">
					  <span class="op-inline-row-text" id="op-recurrent-text">Автопродление: —</span>
					  <button
						class="op-inline-x-btn op-hidden"
						id="op-cancel-autorenew-btn"
						type="button"
						aria-label="Отменить автопродление"
						title="Отменить автопродление"
					  >×</button>
					</div>
				  </div>
				</div>

				<div class="op-bottom op-sub-actions">
				  <a class="op-action-btn" id="op-buy-btn" href="${config.routes.checkout}">
					<span class="op-buy-star">★</span>
					<span id="op-buy-btn-text">Подписка на месяц – 550 ₽</span>
				  </a>
				  <button class="op-action-btn" id="op-activate-cert-btn" type="button">
				  <span class="op-btn-icon" aria-hidden="true">${getGiftIconSvg()}</span>
				  <span>Активировать сертификат</span>
				</button>
				</div>
			  </div>

			  <div class="op-inline-note op-hidden" id="op-subscription-note"></div>

			  <div class="op-certificate-form op-hidden" id="op-certificate-form">
				<div class="op-certificate-label">Код сертификата</div>
				<input class="op-certificate-field" id="op-certificate-code-input" type="text" placeholder="Введите код сертификата" autocomplete="one-time-code">
				<div class="op-certificate-actions">
				  <button class="op-action-btn" id="op-certificate-submit-btn" type="button">Активировать</button>
				</div>
				<div class="op-certificate-note op-hidden" id="op-certificate-note"></div>
			  </div>
			</div>
		  </div>
		`;
	  }
	  
function buildCheckoutUrl() {
  const current = new URL(window.location.href);
  const checkout = new URL(config.routes.checkout, window.location.origin);

  const keysToKeep = [
    'yclid',
    'yrclid',
    'ybaip',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];

  for (const key of keysToKeep) {
    const value = current.searchParams.get(key);
    if (value) {
      checkout.searchParams.set(key, value);
    }
  }

  const rawOneiroApp = (current.searchParams.get('oneiroapp') || '').trim().toLowerCase();

  if (rawOneiroApp === 'true' || rawOneiroApp === '1') {
    checkout.searchParams.set('oneiroapp', 'true');
  }

  return checkout.pathname + checkout.search;
}

function setCheckoutLinks() {
  const els = getEls();
  if (!els.buyBtn) return;

  els.buyBtn.href = buildCheckoutUrl();
}

	  function init() {
		setPopupViewportHeight();
		bindHeightObservers();
		bindChildrenEditing();
		bindCertificateActivation();
		bindProfilePopupOpen();
		bindHashFallback();
		setCheckoutLinks();

		if (document.readyState === 'loading') {
		  document.addEventListener('DOMContentLoaded', setPopupViewportHeight);
		} else {
		  setPopupViewportHeight();
		}

		window.addEventListener('resize', setPopupViewportHeight);
		window.addEventListener('orientationchange', setPopupViewportHeight);
	  }

	  function getEls() {
		return {
		  popupRoot: document.getElementById(ROOT_ID),
		  globalNote: document.getElementById('op-global-note'),
		  emailLine: document.getElementById('op-email-line'),
		  tgUsernameLine: document.getElementById('op-tg-username-line'),
		  tgLinkHelp: document.getElementById('op-tg-link-help'),
		  subDot: document.getElementById('op-sub-dot'),
		  subTitle: document.getElementById('op-sub-title'),
		  limitLine: document.getElementById('op-limit-line'),
		  validTillLine: document.getElementById('op-valid-till-line'),
		  recurrentLine: document.getElementById('op-recurrent-line'),
		  recurrentText: document.getElementById('op-recurrent-text'),
		  cancelAutorenewBtn: document.getElementById('op-cancel-autorenew-btn'),
		  subscriptionNote: document.getElementById('op-subscription-note'),
		  childrenList: document.getElementById('op-children-list'),
		  childrenHint: document.getElementById('op-children-hint'),
		  childrenNote: document.getElementById('op-children-note'),
		  editChildrenBtn: document.getElementById('op-edit-children-btn'),
		  logoutBtn: document.getElementById('op-logout-btn'),
		  buyBtnText: document.getElementById('op-buy-btn-text'),
		  buyBtn: document.getElementById('op-buy-btn'),
		  activateCertBtn: document.getElementById('op-activate-cert-btn'),
		  certificateForm: document.getElementById('op-certificate-form'),
		  certificateCodeInput: document.getElementById('op-certificate-code-input'),
		  certificateSubmitBtn: document.getElementById('op-certificate-submit-btn'),
		  certificateNote: document.getElementById('op-certificate-note')
		};
	  }

	  function popupDomReady() {
		const els = getEls();
		return !!(
		  els.popupRoot &&
		  els.globalNote &&
		  els.emailLine &&
		  els.tgUsernameLine &&
		  els.tgLinkHelp &&
		  els.subDot &&
		  els.subTitle &&
		  els.limitLine &&
		  els.validTillLine &&
		  els.recurrentLine &&
		  els.recurrentText &&
		  els.cancelAutorenewBtn &&
		  els.subscriptionNote &&
		  els.activateCertBtn &&
		  els.certificateForm &&
		  els.certificateCodeInput &&
		  els.certificateSubmitBtn &&
		  els.certificateNote &&
		  els.childrenList &&
		  els.childrenHint &&
		  els.childrenNote &&
		  els.editChildrenBtn &&
		  els.logoutBtn &&
		  els.buyBtnText
		);
	  }

	  function waitForPopupDom(timeout = 5000) {
		return new Promise((resolve, reject) => {
		  const startedAt = Date.now();

		  function check() {
			if (popupDomReady()) return resolve(true);
			if (Date.now() - startedAt > timeout) return reject(new Error('DOM попапа не найден'));
			requestAnimationFrame(check);
		  }

		  check();
		});
	  }

	  function getClosestPopupContainer(node) {
		if (!node) return null;
		return (
		  node.closest('.t-popup__container') ||
		  node.closest('.t-popup__content') ||
		  node.closest('.t396__artboard') ||
		  node.closest('.t-rec') ||
		  node.parentElement
		);
	  }

	  function setPopupViewportHeight() {
		const popup = document.getElementById(ROOT_ID);
		if (!popup) return;

		const container = getClosestPopupContainer(popup);
		const rect = container && container.getBoundingClientRect ? container.getBoundingClientRect() : null;

		let height = 0;
		if (rect && rect.height) height = rect.height;
		if (!height && container && container.clientHeight) height = container.clientHeight;
		if (!height) height = window.innerHeight || document.documentElement.clientHeight || 0;

		popup.style.setProperty('--oneiro-popup-height', `${Math.max(height, 100)}px`);

		if (container) {
		  container.style.background = '#f4f4f6';
		  container.style.overflow = 'hidden';
		}
		if (popup.parentElement) {
		  popup.parentElement.style.background = '#f4f4f6';
		}
	  }

	  function bindHeightObservers() {
		const popup = document.getElementById(ROOT_ID);
		const container = getClosestPopupContainer(popup);
		if (!container || typeof ResizeObserver === 'undefined') return;

		if (state.resizeObserver) {
		  try { state.resizeObserver.disconnect(); } catch (e) {}
		}

		state.resizeObserver = new ResizeObserver(() => {
		  setPopupViewportHeight();
		});

		state.resizeObserver.observe(container);
		state.resizeObserver.observe(popup);
	  }

	  function createSupabaseClientIfNeeded() {
		return new Promise((resolve, reject) => {
		  if (window.supabase && window.supabase.createClient) {
			resolve();
			return;
		  }
		  const s = document.createElement('script');
		  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
		  s.async = true;
		  s.onload = resolve;
		  s.onerror = reject;
		  document.head.appendChild(s);
		});
	  }

	  async function getSupabaseClient() {
		await createSupabaseClientIfNeeded();

		if (window.__oneiroProfileSb) return window.__oneiroProfileSb;

		window.__oneiroProfileSb = window.supabase.createClient(
		  config.supabase.url,
		  config.supabase.anonKey,
		  {
			auth: {
			  detectSessionInUrl: true,
			  persistSession: true,
			  autoRefreshToken: true
			}
		  }
		);

		return window.__oneiroProfileSb;
	  }

	  async function getSessionData(forceRefresh) {
		if (!forceRefresh && state.sessionData?.tg_userid && state.sessionData?.token) {
		  return state.sessionData;
		}

		const sb = await getSupabaseClient();
		let { data, error } = await sb.auth.getSession();
		let session = data?.session || null;

		if (error || !session?.access_token) {
		  throw new Error('Не найдена активная сессия');
		}

		const expiresAt = session.expires_at || 0;
		const now = Math.floor(Date.now() / 1000);
		if (expiresAt && expiresAt - now < 60) {
		  const refreshed = await sb.auth.refreshSession();
		  session = refreshed?.data?.session || null;
		}

		if (!session?.access_token || !session?.user?.id) {
		  throw new Error('Сессия невалидна');
		}

		const authUserId = session.user.id;
		const accessToken = session.access_token;
		const emailFromSession = session.user.email || '';

		const { data: sleepUser, error: sleepUserError } = await sb
		  .from('sleep_users')
		  .select('tg_userid, email')
		  .eq('auth_user_id', authUserId)
		  .maybeSingle();

		if (sleepUserError) throw new Error('Ошибка чтения sleep_users');
		if (!sleepUser?.tg_userid) throw new Error('Не найден tg_userid пользователя');

		state.sessionData = {
		  tg_userid: String(sleepUser.tg_userid),
		  email: sleepUser.email || emailFromSession || '',
		  token: accessToken
		};

		return state.sessionData;
	  }

	  function formatDate(value) {
		if (!value) return '—';
		if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;

		const d = new Date(value);
		if (isNaN(d.getTime())) return String(value);

		const dd = String(d.getDate()).padStart(2, '0');
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		const yyyy = d.getFullYear();
		return `${dd}.${mm}.${yyyy}`;
	  }

	  function normalizeRecurrent(value) {
		if (value === true) return 'подключено';
		if (value === false) return 'не подключено';
		if (typeof value === 'string') {
		  const v = value.trim().toLowerCase();
		  if (['true', 'yes', '1', 'on', 'да'].includes(v)) return 'подключено';
		  if (['false', 'no', '0', 'off', 'нет'].includes(v)) return 'не подключено';
		  return value;
		}
		return 'не подключено';
	  }

	  function hasRecurrentEnabled(value) {
		if (value === true) return true;
		if (typeof value === 'string') {
		  const v = value.trim().toLowerCase();
		  return ['true', 'yes', '1', 'on', 'да'].includes(v);
		}
		return false;
	  }

	  function escapeHtml(str) {
		return String(str)
		  .replaceAll('&', '&amp;')
		  .replaceAll('<', '&lt;')
		  .replaceAll('>', '&gt;')
		  .replaceAll('"', '&quot;')
		  .replaceAll("'", '&#039;');
	  }

	  function parseChildrenText(text) {
		return String(text || '')
		  .replace(/\r/g, '')
		  .split('\n')
		  .map((item) => item.trim())
		  .filter(Boolean);
	  }

	  function getChildrenTextFromProfile(data) {
		const kids = Array.isArray(data?.children) ? data.children : [];
		return kids
		  .map((child) => child?.baby_info ? String(child.baby_info).trim() : '')
		  .filter(Boolean)
		  .join('\n');
	  }

	  function showGlobalNote(text) {
		const els = getEls();
		if (!els.globalNote) return;

		if (!text) {
		  els.globalNote.textContent = '';
		  els.globalNote.classList.add('op-hidden');
		  return;
		}

		els.globalNote.textContent = text;
		els.globalNote.classList.remove('op-hidden');
	  }

	  function showChildrenNote(text, isError, isSuccess) {
		const els = getEls();
		if (!els.childrenNote) return;

		if (!text) {
		  els.childrenNote.textContent = '';
		  els.childrenNote.classList.add('op-hidden');
		  els.childrenNote.classList.remove('is-error', 'is-success');
		  return;
		}

		els.childrenNote.textContent = text;
		els.childrenNote.classList.remove('op-hidden');
		els.childrenNote.classList.toggle('is-error', !!isError);
		els.childrenNote.classList.toggle('is-success', !!isSuccess);
	  }

	  function showSubscriptionNote(text, type) {
		const els = getEls();
		if (!els.subscriptionNote) return;

		if (!text) {
		  els.subscriptionNote.textContent = '';
		  els.subscriptionNote.classList.add('op-hidden');
		  els.subscriptionNote.classList.remove('is-error', 'is-success');
		  return;
		}

		els.subscriptionNote.textContent = text;
		els.subscriptionNote.classList.remove('op-hidden');
		els.subscriptionNote.classList.toggle('is-error', type === 'error');
		els.subscriptionNote.classList.toggle('is-success', type === 'success');
	  }


	  function showCertificateNote(text, type) {
		const els = getEls();
		if (!els.certificateNote) return;

		if (!text) {
		  els.certificateNote.textContent = '';
		  els.certificateNote.classList.add('op-hidden');
		  els.certificateNote.classList.remove('is-error', 'is-success');
		  return;
		}

		els.certificateNote.textContent = text;
		els.certificateNote.classList.remove('op-hidden');
		els.certificateNote.classList.toggle('is-error', type === 'error');
		els.certificateNote.classList.toggle('is-success', type === 'success');
	  }

	  function showChildrenHint(visible) {
		const els = getEls();
		if (!els.childrenHint) return;
		els.childrenHint.classList.toggle('op-hidden', !visible);
	  }

function renderTelegramLinkStatus(userInfo) {
  const els = getEls();
  if (!els.tgUsernameLine || !els.tgLinkHelp) return;

  const tgLinked =
    userInfo?.tg_linked === true ||
    String(userInfo?.tg_linked).toLowerCase() === 'true';

  const tgUsernameRaw = userInfo?.tg_username ?? '';
  const tgUsername = String(tgUsernameRaw).trim().replace(/^@+/, '');

  if (tgLinked) {
    if (tgUsername) {
      els.tgUsernameLine.innerHTML = `
        <div class="op-tg-status-row">
          <span class="op-tg-status-text">Telegram аккаунт:</span>
          <a
            class="op-tg-link-btn"
            href="https://t.me/${encodeURIComponent(tgUsername)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>@${escapeHtml(tgUsername)}</span>
            <span class="op-tg-link-arrow" aria-hidden="true">
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 1.5 6.5 5 3 8.5"></path>
              </svg>
            </span>
          </a>
        </div>
      `;
    } else {
      els.tgUsernameLine.innerHTML = `
        <div class="op-tg-status-row">
          <span class="op-tg-status-text">Telegram аккаунт: привязан</span>
        </div>
      `;
    }

    els.tgLinkHelp.innerHTML = '';
    els.tgLinkHelp.classList.add('op-hidden');
    return;
  }

  els.tgUsernameLine.innerHTML = `
    <div class="op-tg-status-row">
      <span class="op-tg-status-text">Telegram аккаунт: не привязан</span>
      <a class="op-tg-link-btn" href="${config.routes.telegramLinkage}">
        <span>Привязать</span>
      </a>
    </div>
  `;

  els.tgLinkHelp.innerHTML = `
    Привяжите Telegram к аккаунту Онейро, чтобы пользоваться одной подпиской
    и на сайте, и в боте — без повторной оплаты и лишних переключений между аккаунтами ✨
  `;
  els.tgLinkHelp.classList.remove('op-hidden');
}

	  function setButtonLabel(btn, text, iconSvg) {
		if (!btn) return;
		btn.innerHTML = `${iconSvg ? `<span class="op-btn-icon" aria-hidden="true">${iconSvg}</span>` : ''}<span>${text}</span>`;
	  }

	  function renderLoading() {
		const els = getEls();
		if (!popupDomReady()) return;

		setPopupViewportHeight();
		showChildrenHint(false);
		showChildrenNote('');
		showSubscriptionNote('');

		els.emailLine.textContent = 'Email: —';
		els.tgUsernameLine.textContent = 'Telegram аккаунт: —';
		els.tgLinkHelp.innerHTML = '';
		els.tgLinkHelp.classList.add('op-hidden');

		els.subDot.classList.add('is-inactive');
		els.subTitle.textContent = 'Загрузка...';
		els.limitLine.textContent = 'Осталось сообщений: —';
		els.validTillLine.classList.remove('op-hidden');
		els.validTillLine.textContent = 'Действует до: —';
		els.recurrentLine.classList.remove('op-hidden');
		els.recurrentText.textContent = 'Автопродление: —';
		els.cancelAutorenewBtn.classList.add('op-hidden');
		els.cancelAutorenewBtn.disabled = false;
		els.cancelAutorenewBtn.textContent = '×';

		if (els.certificateForm) els.certificateForm.classList.add('op-hidden');
		if (els.certificateCodeInput) els.certificateCodeInput.value = '';
		if (els.certificateSubmitBtn) els.certificateSubmitBtn.disabled = false;
		if (els.activateCertBtn) {
		  els.activateCertBtn.disabled = false;
		  setButtonLabel(els.activateCertBtn, 'Активировать сертификат', getGiftIconSvg());
		}
		showCertificateNote('');

		els.childrenList.classList.remove('is-editing', 'is-saving');
		els.childrenList.removeAttribute('contenteditable');
		els.childrenList.innerHTML = '<div class="op-loading">Загрузка данных...</div>';

		els.editChildrenBtn.disabled = false;
		setButtonLabel(els.editChildrenBtn, 'Редактировать', getEditIconSvg());

		els.logoutBtn.disabled = false;
		setButtonLabel(els.logoutBtn, 'Выход', getLogoutIconSvg());
	  }

	  function renderError(message) {
		const els = getEls();
		if (!popupDomReady()) return;

		showGlobalNote(message || 'Ошибка загрузки данных');
		showChildrenNote('');
		showSubscriptionNote('');

		els.emailLine.textContent = 'Email: —';
		els.tgUsernameLine.textContent = 'Telegram аккаунт: —';
		els.tgLinkHelp.innerHTML = '';
		els.tgLinkHelp.classList.add('op-hidden');

		els.subDot.classList.add('is-inactive');
		els.subTitle.textContent = 'Не удалось загрузить профиль';
		els.limitLine.textContent = 'Осталось сообщений: —';
		els.validTillLine.classList.add('op-hidden');
		els.recurrentLine.classList.add('op-hidden');

		if (els.cancelAutorenewBtn) {
		  els.cancelAutorenewBtn.classList.add('op-hidden');
		  els.cancelAutorenewBtn.disabled = false;
		  els.cancelAutorenewBtn.textContent = '×';
		}

		els.childrenList.classList.remove('is-editing', 'is-saving');
		els.childrenList.removeAttribute('contenteditable');
		els.childrenList.innerHTML = `<div class="op-error">Не удалось загрузить данные профиля</div>`;
		showChildrenHint(false);
	  }

	  function renderChildrenReadonlyFromText(text) {
		const els = getEls();
		if (!els.childrenList) return;

		const items = parseChildrenText(text);
		els.childrenList.classList.remove('is-editing', 'is-saving');
		els.childrenList.removeAttribute('contenteditable');

		if (!items.length) {
		  els.childrenList.innerHTML = `
			<div class="op-empty">
			  Здесь пока нет информации о малыше.<br>
			  Добавьте имя, дату рождения и пол — так ответы Онейро будут точнее и персональнее 💜
			</div>
		  `;
		  state.lastRenderedChildrenText = '';
		  return;
		}

		els.childrenList.innerHTML = items.map((item) => `<div class="op-child">${escapeHtml(item)}</div>`).join('');
		state.lastRenderedChildrenText = items.join('\n');
	  }

	  function renderProfile(data) {
		const els = getEls();
		if (!popupDomReady()) return;

		state.currentProfile = data || null;
		showGlobalNote('');

		const hasSubscription = !!data?.subscription?.active;

		els.emailLine.textContent = `Email: ${data?.user_info?.email || '—'}`;
		renderTelegramLinkStatus(data?.user_info || {});

		els.subDot.classList.toggle('is-inactive', !hasSubscription);
		els.subTitle.textContent = hasSubscription ? 'Подписка активна' : 'Активной подписки нет';
		els.limitLine.textContent = `Осталось сообщений: ${data?.subscription?.limit ?? 0}`;

		if (hasSubscription) {
		  const recurrentEnabled = hasRecurrentEnabled(data?.subscription?.recurrent);

		  els.validTillLine.classList.remove('op-hidden');
		  els.recurrentLine.classList.remove('op-hidden');
		  els.validTillLine.textContent = `Действует до: ${formatDate(data?.subscription?.subscription_end_date)}`;
		  els.recurrentText.textContent = `Автопродление: ${normalizeRecurrent(data?.subscription?.recurrent)}`;

		  els.cancelAutorenewBtn.classList.toggle('op-hidden', !recurrentEnabled);
		  els.cancelAutorenewBtn.disabled = false;
		  els.cancelAutorenewBtn.textContent = '×';
		} else {
		  els.validTillLine.classList.add('op-hidden');
		  els.recurrentLine.classList.add('op-hidden');
		  els.cancelAutorenewBtn.classList.add('op-hidden');
		  els.cancelAutorenewBtn.disabled = false;
		  els.cancelAutorenewBtn.textContent = '×';
		}

		els.buyBtnText.textContent = hasSubscription ? 'Расширить подписку' : 'Купить подписку';
		if (els.activateCertBtn) {
		  els.activateCertBtn.disabled = false;
		  setButtonLabel(els.activateCertBtn, 'Активировать сертификат', getGiftIconSvg());
		}

		renderChildrenReadonlyFromText(getChildrenTextFromProfile(data));
		showChildrenHint(false);

		setButtonLabel(els.editChildrenBtn, 'Редактировать', getEditIconSvg());
		setButtonLabel(els.logoutBtn, 'Выход', getLogoutIconSvg());

		setTimeout(setPopupViewportHeight, 0);
	  }

	  function setCaretToEnd(el) {
		try {
		  const range = document.createRange();
		  range.selectNodeContents(el);
		  range.collapse(false);
		  const selection = window.getSelection();
		  selection.removeAllRanges();
		  selection.addRange(range);
		} catch (e) {}
	  }

	  function startChildrenEditing() {
		const els = getEls();
		if (!els.childrenList || state.savingChildren) return;

		const currentText = state.lastRenderedChildrenText || '';
		state.editingChildren = true;
		showChildrenNote('');
		showChildrenHint(true);

		els.childrenList.classList.add('is-editing');
		els.childrenList.setAttribute('contenteditable', 'true');
		els.childrenList.setAttribute('spellcheck', 'false');
		els.childrenList.innerText = currentText;

		setButtonLabel(els.editChildrenBtn, 'Сохранить', getEditIconSvg());
		els.childrenList.focus();
		setCaretToEnd(els.childrenList);
		setTimeout(setPopupViewportHeight, 0);
	  }

	  function stopChildrenEditingVisual(textToRender) {
		state.editingChildren = false;
		renderChildrenReadonlyFromText(textToRender);
		showChildrenHint(false);
		const els = getEls();
		setButtonLabel(els.editChildrenBtn, 'Редактировать', getEditIconSvg());
		setTimeout(setPopupViewportHeight, 0);
	  }

	  function tryParseJson(text) {
		try {
		  return JSON.parse(text);
		} catch (e) {
		  return null;
		}
	  }

	  function fetchWithTimeout(url, options, timeoutMs) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeoutMs);

		return fetch(url, { ...options, signal: controller.signal })
		  .finally(() => clearTimeout(timer));
	  }

	  function extractWebhookErrorMessage(responseText, status) {
		const fallback = `Webhook вернул ${status}`;
		if (!responseText) return fallback;

		const parsed = tryParseJson(responseText);

		if (Array.isArray(parsed) && parsed[0]) {
		  if (typeof parsed[0].error_message === 'string' && parsed[0].error_message.trim()) {
			return parsed[0].error_message.trim();
		  }
		  if (typeof parsed[0].message === 'string' && parsed[0].message.trim()) {
			return parsed[0].message.trim();
		  }
		  if (typeof parsed[0].error === 'string' && parsed[0].error.trim()) {
			return parsed[0].error.trim();
		  }
		}

		if (parsed && typeof parsed === 'object') {
		  if (typeof parsed.error_message === 'string' && parsed.error_message.trim()) {
			return parsed.error_message.trim();
		  }
		  if (typeof parsed.message === 'string' && parsed.message.trim()) {
			return parsed.message.trim();
		  }
		  if (typeof parsed.error === 'string' && parsed.error.trim()) {
			return parsed.error.trim();
		  }
		}

		if (typeof responseText === 'string' && responseText.trim()) {
		  return responseText.trim();
		}

		return fallback;
	  }

	  async function loadProfile(force) {
		if (state.loading) return;
		if (state.loadedOnce && !force) return;

		state.loading = true;

		try {
		  await waitForPopupDom(5000);
		  setPopupViewportHeight();
		  renderLoading();

		  const sessionData = await getSessionData(true);

		  const response = await fetch(PROFILE_WEBHOOK_URL, {
			method: 'GET',
			headers: {
			  tg_userid: sessionData.tg_userid,
			  email: sessionData.email,
			  token: sessionData.token
			}
		  });

		  const responseText = await response.text();

		  if (!response.ok) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  let json = tryParseJson(responseText);

		  if (!json || typeof json !== 'object') {
			throw new Error('Не удалось получить данные профиля');
		  }

		  renderProfile(json);
		  state.loadedOnce = true;
		} catch (e) {
		  console.error('[oneiro-profile] Ошибка загрузки профиля', e);
		  renderError(e?.message || 'Ошибка загрузки данных');
		} finally {
		  state.loading = false;
		  setTimeout(setPopupViewportHeight, 0);
		}
	  }

	  function getNormalizedChildrenTextFromProfile(profile) {
		if (!profile) return '';

		const source = Array.isArray(profile) ? profile[0] : profile;
		if (!source || typeof source !== 'object') return '';

		const candidates = [];

		if (Array.isArray(source.children)) {
		  candidates.push(
			...source.children.map((item) => {
			  if (!item) return '';
			  if (typeof item === 'string') return item;
			  if (typeof item.baby_info === 'string') return item.baby_info;
			  return '';
			})
		  );
		}

		if (Array.isArray(source.babies)) {
		  candidates.push(
			...source.babies.map((item) => {
			  if (!item) return '';
			  if (typeof item === 'string') return item;
			  if (typeof item.baby_info === 'string') return item.baby_info;
			  return '';
			})
		  );
		}

		if (typeof source.baby_info === 'string') {
		  candidates.push(source.baby_info);
		}

		if (source.user_info && typeof source.user_info.baby_info === 'string') {
		  candidates.push(source.user_info.baby_info);
		}

		return parseChildrenText(candidates.join('\n')).join('\n');
	  }

	  async function saveChildrenIfChanged() {
		const els = getEls();
		if (!state.editingChildren || state.savingChildren || !els.childrenList) return;

		const rawText = els.childrenList.innerText || '';
		const normalizedText = parseChildrenText(rawText).join('\n');
		const previousText = parseChildrenText(state.lastRenderedChildrenText).join('\n');

		if (normalizedText === previousText) {
		  stopChildrenEditingVisual(previousText);
		  showChildrenNote('');
		  return;
		}

		state.savingChildren = true;
		els.childrenList.classList.add('is-saving', 'is-editing');
		els.childrenList.setAttribute('contenteditable', 'false');
		els.childrenList.innerText = normalizedText;

		els.editChildrenBtn.disabled = true;
		setButtonLabel(els.editChildrenBtn, 'Сохраняем...', getEditIconSvg());
		showChildrenNote('Сохраняем данные...');

		try {
		  const sessionData = await getSessionData(true);

		  const payload = {
			tg_userid: sessionData.tg_userid,
			email: sessionData.email,
			token: sessionData.token,
			baby_info: normalizedText,
			children_text: normalizedText,
			children: parseChildrenText(normalizedText).map((item) => ({ baby_info: item }))
		  };

		  const response = await fetchWithTimeout(
			UPDATE_CHILDREN_WEBHOOK_URL,
			{
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				tg_userid: sessionData.tg_userid,
				email: sessionData.email,
				token: sessionData.token
			  },
			  body: JSON.stringify(payload)
			},
			SAVE_TIMEOUT_MS
		  );

		  const responseText = await response.text();

		  if (!response.ok) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  const parsed = tryParseJson(responseText);

		  if (
			parsed &&
			(
			  (Array.isArray(parsed) && parsed[0] && parsed[0].error_message) ||
			  (!Array.isArray(parsed) && parsed.error_message)
			)
		  ) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  state.savingChildren = false;
		  state.editingChildren = false;

		  await loadProfile(true);

		  const actualSavedText = getNormalizedChildrenTextFromProfile(state.currentProfile);

		  if (actualSavedText !== normalizedText) {
			throw new Error(CHILDREN_SAVE_GENERIC_ERROR);
		  }

		  showChildrenNote('');
		} catch (e) {
		  console.error('[oneiro-profile] Ошибка сохранения данных о малышах', e);

		  state.savingChildren = false;
		  state.editingChildren = true;

		  showChildrenNote(
			e && e.name === 'AbortError'
			  ? 'Сервер отвечает слишком долго. Попробуйте ещё раз.'
			  : (
				  e?.message && e.message !== 'Failed to fetch'
					? e.message
					: CHILDREN_SAVE_GENERIC_ERROR
				),
			true
		  );

		  els.childrenList.classList.remove('is-saving');
		  els.childrenList.classList.add('is-editing');
		  els.childrenList.setAttribute('contenteditable', 'true');
		  els.childrenList.innerText = normalizedText;
		  els.childrenList.focus();
		  setCaretToEnd(els.childrenList);

		  els.editChildrenBtn.disabled = false;
		  setButtonLabel(els.editChildrenBtn, 'Сохранить', getEditIconSvg());
		  setTimeout(setPopupViewportHeight, 0);
		}
	  }

	  
	  function toggleCertificateForm(show) {
		const els = getEls();
		if (!els.certificateForm || !els.certificateCodeInput) return;

		const shouldShow = typeof show === 'boolean' ? show : els.certificateForm.classList.contains('op-hidden');
		els.certificateForm.classList.toggle('op-hidden', !shouldShow);
		showCertificateNote('');

		if (shouldShow) {
		  setTimeout(() => {
			els.certificateCodeInput.focus();
			setPopupViewportHeight();
		  }, 0);
		} else {
		  els.certificateCodeInput.value = '';
		  setTimeout(setPopupViewportHeight, 0);
		}
	  }

	  async function activateCertificate() {
		const els = getEls();
		if (state.activatingCertificate || !els.certificateCodeInput) return;

		const certificateCode = String(els.certificateCodeInput.value || '').trim();

		if (!certificateCode) {
		  showCertificateNote('Введите код сертификата', 'error');
		  els.certificateCodeInput.focus();
		  return;
		}

		state.activatingCertificate = true;
		showCertificateNote('Активируем сертификат...');

		if (els.activateCertBtn) els.activateCertBtn.disabled = true;
		if (els.certificateSubmitBtn) {
		  els.certificateSubmitBtn.disabled = true;
		  setButtonLabel(els.certificateSubmitBtn, 'Активируем...', getGiftIconSvg());
		}

		try {
		  const sessionData = await getSessionData(true);

		  const payload = {
			tg_userid: sessionData.tg_userid,
			email: sessionData.email,
			token: sessionData.token,
			certificate_code: certificateCode,
			code: certificateCode
		  };

		  const response = await fetchWithTimeout(
			ACTIVATE_CERTIFICATE_WEBHOOK_URL,
			{
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				tg_userid: sessionData.tg_userid,
				email: sessionData.email,
				token: sessionData.token
			  },
			  body: JSON.stringify(payload)
			},
			SAVE_TIMEOUT_MS
		  );

		  const responseText = await response.text();

		  if (!response.ok) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  const parsed = tryParseJson(responseText);

		 if (!parsed) {
  throw new Error('Что-то пошло не так 😔 Попробуйте еще раз чуть позже.');
}

const result = Array.isArray(parsed) ? parsed[0] : parsed;

if (
  result.success !== true ||
  result.error_message ||
  result.error ||
  result.message === 'error'
) {
  throw new Error(
    result.error_message ||
    result.error ||
    result.message ||
    'Не удалось активировать сертификат'
  );
}

		  if (els.certificateCodeInput) els.certificateCodeInput.value = '';
		  toggleCertificateForm(false);

		  state.loadedOnce = false;
		  await loadProfile(true);
		  showSubscriptionNote(ACTIVATE_CERTIFICATE_SUCCESS_MESSAGE, 'success');
		} catch (e) {
		  console.error('[oneiro-profile] Ошибка активации сертификата', e);

		  showCertificateNote(
			e && e.name === 'AbortError'
			  ? 'Сервер отвечает слишком долго. Попробуйте ещё раз.'
			  : (e?.message || 'Не удалось активировать сертификат. Проверьте код и попробуйте ещё раз.'),
			'error'
		  );
		} finally {
		  state.activatingCertificate = false;
		  if (els.activateCertBtn) {
			els.activateCertBtn.disabled = false;
			setButtonLabel(els.activateCertBtn, 'Активировать сертификат', getGiftIconSvg());
		  }
		  if (els.certificateSubmitBtn) {
			els.certificateSubmitBtn.disabled = false;
			setButtonLabel(els.certificateSubmitBtn, 'Активировать', null);
		  }
		  setTimeout(setPopupViewportHeight, 0);
		}
	  }

async function logoutUser() {
		const els = getEls();
		if (state.loggingOut) return;

		state.loggingOut = true;

		try {
		  els.logoutBtn.disabled = true;
		  setButtonLabel(els.logoutBtn, 'Выходим...', getLogoutIconSvg());

		  const sb = await getSupabaseClient();
		  await sb.auth.signOut();

		  state.sessionData = null;
		  state.currentProfile = null;
		  state.loadedOnce = false;
		  state.editingChildren = false;
		  state.savingChildren = false;
		  state.lastRenderedChildrenText = '';

		  const currentUrl = new URL(window.location.href);
		  const next = currentUrl.pathname + currentUrl.search;
		  const loginParams = new URLSearchParams();
		  loginParams.set('next', next);
		  
		  const rawOneiroApp = (currentUrl.searchParams.get('oneiroapp') || '').trim().toLowerCase();
		  const isOneiroApp = rawOneiroApp === 'true' || rawOneiroApp === '1';
		  
		  if (isOneiroApp) {
		  loginParams.set('oneiroapp', 'true');
		  }

window.location.href = `${LOGIN_PAGE_PATH}?${loginParams.toString()}`;
		} catch (e) {
		  console.error('[oneiro-profile] Ошибка при выходе', e);
		  els.logoutBtn.disabled = false;
		  setButtonLabel(els.logoutBtn, 'Выход', getLogoutIconSvg());
		  showGlobalNote('Не удалось выполнить выход. Попробуйте ещё раз.');
		  state.loggingOut = false;
		}
	  }

	  async function cancelAutorenew() {
		const els = getEls();
		if (state.cancelingAutorenew) return;

		state.cancelingAutorenew = true;

		try {
		  if (els.cancelAutorenewBtn) {
			els.cancelAutorenewBtn.disabled = true;
		  }

		  showSubscriptionNote('');

		  const sessionData = await getSessionData(true);

		  const response = await fetchWithTimeout(
			CANCEL_AUTORENEW_WEBHOOK_URL,
			{
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				tg_userid: sessionData.tg_userid,
				email: sessionData.email,
				token: sessionData.token
			  },
			  body: JSON.stringify({
				tg_userid: sessionData.tg_userid,
				email: sessionData.email,
				token: sessionData.token
			  })
			},
			SAVE_TIMEOUT_MS
		  );

		  const responseText = await response.text();

		  if (!response.ok) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  const parsed = tryParseJson(responseText);

		  if (
			parsed &&
			(
			  (Array.isArray(parsed) && parsed[0] && parsed[0].error_message) ||
			  (!Array.isArray(parsed) && parsed.error_message)
			)
		  ) {
			throw new Error(extractWebhookErrorMessage(responseText, response.status));
		  }

		  state.loadedOnce = false;
		  await loadProfile(true);
		  showSubscriptionNote(CANCEL_AUTORENEW_SUCCESS_MESSAGE, 'success');
		} catch (e) {
		  console.error('[oneiro-profile] Ошибка отмены автопродления', e);

		  showSubscriptionNote(
			e && e.name === 'AbortError'
			  ? 'Сервер отвечает слишком долго. Попробуйте ещё раз.'
			  : (e?.message || 'Не удалось отменить автопродление. Попробуйте ещё раз позже.'),
			'error'
		  );

		  if (els.cancelAutorenewBtn) {
			els.cancelAutorenewBtn.disabled = false;
		  }
		} finally {
		  state.cancelingAutorenew = false;
		  setTimeout(setPopupViewportHeight, 0);
		}
	  }

	  
	  function bindCertificateActivation() {
		document.addEventListener('click', function(e) {
		  const activateBtn = e.target.closest('#op-activate-cert-btn');
		  if (activateBtn) {
			e.preventDefault();
			e.stopPropagation();
			if (state.activatingCertificate) return;
			toggleCertificateForm();
			return;
		  }

		  const submitBtn = e.target.closest('#op-certificate-submit-btn');
		  if (submitBtn) {
			e.preventDefault();
			e.stopPropagation();
			activateCertificate();
		  }
		}, true);

		document.addEventListener('keydown', function(e) {
		  const els = getEls();
		  if (!els.certificateCodeInput || document.activeElement !== els.certificateCodeInput) return;

		  if (e.key === 'Enter') {
			e.preventDefault();
			activateCertificate();
		  }
		});
	  }

function bindChildrenEditing() {
		document.addEventListener('click', function (e) {
		  const els = getEls();
		  if (!els.editChildrenBtn || !els.childrenList) return;

		  const editBtn = e.target.closest('#op-edit-children-btn');
		  if (editBtn) {
			e.preventDefault();
			e.stopPropagation();

			if (state.savingChildren) return;
			if (!state.editingChildren) startChildrenEditing();
			else saveChildrenIfChanged();
			return;
		  }

		  const logoutBtn = e.target.closest('#op-logout-btn');
		  if (logoutBtn) {
			e.preventDefault();
			e.stopPropagation();
			logoutUser();
			return;
		  }

		  const cancelAutorenewBtn = e.target.closest('#op-cancel-autorenew-btn');
		  if (cancelAutorenewBtn) {
			e.preventDefault();
			e.stopPropagation();
			cancelAutorenew();
			return;
		  }

		  if (!state.editingChildren || state.savingChildren) return;

		  const clickedInsideEditableArea = els.childrenList.contains(e.target);
		  if (!clickedInsideEditableArea) saveChildrenIfChanged();
		}, true);

		document.addEventListener('keydown', function (e) {
		  if (!state.editingChildren || state.savingChildren) return;
		  if (e.key === 'Escape') {
			e.preventDefault();
			showChildrenNote('');
			stopChildrenEditingVisual(state.lastRenderedChildrenText);
		  }
		});

		document.addEventListener('paste', function (e) {
		  const els = getEls();
		  if (!state.editingChildren || state.savingChildren || !els.childrenList || document.activeElement !== els.childrenList) return;
		  e.preventDefault();
		  const text = (e.clipboardData || window.clipboardData).getData('text');
		  document.execCommand('insertText', false, text);
		});
	  }

	  function bindProfilePopupOpen() {
		document.addEventListener('click', function (e) {
		  const link = e.target.closest(`a[href="${config.popups.profile}"]`);
		  if (!link) return;

		  setTimeout(() => {
			setPopupViewportHeight();
			loadProfile(true);
		  }, 300);

		  setTimeout(setPopupViewportHeight, 700);
		});
	  }

	  function bindHashFallback() {
		if (window.location.hash === config.popups.profile) {
		  setTimeout(() => {
			setPopupViewportHeight();
			loadProfile(true);
		  }, 300);

		  setTimeout(setPopupViewportHeight, 700);
		}

		window.addEventListener('hashchange', function () {
		  if (window.location.hash === config.popups.profile) {
			setTimeout(() => {
			  setPopupViewportHeight();
			  loadProfile(true);
			}, 300);

			setTimeout(setPopupViewportHeight, 700);
		  }
		});
	  }

	  function getEditIconSvg() {
		return `
		  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
			<path d="M4 20h4.2l10-10a2.2 2.2 0 0 0 0-3.1l-1.1-1.1a2.2 2.2 0 0 0-3.1 0L4 15.8V20Z"></path>
			<path d="m12.5 7.5 4 4"></path>
		  </svg>
		`;
	  }

	  
	  function getGiftIconSvg() {
		return `
		  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
			<path d="M20 12v8H4v-8"></path>
			<path d="M2 7h20v5H2z"></path>
			<path d="M12 7v13"></path>
			<path d="M12 7H8.5A2.5 2.5 0 1 1 12 3.5V7Z"></path>
			<path d="M12 7h3.5A2.5 2.5 0 1 0 12 3.5V7Z"></path>
		  </svg>
		`;
	  }

function getLogoutIconSvg() {
		return `
		  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
			<path d="M14 7V5.5C14 4.12 12.88 3 11.5 3h-5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h5A2.5 2.5 0 0 0 14 18.5V17"></path>
			<path d="M10 12h10"></path>
			<path d="m17 8 4 4-4 4"></path>
		  </svg>
		`;
	  }
	})();
