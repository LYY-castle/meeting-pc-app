<template>
  <div class="mainContent">
    <a-button @click="logout">退出登录</a-button>
    <div class="p-t-20">欢迎您：{{ name }}</div>
    <a-row class="buttonDivs">
      <a-col :span="8" class="singleDiv" @click="event(1)">
        <a-button type="primary" icon="plus" size="large" />
        <div class="m-t-5">加入会议</div>
      </a-col>
      <a-col :span="8" class="singleDiv" @click="event(2)">
        <a-button type="primary" icon="thunderbolt" size="large" />
        <div class="m-t-5">快速会议</div>
      </a-col>
      <a-col :span="8" class="singleDiv" @click="event(3)">
        <a-button type="primary" icon="schedule" size="large" />
        <div class="m-t-5">预定会议</div>
      </a-col>
    </a-row>
    <a-divider />
    <a-empty description="暂无会议" class="m-t-50" />
  </div>
</template>

<script>
import { createChildWindow } from '@/utils/window'
import { mapState } from 'vuex'
<<<<<<< HEAD
import { request } from '@/api'
=======

>>>>>>> 73a71db694f5fabd3a425b496a493a7c50ad77f2
export default {
  name: 'Home',
  data() {
    return {
      // custmerName: '小伙汁'
      api: {
        logout: {
          url: '/users/logout',
          method: 'get'
        }
      }
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    })
  },
  methods: {
    // 快速会议
    quickMeeting() {},
    // 预定会议
    logout() {
      request({ ...this.api.logout }).then(res => {
        if (res.success) {
          this.$router.push('/')
        }
      })
    },
    event(index) {
      if (index === 1) {
<<<<<<< HEAD
        window.open(window.location.origin + '/#/join-meeting', '_blank', 'resizable=no,width=375')
        // this.$router.push('/join-meeting')
      } else if (index === 2) {
        window.open(window.location.origin + '/#/scheduled-meeting', '_blank', 'resizable=no,width=375')
        // this.$router.push('/scheduled-meeting')
      } else if (index === 3) {
        window.open(window.location.origin + '/#/scheduled-meeting', '_blank', 'resizable=no,width=375')
        // this.$router.push('/scheduled-meeting')
=======
        createChildWindow({
          width: 380,
          url: '/join-meeting'
        })
      } else if (index === 2) {
        createChildWindow({
          width: 380,
          url: '/scheduled-meeting'
        })
      } else if (index === 3) {
        createChildWindow({
          width: 380,
          url: '/scheduled-meeting'
        })
>>>>>>> 73a71db694f5fabd3a425b496a493a7c50ad77f2
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.buttonDivs {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.singleDiv {
  text-align: center;
}
</style>
