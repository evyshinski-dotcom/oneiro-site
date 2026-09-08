(function () {
  const config = window.ONEIRO_CONFIG;

  if (!config) {
    console.error('ONEIRO_CONFIG is not loaded');
    return;
  }

  const WEBHOOK_URL = config.n8n.generateCertPaymentLink;
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

  const publicOfferLink = document.getElementById('gift-link-public-offer');
  const privacyLink = document.getElementById('gift-link-privacy');

  if (publicOfferLink) {
    publicOfferLink.href = config.routes.publicOffer;
  }

  if (privacyLink) {
    privacyLink.href = config.routes.privacy;
  }

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
