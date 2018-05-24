import axios from 'axios'
import Cookies from 'js-cookie'

const state = () => ({
  user: null,
  token: null
})

const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => { 
    return state.user !== null
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },

  FETCH_USER_SUCCESS (state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
  },

  LOGOUT (state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

const actions = {
  saveToken ({ commit, dispatch }, token) {
    //console.log("SET_TOKEN", token)
    commit('SET_TOKEN', token)

    Cookies.set('token', token, { expires: 365  })
  },

  async fetchUser ({ commit }) {

    try {
      const { data } = await axios.get('api/user')
      console.log("fetch", data)
      commit('FETCH_USER_SUCCESS', data)
    } catch (e) {
      console.log("error fetch", e)
      Cookies.remove('token')

      commit('FETCH_USER_FAILURE')
    }
  },

  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/logout')
    } catch (e) { }

    Cookies.remove('token')

    commit('LOGOUT')
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/oauth/${provider}`)

    return data.url
  }
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
}
