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
  LOGOUT(state) {
    state.user = null
    state.token = null
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
}

const actions = {

  async fetchUser({
    commit,
    dispatch,
    getters
  }) {
    try {
      const data =  await this.$axios.$get("api/user")
      console.log("store fetch user", data.user.email)
      commit("SET_USER", data.user)
      return Promise.resolve()
    } catch (errors) {
      return Promise.reject()
    }
  },
  saveToken({commit}, token) {
    //console.log("store actions saveToken", token)
    commit('SET_TOKEN', token)
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 31536000
    })
  },
  setUser({commit}, payload) {
    commit('SET_USER', payload)
  },
  login({commit, dispatch}, { token, user }) {
      dispatch('saveToken', token)
      dispatch('setUser', user)
  },
  logout({commit, getters}) {
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
