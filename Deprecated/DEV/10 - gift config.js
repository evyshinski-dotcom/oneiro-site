<section class="oneiro-gift-config">
  <div class="ogc-wrap">
    <h2 class="ogc-title">Подарите молодой маме спокойный сон</h2>

    <div class="ogc-layout">
      <div class="oneiro-visual">
        <img class="oneiro-back" src="https://static.tildacdn.com/tild3465-3266-4435-b537-636130653134/gift_card_oneiro.png" alt="Подарочный сертификат Онейро">

        <div class="oneiro-front">
          <div class="oneiro-label">ЭЛЕКТРОННЫЙ СЕРТИФИКАТ</div>
          <div class="oneiro-title">ОНЕЙРО</div>
          <div class="oneiro-card-text">
            Сертификат на доступ к боту-консультанту,
            который помогает наладить сон малыша
            и поддерживает маму в первые месяцы.
          </div>
        </div>
      </div>

      <div class="ogc-purchase">
        <div class="occ-plans">
          <label class="occ-plan">
            <input type="radio" name="oneiro-plan" value="550" checked>
            <span><b>1 месяц</b><small>50 запросов</small><em>550 ₽</em></span>
          </label>

          <label class="occ-plan">
            <input type="radio" name="oneiro-plan" value="1500">
            <span><b>3 месяца</b><small>150 запросов</small><em>1 500 ₽</em></span>
          </label>

          <label class="occ-plan">
            <input type="radio" name="oneiro-plan" value="5000">
            <span><b>1 год</b><small>600 запросов</small><em>5 000 ₽</em></span>
          </label>
        </div>

        <label class="ogc-field">
          <span>Email получателя</span>
          <input type="email" placeholder="happy_mom@example.com">
        </label>
        
        <label class="ogc-receipt-same">
  <input type="checkbox" id="ogc-receipt-same">
  <span class="ogc-receipt-check">✓</span>
  <span>Чек отправить на email получателя сертификата</span>
</label>

<label class="ogc-field" id="ogc-receipt-email-field">
  <span>Email для чека</span>
  <input type="email" id="ogc-receipt-email" placeholder="your_email@example.com">
</label>
		
		<div class="ogc-send-title">Когда отправить сертификат</div>
		
        <div class="ogc-send-switch">
          <button class="ogc-send-switch-btn is-active" type="button" data-send-mode="instant">
            Сразу после оплаты
          </button>

          <button class="ogc-send-switch-btn" type="button" data-send-mode="scheduled">
            Выбрать дату
          </button>

          <input type="checkbox" id="ogc-schedule-enabled" hidden>
        </div>

        <div class="ogc-schedule-fields" id="ogc-schedule-fields" hidden>
          <div class="ogc-row">
            <label class="ogc-field">
              <span>Дата отправки</span>
              <input type="date" id="ogc-send-date">
            </label>

            <label class="ogc-field">
              <span>Время</span>
              <select id="ogc-send-time"></select>
            </label>
          </div>

          <label class="ogc-field">
            <span>Часовой пояс</span>
            <select id="ogc-timezone">
  <optgroup label="Россия">
    <option value="Europe/Kaliningrad">Калининград — UTC+2</option>
    <option value="Europe/Moscow" selected>Москва — UTC+3</option>
    <option value="Europe/Samara">Самара — UTC+4</option>
    <option value="Asia/Yekaterinburg">Екатеринбург — UTC+5</option>
    <option value="Asia/Omsk">Омск — UTC+6</option>
    <option value="Asia/Krasnoyarsk">Красноярск — UTC+7</option>
    <option value="Asia/Irkutsk">Иркутск — UTC+8</option>
    <option value="Asia/Yakutsk">Якутск — UTC+9</option>
    <option value="Asia/Vladivostok">Владивосток — UTC+10</option>
    <option value="Asia/Magadan">Магадан — UTC+11</option>
    <option value="Asia/Kamchatka">Камчатка — UTC+12</option>
  </optgroup>

  <optgroup label="Европа">
    <option value="Europe/London">Лондон — UTC±0 / UTC+1</option>
    <option value="Europe/Berlin">Берлин — UTC+1 / UTC+2</option>
    <option value="Europe/Paris">Париж — UTC+1 / UTC+2</option>
    <option value="Europe/Amsterdam">Амстердам — UTC+1 / UTC+2</option>
    <option value="Europe/Rome">Рим — UTC+1 / UTC+2</option>
    <option value="Europe/Madrid">Мадрид — UTC+1 / UTC+2</option>
    <option value="Europe/Warsaw">Варшава — UTC+1 / UTC+2</option>
    <option value="Europe/Istanbul">Стамбул — UTC+3</option>
  </optgroup>

  <optgroup label="СНГ и Ближний Восток">
    <option value="Asia/Tbilisi">Тбилиси — UTC+4</option>
    <option value="Asia/Yerevan">Ереван — UTC+4</option>
    <option value="Asia/Baku">Баку — UTC+4</option>
    <option value="Asia/Almaty">Алматы — UTC+5</option>
    <option value="Asia/Tashkent">Ташкент — UTC+5</option>
    <option value="Asia/Bishkek">Бишкек — UTC+6</option>
    <option value="Asia/Dubai">Дубай — UTC+4</option>
  </optgroup>

  <optgroup label="Азия">
    <option value="Asia/Bangkok">Бангкок — UTC+7</option>
    <option value="Asia/Shanghai">Шанхай — UTC+8</option>
    <option value="Asia/Hong_Kong">Гонконг — UTC+8</option>
    <option value="Asia/Singapore">Сингапур — UTC+8</option>
    <option value="Asia/Seoul">Сеул — UTC+9</option>
    <option value="Asia/Tokyo">Токио — UTC+9</option>
  </optgroup>

  <optgroup label="Америка">
    <option value="America/New_York">Нью-Йорк — UTC−5 / UTC−4</option>
    <option value="America/Chicago">Чикаго — UTC−6 / UTC−5</option>
    <option value="America/Denver">Денвер — UTC−7 / UTC−6</option>
    <option value="America/Los_Angeles">Лос-Анджелес — UTC−8 / UTC−7</option>
    <option value="America/Toronto">Торонто — UTC−5 / UTC−4</option>
  </optgroup>

  <optgroup label="Океания">
    <option value="Australia/Sydney">Сидней — UTC+10 / UTC+11</option>
    <option value="Pacific/Auckland">Окленд — UTC+12 / UTC+13</option>
  </optgroup>
</select>
          </label>
        </div>

        <div class="ogc-actions">
          <button class="ogc-personalize" type="button">
            <span class="ogc-personalize-icon">🎨</span>
            <span>Настроить</span>
          </button>

          <a href="/dev-gift-checkout" class="occ-buy-btn" data-gift-checkout>
  Оформить сертификат
</a>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="ogc-modal" hidden>
  <div class="ogc-modal-backdrop"></div>

  <div class="ogc-modal-card">
    <button class="ogc-modal-close" type="button">×</button>

    <h3>Сделайте подарок особенным</h3>
    <p>Добавьте имя, пожелание и выберите оформление письма.</p>

    <div class="ogc-modal-layout">
      <div class="ogc-modal-preview">
        <div class="ogc-phone-preview">
          <img class="ogc-phone-frame" src="https://static.tildacdn.com/tild3039-3437-4831-a664-303062653231/smartphone-frame.png" alt="">

          <div class="ogc-phone-screen">
            <div class="ogc-phone-safe">
              <div class="ogc-mail-preview">
                <div class="ogc-mail-preview-top">
                  <img src="https://static.tildacdn.com/tild3162-6265-4134-b862-373864616638/db5a494f-3f76-4a9f-9.png" alt="">
                  <div>
                    <div class="ogc-mail-preview-from">От: Oneiro-bot</div>
                    <div class="ogc-mail-preview-to">Кому: happy_mom@example.com</div>
                  </div>
                </div>

                <div class="ogc-mail-preview-body">
                  <div class="ogc-mail-logo">ОНЕЙРО</div>
                  <h4 data-preview-title>Для вас подарок</h4>

                  <p data-preview-giver>
                    Сертификат Онейро — заботливого бота-консультанта по детскому сну.
                  </p>

                  <div class="ogc-mail-message" data-preview-message>
                    Пусть ночи станут спокойнее, а у вас появится больше сил для себя и малыша.
                  </div>

                  <button type="button">Активировать сертификат</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ogc-modal-form">
        <div class="ogc-modal-grid">
          <label class="ogc-field">
            <span>Имя мамы</span>
            <input type="text" placeholder="Анна">
          </label>

          <label class="ogc-field">
            <span>От кого</span>
            <input type="text" placeholder="Мария">
          </label>

          <label class="ogc-field">
            <span>Пожелание</span>
            <textarea rows="5">Пусть ночи станут спокойнее, а у вас появится больше сил для себя и малыша.</textarea>
          </label>
        </div>

        <div class="ogc-themes">
          <span>Оформление</span>

          <button class="ogc-theme is-active" type="button">
            <i style="background:#2A195B"></i>
            <i style="background:#F3F7FE"></i>
            <i style="background:#D556FD"></i>
          </button>

          <button class="ogc-theme" type="button">
            <i style="background:#2A195B"></i>
            <i style="background:#D4DCE8"></i>
            <i style="background:#8A96B3"></i>
          </button>

          <button class="ogc-theme" type="button">
            <i style="background:#2A195B"></i>
            <i style="background:#F7DDEB"></i>
            <i style="background:#F08BB7"></i>
          </button>

          <button class="ogc-theme" type="button">
            <i style="background:#2A195B"></i>
            <i style="background:#F8F8FB"></i>
            <i style="background:#D4DCE8"></i>
          </button>
        </div>

        <button class="ogc-save" type="button">Сохранить</button>
      </div>
    </div>
  </div>
</div>

<style>
.oneiro-gift-config {
  background: #fff;
  padding: 56px 20px;
  box-sizing: border-box;
  font-family: TildaSans, Arial, sans-serif;
  color: #111;
}

.oneiro-gift-config *,
.ogc-modal,
.ogc-modal * {
  box-sizing: border-box;
  font-family: TildaSans, Arial, sans-serif !important;
  -webkit-tap-highlight-color: transparent;
}

.ogc-wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.ogc-title {
  margin: 0 0 64px;
  text-align: center;
  white-space: normal;
  font-size: 46px;
  line-height: 1.08;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #111 !important;
}

.ogc-layout {
  display: grid;
  grid-template-columns: 520px 500px;
  gap: 56px;
  align-items: start;
  justify-content: center;
}

.oneiro-visual {
  position: relative;
  width: 520px;
  max-width: 100%;
  height: 340px;
}

.oneiro-back {
  position: absolute;
  width: 310px;
  left: 0;
  top: 24px;
  transform: rotate(-10deg);
  filter: drop-shadow(0 22px 46px rgba(42,25,91,0.16));
  z-index: 1;
}

.oneiro-front {
  position: absolute;
  width: 340px;
  right: 0;
  bottom: 22px;
  padding: 24px;
  border-radius: 22px;
  color: #fff;
  background: rgba(42, 25, 91, 0.24);
  backdrop-filter: blur(28px) saturate(170%);
  -webkit-backdrop-filter: blur(28px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.38);
  box-shadow: 0 28px 70px rgba(42,25,91,0.24), inset 0 1px 0 rgba(255,255,255,0.45);
  overflow: hidden;
  z-index: 2;
}

.oneiro-front::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255,255,255,0.36), transparent 42%),
    radial-gradient(circle at 18% 8%, rgba(213,86,253,0.22), transparent 38%);
  mix-blend-mode: overlay;
  pointer-events: none;
}

.oneiro-label,
.oneiro-title,
.oneiro-card-text {
  position: relative;
}

.oneiro-label {
  font-size: 9px;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.72;
  margin-bottom: 10px;
}

.oneiro-title {
  font-size: 31px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 14px;
}

.oneiro-card-text {
  font-size: 13px;
  line-height: 1.4;
  opacity: 0.9;
}

.ogc-purchase {
  border-radius: 28px;
  background: #F8F8FB;
  border: 1px solid rgba(42,25,91,.08);
  box-shadow: 0 24px 70px rgba(42,25,91,.08);
  padding: 24px;
}

.occ-plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-bottom: 16px;
}

.occ-plan {
  cursor: pointer;
}

.occ-plan input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.occ-plan span {
  min-height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 12px 8px;
  border-radius: 18px;
  border: 1px solid rgba(42,25,91,.13);
  background: #fff;
  text-align: center;
}

.occ-plan input:checked + span {
  border-color: #2A195B;
  box-shadow: inset 0 0 0 1px #2A195B;
}

.occ-plan b,
.occ-plan small,
.occ-plan em {
  display: block;
  font-style: normal;
}

.occ-plan b {
  font-size: 14px;
  color: #111;
}

.occ-plan small {
  font-size: 11px;
  line-height: 1.2;
  color: rgba(0,0,0,.52);
}

.occ-plan em {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  color: #2A195B;
}

.ogc-field {
  display: block;
  margin-bottom: 12px;
}

.ogc-field span {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(0,0,0,.7);
}

.ogc-field input,
.ogc-field textarea,
.ogc-field select {
  width: 100%;
  min-width: 0;
  border: 1px solid rgba(42,25,91,.13);
  border-radius: 16px;
  padding: 13px 14px;
  background: #fff;
  font-size: 15px;
  color: #111;
  outline: none;
}

.ogc-field input:focus,
.ogc-field textarea:focus,
.ogc-field select:focus {
  border-color: #2A195B;
}

.ogc-receipt-same {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: -2px 0 12px;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(0,0,0,.62);
  cursor: pointer;
}

.ogc-receipt-same input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ogc-receipt-check {
  width: 15px;
  min-width: 15px;
  height: 15px;
  margin-top: 1px;
  border-radius: 50%;
  background: #2A195B;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  line-height: 1;
}

.ogc-receipt-same input:not(:checked) + .ogc-receipt-check {
  opacity: .28;
}

#ogc-receipt-email-field[hidden] {
  display: none;
}

.ogc-send-title {
  margin: 4px 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(0,0,0,.7);
}

.ogc-send-switch {
  display: flex;
  gap: 6px;
  margin: 4px 0 14px;
  padding: 4px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(42,25,91,.1);
}

.ogc-send-switch-btn {
  flex: 1;
  min-height: 42px;
  padding: 9px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(0,0,0,.56);
  font-family: TildaSans, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.25;
  font-weight: 600;
  cursor: pointer;
}

.ogc-send-switch-btn.is-active {
  background: #F3F7FE;
  color: #2A195B;
  box-shadow: inset 0 0 0 1px rgba(42,25,91,.12);
}

.ogc-schedule-fields[hidden] {
  display: none;
}

.ogc-row {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 10px;
}

.ogc-actions {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin-top: 6px;
}

.ogc-personalize {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  height: 54px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(42,25,91,.14);
  background: #fff;
  color: #2A195B;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(42,25,91,.08);
  transition: .18s ease;
}

.ogc-personalize:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 32px rgba(42,25,91,.12);
}

.ogc-personalize-icon {
  font-size: 18px;
  line-height: 1;
}

.occ-buy-btn,
.ogc-save {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 54px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  background: #2A195B !important;
  color: #fff !important;
  text-decoration: none !important;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0 14px 34px rgba(42,25,91,.24);
  cursor: pointer;
  white-space: nowrap;
}

.occ-buy-btn:hover,
.occ-buy-btn:focus,
.occ-buy-btn:visited {
  color: #fff !important;
  text-decoration: none !important;
}

.ogc-modal[hidden] {
  display: none;
}

.ogc-modal {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  overflow: hidden;
}

.ogc-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17,17,17,.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.ogc-modal-card {
  position: relative;
  width: min(1080px, calc(100dvw - 36px));
  max-height: calc(100dvh - 36px);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 32px;
  background: #fff;
  padding: 34px;
  box-shadow: 0 34px 90px rgba(42,25,91,.22);
}

.ogc-modal-close {
  position: absolute;
  right: 18px;
  top: 16px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #F8F8FB;
  color: #111;
  font-size: 24px;
  cursor: pointer;
}

.ogc-modal-card h3 {
  margin: 0 42px 8px 0;
  font-size: 30px;
  font-weight: 600;
  color: #111 !important;
}

.ogc-modal-card p {
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.45;
  color: rgba(0,0,0,.64) !important;
}

.ogc-modal-layout {
  display: grid;
  grid-template-columns: minmax(0, 390px) minmax(0, 1fr);
  gap: 34px;
  align-items: start;
  min-width: 0;
}

.ogc-modal-preview,
.ogc-modal-form {
  min-width: 0;
}

.ogc-phone-preview {
  position: relative;
  width: 330px;
  max-width: 100%;
  margin: 0 auto;
}

.ogc-phone-frame {
  display: block;
  width: 100%;
  position: relative;
  z-index: 3;
  pointer-events: none;
}

.ogc-phone-screen {
  position: absolute;
  left: 10.4%;
  right: 10.4%;
  top: 6.1%;
  bottom: 6.1%;
  z-index: 1;
  border-radius: 30px;
  overflow: hidden;
  background: #fff;
}

.ogc-phone-safe {
  width: 100%;
  height: 100%;
  padding: 20px 18px;
  background: #fff;
}

.ogc-mail-preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  background:
    radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--ogc-accent, #D556FD) 34%, transparent), transparent 34%),
    linear-gradient(180deg, var(--ogc-soft, #F3F7FE) 0%, #fff 42%);
}

.ogc-mail-preview-top {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 4px 8px;
  border-bottom: 1px solid color-mix(in srgb, var(--ogc-primary, #2A195B) 10%, transparent);
  background: rgba(255,255,255,.72);
  flex-shrink: 0;
}

.ogc-mail-preview-top img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}

.ogc-mail-preview-from {
  font-size: 9.6px;
  line-height: 1.15;
  font-weight: 700;
  color: var(--ogc-primary, #2A195B);
  white-space: nowrap;
}

.ogc-mail-preview-to {
  font-size: 8.6px;
  line-height: 1.2;
  color: rgba(0,0,0,.48);
  white-space: nowrap;
}

.ogc-mail-preview-body {
  padding: 18px 2px 10px;
  overflow: hidden;
}

.ogc-mail-logo {
  margin-bottom: 13px;
  color: var(--ogc-primary, #2A195B);
  font-size: 15px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: .04em;
}

.ogc-mail-preview-body h4 {
  margin: 0 0 9px;
  font-size: 13.5px;
  line-height: 1.18;
  font-weight: 600;
  color: #111;
  word-break: break-word;
}

.ogc-mail-preview-body h4::after {
  content: "";
  display: inline-block;
  width: .72em;
  height: .72em;
  margin-left: .45em;
  border-radius: 50%;
  background: var(--ogc-accent, #D556FD);
  box-shadow: 0 0 14px color-mix(in srgb, var(--ogc-accent, #D556FD) 70%, transparent);
  vertical-align: .02em;
}

.ogc-mail-preview-body p {
  margin: 0 0 11px;
  font-size: 10.2px;
  line-height: 1.42;
  color: rgba(0,0,0,.72);
  word-break: break-word;
}

.ogc-mail-message {
  margin-bottom: 11px;
  padding: 10px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--ogc-soft, #F3F7FE) 86%, #fff);
  border: 1px solid color-mix(in srgb, var(--ogc-primary, #2A195B) 9%, transparent);
  font-size: 10.2px;
  line-height: 1.42;
  word-break: break-word;
}

.ogc-mail-preview-body button {
  width: 100%;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: var(--ogc-primary, #2A195B);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 0 8px;
  flex-shrink: 0;
  box-shadow: 0 10px 22px color-mix(in srgb, var(--ogc-primary, #2A195B) 24%, transparent);
}

.ogc-modal-grid {
  display: grid;
  gap: 12px;
}

.ogc-themes {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0;
  flex-wrap: wrap;
}

.ogc-themes > span {
  font-size: 13px;
  font-weight: 700;
  color: rgba(0,0,0,.7);
}

.ogc-theme {
  width: 46px;
  height: 32px;
  border-radius: 12px;
  border: 1px solid rgba(42,25,91,.13);
  background: #fff;
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  cursor: pointer;
}

.ogc-theme i {
  border-radius: 6px;
}

.ogc-theme.is-active {
  border-color: var(--ogc-primary, #2A195B);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--ogc-primary, #2A195B) 12%, transparent);
}

@media (max-width: 980px) {
  .ogc-title {
    font-size: 38px;
  }

  .ogc-layout {
    grid-template-columns: 1fr;
    gap: 42px;
    justify-content: stretch;
  }

  .oneiro-visual {
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
  }

  .ogc-modal-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .ogc-phone-preview {
    width: 310px;
  }
}

@media (max-width: 640px) {
  .oneiro-gift-config {
    padding: 42px 16px;
    overflow: hidden;
  }

  .ogc-title {
    font-size: 32px;
    margin-bottom: 48px;
  }

  .oneiro-visual {
    position: relative;
    width: 100%;
    max-width: 360px;
    height: 300px;
    margin: 0 auto;
  }

  .oneiro-back {
    width: 240px;
    left: 0;
    top: 28px;
  }

  .oneiro-front {
    width: 260px;
    left: auto;
    right: 0;
    bottom: 20px;
  }

  .ogc-purchase {
    padding: 20px;
  }

  .occ-plans {
    grid-template-columns: 1fr;
  }

  .occ-plan span {
    min-height: auto;
  }

  .ogc-modal {
    align-items: flex-start;
    padding: 10px;
    overflow: hidden;
  }

  .ogc-modal-card {
    width: calc(100dvw - 20px);
    max-height: calc(100dvh - 20px);
    padding: 20px;
    border-radius: 24px;
    overflow-x: hidden;
  }

  .ogc-modal-card h3 {
    font-size: 24px;
    margin-right: 42px;
  }

  .ogc-modal-card p {
    font-size: 14px;
    margin-bottom: 18px;
  }

  .ogc-phone-preview {
    width: min(280px, 100%);
  }

  .ogc-phone-safe {
    padding: 18px 16px;
  }

  .ogc-mail-preview-body {
    padding: 16px 2px 9px;
  }
}

@media (max-width: 440px) {
  .oneiro-visual {
    max-width: 320px;
    height: 260px;
  }

  .oneiro-back {
    width: 210px;
    top: 24px;
  }

  .oneiro-front {
    width: 220px;
    right: 0;
    bottom: 10px;
    padding: 20px;
  }

  .ogc-row,
  .ogc-actions {
    grid-template-columns: 1fr;
  }

  .ogc-send-switch {
    flex-direction: column;
    border-radius: 20px;
  }

  .ogc-send-switch-btn {
    border-radius: 16px;
  }

  .ogc-personalize {
    width: 100%;
  }

  .oneiro-title {
    font-size: 26px;
  }

  .ogc-modal {
    padding: 8px;
  }

  .ogc-modal-card {
    width: calc(100dvw - 16px);
    max-height: calc(100dvh - 16px);
    padding: 16px;
    border-radius: 22px;
  }

  .ogc-phone-preview {
    width: min(254px, 100%);
  }

  .ogc-phone-screen {
    border-radius: 26px;
  }

  .ogc-phone-safe {
    padding: 16px 14px;
  }

  .ogc-mail-preview-top {
    padding: 8px 2px 7px;
    gap: 5px;
  }

  .ogc-mail-preview-body {
    padding: 13px 1px 8px;
  }

  .ogc-mail-logo {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .ogc-mail-preview-body h4 {
    font-size: 12.2px;
  }

  .ogc-mail-preview-body p,
  .ogc-mail-message {
    font-size: 9.5px;
  }

  .ogc-mail-preview-body button {
    height: 33px;
    font-size: 9.5px;
  }
}
</style>

<script>
(function () {
  const root = document.querySelector('.oneiro-gift-config');
  const modal = document.querySelector('.ogc-modal');
  const openBtn = root.querySelector('.ogc-personalize');
  const closeBtn = modal.querySelector('.ogc-modal-close');
  const backdrop = modal.querySelector('.ogc-modal-backdrop');
  const saveBtn = modal.querySelector('.ogc-save');
  const buyBtn = root.querySelector('.occ-buy-btn');

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

  return '/dev-gift-checkout?' + params.toString();
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
</script>