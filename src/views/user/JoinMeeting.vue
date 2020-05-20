<template>
  <div class="mainContent">
    <page-header :left="false" :pageTitle="pageTitle"></page-header>
    <a-form-model :layout="form.layout" :model="form" class="m-t-50">
      <a-row>
        <a-col>
          <a-form-model-item label="会议号">
            <a-input v-model="form.phone" placeholder="请输入会议号" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="您的名字">
            <a-input v-model="form.name" placeholder="请输入您的名字" />
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item label="会议设置">
            <div>
              <a-checkbox @change="onChange" v-model="form.audio">自动连接音频</a-checkbox>
            </div>
            <div>
              <a-checkbox @change="onChange" v-model="form.camera">入会开启摄像头</a-checkbox>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item>
            <a-affix :offset-bottom="bottom" @change="change">
              <a-button type="primary" block>加入会议</a-button>
            </a-affix>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  name: 'JoinMeeting',
  data() {
    return {
      bottom: 0,
      pageTitle: '加入会议',
      form: {
        camera: false,
        audio: true
      },
      api: {
        joinMeeting: {
          url: '/meetings',
          method: 'post'
        }
      }
    }
  },
  methods: {
    // 加入会议
    joinMeeting() {},

    change(val) {
      console.log(val)
    },
    onChange(val) {
      console.log(val)
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style></style>
