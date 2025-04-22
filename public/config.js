// 域名配置文件
// 该文件不会被webpack编译，可以在打包后直接修改
window.domainConfig = {
  // 主域名配置 - 主网站
  baseUrl: 'https://dingzan.vip',

  // 中间跳转等待页面域名
  waitingUrl: 'https://u93.store',

  // 支付页面域名配置 - 通配符域名格式为两位字母数字随机组成
  paymentUrl: 'https://{subdomain}.u93.us',

  // API服务域名配置
  apiUrl: 'https://api.uu66.us',

  // 子域名长度配置 - 指定随机生成的子域名字符数量(默认为2)
  subdomainLength: 3,

  // 其他可能需要的域名配置
  // cdnUrl: 'https://cdn.example.com',
}
