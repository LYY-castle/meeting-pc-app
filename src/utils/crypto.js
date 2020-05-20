import CryptoJS from 'crypto-js/crypto-js'

import constantCfg from '@/config/constant.config'

class Crypto {
  /**
   * 注意: aes 密钥与向量长度需是 8 的倍数, 否则会出现解密失败的问题.
   * @param {key} param 密钥.
   * @param {iv} param 向量.
   */
  constructor(param = { key: constantCfg.crypto.key, iv: constantCfg.crypto.iv }) {
    this.key = param.key
    this.iv = param.iv
  }

  /**
   *
   * @param {*} param0
   */
  encrypt({ plainStr }) {
    const encrypted = CryptoJS.AES.encrypt(plainStr, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })

    return CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString()).toString()
  }

  decrypt({ enctyptedStr }) {
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(enctyptedStr))
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })

    return CryptoJS.enc.Utf8.stringify(decrypted).toString()
  }
}

export default Crypto
