export default {
  TOKEN_EXPIRE_TIME: 7 * 24 * 60 * 60 * 1000,
  API_TIMEOUT: 10 * 1000, // 后台请求超时时间.
  storageOptions: {
    namespace: 'MEETING__', // key prefix.
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory.
  }
}
