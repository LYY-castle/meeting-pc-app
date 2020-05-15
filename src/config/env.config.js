module.exports = {
  dev: {
    mode: 'dev',
    BASE_API: 'http://139.198.124.180:8020',
    CTI_HOST: 'ws://47.112.182.71:15674/wsd',
  },
  sit: {
    mode: 'sit',
    BASE_API: 'http://sit.hkjindian.com:8020',
    CTI_HOST: 'ws://47.112.182.71:15674/wss',
  },
  prod: {
    mode: 'prod',
    BASE_API: 'http://47.107.95.25:8020',
    CTI_HOST: 'ws://47.112.179.226:15674/wsp',
  }
}
