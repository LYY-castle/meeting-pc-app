<template>
  <div class="mainContent">
    <page-header :left="false" :pageTitle="pageTitle"></page-header>
    <a-form-model layout="vertical" :model="form" class="m-t-50" :rules="rules" ref="form">
      <a-form-model-item label="会议号" prop="code">
        <a-input v-model="form.code" placeholder="请输入会议号" />
      </a-form-model-item>

      <a-form-model-item label="您的名字" prop="name">
        <a-input v-model="form.name" placeholder="请输入您的名字" />
      </a-form-model-item>

      <a-form-model-item label="会议设置">
        <div>
          <a-checkbox @change="onChange" v-model="form.muteStatus">自动连接音频</a-checkbox>
        </div>
        <div>
          <a-checkbox @change="onChange" v-model="form.camera">入会开启摄像头</a-checkbox>
        </div>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" block @click="joinMeeting('form')">加入会议</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import { mapState } from 'vuex'
import { request } from '@/api'
export default {
  name: 'JoinMeeting',
  data() {
    return {
      bottom: 0,
      pageTitle: '加入会议',
      form: {
        isAppoint: 0,
        code: '',
        // 静音状态
        muteStatus: true,
        audio: true,
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        code: [{ required: true, message: '请输入会议号', trigger: 'change' }]
      },
      api: {
        joinMeeting: {
          url: '/meetings',
          method: 'post'
        }
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    if (this.name) {
      this.form.name = this.userInfo.name
    }
  },
  methods: {
    // 加入会议
    joinMeeting(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            name: this.form.name,
            code: this.form.code
            // muteStatus: this.form.muteStatus ? 0 : 1,
            // userId: this.userInfo ? this.userInfo.id : null
          }
          request({ ...this.api.joinMeeting, params }).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

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
