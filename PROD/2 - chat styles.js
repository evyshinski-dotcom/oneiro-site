<style>
:root {
  --oneiro-topbar-h: 67px;
  --oneiro-bottombar-h: 64px;
  --oneiro-chat-maxw: 1100px;

  --chat--color--primary: #2A195B;
  --chat--color--primary-shade-50: #5a4ee6;
  --chat--color--primary--shade-100: #4b41cc;
  --chat--color--secondary: #2A195B;
  --chat--color-secondary-shade-50: #5a4ee6;

  --chat--color-white: #ffffff;
  --chat--color-light: #f8f8fb;
  --chat--color-light-shade-50: #eef0f6;
  --chat--color-light-shade-100: #dcdff0;
  --chat--color-medium: #d2d4d9;
  --chat--color-dark: #2d2f45;
  --chat--color-disabled: #d2d4d9;
  --chat--color-typing: #404040;

  --chat--spacing: 1rem;
  --chat--border-radius: 12px;
  --chat--transition-duration: 0.15s;

  /* ✅ ВАЖНО: ставим TildaSans */
  --chat--font-family: 'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* ✅ уменьшаем базовый размер */
  --chat--font-size: 14px;

  --chat--header--background: #ffffff;
  --chat--header--color: var(--chat--color-dark);
  --chat--header--border-bottom: 1px solid var(--chat--color-light-shade-50);

  --chat--message--border-radius: 16px;
  --chat--message--bot--background: #ffffff;
  --chat--message--bot--color: var(--chat--color-dark);
  --chat--message--user--background: var(--chat--color--primary);
  --chat--message--user--color: #ffffff;

  --chat--textarea--height: 40px;
  --chat--textarea--max-height: 120px;

  --chat--input--border-radius: 20px;
  --chat--input--padding: 0.5rem 0.9rem;
  --chat--input--background: #ffffff;
  --chat--input--border: 1px solid var(--chat--color-light-shade-50);

  --chat--input--send--button--background: transparent;
  --chat--input--send--button--color: var(--chat--color--primary);
  --chat--input--send--button--background-hover: transparent;
  --chat--input--send--button--color-hover: var(--chat--color--primary-shade-50);

  --chat--body--background: #f8f8fb;
  --chat--footer--background: #ffffff;
  --chat--footer--color: var(--chat--color-dark);
}

/* 🔥 ЖЕСТКИЙ OVERRIDE (n8n его требует) */
#n8n-chat,
#n8n-chat * {
  font-family: 'TildaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

/* текст сообщений */
#n8n-chat .chat-body,
#n8n-chat .chat-body * {
  font-size: 14px !important;
  line-height: 1.45 !important;
}

/* инпут */
#n8n-chat textarea,
#n8n-chat input {
  font-size: 14px !important;
  line-height: 1.4 !important;
}

/* кнопки */
#n8n-chat button {
  font-size: 14px !important;
}

/* placeholder */
#n8n-chat textarea::placeholder {
  font-size: 14px !important;
}

/* чуть компактнее пузырьки */
#n8n-chat .chat-message {
  padding: 8px 12px !important;
}

/* остальной твой код без изменений ↓↓↓ */
html, body, #allrecords {
  overflow-x: hidden !important;
}

/* чат строго между верхним меню и нижним тулбаром */
#n8n-chat {
  position: fixed !important;
  top: var(--oneiro-topbar-h) !important;
  bottom: var(--oneiro-bottombar-h) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: min(100%, var(--oneiro-chat-maxw)) !important;
  max-width: var(--oneiro-chat-maxw) !important;
  margin: 0 !important;
  z-index: 20000 !important;
  background: #f8f8fb !important;
  overflow: hidden !important;
}

#n8n-chat,
#n8n-chat > div {
  max-width: none !important;
}

#n8n-chat .chat-window {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  min-height: 0 !important;
  margin: 0 !important;
  border-radius: 0 !important;
}

#n8n-chat .chat-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

#n8n-chat .chat-footer {
  flex-shrink: 0 !important;
  position: sticky !important;
  bottom: 0 !important;
  background: #ffffff !important;
  border-top: 1px solid #eef0f6;
}
</style>