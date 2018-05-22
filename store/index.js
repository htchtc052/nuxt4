import Vuex from 'vuex'
import playlist from '~/store/playlist'
import lang from '~/store/lang'
import auth from '~/store/auth'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      'playlist': playlist,
      'lang': lang,
      'auth': auth,
    }
  })
}

export default createStore
