import Vuex from 'vuex';

export default Vuex.createStore({
  state: {
    data: null
  },
  getters: {},
  mutations: {
    changeData(state, newData) {
      state.data = newData;
    },
    //
    setData(state, newData) {
      state.data = newData;
    }
  },
  actions: {
    testCall({ commit, state }, payload) {
      const { method, id } = payload;
      this.state.data = {...cardJson};

      switch (method) {
        case 'GET' :
          this.state.data = { ...cardJson };
          break;

        case 'DELETE' :
          commit('changeData',
            { ...state.data, list: state.data.list.filter(el => el.id !== id) }
          );
          break;

        default :
          this.state.data = { ...cardJson };
      }

      return 'call'
    },


    // origin
    async fetchApi(context, payload){
      const url = 'hebale.com';
      const { method, data } = payload;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })

      return response.json();
    }
  },
  modules: {}
})


const cardJson = [
  {
    id: 'id-1234567890',
    name: '테스트 카드이름',
    visible: true,
    createDt: null,
    updateDt: null,
    list: [
      {
        id: 0,
        name: '테스트 카드이름1',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 1,
        name: '테스트 카드이름2',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 2,
        name: '테스트 카드이름3',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 3,
        name: '테스트 카드이름4',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 4,
        name: '테스트 카드이름5',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      }
    ]
  },
  {
    id: 'id-1234567899',
    name: '테스트 카드이름1',
    visible: true,
    createDt: null,
    updateDt: null,
    list: [
      {
        id: 0,
        name: '테스트 카드이름11',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 1,
        name: '테스트 카드이름22',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 2,
        name: '테스트 카드이름33',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 3,
        name: '테스트 카드이름44',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      },
      {
        id: 4,
        name: '테스트 카드이름55',
        repeat: false,
        period: 0,
        amount: 0, 
        createDt: null,
        updateDt: null
      }
    ]
  }
]