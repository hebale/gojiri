import Vuex from 'vuex';

export default Vuex.createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getFixedSpendList(state, payload) {
      console.log(state, payload);
    }
  },
  modules: {}
})