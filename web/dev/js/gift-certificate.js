(function () {
  const config = window.ONEIRO_CONFIG;

  if (!config) {
    console.error('ONEIRO_CONFIG is not loaded');
    return;
  }

  const root = document.querySelector('.oneiro-gift-config');
  const modal = document.querySelector('.ogc-modal');
  const openBtn = root.querySelector('.ogc-personalize');
  const closeBtn = modal.querySelector('.ogc-modal-close');
  const backdrop = modal.querySelector('.ogc-modal-backdrop');
  const saveBtn = modal.querySelector('.ogc-save');
  const buyBtn = root.querySelector('.occ-buy-btn');

  if (buyBtn) {
    buyBtn.setAttribute('href', config.routes.giftCheckout);
  }

  const scheduleEnabled = root.querySelector('#ogc-schedule-enabled');
  const scheduleFields = root.querySelector('#ogc-schedule-fields');
  const sendModeButtons = root.querySelectorAll('.ogc-send-switch-btn');

  const sendDateInput = root.querySelector('#ogc-send-date');
  const sendTimeInput = root.querySelector('#ogc-send-time');
  const timezoneSelect = root.querySelector('#ogc-timezone');
  const receiptSameInput = root.querySelector('#ogc-receipt-same');
const receiptEmailField = root.querySelector('#ogc-receipt-email-field');
const receiptEmailInput = root.querySelector('#ogc-receipt-email');
const recipientEmailInput = root.querySelector('.ogc-field input[type="email"]');

function toggleReceiptEmailField() {
  receiptEmailField.hidden = receiptSameInput.checked;
  receiptEmailInput.required = !receiptSameInput.checked;

  if (receiptSameInput.checked) {
    receiptEmailInput.value = '';
  }
}

receiptSameInput.addEventListener('change', toggleReceiptEmailField);
toggleReceiptEmailField();

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  function formatPrice(value) {
    return Number(value).toLocaleString('ru-RU') + ' ₽';
  }

  root.querySelectorAll('input[name="oneiro-plan"]').forEach(function(input) {
    input.addEventListener('change', function() {
      buyBtn.textContent = 'Оформить сертификат';
    });
  });

  const themeData = [
    { primary: '#2A195B', soft: '#F3F7FE', accent: '#D556FD' },
    { primary: '#2A195B', soft: '#D4DCE8', accent: '#8A96B3' },
    { primary: '#2A195B', soft: '#F7DDEB', accent: '#F08BB7' },
    { primary: '#2A195B', soft: '#F8F8FB', accent: '#D4DCE8' }
  ];

  modal.querySelectorAll('.ogc-theme').forEach(function(btn, index) {
    btn.addEventListener('click', function() {
      modal.querySelectorAll('.ogc-theme').forEach(function(item) {
        item.classList.remove('is-active');
      });

      btn.classList.add('is-active');

      const theme = themeData[index];

      modal.style.setProperty('--ogc-primary', theme.primary);
      modal.style.setProperty('--ogc-soft', theme.soft);
      modal.style.setProperty('--ogc-accent', theme.accent);
    });
  });

  const nameInput = modal.querySelector('input[placeholder="Анна"]');
  const fromInput = modal.querySelector('input[placeholder="Мария"]');
  const messageInput = modal.querySelector('textarea');

  const previewTitle = modal.querySelector('[data-preview-title]');
  const previewGiver = modal.querySelector('[data-preview-giver]');
  const previewMessage = modal.querySelector('[data-preview-message]');

  function updatePreview() {
    const name = nameInput.value.trim();
    const from = fromInput.value.trim();
    const message = messageInput.value.trim();

    previewTitle.textContent = name
      ? name + ', для вас подарок'
      : 'Для вас подарок';

    previewGiver.textContent = from
      ? from + ' дарит вам сертификат Онейро — заботливого бота-консультанта по детскому сну.'
      : 'Сертификат Онейро — заботливого бота-консультанта по детскому сну.';

    previewMessage.textContent =
      message || 'Пусть ночи станут спокойнее, а у вас появится больше сил для себя и малыша.';
  }

  [nameInput, fromInput, messageInput].forEach(function(el) {
    el.addEventListener('input', updatePreview);
  });

  updatePreview();

  function getTimezoneOffsetMinutes(timeZone, date) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(date);

    const tz = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+0';
    const match = tz.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

    if (!match) return 0;

    const sign = match[1] === '-' ? -1 : 1;
    const hours = Number(match[2] || 0);
    const minutes = Number(match[3] || 0);

    return sign * (hours * 60 + minutes);
  }

  function getDateInTimezone(timeZone) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());

    return (
      parts.find(p => p.type === 'year').value + '-' +
      parts.find(p => p.type === 'month').value + '-' +
      parts.find(p => p.type === 'day').value
    );
  }

  function getTimeInTimezone(timeZone, date) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(date);

    return (
      parts.find(p => p.type === 'hour').value + ':' +
      parts.find(p => p.type === 'minute').value
    );
  }

  function zonedDateTimeToUtc(dateStr, timeStr, timeZone) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);

    const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
    const offset = getTimezoneOffsetMinutes(timeZone, utcGuess);

    return new Date(utcGuess.getTime() - offset * 60 * 1000);
  }

function pad2(value) {
  return String(value).padStart(2, '0');
}

function addDaysToDateString(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return [
    date.getUTCFullYear(),
    pad2(date.getUTCMonth() + 1),
    pad2(date.getUTCDate())
  ].join('-');
}

function populateTimeOptions() {
  if (!scheduleEnabled.checked || !sendDateInput.value || !timezoneSelect.value) return;

  const currentValue = sendTimeInput.value;
  const minTimestamp = Date.now() + 10 * 60 * 1000;

  sendTimeInput.innerHTML = '';

  for (let hour = 0; hour < 24; hour++) {
    const value = pad2(hour) + ':00';
    const selectedUtc = zonedDateTimeToUtc(sendDateInput.value, value, timezoneSelect.value);

    if (selectedUtc.getTime() > minTimestamp) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      sendTimeInput.appendChild(option);
    }
  }

  if (!sendTimeInput.options.length) {
    sendDateInput.value = addDaysToDateString(sendDateInput.value, 1);
    populateTimeOptions();
    return;
  }

  const hasCurrentValue = Array.from(sendTimeInput.options).some(function(option) {
    return option.value === currentValue;
  });

  sendTimeInput.value = hasCurrentValue ? currentValue : sendTimeInput.options[0].value;
}

function setMinDateTime() {
  const tz = timezoneSelect.value || 'Europe/Moscow';
  const minDate = getDateInTimezone(tz);

  sendDateInput.min = minDate;

  if (!sendDateInput.value || sendDateInput.value < minDate) {
    sendDateInput.value = minDate;
  }

  populateTimeOptions();
}

function validateSchedule() {
  if (!scheduleEnabled.checked) return true;

  setMinDateTime();

  const selectedUtc = zonedDateTimeToUtc(
    sendDateInput.value,
    sendTimeInput.value,
    timezoneSelect.value
  );

  if (selectedUtc.getTime() <= Date.now()) {
    setMinDateTime();
  }

  return true;
}

  function toggleScheduleFields() {
    scheduleFields.hidden = !scheduleEnabled.checked;

    if (scheduleEnabled.checked) {
      setMinDateTime();
    }
  }

  sendModeButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      sendModeButtons.forEach(function(item) {
        item.classList.toggle('is-active', item === btn);
      });

      scheduleEnabled.checked = btn.dataset.sendMode === 'scheduled';
      toggleScheduleFields();
    });
  });

  timezoneSelect.addEventListener('change', validateSchedule);
  sendDateInput.addEventListener('input', validateSchedule);
  sendTimeInput.addEventListener('change', validateSchedule);

  toggleScheduleFields();

  function getSelectedThemeIndex() {
    const themes = Array.from(modal.querySelectorAll('.ogc-theme'));
    return Math.max(0, themes.findIndex(btn => btn.classList.contains('is-active')));
  }

  function getSelectedPlan() {
  const checked = root.querySelector('input[name="oneiro-plan"]:checked');
  const label = checked.closest('.occ-plan');

  const title = label.querySelector('b')?.textContent.trim() || '';
  const requestsText = label.querySelector('small')?.textContent.trim() || '';
  const requests = requestsText.replace(/\D/g, '');

  let periodDays = '';
  if (title === '1 месяц') periodDays = '30';
  if (title === '3 месяца') periodDays = '90';
  if (title === '1 год') periodDays = '365';

  return {
    price: checked.value,
    title: title,
    periodDays: periodDays,
    requestsText: requestsText,
    requests: requests
  };
}

function buildGiftCheckoutUrl() {
  const plan = getSelectedPlan();

  const recipientEmail = recipientEmailInput?.value.trim() || '';
  const receiptEmail = receiptSameInput.checked
    ? recipientEmail
    : (receiptEmailInput?.value.trim() || '');

  const isScheduled = scheduleEnabled.checked;
  const sendDate = isScheduled ? sendDateInput.value : '';
  const sendTime = isScheduled ? sendTimeInput.value : '';
  const sendTimezone = isScheduled ? timezoneSelect.value : '';

  const sendUtc =
    isScheduled && sendDate && sendTime && sendTimezone
      ? zonedDateTimeToUtc(
          sendDate,
          sendTime,
          sendTimezone
        ).toISOString()
      : '';

  const momName = nameInput.value.trim();
  const fromName = fromInput.value.trim();
  const message = messageInput.value.trim();

  // Сохраняем параметры, с которыми пользователь пришёл на страницу:
  // etext, ybaip, utm_source и другие рекламные метки
  const params = new URLSearchParams(window.location.search);

  params.set('product', 'gift_certificate');
  params.set('plan', plan.title);
  params.set('period', plan.periodDays);
  params.set('price', plan.price);
  params.set('requests', plan.requests);
  params.set('requests_label', plan.requestsText);
  params.set('recipient_email', recipientEmail);
  params.set('receipt_email', receiptEmail);
  params.set(
    'receipt_email_same_as_recipient',
    receiptSameInput.checked ? 'yes' : 'no'
  );
  params.set('send_mode', isScheduled ? 'scheduled' : 'instant');
  params.set('send_date', sendDate);
  params.set('send_time', sendTime);
  params.set('send_timezone', sendTimezone);
  params.set('send_utc', sendUtc);
  params.set('theme', String(getSelectedThemeIndex()));
  params.set('mom_name', momName);
  params.set('from_name', fromName);
  params.set('message', message);

  return config.routes.giftCheckout + '?' + params.toString();
}

buyBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const recipientEmail = recipientEmailInput?.value.trim() || '';

  if (!recipientEmail) {
    alert('Укажите email получателя сертификата');
    recipientEmailInput.focus();
    return;
  }

  if (
    !receiptSameInput.checked &&
    !(receiptEmailInput?.value.trim())
  ) {
    alert('Укажите email для отправки чека');
    receiptEmailInput.focus();
    return;
  }

  if (
    !receiptSameInput.checked &&
    receiptEmailInput.validity &&
    !receiptEmailInput.validity.valid
  ) {
    alert('Укажите корректный email для отправки чека');
    receiptEmailInput.focus();
    return;
  }

  if (scheduleEnabled.checked) {
    validateSchedule();
  }

  window.location.href = buildGiftCheckoutUrl();
});
})();
