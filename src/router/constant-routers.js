// import BlankLayout from '@/components/layouts/BlankLayout'

export default [
  {
    name: 'Index',
    path: '/',
    component: () => import(/* webpackChunkName: "login" */ '@/views/user/Index')
  },
  {
    name: 'Login',
    path: '/login',
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
    name: 'Home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/user/Home')
  },
  {
    name: 'ChooseShareScreen',
    path: '/choose-share-screen',
    component: () => import(/* webpackChunkName: "choose-share-scree" */ '@/views/common/choose-share-screen')
  },
  {
    path: '*',
    redirect: '/'
  }
]
