export default [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    name: '/hello',
    path: '/hello',
    component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld')
  },
  {
    name: '/hello2',
    path: '/hello2',
    component: () => import(/* webpackChunkName: "hello" */ '@/components/HelloWorld2')
  }
]
