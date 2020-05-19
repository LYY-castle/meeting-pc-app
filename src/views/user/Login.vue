<template>
  <div class="mainContent">
    <page-header :left="true"></page-header>
    <div class="text m-t-30">
      <span class="leftText">{{ leftText }}</span>
      <span class="rightText" @click="toggleLoginMethod">{{ rightText }}<a-icon type="right"/></span>
    </div>
    <a-form-model layout="vertical" :model="form" ref="form" :rules="rules" class="m-t-50">
      <a-form-model-item label="手机号" prop="phone">
        <a-input v-model="form.phone" placeholder="请输入手机号" />
      </a-form-model-item>

      <a-form-model-item label="密码" v-if="!loginByCode" prop="password">
        <a-input v-model="form.password" placeholder="请输入密码" type="password" />
      </a-form-model-item>

      <a-form-model-item label="验证码" v-if="loginByCode" prop="validateCode">
        <a-input v-model="form.validateCode" placeholder="请输入验证码" :disabled="disabledCode" maxLength="6">
          <div slot="addonAfter" @click="getPhoneCode" v-if="disabledCode">
            <span>获取验证码</span>
          </div>
          <div slot="addonAfter" v-if="!disabledCode">
            <a-statistic-countdown :value="deadline" @finish="onFinish" format="ss" />
          </div>
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" block @click="submitForm('form')">登录</a-button>
      </a-form-model-item>
      <a-form-item>
        <a-button type="link" block @click="newCustomerRgister">新用户注册</a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import { regexMap } from '@/utils/validate.js'
import Crypto from '@/utils/crypto'
import store from '@/store'
import request from '@/api/index.js'
export default {
  name: 'Register',
  data() {
    return {
      pageTitle: '新用户注册',
      deadline: 0,
      disabledCode: true,
      loginByCode: false,
      leftText: '账号密码登录',
      rightText: '验证码登录',
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: regexMap.mobile, message: '手机号码格式错误 ', trigger: 'change' }
        ],
        validateCode: [{ required: true, message: '请输入验证码', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      },
      form: {
        type: 0,
        phone: '',
        validateCode: '',
        password: ''
      },
      api: {
        sendValidateCode: {
          url: '/users/send-validate-code',
          method: 'post'
        },
        checkPhone: {
          url: '/users/duplicate/check',
          method: 'post'
        },
        login: {
          url: '/users/login',
          method: 'post'
        }
      }
    }
  },
  methods: {
    newCustomerRgister() {
      this.$router.push('/register')
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          const requestRegister = () => {
            const params = {}
            params.phone = this.form.phone
            params.type = 0
            if (this.loginByCode) {
              params.validateCode = this.form.validateCode
            } else {
              params.password = new Crypto().encrypt({
                plainStr: this.form.password
              })
            }
            return new Promise(resolve => {
              request({ ...this.api.login, params }).then(res => {
                if (res.success) {
                  console.log(res.dta)
                  store.dispatch('setToken', res.headers['authorization'])
                  store.commit('SET_NAME', res.name)
                  resolve()
                } else {
                  this.$message.error(res.message)
                }
              })
            })
          }
          Promise.resolve()
            .then(() => requestRegister())
            .then(() => this.$router.push('/home'))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getPhoneCode() {
      this.deadline = Date.now() + 60 * 1000
      this.disabledCode = false
      const conditions = {
        conditions: [{ fild: 'phone', rule: 'eq', val: this.form.phone }],
        fieldName: 'phone',
        fieldVal: this.form.phone
      }
      const params = {
        phone: this.form.phone,
        type: 1
      }
      request({ ...this.api.checkPhone, params: conditions }).then(res => {
        if (res.success) {
          request({ ...this.api.sendValidateCode, params }).then(code => {
            if (code.data.success) {
              this.$message.success('短信已发送')
            } else {
              this.$message.success(code.data.message)
            }
          })
        } else {
          this.$message.success(res.message)
        }
      })
    },
    onFinish() {
      this.disabledCode = true
    },
    toggleLoginMethod() {
      if (this.loginByCode) {
        this.loginByCode = false
        this.leftText = '账号密码登录'
        this.rightText = '验证码登录'
      } else {
        this.loginByCode = true
        this.leftText = '验证码登录'
        this.rightText = '账号密码登录'
        this.disabledCode = true
      }
    }
  },
  components: {
    PageHeader
  }
}
</script>
<style lang="scss">
.ant-statistic-content {
  font-size: 12px !important;
}
</style>
<style lang="scss" scoped>
.text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftText {
    font-size: 20px;
    color: rgba(0, 0, 0, 1);
  }
  .rightText {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
