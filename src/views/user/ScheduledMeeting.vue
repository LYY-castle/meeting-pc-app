<template>
  <div class="mainContent">
    <a-form-model layout="vertical" :model="form" class="scrollContent" ref="form" :rules="rules">
      <a-form-model-item label="会议主题" prop="subject">
        <a-input v-model="form.subject" placeholder="请输入会议主题" />
      </a-form-model-item>
      <a-form-model-item label="会议类型" prop="type">
        <a-select v-model="form.type" style="width: 120px" placeholder="请选择会议类型">
          <a-select-option value="0">普通会议</a-select-option>
          <a-select-option value="1">主讲会议</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="开始时间" prop="appointStartTime">
        <a-date-picker show-time v-model="form.appointStartTime"></a-date-picker>
      </a-form-model-item>
      <a-form-model-item label="结束时间" prop="appointEndTime">
        <a-date-picker show-time v-model="form.appointEndTime"></a-date-picker>
      </a-form-model-item>
      <a-form-model-item label="入会密码" :prop="isOpenPassword?'password':''">
        <a-checkbox v-model="isOpenPassword">开启会议密码</a-checkbox>
        <a-input
          v-model="form.password"
          placeholder="请输入4~6位数字密码"
          v-if="isOpenPassword"
          type="tel"
          :maxLength="6"
          :minLength="4"
        />
      </a-form-model-item>
      <a-form-model-item label="会议设置">
        <div>
          <a-checkbox v-model="form.isJoinMute">成员加入会议时自动静音</a-checkbox>
        </div>
        <div>
          <a-checkbox v-model="form.joinType">仅登录用户可加入会议</a-checkbox>
        </div>
      </a-form-model-item>
    </a-form-model>
    <div class="positionButton">
      <a-button type="primary" block @click="scheduledMeeting('form')">预定</a-button>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import { mapState } from 'vuex'
import moment from 'moment'
import { request } from '@/api'
import { remote } from 'electron'

export default {
  name: 'ScheduledMeeting',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.form.password.length < 4) {
        callback(new Error('请输入4~6位数字密码'))
      } else {
        callback()
      }
    }
    return {
      pageTitle: '预定会议',
      isOpenPassword: false,
      form: {
        subject: this.meetingSubject,
        type: '0',
        appointStartTime: null,
        appointEndTime: null,
        password: '',
        isJoinMute: false,
        joinType: false
      },
      rules: {
        subject: [{ required: true, message: '请输入会议主题', trigger: 'change' }],
        type: [{ required: true, message: '请选择会议类型', trigger: 'change' }],
        password: [
          { required: true, message: '请输入4~6位数字密码', trigger: 'change' },
          { validator: validatePassword, trigger: 'change' }
        ],
        appointStartTime: [{ required: true, message: '请选择会议开始时间', trigger: 'change' }],
        appointEndTime: [{ required: true, message: '请选择会议结束时间', trigger: 'change' }]
      },
      api: {
        scheduledMeeting: {
          url: '/meetings',
          method: 'post'
        }
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    meetingSubject() {
      const meeting = this.userInfo.name + '预定的会议'
      return meeting
    }
  },
  methods: {
    moment,
    scheduledMeeting(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.form.appointStartTime = moment(this.form.appointStartTime).format('YYYY-MM-DD HH:mm:ss')
          this.form.appointEndTime = moment(this.form.appointEndTime).format('YYYY-MM-DD HH:mm:ss')
          this.form.isJoinMute = this.form.isJoinMute ? 1 : 0
          this.form.joinType = this.form.joinType ? 1 : 0
          request({ ...this.api.scheduledMeeting, params: this.form }).then(res => {
            if (res.success) {
              remote.getCurrentWindow().close()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="scss" scoped>
.mainContent {
  padding: 0 20px 55px 20px !important;
}
</style>
