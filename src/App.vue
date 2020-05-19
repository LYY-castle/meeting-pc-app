<template>
  <a-config-provider :locale="locale">
    <div id="app" ref="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: 'App',

  data() {
    return {
      locale: zhCN,
      height: {
        height: ''
      }
    }
  },
  methods: {
    resetAppHeight() {
      this.$nextTick(() => {
        this.$refs.app.style.height = `${document.documentElement.clientHeight}px`
      })
    }
  },
  mounted() {
    this.resetAppHeight()

    window.onresize = () => {
      this.resetAppHeight()
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/_color.scss';
@import '~@/assets/scss/_font-size.scss';
@import '~@/assets/scss/_spacing.scss';
@import '~@/assets/scss/_useful_class.scss';
@import '~@/assets/scss/_width_height.scss';

@import '~@/assets/common/antd.scss';
@import '~@/assets/common/reset.scss';
.mainContent {
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
