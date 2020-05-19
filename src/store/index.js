import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState } from 'vuex-electron'

import counter from './modules/counter'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    counter,
    user
  },
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})
