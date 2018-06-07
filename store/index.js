import Vuex from 'vuex'
import Cookies from 'js-cookie'
import {  cookieFromRequest } from '~/utils'
import playlist from '~/store/playlist'
import lang from '~/store/lang'
import auth from '~/store/auth'



const createStore = () => {
return new Vuex.Store({
  actions: {
    nuxtServerInit({commit}, {app, req}) {
      const token = cookieFromRequest(req, 'token')
      if (token) {
        commit('auth/SET_TOKEN', token)
      } else {
        commit('auth/LOGOUT')
      }

      const locale = cookieFromRequest(req, 'locale')
      if (locale) {
        commit('lang/SET_LOCALE', {locale})
      }

      console.log("nuxtServerInit token", token ? true : false, "locale", locale ? locale : null)

    },
  },
  modules: {
    'playlist': playlist,
    'lang': lang,
    'auth': auth,
  }
  })
}

    export default createStore
