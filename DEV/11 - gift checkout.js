<style>
:root {
  --oneiro-bg:#f4f4f6; --oneiro-card:#fbfbfc; --oneiro-text:#111;
  --oneiro-muted:#666c80; --oneiro-border:#e5e7ef; --oneiro-primary:#2a195b;
  --oneiro-primary-hover:#382678; --oneiro-primary-disabled:#c9c7d6;
  --oneiro-shadow:0 2px 10px rgba(32,33,36,.03); --oneiro-radius-xl:28px;
}

html, body, #allrecords {
  overflow-x:hidden!important;
  background:var(--oneiro-bg)!important;
}

#oneiro-gift-checkout {
  padding:4px 16px 24px;
  background:var(--oneiro-bg);
  font-family:TildaSans,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
  color:var(--oneiro-text);
  box-sizing:border-box;
}

#oneiro-gift-checkout * { box-sizing:border-box; }

.ogift-wrap {
  width:100%;
  max-width:760px;
  margin:0 auto;
}

.ogift-card {
  background:var(--oneiro-card);
  border-radius:var(--oneiro-radius-xl);
  box-shadow:var(--oneiro-shadow);
}

.ogift-product {
  display:flex;
  align-items:center;
  gap:16px;
  padding:16px 20px;
  margin-bottom:14px;
}

.ogift-icon {
  width:88px;
  min-width:88px;
  height:88px;
  border-radius:50%;
  overflow:hidden;
  background:#fff;
  border:1px solid var(--oneiro-border);
  display:flex;
  align-items:center;
  justify-content:center;
}

.ogift-icon img {
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

.ogift-product-name {
  font-size:16px;
  line-height:1.25;
  font-weight:400;
  margin:0 0 4px;
}

.ogift-product-desc {
  font-size:14px;
  line-height:1.35;
  color:#444;
  margin:0;
}

.ogift-main {
  display:grid;
  grid-template-columns:1fr 300px;
  gap:16px;
  align-items:stretch;
}

.ogift-summary,
.ogift-preview-card {
  padding:20px 22px 18px;
  height:100%;
}

.ogift-preview-card {
  display:flex;
  align-items:center;
  justify-content:center;
}

.ogift-price {
  font-size:32px;
  line-height:1.05;
  font-weight:400;
  letter-spacing:-.02em;
  margin-bottom:22px;
}

.ogift-list {
  display:grid;
  gap:12px;
}

.ogift-row {
  display:flex;
  justify-content:space-between;
  gap:14px;
  padding-bottom:12px;
  border-bottom:1px solid #eceef5;
  font-size:14px;
  line-height:1.35;
}

.ogift-row:last-child { border-bottom:0; }

.ogift-label { color:var(--oneiro-muted); }
.ogift-value { text-align:right; color:#111; }

.ogift-consents {
  margin-top:28px;
  display:flex;
  flex-direction:column;
  gap:14px;
}

.ogift-check {
  display:flex;
  align-items:flex-start;
  gap:8px;
  font-size:14px;
  line-height:1.4;
  color:#3f3f3f;
}

.ogift-check input {
  position:absolute;
  opacity:0;
  pointer-events:none;
}

.ogift-check-box {
  width:15px;
  min-width:15px;
  height:15px;
  margin-top:2px;
  border-radius:50%;
  background:#000;
  color:#fff;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:9px;
  line-height:1;
}

.ogift-check input:not(:checked) + .ogift-check-box { opacity:.35; }

.ogift-check a {
  color:#4b84c6;
  text-decoration:underline;
  text-underline-offset:2px;
}

.ogift-footer {
  margin-top:26px;
  display:flex;
  justify-content:center;
}

.ogift-pay-btn {
  width:244px;
  max-width:100%;
  height:46px;
  border:none;
  border-radius:999px;
  background:var(--oneiro-primary);
  color:#fff;
  font-size:14px;
  font-weight:400;
  cursor:pointer;
  box-shadow:0 4px 14px rgba(42,25,91,.12);
}

.ogift-pay-btn:hover:not(:disabled) { background:var(--oneiro-primary-hover); }

.ogift-pay-btn:disabled {
  background:var(--oneiro-primary-disabled);
  cursor:not-allowed;
  box-shadow:none;
}

.ogift-note {
  display:none;
  margin-top:12px;
  text-align:center;
  color:var(--oneiro-muted);
  font-size:12px;
  line-height:1.35;
}

/* phone preview */
.ogift-phone-preview {
  position:relative;
  width:270px;
  max-width:100%;
  margin:0 auto;
}

.ogift-phone-frame {
  display:block;
  width:100%;
  position:relative;
  z-index:3;
  pointer-events:none;
}

.ogift-phone-screen {
  position:absolute;
  left:10.4%;
  right:10.4%;
  top:6.1%;
  bottom:6.1%;
  z-index:1;
  border-radius:26px;
  overflow:hidden;
  background:#fff;
}

.ogift-phone-safe {
  width:100%;
  height:100%;
  padding:16px 14px;
  background:#fff;
}

.ogift-mail-client {
  width:100%;
  height:100%;
  overflow:hidden;
  border-radius:20px;
  background:#fff;
  display:flex;
  flex-direction:column;
}

.ogift-mail-client-top {
  display:flex;
  align-items:center;
  gap:6px;
  padding:8px 2px 7px;
  border-bottom:1px solid rgba(42,25,91,.08);
  background:#fff;
  flex-shrink:0;
}

.ogift-mail-client-top img {
  width:22px;
  height:22px;
  border-radius:50%;
}

.ogift-mail-from {
  font-size:9.5px;
  line-height:1.15;
  font-weight:700;
  color:#2A195B;
  white-space:nowrap;
}

.ogift-mail-to {
  font-size:8.5px;
  line-height:1.2;
  color:rgba(0,0,0,.48);
  white-space:nowrap;
}

.ogift-email {
  flex:1;
  width:100%;
  min-height:0;
  overflow:hidden;
  background:
    radial-gradient(circle at 92% 0%, var(--gift-accent,#D556FD) 0, transparent 34%),
    linear-gradient(180deg,var(--gift-soft,#F3F7FE) 0%,#fff 42%);
}

.ogift-email-inner {
  padding:15px 2px 9px;
}

.ogift-kicker {
  font-size:8.5px;
  letter-spacing:.11em;
  text-transform:uppercase;
  color:#8B8CA4;
  margin-bottom:9px;
}

.ogift-logo {
  color:var(--gift-primary,#2A195B);
  font-size:14px;
  line-height:1;
  font-weight:700;
  letter-spacing:.04em;
  margin-bottom:11px;
}

.ogift-email h3 {
  margin:0 0 8px;
  font-size:12.5px;
  line-height:1.18;
  font-weight:600;
}

.ogift-email h3::after {
  content:"";
  display:inline-block;
  width:.72em;
  height:.72em;
  margin-left:.45em;
  border-radius:50%;
  background:var(--gift-accent,#D556FD);
  vertical-align:.02em;
}

.ogift-email p {
  margin:0 0 10px;
  font-size:9.5px;
  line-height:1.38;
  color:rgba(0,0,0,.72);
}

.ogift-message {
  margin-bottom:10px;
  padding:9px;
  border-radius:12px;
  background:var(--gift-soft,#F3F7FE);
  font-size:9.5px;
  line-height:1.38;
}

.ogift-email-btn {
  display:block;
  width:100%;
  height:32px;
  border-radius:999px;
  background:var(--gift-primary,#2A195B);
  color:#fff!important;
  text-align:center;
  line-height:32px;
  font-size:9.5px;
  font-weight:600;
  cursor:default;
  user-select:none;
}

@media (max-width:780px) {
  .ogift-main {
    grid-template-columns:1fr;
  }

  .ogift-preview-card {
    order:-1;
  }
}

@media (max-width:680px) {
  #oneiro-gift-checkout { padding:6px 12px 20px; }

  .ogift-product {
    gap:14px;
    padding:14px 16px;
  }

  .ogift-icon {
    width:74px;
    min-width:74px;
    height:74px;
  }

  .ogift-product-name { font-size:15px; }
  .ogift-product-desc { font-size:13px; }

  .ogift-summary,
  .ogift-preview-card {
    padding:18px 16px 16px;
  }

  .ogift-price { font-size:26px; }

  .ogift-pay-btn {
    width:100%;
  }

  .ogift-phone-preview {
    width:min(254px, 100%);
  }
}
</style>

<div id="oneiro-gift-checkout">
  <div class="ogift-wrap">
    <div class="ogift-card ogift-product">
      <div class="ogift-icon">
        <img src="https://static.tildacdn.com/tild3664-3165-4164-a364-653434313536/circle.png" alt="Онейро">
      </div>
      <div>
        <div class="ogift-product-name">Подарочный сертификат Онейро</div>
        <div class="ogift-product-desc" id="gift-product-desc">Доступ: 50 запросов на 1 месяц</div>
      </div>
    </div>

    <div class="ogift-main">
      <div class="ogift-card ogift-summary">
        <div class="ogift-price" id="gift-price">550 ₽</div>

        <div class="ogift-list">
          <div class="ogift-row">
            <div class="ogift-label">Срок</div>
            <div class="ogift-value" id="gift-plan">1 месяц</div>
          </div>
          <div class="ogift-row">
            <div class="ogift-label">Лимит</div>
            <div class="ogift-value" id="gift-requests">50 запросов</div>
          </div>
          <div class="ogift-row">
            <div class="ogift-label">Получатель</div>
            <div class="ogift-value" id="gift-email">happy_mom@example.com</div>
          </div>
          <div class="ogift-row">
            <div class="ogift-label">Отправка</div>
            <div class="ogift-value" id="gift-send">Сразу после оплаты</div>
          </div>
        </div>

        <div class="ogift-consents">
          <label class="ogift-check">
            <input type="checkbox" id="gift-consent-offer" checked>
            <span class="ogift-check-box">✓</span>
            <span>
              Согласен с
              <a href="https://oneiro-mom.ru/public-offer" target="_blank">офертой</a>
              и
              <a href="https://oneiro-mom.ru/privacy" target="_blank">политикой обработки персональных данных</a>
            </span>
          </label>
        </div>

        <div class="ogift-footer">
          <button id="gift-pay-btn" class="ogift-pay-btn" type="button">
            Перейти к оплате – 550 ₽
          </button>
        </div>

        <div class="ogift-note" id="gift-note"></div>
      </div>

      <div class="ogift-card ogift-preview-card">
        <div class="ogift-phone-preview">
          <img
            class="ogift-phone-frame"
            src="https://static.tildacdn.com/tild3039-3437-4831-a664-303062653231/smartphone-frame.png"
            alt=""
          >

          <div class="ogift-phone-screen">
            <div class="ogift-phone-safe">
              <div class="ogift-mail-client">

                <div class="ogift-mail-client-top">
                  <img
                    src="https://static.tildacdn.com/tild3162-6265-4134-b862-373864616638/db5a494f-3f76-4a9f-9.png"
                    alt=""
                  >
                  <div>
                    <div class="ogift-mail-from">От: Oneiro-bot</div>
                    <div class="ogift-mail-to" id="gift-mail-to">Кому: happy_mom@example.com</div>
                  </div>
                </div>

                <div class="ogift-email" id="gift-email-preview">
                  <div class="ogift-email-inner">
                    <div class="ogift-kicker">Электронный сертификат</div>
                    <div class="ogift-logo">ОНЕЙРО</div>

                    <h3 id="gift-preview-title">Для вас подарок</h3>

                    <p id="gift-preview-giver">
                      Сертификат Онейро — заботливого бота-консультанта по детскому сну.
                    </p>

                    <div class="ogift-message" id="gift-preview-message">
                      Пусть ночи станут спокойнее, а у вас появится больше сил для себя и малыша.
                    </div>

                    <span class="ogift-email-btn">Активировать сертификат</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
(function () {
  const WEBHOOK_URL = 'https://ivagulin.dedyn.io/webhook/dev/oneiro/generateCertPaymentLink';
  const params = new URLSearchParams(window.location.search);

  const themes = [
    { name: 'Палитра 1', primary: '#2A195B', soft: '#F3F7FE', accent: '#D556FD' },
    { name: 'Палитра 2', primary: '#2A195B', soft: '#D4DCE8', accent: '#8A96B3' },
    { name: 'Палитра 3', primary: '#2A195B', soft: '#F7DDEB', accent: '#F08BB7' },
    { name: 'Палитра 4', primary: '#2A195B', soft: '#F8F8FB', accent: '#D4DCE8' }
  ];

  const data = {
    product: params.get('product') || 'gift_certificate',
    plan: params.get('plan') || '1 месяц',
    period: params.get('period') || '30',
    price: params.get('price') || '550',
    requests: params.get('requests') || '50',
    requestsLabel: params.get('requests_label') || '50 запросов',
    email: params.get('recipient_email') || 'happy_mom@example.com',
    receiptEmail: params.get('receipt_email') || params.get('recipient_email') || 'happy_mom@example.com',
    receiptEmailSameAsRecipient: params.get('receipt_email_same_as_recipient') === 'yes',
    sendMode: params.get('send_mode') || 'instant',
    date: params.get('send_date') || '',
    time: params.get('send_time') || '',
    timezone: params.get('send_timezone') || '',
    sendUtc: params.get('send_utc') || '',
    theme: Number(params.get('theme') || 0),
    momName: params.get('mom_name') || '',
    fromName: params.get('from_name') || '',
    message: params.get('message') || 'Пусть ночи станут спокойнее, а у вас появится больше сил для себя и малыша.'
  };

  const theme = themes[data.theme] || themes[0];

  function formatPrice(value) {
    return Number(value).toLocaleString('ru-RU') + ' ₽';
  }
  
  function normalizeRequests(value) {
  return String(value || '').replace(/\D/g, '');
}

  function formatTimezone(value) {
    const timezoneLabels = {
      'Europe/Kaliningrad': 'Калининград — UTC+2',
      'Europe/Moscow': 'Москва — UTC+3',
      'Europe/Samara': 'Самара — UTC+4',
      'Asia/Yekaterinburg': 'Екатеринбург — UTC+5',
      'Asia/Omsk': 'Омск — UTC+6',
      'Asia/Krasnoyarsk': 'Красноярск — UTC+7',
      'Asia/Irkutsk': 'Иркутск — UTC+8',
      'Asia/Yakutsk': 'Якутск — UTC+9',
      'Asia/Vladivostok': 'Владивосток — UTC+10',
      'Asia/Magadan': 'Магадан — UTC+11',
      'Asia/Kamchatka': 'Камчатка — UTC+12',
      'Europe/London': 'Лондон — UTC±0 / UTC+1',
      'Europe/Berlin': 'Берлин — UTC+1 / UTC+2',
      'Europe/Paris': 'Париж — UTC+1 / UTC+2',
      'Europe/Amsterdam': 'Амстердам — UTC+1 / UTC+2',
      'Europe/Rome': 'Рим — UTC+1 / UTC+2',
      'Europe/Madrid': 'Мадрид — UTC+1 / UTC+2',
      'Europe/Warsaw': 'Варшава — UTC+1 / UTC+2',
      'Europe/Istanbul': 'Стамбул — UTC+3',
      'Asia/Tbilisi': 'Тбилиси — UTC+4',
      'Asia/Yerevan': 'Ереван — UTC+4',
      'Asia/Baku': 'Баку — UTC+4',
      'Asia/Almaty': 'Алматы — UTC+5',
      'Asia/Tashkent': 'Ташкент — UTC+5',
      'Asia/Bishkek': 'Бишкек — UTC+6',
      'Asia/Dubai': 'Дубай — UTC+4',
      'Asia/Bangkok': 'Бангкок — UTC+7',
      'Asia/Shanghai': 'Шанхай — UTC+8',
      'Asia/Hong_Kong': 'Гонконг — UTC+8',
      'Asia/Singapore': 'Сингапур — UTC+8',
      'Asia/Seoul': 'Сеул — UTC+9',
      'Asia/Tokyo': 'Токио — UTC+9',
      'America/New_York': 'Нью-Йорк — UTC−5 / UTC−4',
      'America/Chicago': 'Чикаго — UTC−6 / UTC−5',
      'America/Denver': 'Денвер — UTC−7 / UTC−6',
      'America/Los_Angeles': 'Лос-Анджелес — UTC−8 / UTC−7',
      'America/Toronto': 'Торонто — UTC−5 / UTC−4',
      'Australia/Sydney': 'Сидней — UTC+10 / UTC+11',
      'Pacific/Auckland': 'Окленд — UTC+12 / UTC+13'
    };

    return timezoneLabels[value] || value;
  }

  function formatSend() {
    if (data.sendMode !== 'scheduled' || (!data.date && !data.time)) {
      return 'Сразу после оплаты';
    }

    const dateTime = [data.date, data.time].filter(Boolean).join(', ');
    const timezone = data.timezone ? ' (' + formatTimezone(data.timezone) + ')' : '';

    return dateTime + timezone;
  }

  function getPaymentPayload() {
    return {
      product: data.product,

      recipient_email: data.email,
      receipt_email: data.receiptEmail,
      receipt_email_same_as_recipient: data.receiptEmailSameAsRecipient,

      send_mode: data.sendMode,
      send_immediately: data.sendMode !== 'scheduled',
      send_date: data.sendMode === 'scheduled' ? data.date : '',
      send_time: data.sendMode === 'scheduled' ? data.time : '',
      send_timezone: data.sendMode === 'scheduled' ? data.timezone : '',
      send_utc: data.sendMode === 'scheduled' ? data.sendUtc : '',

      subscription: {
       plan: Number(data.period),
       requests: Number(data.requests),
       price: Number(data.price)
      },

      personalization: {
        mom_name: data.momName,
        from_name: data.fromName,
        message: data.message
      },

      theme: {
        index: data.theme,
        name: theme.name,
        primary: theme.primary,
        soft: theme.soft,
        accent: theme.accent
      },

      page_url: window.location.href
    };
  }

  function extractPaymentLink(result) {
    if (!result) return '';

    if (typeof result === 'string') {
      return /^https?:\/\//i.test(result.trim()) ? result.trim() : '';
    }

    return (
      result.payment_link ||
      result.paymentLink ||
      result.confirmation_url ||
      result.confirmationUrl ||
      result.url ||
      result.link ||
      result.data?.payment_link ||
      result.data?.paymentLink ||
      result.data?.confirmation_url ||
      result.data?.confirmationUrl ||
      result.data?.url ||
      result.body?.payment_link ||
      result.body?.paymentLink ||
      result.body?.confirmation_url ||
      result.body?.confirmationUrl ||
      result.body?.url ||
      ''
    );
  }

document.getElementById('gift-product-desc').textContent =
  'Доступ: ' + data.requestsLabel + ' на ' + data.plan;

  document.getElementById('gift-price').textContent = formatPrice(data.price);
  document.getElementById('gift-plan').textContent = data.plan;
  document.getElementById('gift-requests').textContent = data.requestsLabel;
  document.getElementById('gift-email').textContent = data.email;
  document.getElementById('gift-send').textContent = formatSend();
  document.getElementById('gift-mail-to').textContent = 'Кому: ' + data.email;

  document.getElementById('gift-preview-title').textContent =
    data.momName ? data.momName + ', для вас подарок' : 'Для вас подарок';

  document.getElementById('gift-preview-giver').textContent =
    data.fromName
      ? data.fromName + ' дарит вам сертификат Онейро — заботливого бота-консультанта по детскому сну.'
      : 'Сертификат Онейро — заботливого бота-консультанта по детскому сну.';

  document.getElementById('gift-preview-message').textContent = data.message;

  const preview = document.getElementById('gift-email-preview');
  preview.style.setProperty('--gift-primary', theme.primary);
  preview.style.setProperty('--gift-soft', theme.soft);
  preview.style.setProperty('--gift-accent', theme.accent);

  const payBtn = document.getElementById('gift-pay-btn');
  const consent = document.getElementById('gift-consent-offer');
  const note = document.getElementById('gift-note');

  payBtn.disabled = true;
  payBtn.textContent = 'Готовим ссылку...';
  note.style.display = 'block';
  note.textContent = 'Формируем ссылку на оплату...';

  function updatePayState() {
    payBtn.disabled = !consent.checked || !payBtn.dataset.paymentLink;
  }

  consent.addEventListener('change', updatePayState);

  payBtn.addEventListener('click', function () {
    if (payBtn.disabled || !payBtn.dataset.paymentLink) return;
    window.location.href = payBtn.dataset.paymentLink;
  });

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getPaymentPayload())
  })
    .then(async function(response) {
      const text = await response.text();
      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        result = text;
      }

      if (!response.ok) {
        throw new Error('Ошибка генерации ссылки');
      }

      const paymentLink = extractPaymentLink(result);

      if (!paymentLink) {
        throw new Error('В ответе не найдена ссылка на оплату');
      }

      payBtn.dataset.paymentLink = paymentLink;
      payBtn.textContent = 'Перейти к оплате – ' + formatPrice(data.price);
      note.style.display = 'none';
      note.textContent = '';

      updatePayState();
    })
    .catch(function(error) {
      console.error(error);

      payBtn.disabled = true;
      payBtn.textContent = 'Оплата недоступна';
      note.style.display = 'block';
      note.textContent = 'Не удалось сформировать ссылку на оплату. Обновите страницу или попробуйте позже.';
    });
})();
</script>