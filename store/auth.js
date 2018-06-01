import axios from 'axios'
import Cookies from 'js-cookie'

const state = () => ({
  user: null,
  token: null
})

const getters = {
  user: state => state.user,
  token: state => state.token,
  verified: state => {
    return state.user ? !!state.user.is_verified : false
  },
  check: state => {
    return state.user !== null
  }
}

const mutations = {


  /*  FETCH_USER_SUCCESS (state, user) {
     state.user = user
   },
    FETCH_USER_FAILURE (state) {
     state.token = null
   }, */
  LOGOUT(state) {
    state.user = null
    state.token = null
    // console.log("store commit logout")

  },
  SET_USER(state, user) {
    state.user = user

     console.log("store commit", state.user)
  },
  SET_TOKEN(state, token) {
    state.token = token
    //console.log("store commit set token")
  },

}

const actions = {
  saveToken({commit, dispatch}, token) {
    console.log("store actions saveToken", token)
    commit('SET_TOKEN', token)
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 31536000
    })
  },
  async serverFetchUser({
    commit,
    dispatch,
    getters
  }) {
    try {
      console.log("store auth before fetch")
      const {
        data,
        headers
      } = await axios.get("api/user", {
        params: {
          token: getters['token']
        }
      })
      console.log("store auth  success")
      console.log("store auth success data", "user", data.user ? data.user : null, "new_token", data.new_token ? data.new_token : null)
      commit("SET_USER", data.user)
      console.log("store auth  success after user")

      console.log("store auth  success  headers", headers)
      const new_token = headers && headers.new_token ? headers.new_token : null
      console.log("store auth  success new_token", new_token)
      
      if (new_token) {
        dispatch("saveToken", new_token)
      }
/* 
      if (new_token) {
        commit("SET_TOKEN", new_token)

        this.$cookies.set('token', new_token, {
          path: '/',
          maxAge: 31536000
        })
        console.log("store auth  success after token")

      } */

      return Promise.resolve()

    } catch (error) {
      console.log("store auth error fetch ");
      console.log("store auth error msg ", error.response && error.response.data ? error.response.data : error)
      dispatch('logout')
      //this.$cookies.remove('token')
      //commit('LOGOUT')
      return Promise.reject()
    }
  },
  setUser({
    commit
  }, payload) {
    commit('SET_USER', payload)
  },
  async logout({
    commit,
    getters
  }) {
    this.$cookies.remove('token')
    commit('LOGOUT')
  },
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
}
