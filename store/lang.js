const localeStrings = {
  en: "English",
  ru: "Russian",
}


const state = () => ({
  locales: [{
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
  locale: 'ru'
})


const getters = {
  locales: state => state.locales,
  locale: state => state.locale,
  localeFull: state => state.locales.filter(locale =>
    state.locale === locale['code']
  )[0],
  //localesCodes: state => state.locales.map(locale => locale['code']),
}



const mutations = {
  ['SET_LANG'](state, locale) {
    console.log("SET_LANG", "locale", locale)
    state.locale = locale
    this.$cookies.set('locale', locale, {
      path: '/',
      maxAge: 31536000
    })

  }
  
}





export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
}
