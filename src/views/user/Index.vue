<template>
  <div class="LoginContent">
    <div class="centerContetn">
      <!-- <a-avatar :size="50" :src="LOGO" /> -->
      <img :src="LOGO" alt width="100" />
      <div class="logoText">
        <span>睿</span>
        <span>云</span>
        <span>会</span>
        <span>议</span>
      </div>
      <div>Wise2c Meeting</div>
      <a-button type="primary" block class="m-t-80" @click="joinMeeting">加入会议</a-button>
      <a-button block class="m-t-15" @click="loginOrRegister">登录 / 注册</a-button>
    </div>
  </div>
</template>

<script>
import LOGO from '@/assets/images/wise2c.svg'
import { createChildWindow } from '@/utils/window'
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
      createChildWindow({
        width: 380,
        url: '/join-meeting'
      })
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
    .logoText {
      width: 100px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 800;
    }
  }
}
</style>
