const defaultState = {
  counter: 0
}

const counter = {
  state: defaultState,
  mutations: {
    INIT(state) {
      for (let k in defaultState ) {
        state[k] = defaultState[k]
      }
    },
    INCREASE(state) {
      state.counter++
    },
    DECREASE(state) {
      state.counter--
    }
  },
  actions: {
    initCounter({commit}) {
      commit('INIT')
    },
    increaseCounter({ commit }) {
      commit('INCREASE')
    },
    decreaseCounter({ commit }) {
      commit('DECREASE')
    }
  }
}

export default counter
