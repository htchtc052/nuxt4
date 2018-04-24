import Vuex from 'vuex'
import playlist from '~/store/playlist'
//import test from '~/store/test'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      'playlist': playlist,
      //'test': test
    }
  })
}

export default createStore
