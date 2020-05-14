const path = require('path')

const keys = require('lodash.keys')

const envConfig = require('./src/config/env.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
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
