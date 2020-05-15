<template>
  <a-config-provider :locale="locale">
    <div id="app">
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
      locale: zhCN
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
</style>
