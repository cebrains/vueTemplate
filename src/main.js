// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import promise from 'es6-promise'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as fetch from '@/render/js/fetch'
import config from '@/render/js/config'

// 兼容 Promise
promise.polyfill()

Vue.use(ElementUI);
Vue.config.productionTip = false

//vue全局添加
Vue.prototype.$fetch = fetch;
Vue.prototype.$config = config;

new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to)
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
