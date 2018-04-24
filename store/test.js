import Vue from 'vue'
import Vuex from 'vuex'
const state = () => ({
      test_value: 0,
})

const getters = {
      test_value: state => state.test_value,
      
}
const mutations =  {
    
      ['TEST_MUTATION'](state, value) {
        console.log("mutation TEST_MUTATION", value)
        state.test_value = value
      },
     
    }
  const actions = {
      test_action({commit, dispatch}, value) {
        console.log("test/test_action()", value)
        commit('TEST_MUTATION', value)
      }, 
  }
    

export default
{
    namespaced: true,
    state:  state,
    actions: actions,
    getters: getters,
    mutations: mutations,
    } 
