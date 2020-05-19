<template>
  <div class="mainContent">
    <div class="p-t-20">欢迎您：{{ custmerName }}</div>
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
    <a-empty description="暂无会议" />
  </div>
</template>

<script>
import { createChildWindow } from '@/utils/window'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      // custmerName: '小伙汁'
    }
  },
  computed: {
    ...mapState({
      custmerName: state => state.user.name
    })
  },
  methods: {
    event(index) {
      if (index === 1) {
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
