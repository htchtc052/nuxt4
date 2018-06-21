import Vuex from 'vuex'
import playlist from '~/store/playlist'
import auth from '~/store/auth'
import lang from '~/store/lang'



const createStore = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({
        commit
      }, {
        app,
        req
      }) {
        const token = app.$cookies.get('token')
        console.log("nuxtServerInit get token from cookie", token ? token : null)
        if (token) {
          commit('auth/SET_TOKEN', token)
        } else {
          commit('auth/LOGOUT')
        }
/* 
        const locale = app.$cookies.get('locale')
        console.log("nuxtServerInit get locale from cookie", locale ? locale : null)

        if (locale) {
          store.commit('i18n/SET_LANG', locale);
        }
 */

      },
    },
    modules: {
      'playlist': playlist,
      'auth': auth,
      'lang': lang,
    }
  })
}

export default createStore
