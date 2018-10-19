import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new VueRouter({
  mode: 'history',
  // base: __dirname,
  scrollBehavior,
  routes: [
    { path: '*', component: resolve => {require(['../render/pages/404'], resolve)} },
    { path: '/', component: resolve => {require(['../render/pages/Home'], resolve)}, meta: { scrollToTop: true }},
    { path: '/foo', component: resolve => {require(['../render/pages/Foo'], resolve)}, meta: {title:'登录', requireAuth:true}},
    { path: '/bar', component: resolve => {require(['../render/pages/Bar'], resolve)}, meta: { scrollToTop: true }},
    { path: '/login', component: resolve => {require(['../render/pages/HelloWorld'], resolve)}}
  ]
})
