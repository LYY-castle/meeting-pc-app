<template>
  <div class="mainContent">
    <page-header :left="true" :pageTitle="pageTitle"></page-header>
    <a-form-model layout="vertical" ref="form" :model="form" class="m-t-50" :rules="rules">
      <a-form-model-item label="手机号" prop="phone">
        <a-input v-model="form.phone" placeholder="请输入手机号" />
      </a-form-model-item>

      <a-form-model-item label="验证码" prop="validateCode">
        <a-input v-model="form.validateCode" placeholder="请输入验证码" :disabled="disabledCode" maxLength="6">
          <div slot="addonAfter" @click="getPhoneCode" v-if="disabledCode">
            <span>获取验证码</span>
          </div>
          <div slot="addonAfter" v-if="!disabledCode">
            <a-statistic-countdown :value="deadline" @finish="onFinish" format="s 秒后重新发送" />
          </div>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="姓名" prop="name">
        <a-input v-model="form.name" placeholder="请输入姓名" />
      </a-form-model-item>

      <a-form-model-item label="密码" prop="password">
        <a-input v-model="form.password" placeholder="请输入密码" type="password" />
      </a-form-model-item>

      <a-form-model-item label="确认密码" prop="validatePassword">
        <a-input v-model="form.validatePassword" placeholder="请输入密码" type="password" />
      </a-form-model-item>

      <a-form-model-item class="m-b-5">
        <a-button type="primary" block @click="submitForm('form')">注册</a-button>
      </a-form-model-item>

      <a-col align="right">
        <span>已有账号？</span>
        <a-button type="link" @click="Login">马上登录</a-button>
      </a-col>
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
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pageTitle: '新用户注册',
      deadline: 0,
      disabledCode: true,
      layout: 'vertical',
      form: {
        type: 1,
        phone: '',
        validateCode: '',
        name: '',
        password: '',
        validatePassword: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: regexMap.mobile, message: '手机号码格式错误 ', trigger: 'change' }
        ],
        validateCode: [{ required: true, message: '请输入验证码', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        validatePassword: [
          { required: true, message: '请再次输入密码', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ]
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
        register: {
          url: '/users/register',
          method: 'post'
        }
      }
    }
  },
  methods: {
    // 立即登录
    Login() {
      this.$router.push('/login')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const requestRegister = () => {
            const params = {
              type: 1,
              name: this.form.name,
              phone: this.form.phone,
              password: new Crypto().encrypt({
                plainStr: this.form.password
              }),
              validateCode: this.form.validateCode
            }
            return new Promise(resolve => {
              request({ ...this.api.register, params }).then(res => {
                if (res.success) {
                  store.dispatch('setToken', res.headers['authorization'])

                  store.commit('SET_NAME', res.data.name)
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
          this.deadline = Date.now() + 60 * 1000
          this.disabledCode = false
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
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="scss" scoped>
::v-deep .ant-statistic-content {
  font-size: 12px !important;
}

.text {
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: default;

  .leftText {
    font-size: 20px;
    color: rgba(0, 0, 0, 1);
  }
  .rightText {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }

  .rightText:hover {
    color: rgba(0, 0, 0, 0.8) !important;
  }
}
</style>
