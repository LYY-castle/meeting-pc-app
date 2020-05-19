<template>
  <div class="LoginContent">
    <div class="centerContetn">
      <!-- <a-avatar :size="150" :src="LOGO" /> -->
      <div>睿云会议</div>
      <div>Wise2c Meeting</div>
      <a-button type="primary" block class="m-t-80" @click="joinMeeting">加入会议</a-button>
      <a-button block class="m-t-15" @click="loginOrRegister">登录 / 注册</a-button>
    </div>
  </div>
</template>

<script>
import LOGO from '@/assets/images/wise2c.png'

export default {
  name: 'Login',
  data() {
    return {
      LOGO
    }
  },
  methods: {
    // 加入会议
    joinMeeting() {
      window.open(window.location.href + 'join-meeting', '_blank', 'resizable=no, width=375')
    },

    // 登录/注册
    loginOrRegister() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginContent {
  width: 100%;
  height: 100%;
  position: relative;
  .centerContetn {
    min-width: 300px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
