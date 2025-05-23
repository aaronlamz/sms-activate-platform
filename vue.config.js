const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/', // 部署目录路径，根据实际部署的目录修改
  transpileDependencies: true,
  devServer: {
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true, // 启用跨域
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '短信接码平台' // 设置页面标题
      return args
    })
  },
})
