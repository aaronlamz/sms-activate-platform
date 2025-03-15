const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true, // 是否跨域
        pathRewrite: { '^/api': '' }, // 重写路径，把 /api 去掉
      },
    },
  },
})
