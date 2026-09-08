window.ONEIRO_CONFIG = {
  env: 'prod',

  supabase: {
    url: 'https://ivagulin.dedyn.io/supabase',
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
    chat: 'https://ivagulin.dedyn.io/webhook/0a7fc554-1d97-4b82-b33e-0bd563f4794c/chat',
    getUserInfo: 'https://ivagulin.dedyn.io/webhook/oneiro/getUserInfo',
    updateBabyInfo: 'https://ivagulin.dedyn.io/webhook/oneiro/updateBabyInfo',
    cancelAutorenew: 'https://ivagulin.dedyn.io/webhook/oneiro/cancelAutorenew',
    activateCertificate: 'https://ivagulin.dedyn.io/webhook/oneiro/activateCertificate',
    timeCalc: 'https://ivagulin.dedyn.io/webhook/oneiro/time-calc',
    generatePaymentData: 'https://ivagulin.dedyn.io/webhook/oneiro/generatePaymentData',
    setPromo: 'https://ivagulin.dedyn.io/webhook/oneiro/setPromo',
    postTGlinkRequest: 'https://ivagulin.dedyn.io/webhook/oneiro/postTGlinkRequest',
    generateCertPaymentLink: 'https://ivagulin.dedyn.io/webhook/oneiro/generateCertPaymentLink'
  },

  popups: {
    profile: '#popup:profile',
    timecalc: '#popup:timecalc'
  }
};
