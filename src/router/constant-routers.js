// import BlankLayout from '@/components/layouts/BlankLayout'

export default [
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "login" */ '@/views/user/Index'),
    meta: {
      title: '睿云会议'
    }
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '睿云会议'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/user/Register')
  },
  {
    name: 'JoinMeeting',
    path: '/join-meeting',
    component: () => import(/* webpackChunkName: "join-meeting" */ '@/views/user/JoinMeeting')
  },
  {
    name: 'ScheduledMeeting',
    path: '/scheduled-meeting',
    component: () => import(/* webpackChunkName: "join-meeting" */ '@/views/user/ScheduledMeeting')
  },
  {
    name: 'CopyWindow',
    path: '/copy-window',
    component: () => import(/* webpackChunkName: "copy-window" */ '@/components/CopyWindow')
  },
  // {
  //   name: 'hello',
  //   path: '/hello',
  //   component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld')
  // },
  // {
  //   name: 'world',
  //   path: '/world',
  //   component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld2')
  // },
  {
    name: 'Home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/user/Home')
  },
  {
    path: '*',
    redirect: '/'
  }
]
