import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

console.log('环境为：' + process.env.NODE_ENV)

Vue.use(VueRouter)

/*
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
*/

let router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  // scrollBehavior,

  routes: [
    { path: '*', component: _import('404') },
    { path: '/', component: _import('Home'), meta: { scrollToTop: true }},
    { path: '/foo', component: _import('Foo'), meta: {title:'登录', requireAuth:true}},
    { path: '/bar', component: _import('Bar'), meta: { scrollToTop: true }},
    // { path: '/login', component: resolve => {require(['../render/pages/HelloWorld'], resolve)}}
    { path: '/login', component: _import('Login')}
  ]
})
// 记录用户浏览页面的地址的轨迹
router.routesArr = []
// 后退到上一层页面，不是上一个历史
router.backward = function (stepNum) {
  typeof stepNum !== 'number' && (stepNum = 1)
  stepNum = Math.abs(stepNum)
  let index = router.routesArr.length - 1 - stepNum
  let route = router.routesArr[0]
  if (index > 0) {
    route = router.routesArr[index]
  }
  router.push({
    name: route.name,
    // path: route.path,
    params: { isBack: true },
    query: route.query
  })
}
// 判断某一个路由是否在轨迹中出现
router.getIndexOf = path => {
  for (let i in router.routesArr) {
    let route = router.routesArr[i]
    if (route.path === path) {
      return i
    }
  }
  return -1
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let userId = sessionStorage.getItem("userId");
    if (!userId) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

// 记录用户浏览页面的地址的轨迹，只保留单一节点
router.afterEach((to, from) => {
  let index = router.getIndexOf(to.path)
  if (index !== -1) {
    router.routesArr.splice(index, 900)
  }
  router.routesArr.push(to)
})

export default router
