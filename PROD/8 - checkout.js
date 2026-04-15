<style>
  html.oneiro-auth-pending body {
    opacity: 0;
  }

  :root {
    --oneiro-topbar-h: 88px;
    --oneiro-bg: #f4f4f6;
    --oneiro-card: #fbfbfc;
    --oneiro-text: #111111;
    --oneiro-muted: #666c80;
    --oneiro-border: #e5e7ef;
    --oneiro-border-strong: #d9dce7;
    --oneiro-link: #4b84c6;
    --oneiro-primary: #2a195b;
    --oneiro-primary-hover: #382678;
    --oneiro-primary-disabled: #c9c7d6;
    --oneiro-success: #17b35d;
    --oneiro-danger: #c65959;
    --oneiro-danger-bg: #fff4f4;
    --oneiro-input-bg: #ffffff;
    --oneiro-shadow: 0 2px 10px rgba(32, 33, 36, 0.03);
    --oneiro-radius-xl: 28px;
  }

  html, body, #allrecords {
    overflow-x: hidden !important;
    background: var(--oneiro-bg) !important;
  }

  #rec1914738151 {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    z-index: 31000 !important;
  }

#oneiro-tariff-page {
  min-height: auto;
  padding: 4px 16px 24px;
  background: var(--oneiro-bg);
  font-family: 'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  color: var(--oneiro-text);
  box-sizing: border-box;
}

  #oneiro-tariff-page *,
  #oneiro-tariff-page *::before,
  #oneiro-tariff-page *::after {
    box-sizing: border-box;
  }

  #oneiro-tariff-page .ot-wrap {
    width: 100%;
    max-width: 532px;
    margin: 0 auto;
  }

  #oneiro-tariff-page .ot-title {
    margin: 0 0 18px;
    font-size: 16px;
    line-height: 1.25;
    font-weight: 500;
  }

  #oneiro-tariff-page .ot-card {
    background: var(--oneiro-card);
    border-radius: var(--oneiro-radius-xl);
    box-shadow: var(--oneiro-shadow);
  }

  #oneiro-tariff-page .ot-product {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    margin-bottom: 14px;
  }

  #oneiro-tariff-page .ot-product-icon {
    width: 88px;
    min-width: 88px;
    height: 88px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    border: 1px solid var(--oneiro-border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #oneiro-tariff-page .ot-product-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  #oneiro-tariff-page .ot-product-text {
    min-width: 0;
  }

  #oneiro-tariff-page .ot-product-name {
    font-size: 16px;
    line-height: 1.25;
    font-weight: 400;
    margin: 0 0 4px;
  }

  #oneiro-tariff-page .ot-product-desc {
    font-size: 14px;
    line-height: 1.35;
    color: #444;
    margin: 0;
  }

  #oneiro-tariff-page .ot-checkout {
    padding: 20px 22px 18px;
  }

  #oneiro-tariff-page .ot-price-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  #oneiro-tariff-page .ot-price-main {
    font-size: 32px;
    line-height: 1.05;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  #oneiro-tariff-page .ot-toggle-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 22px;
  }

  #oneiro-tariff-page .ot-toggle-label {
    font-size: 14px;
    line-height: 1.3;
    font-weight: 400;
  }

  #oneiro-tariff-page .ot-switch {
    position: relative;
    width: 38px;
    height: 22px;
    display: inline-block;
    flex: 0 0 auto;
  }

  #oneiro-tariff-page .ot-switch input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  #oneiro-tariff-page .ot-switch-slider {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: #d8dce7;
    transition: .2s ease;
    cursor: pointer;
  }

  #oneiro-tariff-page .ot-switch-slider::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    left: 3px;
    top: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.12);
    transition: .2s ease;
  }

  #oneiro-tariff-page .ot-switch input:checked + .ot-switch-slider {
    background: var(--oneiro-success);
  }

  #oneiro-tariff-page .ot-switch input:checked + .ot-switch-slider::before {
    transform: translateX(16px);
  }

  #oneiro-tariff-page .ot-field-block {
    margin-bottom: 16px;
  }

  #oneiro-tariff-page .ot-field-label {
    display: block;
    font-size: 14px;
    line-height: 1.3;
    margin: 0 0 8px;
  }

  #oneiro-tariff-page .ot-promo-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  #oneiro-tariff-page .ot-input-wrap {
    flex: 1 1 auto;
    min-width: 0;
    max-width: 70%;
  }

  #oneiro-tariff-page .ot-input {
    width: 100%;
    height: 48px;
    border-radius: 14px;
    border: 2px solid var(--oneiro-border-strong);
    background: var(--oneiro-input-bg);
    padding: 0 18px;
    font-size: 14px;
    line-height: 1;
    color: var(--oneiro-text);
    outline: none;
    transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
  }

  #oneiro-tariff-page .ot-input::placeholder {
    color: #b3b6c3;
  }

  #oneiro-tariff-page .ot-input:focus {
    border-color: #b9bfd2;
    box-shadow: 0 0 0 4px rgba(42,25,91,.05);
  }

  #oneiro-tariff-page .ot-input:disabled {
    background: #f5f6fa;
    color: #7b8195;
    cursor: not-allowed;
  }

  #oneiro-tariff-page .ot-promo-btn {
    flex: 0 0 auto;
    min-width: 128px;
    height: 48px;
    border: none;
    border-radius: 16px;
    background: #f3f3f7;
    color: #555;
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    cursor: pointer;
    transition: background .15s ease, color .15s ease, opacity .15s ease;
    padding: 0 16px;
  }

  #oneiro-tariff-page .ot-promo-btn:hover:not(:disabled) {
    background: #ececf3;
  }

  #oneiro-tariff-page .ot-promo-btn:disabled {
    opacity: .72;
    cursor: not-allowed;
  }

  #oneiro-tariff-page .ot-promo-success-icon {
    width: 19px;
    min-width: 19px;
    height: 19px;
    border-radius: 50%;
    background: var(--oneiro-success);
    color: #fff;
    display: none;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-size: 11px;
    line-height: 1;
    margin-left: 2px;
  }

  #oneiro-tariff-page .ot-promo-state {
    min-height: 50px;
    padding-top: 10px;
  }

  #oneiro-tariff-page .ot-promo-message {
    display: none;
    font-size: 13px;
    line-height: 1.45;
    border-radius: 12px;
    padding: 10px 12px;
  }

  #oneiro-tariff-page .ot-promo-message.is-loading {
    display: block;
    color: var(--oneiro-muted);
    background: #f6f7fb;
    border: 1px solid #eceef5;
  }

  #oneiro-tariff-page .ot-promo-message.is-success {
    display: block;
    color: #3d4a37;
    background: transparent;
    border: none;
    padding: 0;
    font-size: 14px;
    line-height: 1.4;
  }

  #oneiro-tariff-page .ot-promo-message.is-error {
    display: block;
    color: #8d4040;
    background: var(--oneiro-danger-bg);
    border: 1px solid #f1cccc;
  }

  #oneiro-tariff-page .ot-final-price {
    color: var(--oneiro-danger);
    font-weight: 500;
    white-space: nowrap;
  }

  #oneiro-tariff-page .ot-old-price {
    color: #666;
    text-decoration: line-through;
    margin-left: 4px;
    white-space: nowrap;
  }

  #oneiro-tariff-page .ot-consents {
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  #oneiro-tariff-page .ot-check {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.4;
    color: #3f3f3f;
  }

  #oneiro-tariff-page .ot-check input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  #oneiro-tariff-page .ot-check-box {
    width: 15px;
    min-width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #000;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-size: 9px;
    line-height: 1;
    margin-top: 0;
    user-select: none;
    transition: transform .12s ease, opacity .12s ease;
  }

  #oneiro-tariff-page .ot-check input:not(:checked) + .ot-check-box {
    opacity: .35;
  }

  #oneiro-tariff-page .ot-check a {
    color: var(--oneiro-link);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  #oneiro-tariff-page .ot-footer {
    margin-top: 28px;
    display: flex;
    justify-content: center;
  }

  #oneiro-tariff-page .ot-pay-btn {
    width: 244px;
    max-width: 100%;
    height: 46px;
    padding: 0 18px;
    border: none;
    border-radius: 999px;
    background: var(--oneiro-primary);
    color: #fff;
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    cursor: pointer;
    transition: background .15s ease, transform .12s ease, opacity .15s ease;
    box-shadow: 0 4px 14px rgba(42,25,91,.12);
  }

  #oneiro-tariff-page .ot-pay-btn:hover:not(:disabled) {
    background: var(--oneiro-primary-hover);
  }

  #oneiro-tariff-page .ot-pay-btn:active:not(:disabled) {
    transform: translateY(1px);
  }

  #oneiro-tariff-page .ot-pay-btn:disabled {
    background: var(--oneiro-primary-disabled);
    cursor: not-allowed;
    box-shadow: none;
  }

  #oneiro-tariff-page .ot-page-note {
    margin-top: 12px;
    text-align: center;
    color: var(--oneiro-muted);
    font-size: 12px;
    line-height: 1.35;
  }

  #oneiro-tariff-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    color: var(--oneiro-muted);
    font-size: 14px;
  }

  #oneiro-tariff-error {
    display: none;
    max-width: 532px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #f1d3d3;
    color: #8d4040;
    border-radius: 20px;
    padding: 16px 18px;
    font-size: 14px;
    line-height: 1.4;
  }
  
@media (max-width: 680px) {
  #oneiro-tariff-page {
    padding: 6px 12px 20px;
  }

    #oneiro-tariff-page .ot-wrap,
    #oneiro-tariff-page #oneiro-tariff-error {
      max-width: 100%;
    }

    #oneiro-tariff-page .ot-product {
      gap: 14px;
      padding: 14px 16px;
    }

    #oneiro-tariff-page .ot-product-icon {
      width: 74px;
      min-width: 74px;
      height: 74px;
    }

    #oneiro-tariff-page .ot-product-name {
      font-size: 15px;
    }

    #oneiro-tariff-page .ot-product-desc {
      font-size: 13px;
    }

    #oneiro-tariff-page .ot-checkout {
      padding: 18px 16px 16px;
    }

    #oneiro-tariff-page .ot-price-main {
      font-size: 26px;
    }

    #oneiro-tariff-page .ot-promo-row {
      align-items: stretch;
      flex-wrap: wrap;
    }

    #oneiro-tariff-page .ot-input-wrap {
      width: 100%;
      max-width: 100%;
      flex-basis: 100%;
    }

    #oneiro-tariff-page .ot-promo-btn {
      min-width: 0;
      width: auto;
    }

    #oneiro-tariff-page .ot-pay-btn {
      width: 100%;
      min-width: 0;
    }

    #oneiro-tariff-page .ot-check {
      align-items: flex-start;
    }

    #oneiro-tariff-page .ot-check-box {
      align-self: flex-start;
      margin-top: 2px;
    }
  }
</style>

<script>
  document.documentElement.classList.add('oneiro-auth-pending');
</script>

<div id="oneiro-tariff-page">
  <div id="oneiro-tariff-loading">Загрузка данных...</div>

  <div id="oneiro-tariff-error"></div>

  <div class="ot-wrap" id="oneiro-tariff-app" style="display:none;">

    <div class="ot-card ot-product">
      <div class="ot-product-icon">
        <img
          src="https://static.tildacdn.com/tild3664-3165-4164-a364-653434313536/circle.png"
          alt="Онейро"
        />
      </div>
      <div class="ot-product-text">
        <div class="ot-product-name">Онейро – бот-консультант по детскому сну</div>
        <div class="ot-product-desc">Доступ: 50 запросов на 1 месяц</div>
      </div>
    </div>

    <div class="ot-card ot-checkout">
      <div class="ot-price-row">
        <div class="ot-price-main" id="ot-price-main">550 ₽ в месяц</div>
      </div>

      <div class="ot-toggle-row">
        <div class="ot-toggle-label">Автопродление</div>
        <label class="ot-switch" aria-label="Автопродление">
          <input type="checkbox" id="ot-recurrent" checked>
          <span class="ot-switch-slider"></span>
        </label>
      </div>

      <div class="ot-field-block">
        <label class="ot-field-label" for="ot-promo-input">Промокод</label>

        <div class="ot-promo-row">
          <div class="ot-input-wrap">
            <input
              id="ot-promo-input"
              class="ot-input"
              type="text"
              inputmode="text"
              autocomplete="off"
              autocapitalize="characters"
              spellcheck="false"
              placeholder=""
            >
          </div>

          <button id="ot-promo-btn" class="ot-promo-btn" type="button">
            Активировать
          </button>

          <div id="ot-promo-success-icon" class="ot-promo-success-icon" aria-hidden="true">✓</div>
        </div>

        <div class="ot-promo-state">
          <div id="ot-promo-message" class="ot-promo-message"></div>
        </div>
      </div>

      <div class="ot-consents">
        <label class="ot-check">
          <input type="checkbox" id="ot-consent-subscription" checked>
          <span class="ot-check-box">✓</span>
          <span>
            Этим платежом я соглашаюсь с
            <a href="https://oneiro-mom.ru/subscription_agreement" target="_blank" rel="noopener">
              Условиями платной подписки
            </a>
          </span>
        </label>

        <label class="ot-check">
          <input type="checkbox" id="ot-consent-offer" checked>
          <span class="ot-check-box">✓</span>
          <span>
            Согласен с
            <a href="https://oneiro-mom.ru/public-offer" target="_blank" rel="noopener">
              офертой
            </a>
            и
            <a href="https://oneiro-mom.ru/privacy" target="_blank" rel="noopener">
              политикой обработки персональных данных
            </a>
          </span>
        </label>
      </div>

      <div class="ot-footer">
        <button id="ot-pay-btn" class="ot-pay-btn" type="button">
          Перейти к оплате – 550 ₽
        </button>
      </div>

      <div class="ot-page-note" id="ot-page-note" style="display:none;"></div>
    </div>
  </div>
</div>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

  (function () {
    const SUPABASE_URL = 'https://byimggpbeemlrtkzjuyr.supabase.co';
    const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2EoT9T3U_4TOal3RJLzA5g_NTHekBX4';

    const PROMO_STATE_WEBHOOK_URL = 'https://ivagulin.dedyn.io/webhook/oneiro/generatePaymentData';
    const APPLY_PROMO_WEBHOOK_URL = 'https://ivagulin.dedyn.io/webhook/oneiro/setPromo';

    const NEXT = '/checkout';
    const LOGIN_URL = '/login?next=' + encodeURIComponent(NEXT);
    const APPLY_PROMO_TIMEOUT_MS = 30000;
    const PROMO_STATE_TIMEOUT_MS = 20000;

    const state = {
      sb: null,
      session: null,
      sleepUser: null,
      loading: true,
      applyingPromo: false,
      syncingState: false,
      promoApplied: false,
      currentPromo: '',
      promoRate: '',
      finalPrice: 550,
      basePrice: 550,
      paymentLink: '',
      promoStateRequestId: 0
    };

    const els = {
      loading: document.getElementById('oneiro-tariff-loading'),
      error: document.getElementById('oneiro-tariff-error'),
      app: document.getElementById('oneiro-tariff-app'),
      priceMain: document.getElementById('ot-price-main'),
      promoInput: document.getElementById('ot-promo-input'),
      promoBtn: document.getElementById('ot-promo-btn'),
      promoSuccessIcon: document.getElementById('ot-promo-success-icon'),
      promoMessage: document.getElementById('ot-promo-message'),
      recurrent: document.getElementById('ot-recurrent'),
      consentSubscription: document.getElementById('ot-consent-subscription'),
      consentOffer: document.getElementById('ot-consent-offer'),
      payBtn: document.getElementById('ot-pay-btn'),
      pageNote: document.getElementById('ot-page-note')
    };

    function updateTopOffset() {
      const topRec = document.querySelector('#rec1914738151');
      const topH = topRec ? Math.round(topRec.getBoundingClientRect().height) : 88;
      document.documentElement.style.setProperty('--oneiro-topbar-h', topH + 'px');
    }

    function showPage() {
      document.documentElement.classList.remove('oneiro-auth-pending');
      els.loading.style.display = 'none';
      els.error.style.display = 'none';
      els.app.style.display = '';
    }

    function showError(message) {
      document.documentElement.classList.remove('oneiro-auth-pending');
      els.loading.style.display = 'none';
      els.app.style.display = 'none';
      els.error.style.display = 'block';
      els.error.textContent = message || 'Не удалось загрузить страницу оплаты.';
    }

    function redirectToLogin() {
      window.location.replace(LOGIN_URL);
    }

    function escapeHtml(str) {
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

function extractErrorMessage(json, text, fallback = 'Произошла ошибка.') {
  if (typeof json === 'string' && json.trim()) {
    return json.trim();
  }

  if (json && typeof json === 'object') {
    const candidates = [
      json.body,
      json.message,
      json.error,
      json.text,
      json.details,
      json.description,
      json.data?.body,
      json.data?.message,
      json.response?.body,
      json.response?.message
    ];

    for (const value of candidates) {
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }

  if (typeof text === 'string' && text.trim()) {
    return text.trim();
  }

  return fallback;
}

    function normalizeBoolean(value, fallback = false) {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
        if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
      }
      if (typeof value === 'number') return value === 1;
      return fallback;
    }

    function normalizePromoData(data) {
      return {
        user_promo: typeof data?.user_promo === 'string' ? data.user_promo : '',
        promo_rate:
          data?.promo_rate === '' || data?.promo_rate == null
            ? ''
            : Number(data.promo_rate),
        final_price:
          Number.isFinite(Number(data?.final_price))
            ? Number(data.final_price)
            : state.basePrice,
        payment_link:
          typeof data?.payment_link === 'string'
            ? data.payment_link.trim()
            : '',
        recurrent:
          data?.recurrent == null
            ? null
            : normalizeBoolean(data.recurrent, !!els.recurrent.checked)
      };
    }

    function formatPrice(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return '550 ₽';
      return `${n} ₽`;
    }

    function setPromoMessage(type, html) {
      els.promoMessage.className = 'ot-promo-message';
      if (!html) {
        els.promoMessage.style.display = 'none';
        els.promoMessage.innerHTML = '';
        return;
      }
      els.promoMessage.style.display = 'block';
      els.promoMessage.classList.add(type);
      els.promoMessage.innerHTML = html;
    }

    function setPromoControlsLoading(isLoading) {
      state.applyingPromo = !!isLoading;
      els.promoInput.disabled = !!isLoading || state.promoApplied;
      els.promoBtn.disabled = !!isLoading;
    }

    function setStateSyncLoading(isLoading) {
      state.syncingState = !!isLoading;
      els.recurrent.disabled = !!isLoading;
    }

    function updatePayButtonState() {
      const canPay =
        !!els.consentSubscription.checked &&
        !!els.consentOffer.checked &&
        !state.loading &&
        !state.applyingPromo &&
        !state.syncingState &&
        !!state.paymentLink;

      els.payBtn.disabled = !canPay;
      els.payBtn.textContent = `Перейти к оплате – ${formatPrice(state.finalPrice)}`;
      els.priceMain.textContent = `${formatPrice(state.basePrice)} в месяц`;
    }

    function getRecurrentValue() {
      return !!els.recurrent.checked;
    }

    function buildPromoStateUrl() {
      const url = new URL(PROMO_STATE_WEBHOOK_URL);
      url.searchParams.set('recurrent', String(getRecurrentValue()));
      url.searchParams.set('auto_renew', String(getRecurrentValue()));
      return url.toString();
    }

    function getAuthHeaders(extra = {}) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.session.access_token}`,
        tg_userid: String(state.sleepUser.tg_userid),
        email: state.sleepUser.email || state.session.user?.email || '',
        token: state.session.access_token,
        recurrent: String(getRecurrentValue()),
        auto_renew: String(getRecurrentValue()),
        ...extra
      };
    }

    function renderPromoStateFromData(rawData, options = {}) {
      const data = normalizePromoData(rawData);
      const fromApply = !!options.fromApply;
      const preserveMessage = !!options.preserveMessage;

      state.currentPromo = data.user_promo || '';
      state.promoRate = data.promo_rate;
      state.finalPrice = data.final_price;
      state.paymentLink = data.payment_link || '';
      state.promoApplied = !!state.currentPromo;

      if (data.recurrent !== null) {
        els.recurrent.checked = data.recurrent;
      }

      els.promoInput.value = state.currentPromo || '';
      els.pageNote.style.display = 'none';
      els.pageNote.textContent = '';

      if (state.promoApplied) {
        els.promoInput.disabled = true;
        els.promoBtn.style.display = 'none';
        els.promoSuccessIcon.style.display = 'inline-flex';

        const promoRateText =
          state.promoRate === '' || state.promoRate == null
            ? ''
            : `${state.promoRate}%`;

const successText = [
  'Поздравляем! У вас действует промокод',
  promoRateText ? ` на первый месяц: ${promoRateText}.` : '.',
  `<br>К оплате: <span class="ot-final-price">${formatPrice(state.finalPrice)}</span>`,
  ` <span class="ot-old-price">${formatPrice(state.basePrice)}</span>`
].join('');

        setPromoMessage('is-success', successText);
      } else {
        els.promoInput.disabled = false;
        els.promoBtn.style.display = '';
        els.promoSuccessIcon.style.display = 'none';

        if (!fromApply && !preserveMessage) {
          setPromoMessage('', '');
        }
      }

      updatePayButtonState();
    }

    async function getValidSession() {
      let { data, error } = await state.sb.auth.getSession();
      let session = data?.session || null;

      if (error || !session?.access_token) return null;

      const expiresAt = session.expires_at || 0;
      const now = Math.floor(Date.now() / 1000);
      const willExpireSoon = expiresAt && (expiresAt - now < 60);

      if (willExpireSoon) {
        const refreshed = await state.sb.auth.refreshSession();
        session = refreshed.data?.session || null;
      }

      return session;
    }

    async function loadSleepUser(authUserId) {
      const { data: sleepUser, error } = await state.sb
        .from('sleep_users')
        .select('id, tg_userid, email')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

      if (error) throw new Error('Ошибка чтения sleep_users');
      if (!sleepUser?.tg_userid) throw new Error('Не найден tg_userid пользователя');

      return sleepUser;
    }

    async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 30000) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        const text = await response.text();
        let json = null;

        try {
          json = text ? JSON.parse(text) : null;
        } catch (e) {
          json = null;
        }

        return { response, json, text };
      } finally {
        clearTimeout(timer);
      }
    }

    async function loadPromoState(options = {}) {
  const requestId = ++state.promoStateRequestId;
  const silent = !!options.silent;
  const preserveMessage = !!options.preserveMessage;

  if (!silent) {
    setStateSyncLoading(true);
    updatePayButtonState();
  }

  try {
    const { response, json, text } = await fetchJsonWithTimeout(
      buildPromoStateUrl(),
      {
        method: 'GET',
        headers: getAuthHeaders()
      },
      PROMO_STATE_TIMEOUT_MS
    );

    if (!response.ok) {
      throw new Error(
        extractErrorMessage(
          json,
          text,
          `Не удалось получить данные тарифа. Код ошибки: ${response.status}`
        )
      );
    }

    if (requestId !== state.promoStateRequestId) return;

    renderPromoStateFromData(json || {}, { preserveMessage });
  } finally {
    if (!silent && requestId === state.promoStateRequestId) {
      setStateSyncLoading(false);
      updatePayButtonState();
    }
  }
}

    async function syncPromoStateAfterApply() {
      await loadPromoState({ preserveMessage: false });
    }

async function applyPromo() {
  if (state.applyingPromo || state.promoApplied) return;

  const promo = String(els.promoInput.value || '').trim();
  if (!promo) {
    setPromoMessage('is-error', 'Введите промокод.');
    return;
  }

  setPromoControlsLoading(true);
  setPromoMessage('is-loading', 'Применение промокода...');

  try {
    const payload = {
      promo_code: promo,
      user_promo: promo,
      tg_userid: String(state.sleepUser.tg_userid),
      email: state.sleepUser.email || state.session.user?.email || '',
      recurrent: getRecurrentValue(),
      auto_renew: getRecurrentValue()
    };

    const { response, json, text } = await fetchJsonWithTimeout(
      APPLY_PROMO_WEBHOOK_URL,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      },
      APPLY_PROMO_TIMEOUT_MS
    );

    if (response.ok) {
      if (json && typeof json === 'object') {
        renderPromoStateFromData(json, { fromApply: true });
      }
      await syncPromoStateAfterApply();
      return;
    }

    els.promoInput.disabled = false;
    els.promoBtn.style.display = '';
    els.promoSuccessIcon.style.display = 'none';

    const errorMessage = extractErrorMessage(
      json,
      text,
      `Не удалось применить промокод. Код ошибки: ${response.status}`
    );

    setPromoMessage('is-error', escapeHtml(errorMessage));
    return;
  } catch (e) {
    const message =
      e && e.name === 'AbortError'
        ? 'Сервер слишком долго не отвечает. Попробуйте ещё раз.'
        : 'Не удалось применить промокод. Попробуйте ещё раз.';

    els.promoInput.disabled = false;
    els.promoBtn.style.display = '';
    els.promoSuccessIcon.style.display = 'none';
    setPromoMessage('is-error', escapeHtml(message));
  } finally {
    setPromoControlsLoading(false);

    if (state.promoApplied) {
      els.promoInput.disabled = true;
      els.promoBtn.style.display = 'none';
      els.promoSuccessIcon.style.display = 'inline-flex';
    }
    updatePayButtonState();
  }
}

    async function handleRecurrentChange() {
      if (state.loading || state.syncingState || state.applyingPromo) return;

      const promoMessageHtml = els.promoMessage.innerHTML;
      const promoMessageClass = els.promoMessage.className;
      const hasPromoMessage = !!promoMessageHtml;

      els.pageNote.style.display = 'none';
      els.pageNote.textContent = '';

      try {
        await loadPromoState({ preserveMessage: false });
      } catch (e) {
        if (hasPromoMessage) {
          els.promoMessage.className = promoMessageClass || 'ot-promo-message';
          els.promoMessage.style.display = 'block';
          els.promoMessage.innerHTML = promoMessageHtml;
        }
        els.pageNote.style.display = 'block';
        els.pageNote.textContent = 'Не удалось обновить данные тарифа. Попробуйте ещё раз.';
      }
    }

    function bindEvents() {
      els.promoBtn.addEventListener('click', applyPromo);

      els.promoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyPromo();
        }
      });

      els.promoInput.addEventListener('input', function () {
        if (!state.applyingPromo && !state.promoApplied) {
          setPromoMessage('', '');
        }
      });

      els.recurrent.addEventListener('change', handleRecurrentChange);
      els.consentSubscription.addEventListener('change', updatePayButtonState);
      els.consentOffer.addEventListener('change', updatePayButtonState);

      els.payBtn.addEventListener('click', function () {
        if (els.payBtn.disabled) return;

        if (!state.paymentLink) {
          els.pageNote.style.display = 'block';
          els.pageNote.textContent = 'Не удалось получить ссылку на оплату. Попробуйте обновить страницу.';
          return;
        }

        els.pageNote.style.display = 'none';
        window.location.href = state.paymentLink;
      });

      state.sb.auth.onAuthStateChange((event, newSession) => {
        if (event === 'SIGNED_OUT' || !newSession?.access_token) {
          redirectToLogin();
        }
      });

      window.addEventListener('resize', updateTopOffset);

      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(updateTopOffset);
        const topRec = document.querySelector('#rec1914738151');
        if (topRec) ro.observe(topRec);
      }
    }

    async function init() {
      try {
        updateTopOffset();

        state.sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: {
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true
          }
        });

        state.session = await getValidSession();
        if (!state.session) {
          redirectToLogin();
          return;
        }

        const authUserId = state.session.user?.id || '';
        if (!authUserId) {
          redirectToLogin();
          return;
        }

        state.sleepUser = await loadSleepUser(authUserId);

        bindEvents();
        await loadPromoState();

        state.loading = false;
        updatePayButtonState();
        showPage();
      } catch (e) {
        console.error('[oneiro-tariff] init error', e);
        showError(e?.message || 'Не удалось загрузить страницу оплаты.');
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>