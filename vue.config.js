const path = require('path')
const os = require('os')

const keys = require('lodash.keys')

const envConfig = require('./src/config/env.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // development server port 3000
    port: 3000,
    proxy: {
      '/api': {
        target: envConfig[process.env.mode].BASE_API, // 请求本地需要后台项目
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': '' // 默认所有请求都加了 api 前缀, 需要去掉
        }
      }
    }
  },
  parallel: os.cpus().length > 1,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    config.plugin('define').tap(args => {
      keys(envConfig[process.env.mode]).forEach(key => {
        args[0]['process.env'][key] = JSON.stringify(envConfig[process.env.mode][key])
      })
      return args
    })
  }
}
