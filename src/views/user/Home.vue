<template>
  <div class="mainContent">
    <div class="scrollContent">
      <div class="top">
        <a-popover v-model="myInfoVisible" title="个人信息" trigger="click" placement="bottomLeft">
          <template slot="content">
            <a-row>
              <a-col :span="24" class="topContent m-b-10">
                <span>{{ userInfo.name }}</span>
                <a-popover v-model="nameVisible" title="修改姓名" trigger="click" placement="left">
                  <template slot="content">
                    <a-form-model layout="vertical" :model="form" :rules="rules" ref="form">
                      <a-form-model-item prop="name">
                        <a-input placeholder="请输入姓名" v-model="form.name" />
                      </a-form-model-item>
                    </a-form-model>

                    <a-row type="flex" justify="space-between">
                      <a-col :span="10">
                        <a-button @click="nameVisible = false">取消</a-button>
                      </a-col>
                      <a-col :span="10">
                        <a-button @click="updateName" type="primary">确定</a-button>
                      </a-col>
                    </a-row>
                  </template>
                  <a-icon type="edit" width="50" />
                </a-popover>
              </a-col>
              <a-col :span="24" class="topContent m-b-10">
                <span>手机号</span>
                <span>{{ userInfo.phone }}</span>
              </a-col>
              <a-col :span="24" class="topContent m-b-10">
                <span>修改密码</span>
                <a-popover v-model="passwordVisible" title="修改密码" trigger="click" placement="left">
                  <template slot="content">
                    <a-form-model layout="vertical" :model="pwdForm" :rules="rules" ref="form">
                      <a-form-model-item prop="oriPassword">
                        <a-input placeholder="请输入原密码" v-model="pwdForm.oriPassword" />
                      </a-form-model-item>
                      <a-form-model-item prop="password">
                        <a-input placeholder="请输入新密码" v-model="pwdForm.password" />
                      </a-form-model-item>
                      <a-form-model-item prop="validPassword">
                        <a-input placeholder="再次确认密码" v-model="pwdForm.validPassword" />
                      </a-form-model-item>
                    </a-form-model>

                    <a-row type="flex" justify="space-between">
                      <a-col :span="10">
                        <a-button @click="passwordVisible = false">取消</a-button>
                      </a-col>
                      <a-col :span="10">
                        <a-button @click="updatePassword" type="primary">确定</a-button>
                      </a-col>
                    </a-row>
                  </template>
                  <a-icon type="edit" width="50" />
                </a-popover>
              </a-col>
              <a-col align="center">
                <a-button type="primary" ghost @click="logout">退出登录</a-button>
              </a-col>
            </a-row>
          </template>
          <a-avatar style="backgroundColor:#1890ff" :size="56">{{ userInfo.name }}</a-avatar>
        </a-popover>
        <span class="m-l-10">欢迎您!</span>
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
      </div>
      <div ref="cardList">
        <a-card
          :bordered="false"
          class="cardList"
          v-if="meetingList.length>0"
          title="预定会议"
          hoverable
        >
          <a-card-grid
            style="width:100%;text-align:left"
            v-for="(meet,index) in meetingList"
            :key="index"
          >
            <div class="singleCard">
              <div class="left">
                {{ new Date(meet.appointStartTime).getTime() }}
                <div>{{ moment(meet.appointStartTime).format('YYYY-MM-DD') }}</div>
                <div class="c-gray">
                  <span>{{ moment(meet.appointStartTime).format('HH:mm:ss') }}--{{ moment(meet.appointEndTime).format('HH:mm:ss') }}</span>
                </div>
                <div class="bold">{{ meet.subject }}</div>
              </div>
              <div class="right">
                <a-col>
                  <a-button type="primary">进入会议</a-button>
                </a-col>
                <a-col
                  class="m-t-5"
                  v-if="new Date(meet.appointStartTime).getTime()-new Date().getTime()>0"
                >
                  <a-popover trigger="click">
                    <template slot="content">
                      <a-button type="link" block @click="copyWin(meet.id)">复制邀请</a-button>
                      <a-button type="link" block @click="editeWin(meet.id)">编辑会议</a-button>
                      <a-button type="link" block @click="cancleWin(meet.id)">取消会议</a-button>
                    </template>
                    <a-button>更多操作</a-button>
                  </a-popover>
                </a-col>
                <a-col class="m-t-5" v-else>
                  <a-popconfirm
                    title="确定删除会议?"
                    ok-text="确定删除"
                    cancel-text="再想想"
                    @confirm="deleteMeeting(meet.id)"
                  >
                    <a-button>删除会议</a-button>
                  </a-popconfirm>
                </a-col>
              </div>
            </div>
          </a-card-grid>
        </a-card>
        <a-empty description="暂无会议" class="m-t-50" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { createChildWindow } from '@/utils/window'
import { mapState } from 'vuex'
import moment from 'moment'
import { request } from '@/api'
import Vue from 'vue'

export default {
  name: 'Home',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.pwdForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      height: {
        height: 0
      },
      appointWin: null,
      activeTabKey: 0,
      myInfoVisible: false,
      nameVisible: true,
      passwordVisible: false,
      meetingList: [], // 预定会议
      form: {
        name: this.userName
      },
      pwdForm: {
        oriPassword: '',
        password: '',
        validPassword: ''
      },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'change' }],
        oriPassword: [{ required: true, message: '请输入原密码', trigger: 'change' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'change' }],
        validPassword: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ]
      },
      api: {
        logout: {
          url: '/users/logout',
          method: 'get'
        },
        updateUserInfo: {
          url: '/users',
          method: 'patch'
        },
        meetingList: {
          url: '/meetings',
          method: 'get'
        },
        startMeeting: {
          url: '/meetings/start',
          method: 'post'
        },
        deleteMeeting: {
          url: '/meetings/{ids}',
          method: 'delete'
        }
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    userName() {
      return this.userInfo.name
    }
  },
  created() {
    const token = Vue.ls.get('token')
    if (token) {
      this.getMeetingList()
    } else {
      this.$message.error('请重新登录')
      this.$router.push('/index')
    }
  },
  mounted() {
    this.resetPageHeight()
    window.onresize = () => {
      this.resetPageHeight()
    }
  },
  methods: {
    moment,
    // 快速会议
    quickMeeting() {},
    // 预定会议
    logout() {
      request({ ...this.api.logout }).then(res => {
        if (res.success) {
          localStorage.clear()
          this.$router.push('/index')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateName() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const params = {
            id: this.userInfo.id,
            name: this.form.name
          }
          request({ ...this.api.updateUserInfo, params }).then(res => {
            if (res.success) {
              this.$store.dispatch('setUserInfo', res.data)
              this.$message.success('姓名修改成功')
              this.nameVisible = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updatePassword() {
      this.$refs['pwdForm'].validate(valid => {
        if (valid) {
          const params = {
            id: this.userInfo.id,
            password: this.pwdForm.password,
            oriPassword: this.pwdForm.oriPassword
          }
          request({ ...this.api.updateUserInfo, params }).then(res => {
            if (res.success) {
              this.$message.success('密码修改成功')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    event(index) {
      if (index === 1) {
        createChildWindow({
          // width: 380,
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
          url: '/scheduled-meeting',
          title: '预定会议',
          closeCB: this.afterAppointMeeting
        })
      }
    },
    // 获取已经预定的会议列表
    getMeetingList() {
      request({ ...this.api.meetingList, params: { createBy: this.userInfo.id } }).then(res => {
        if (res.success) {
          this.meetingList = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 进入预定的会议
    startMeeting() {},
    // 删除预定已经超时的会议
    deleteMeeting(meetId) {
      request({ ...this.api.deleteMeeting, urlReplacements: [{ substr: '{ids}', replacement: meetId }] }).then(res => {
        if (res.success) {
          this.getMeetingList()
        }
      })
    },
    // 复制邀请
    copyWin(meetId) {
      createChildWindow({
        // width: 380,
        url: '/copy-window?meetId=' + meetId
      })
    },
    afterAppointMeeting() {
      this.getMeetingList()
    },
    resetPageHeight() {
      this.$nextTick(() => {
        this.$refs.cardList.style.height = document.documentElement.clientHeight - 180 + 'px'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mainContent {
  padding: 0;
}
.top {
  height: 32%;
  border: none;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
}
.cardList {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  .singleCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: none;
    }
    &:hover {
      .right {
        display: block;
      }
    }
  }
}
.topContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttonDivs {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .singleDiv {
    ::v-deep .ant-btn-icon-only.ant-btn-lg {
      width: 56px;
      height: 56px;
    }
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
}
</style>
