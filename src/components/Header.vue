<template>
  <a-affix :offset-top="top">
    <div class="nav">
      <span class="left" @click="onClickLeft"><a-icon type="left" v-if="left"/></span>
      <span class="title">{{ pageTitle }}</span>
      <span class="right"></span>
    </div>
  </a-affix>
</template>

<script>
export default {
  name: 'PageHeader',
  data() {
    return {
      top: 10
    }
  },
  props: {
    left: {
      required: true,
      type: Boolean,
      default: true
    },
    pageTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-page-header {
  padding: 0 !important;
}
.nav {
  display: flex;
  justify-content: space-between;
}
</style>
