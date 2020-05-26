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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  .scrollContent {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .positionButton {
    background: #fff;
    border: none;
    border-top: 1px solid #eee;
    padding: 10px 20px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
