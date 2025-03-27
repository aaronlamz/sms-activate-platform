import axios from 'axios'

// 根据当前访问方式动态确定API基础URL
function getBaseUrl() {
  // 获取当前协议(http/https)
  const protocol = window.location.protocol
  const currentHost = window.location.hostname

  // 检查是否是IP地址 (简单验证数字和点的组合)
  const isIPAddress = /^[0-9.]+$/.test(currentHost)

  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api'
  }

  // 生产环境
  if (isIPAddress) {
    // 如果是IP访问，API也使用相同IP
    return `${protocol}//${currentHost}/api`
  } else if (currentHost === 'dingzan.vip' || currentHost === 'www.dingzan.vip') {
    // 如果是域名访问，使用API域名，保持相同协议
    return `${protocol}//api.dingzan.vip/api`
  } else {
    // 其他情况，使用相对路径
    return '/api'
  }
}
// 根据环境设置不同的 baseURL
const baseURL = getBaseUrl()

// 创建 axios 实例
const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smsToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem('smsToken')
          window.location.href = '/login'
          break
        case 403:
          // 权限不足
          console.error('权限不足')
          break
        case 404:
          // 资源不存在
          console.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器错误')
          break
        default:
          console.error('请求失败')
      }
    }
    return Promise.reject(error)
  }
)

export default api
