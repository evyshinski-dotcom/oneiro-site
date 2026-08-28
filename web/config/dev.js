window.ONEIRO_CONFIG = {
  env: 'dev',

  supabase: {
    url: 'https://ivagulin.dedyn.io/supabase-dev',
    anonKey: 'sb_publishable_E9xJ0O9l3Frwog9qREIsXg_agRUx9oF'
  },

  routes: {
    login: '/DEV-login',
    chat: '/DEV-chat',
    checkout: '/DEV-checkout',
    telegramLinkage: '/DEV-telegram-linkage'
  },

  n8n: {
    chat: 'https://ivagulin.dedyn.io/webhook/57607eb8-5004-4dec-ae86-4972c652b50f/chat',
    getUserInfo: 'https://ivagulin.dedyn.io/webhook/dev/oneiro/getUserInfo',
    updateBabyInfo: 'https://ivagulin.dedyn.io/webhook/dev/oneiro/updateBabyInfo',
    cancelAutorenew: 'https://ivagulin.dedyn.io/webhook/dev/oneiro/cancelAutorenew',
    activateCertificate: 'https://ivagulin.dedyn.io/webhook/dev/oneiro/activateCertificate',
    timeCalc: 'https://ivagulin.dedyn.io/webhook/dev/oneiro/time-calc'
  },

  popups: {
    profile: '#popup:profile',
    timecalc: '#popup:timecalc'
  }
};
