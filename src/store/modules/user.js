import Vue from 'vue'

const user = {
  state: {
    token: null,
    userInfo: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      Vue.ls.set('token', token)
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      Vue.ls.set('userInfo', userInfo)
      state.userInfo = userInfo
    }
  },
  actions: {
    setToken: ({ commit }, val) => {
      commit('SET_TOKEN', val)
    },
    setUserInfo: ({ commit }, val) => {
      commit('SET_USERINFO', val)
    }
  }
}
export default user
