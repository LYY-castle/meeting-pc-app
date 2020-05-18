import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'
import constantCfg from '@/config/constant.config'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import VueStorage from 'vue-ls'
Vue.use(VueStorage, constantCfg.storageOptions)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
