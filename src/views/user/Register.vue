<template>
  <div class="mainContent">
    <page-header :left="true" :pageTitle="pageTitle"></page-header>
    <a-form-model :layout="form.layout" :model="form" class="m-t-50">
      <a-row>
        <a-col>
          <a-form-model-item label="手机号">
            <a-input v-model="form.phone" placeholder="请输入手机号" />
          </a-form-model-item>
        </a-col>

        <a-col>
          <a-form-model-item label="验证码">
            <a-input v-model="form.pwd" placeholder="请输入验证码" :disabled="disabledCode">
              <div slot="addonAfter" @click="getPhoneCode" v-if="disabledCode">
                <span>获取验证码</span>
              </div>
              <div slot="addonAfter" v-if="!disabledCode">
                <a-statistic-countdown :value="deadline" @finish="onFinish" format="ss" />
              </div>
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="姓名">
            <a-input v-model="form.pwd" placeholder="请输入密码" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="密码">
            <a-input v-model="form.pwd" placeholder="请输入密码" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="确认密码">
            <a-input v-model="form.pwd" placeholder="请输入密码" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item>
            <a-button type="primary" block>注册</a-button>
          </a-form-model-item>
        </a-col>
        <a-col align="right">
          <span>已有账号？</span>
          <a-button type="link" @click="Login">马上登陆</a-button>
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
      disabledCode: true,
      form: {
        layout: 'vertical'
      }
    }
  },
  methods: {
    // 立即登录
    Login() {
      this.$router.push('/login')
    },
    getPhoneCode() {
      this.deadline = Date.now() + 60 * 1000
      this.disabledCode = false
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
