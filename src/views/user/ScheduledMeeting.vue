<template>
  <div class="mainContent">
    <page-header :left="false" :pageTitle="pageTitle"></page-header>
    <a-form-model :layout="form.layout" :model="form" class="m-t-50">
      <a-form-model-item label="会议主题">
        <a-input v-model="form.phone" placeholder="请输入会议主题" />
      </a-form-model-item>

      <a-form-model-item label="开始时间">
        <a-date-picker show-time> </a-date-picker>
      </a-form-model-item>

      <a-form-model-item label="结束时间">
        <a-date-picker show-time> </a-date-picker>
      </a-form-model-item>

      <a-form-model-item label="入会密码">
        <a-checkbox v-model="form.login">
          开启会议密码
        </a-checkbox>
      </a-form-model-item>

      <a-form-model-item label="会议设置">
        <div>
          <a-checkbox v-model="form.audio">
            成员加入会议时自动静音
          </a-checkbox>
        </div>
        <div>
          <a-checkbox v-model="form.login">
            仅登录用户可加入会议
          </a-checkbox>
        </div>
      </a-form-model-item>

      <a-form-model-item>
        <a-button type="primary" block>预定</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  name: 'ScheduledMeeting',
  data() {
    return {
      pageTitle: '预定会议',
      form: {
        layout: 'vertical',
        audio: false,
        login: false
      }
    }
  },
  methods: {},
  components: {
    PageHeader
  }
}
</script>

<style></style>
