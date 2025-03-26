import api from './index'

export const userApi = {
  // 用户注册
  register(username, password) {
    return api.post('/users/register', { username, password })
  },

  // 用户登录
  login(username, password) {
    return api.post('/users/login', { username, password })
  },

  // 获取用户信息
  getProfile() {
    return api.get('/users/profile')
  },

  // 更新用户余额
  updateBalance(amount) {
    return api.post('/users/balance', { amount })
  },
}
