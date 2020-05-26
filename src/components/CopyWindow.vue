<template>
  <div class="mainContent">
    <div class="scrollContent">
      <p>邀请您参加腾讯会议</p>
      <p>会议主题：</p>
      <p>会议时间：</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CopyWindow',
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {

  },
  methods: {
    // 查询会议详情
  }
}
</script>

<style>
</style>
