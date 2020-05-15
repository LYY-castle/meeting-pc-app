import BlankLayout from '@/components/layouts/BlankLayout'

export default [
  {
    path: '/',
    component: BlankLayout,
    redirect: '/hello'
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
    path: '*',
    redirect: '/'
  }
]
