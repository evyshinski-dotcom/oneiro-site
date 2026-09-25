window.ONEIRO_CONFIG = {
  env: 'prod',

  supabase: {
    url: 'https://oneiro-mom.ru/supabase',
    anonKey: 'sb_publishable_2EoT9T3U_4TOal3RJLzA5g_NTHekBX4'
  },

  routes: {
    login: '/login',
    chat: '/chat',
    checkout: '/checkout',
    telegramLinkage: '/telegram-linkage',
    giftCheckout: '/gift-checkout',
    subscriptionAgreement: 'https://oneiro-mom.ru/subscription_agreement',
    publicOffer: 'https://oneiro-mom.ru/public-offer',
    privacy: 'https://oneiro-mom.ru/privacy'
  },

  n8n: {
    chat: 'https://oneiro-mom.ru/webhook/0a7fc554-1d97-4b82-b33e-0bd563f4794c/chat',
    getUserInfo: 'https://oneiro-mom.ru/webhook/oneiro/getUserInfo',
    updateBabyInfo: 'https://oneiro-mom.ru/webhook/oneiro/updateBabyInfo',
    cancelAutorenew: 'https://oneiro-mom.ru/webhook/oneiro/cancelAutorenew',
    activateCertificate: 'https://oneiro-mom.ru/webhook/oneiro/activateCertificate',
    timeCalc: 'https://oneiro-mom.ru/webhook/oneiro/time-calc',
    generatePaymentData: 'https://oneiro-mom.ru/webhook/oneiro/generatePaymentData',
    setPromo: 'https://oneiro-mom.ru/webhook/oneiro/setPromo',
    postTGlinkRequest: 'https://oneiro-mom.ru/webhook/oneiro/postTGlinkRequest',
    generateCertPaymentLink: 'https://oneiro-mom.ru/webhook/oneiro/generateCertPaymentLink'
  },

  popups: {
    profile: '#popup:profile',
    timecalc: '#popup:timecalc'
  }
};
