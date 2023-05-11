import Vuex from 'vuex';

export default Vuex.createStore({
  state: {
    data: null,
    year: null,
    month: null,
    yearRange: Array(100).fill(0).map((_, index) => index + 1991),
    monthRange: Array(12).fill(0).map((_, index) => index + 1),
    sub: [],
    period: []
  },
  getters: {},
  mutations: {
    SET_DATA(state, newData) {
      state.data = newData;
    },
    SET_DATE(state, { year, month }) {
      state.year = year;
      state.month = month;
    },
    ADD_SUB_ITEM(state, newData) {
      state.sub.push(newData);
    },
    REMOVE_SUB_ITEM(state, ID) {
      state.sub = state.sub.filter(el => el.ID !== ID);
    },
    ADD_CHANGED_PERIOD(state, params) {
      const newData = state.period.filter(el => el.ID !== params.ID);
      newData.push(params);
      state.period = newData;
    },
    REMOVE_CHANGED_PERIOD(state, ID) {
      state.period = state.period.filter(el => el.ID !== ID);
    }
  },
  actions: {
    async updateData({ commit, dispatch }, callback){
      const { code, data } = await dispatch('fetchApi', {
        method: 'GET',
        path: 'cards',
        query: { MONTH: `${this.state.year}${this.state.month}` }
      });

      if(code === 200) {
        commit('SET_DATA', data);
        if(typeof callback === 'function') callback();
      }
    },
    async fetchApi(_, { method, path, query, body }){
      const user = window.location.search ? window.location.search.split('=')[1] : 'unknown'; 
      const queryString = query && Object.keys(query).map(el => `${el}=${query[el]}`).join('&');
      const url = `https://api.hebale.com/gojiri/${path}?USER=${user}${query ? '&' + queryString : ''}`;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json'},
        ...(body && { body: JSON.stringify(body) }),
      });

      return await response.json();
    }
  },
  modules: {}
})