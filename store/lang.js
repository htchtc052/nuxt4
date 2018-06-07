const state = () => ({
  locale: 'ru',
  locales: {
    'en': 'EN',
    'ru': 'RU'
  }
})

const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

const mutations = {
  SET_LOCALE(state, {
    locale
  }) {
    state.locale = locale
  }
}


const actions = {
  setLocale({
    commit
  }, {
    locale
  }) {
    commit('SET_LOCALE', {
      locale
    })
    this.$cookies.set('locale', locale, {
      path: '/',
      maxAge: 31536000
    })
  }
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
}
