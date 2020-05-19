<template>
  <div class="mainContent">
    <page-header :left="true"></page-header>
    <div class="text m-t-30">
      <span class="leftText">{{ leftText }}</span>
      <span class="rightText" @click="toggleLoginMethod">{{ rightText }}<a-icon type="right"/></span>
    </div>
    <a-form-model :layout="form.layout" :model="form" class="m-t-50">
      <a-row>
        <a-col>
          <a-form-model-item label="手机号">
            <a-input v-model="form.phone" placeholder="请输入手机号" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="密码" v-if="!loginByCode">
            <a-input v-model="form.pwd" placeholder="请输入密码" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="验证码" v-if="loginByCode">
            <a-input v-model="form.pwd" placeholder="请输入验证码" :disabled="!disabledCode">
              <div slot="addonAfter" @click="getPhoneCode" v-if="!disabledCode">
                <span>获取验证码</span>
              </div>
              <div slot="addonAfter" v-if="disabledCode">
                <a-statistic-countdown :value="deadline" @finish="onFinish" format="s 秒后重新发送" />
              </div>
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item class="m-b-10">
            <a-button type="primary" block @click="login">登录</a-button>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-item>
            <a-button type="link" block @click="newCustomerRgister">新用户注册</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  name: 'Register',
  data() {
    return {
      pageTitle: '新用户注册',
      deadline: 0,
      disabledCode: false,
      loginByCode: false,
      leftText: '账号密码登录',
      rightText: '验证码登录',
      form: {
        layout: 'vertical'
      }
    }
  },
  methods: {
    newCustomerRgister() {
      this.$router.push('/register')
    },
    login() {
      console.log(123)
      this.$router.push('/home')
    },
    getPhoneCode() {
      this.deadline = Date.now() + 60 * 1000
      this.disabledCode = true
    },
    onFinish() {
      this.disabledCode = false
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
        this.disabledCode = false
      }
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
