import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

// 检查是否是支付页面路径
const isPaymentPath = window.location.hash.startsWith('#/payment')

// 如果是支付页面，直接重定向
if (isPaymentPath) {
  window.location.href = window.location.href.replace(/#\/payment/, '/payment/index.html')
}

const router = new Router({
  mode: 'hash', // 使用 hash 模式，类似 dingzan.vip 的路由结构
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '短信接码平台',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
  ],
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果是访问支付页面，直接重定向到静态HTML页面
  if (to.path.startsWith('/payment')) {
    window.location.href = window.location.origin + '/payment/index.html' + window.location.search
    return
  }
  // 设置页面标题
  document.title = to.meta.title || '短信激活平台'
  next()
})

export default router
