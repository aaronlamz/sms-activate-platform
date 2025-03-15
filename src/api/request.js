import axios from 'axios'
import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  // 请根据你的后端接口修改 baseURL
  baseURL: 'https://example.com/api',
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 预留设置请求头：例如从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 如果未设置 Content-Type，则默认使用 application/json
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 根据实际接口返回的格式来判断
    if (res.code !== 200) {
      Message.error(res.message || '接口请求失败')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data // 返回真正的数据
    }
  },
  (error) => {
    Message.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

// 导出通用的 post 方法
export function post(url, data) {
  return service({
    url,
    method: 'post',
    data,
  })
}

// 导出通用的 get 方法
export function get(url, params) {
  return service({
    url,
    method: 'get',
    params,
  })
}

export default service
