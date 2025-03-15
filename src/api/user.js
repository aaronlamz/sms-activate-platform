import { post, get } from './request'

// 用户登录接口
export function loginApi(data) {
  return post('/user/login', data)
}

// 用户注册接口
export function registerApi(data) {
  return post('/user/register', data)
}

// 获取用户信息（假设使用 GET 请求）
export function getUserInfo() {
  return get('/user/info')
}
