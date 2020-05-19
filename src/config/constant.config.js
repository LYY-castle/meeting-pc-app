export default {
  // aes 加密参数长度需是 8 的倍数, 否则会出现解密失败的问题.
  crypto: {
    key: '0ltPFdh9M3wfDpor',
    iv: '0ltPFdh9M3wfDpor'
  },
  TOKEN_EXPIRE_TIME: 7 * 24 * 60 * 60 * 1000,
  API_TIMEOUT: 10 * 1000, // 后台请求超时时间.
  storageOptions: {
    namespace: 'MEETING__', // key prefix.
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory.
  }
}
