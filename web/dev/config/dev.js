window.ONEIRO_CONFIG = {
  env: 'dev',

  supabase: {
    url: 'https://oneiro-mom.ru/supabase-dev',
    anonKey: 'sb_publishable_E9xJ0O9l3Frwog9qREIsXg_agRUx9oF'
  },

  routes: {
    login: '/DEV-login',
    chat: '/DEV-chat',
    checkout: '/DEV-checkout',
    telegramLinkage: '/DEV-telegram-linkage',
    giftCheckout: '/DEV-gift-checkout',
    subscriptionAgreement: 'https://oneiro-mom.ru/subscription_agreement',
    publicOffer: 'https://oneiro-mom.ru/public-offer',
    privacy: 'https://oneiro-mom.ru/privacy'
  },

  n8n: {
    chat: 'https://oneiro-mom.ru/webhook/57607eb8-5004-4dec-ae86-4972c652b50f/chat',
    getUserInfo: 'https://oneiro-mom.ru/webhook/dev/oneiro/getUserInfo',
    updateBabyInfo: 'https://oneiro-mom.ru/webhook/dev/oneiro/updateBabyInfo',
    cancelAutorenew: 'https://oneiro-mom.ru/webhook/dev/oneiro/cancelAutorenew',
    activateCertificate: 'https://oneiro-mom.ru/webhook/dev/oneiro/activateCertificate',
    timeCalc: 'https://oneiro-mom.ru/webhook/dev/oneiro/time-calc',
    generatePaymentData: 'https://oneiro-mom.ru/webhook/dev/oneiro/generatePaymentData',
    setPromo: 'https://oneiro-mom.ru/webhook/dev/oneiro/setPromo',
    postTGlinkRequest: 'https://oneiro-mom.ru/webhook/dev/oneiro/postTGlinkRequest',
    generateCertPaymentLink: 'https://oneiro-mom.ru/webhook/dev/oneiro/generateCertPaymentLink'
  },

  popups: {
    profile: '#popup:profile',
    timecalc: '#popup:timecalc'
  }
};
