const en= require('../lang/en.js')
const ru= require('../lang/ru.js')

module.exports =  {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'ru',
      iso: 'ru-RU',
      name: 'Русский'
    },
  ],
  strategy: 'prefix_except_default',
  //strategy: 'prefix',
  //rootRedirect: 'ru',
  detectBrowserLanguage: false,
  defaultLocale: 'ru',
  parsePages: false,
  pages: {
   // 'social_login/_token': {
     // ru: '/social_login/:token',
    //}
  },
  vueI18n: {
    fallbackLocale: 'ru',
    messages: { ru, en }
  },
}

