// import BlankLayout from '@/components/layouts/BlankLayout'

export default [
  {
    path: '/',
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
    name: 'hello',
    path: '/hello',
    component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld')
  },
  {
    name: 'world',
    path: '/world',
    component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld2')
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/user/Home')
  },
  {
    path: '*',
    redirect: '/'
  }
]
