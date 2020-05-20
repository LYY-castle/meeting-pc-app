import Vue from 'vue'
import axios from 'axios'
import { Modal, notification } from 'ant-design-vue'

import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import constantCfg from '@/config/constant.config'

let tokenExpiredErrorShowed = false

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: constantCfg.API_TIMEOUT // 请求超时时间
})

const injectServiceInterceptors = service => {
  // request interceptor
  service.interceptors.request.use(
    config => {
      const token = Vue.ls.get(ACCESS_TOKEN)
      token && (config.headers[ACCESS_TOKEN] = token)

      if (config.method === 'get') {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      if (response.headers[ACCESS_TOKEN]) {
        Vue.ls.set(ACCESS_TOKEN, response.headers[ACCESS_TOKEN], constantCfg.TOKEN_EXPIRE_TIME)
        store.commit('SET_TOKEN', response.headers[ACCESS_TOKEN])
      }

      return response.data
    },
    error => {
      if (error.message.indexOf('timeout') !== -1) {
        notification.error({
          message: '系统提示',
          description: '网络超时'
        })
      } else if (error.response) {
        const data = error.response.data

        switch (error.response.status) {
          case 400:
            notification.error({
              message: '系统提示',
              description: data.message,
              duration: 4
            })
            break
          case 401:
            if (error.response.config.url.lastIndexOf('/auth/logout') === -1 && !tokenExpiredErrorShowed) {
              tokenExpiredErrorShowed = true

              Modal.error({
                title: '登录已过期',
                content: data.message,
                okText: '重新登录',
                mask: false,
                onOk: () => {
                  tokenExpiredErrorShowed = false

                  if (Vue.ls.get(ACCESS_TOKEN)) {
                    store.dispatch('Logout').then(() => {
                      Vue.ls.remove(ACCESS_TOKEN)
                      if (!['/', '/user/login'].includes(window.location.pathname)) {
                        window.location.reload()
                      }
                    })
                  }
                }
              })
            }
            break
          case 403:
            notification.error({
              message: '系统提示',
              description: '拒绝访问',
              duration: 4
            })
            break
          case 404:
            notification.error({
              message: '系统提示',
              description: '很抱歉，资源未找到!',
              duration: 4
            })
            break
          case 500:
            notification.error({
              message: '系统提示',
              description: '系统错误',
              duration: 4
            })
            break
          default:
            notification.error({
              message: '系统提示',
              description: data.message,
              duration: 4
            })
            break
        }
      }

      return Promise.reject(error)
    }
  )
}

injectServiceInterceptors(service)

export { service as axios }
