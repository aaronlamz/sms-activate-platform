const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/test', // 部署目录路径，根据实际情况修改
  transpileDependencies: true,
  devServer: {
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true, // 是否跨域
        pathRewrite: { '^/api': '' }, // 重写路径，把 /api 去掉
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '短信激活平台' // 设置页面标题
      return args
    })
  },
})
