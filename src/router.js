import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // 使用 hash 模式，类似 k20.cc 的路由结构
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
  // 设置页面标题
  document.title = to.meta.title || '短信激活平台'
  next()
})

export default router
