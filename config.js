export const APP_CONFIG = {
  siteKey: 'example_wedding',
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  supabasePublishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY',

  weddingIso: '2027-01-01T12:00:00+09:00',
  coupleLabel: '신랑 ❤ 신부',

  share: {
    kakaoJavaScriptKey: 'YOUR_KAKAO_JAVASCRIPT_KEY',
    title: '신랑 ❤ 신부 결혼합니다',
    description: '20XX.XX.XX DAY TIME',
    imagePath: './assets/placeholder.svg',
    copyLink: 'https://example.com/your-invitation'
  },

  guestbook: {
    table: 'guestbook_entries',
    groomName: '신랑',
    brideName: '신부',
    functions: {
      create: 'guestbook-create',
      update: 'guestbook-update',
      delete: 'guestbook-delete',
      aiSuggest: 'guestbook-ai'
    }
  }
};
