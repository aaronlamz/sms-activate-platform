# 接码短信平台

一个用于管理短信激活服务的平台。

## 功能特点

- 用户认证（注册/登录）
- 用户信息管理
- 短信激活服务管理
- 使用 Element UI 的现代化界面

## 技术栈

- 前端：Vue 2 + Element UI
- 后端：Node.js + Express
- 数据库：SQLite

## 开发环境设置

1. 克隆仓库
2. 安装依赖：

   ```bash
   # 安装前端依赖
   yarn install

   # 安装后端依赖
   cd server
   npm install
   ```

3. 启动开发服务器：

   ```bash
   # 启动后端服务器
   cd server
   npm run dev

   # 启动前端服务器（新终端）
   yarn serve
   ```

4. 访问应用：
   - 前端：http://localhost:8080
   - 后端 API：http://localhost:3000

## 生产环境部署

应用已部署在 Railway 平台：

- 前端：https://sms-platform-production.up.railway.app
- 后端 API：https://sms-activate-platform-production.up.railway.app

### 部署流程

1. 后端部署：

   ```bash
   # 进入后端目录
   cd server

   # 初始化 Railway 项目（首次部署）
   railway init

   # 部署后端
   railway up
   ```

2. 前端部署：

   ```bash
   # 返回项目根目录
   cd ..

   # 初始化 Railway 项目（首次部署）
   railway init

   # 部署前端
   railway up
   ```

3. 环境变量配置：

   - 后端环境变量（在 Railway 控制台配置）：
     ```
     PORT=3000
     JWT_SECRET=sms-activate-platform-secret-key-2024
     DB_PATH=./database.sqlite
     ```
   - 前端环境变量（在 Railway 控制台配置）：
     ```
     VUE_APP_API_URL=https://sms-activate-platform-production.up.railway.app
     ```

4. 域名配置：

   ```bash
   # 获取后端域名
   cd server
   railway domain

   # 获取前端域名
   cd ..
   railway domain
   ```

### API 接口

- 健康检查：`GET /health`
- 用户注册：`POST /api/users/register`
- 用户登录：`POST /api/users/login`
- 用户信息：`GET /api/users/profile`

## 环境要求

- Node.js 版本：v16.21.3
- Yarn 版本：1.22.22

## 页面结构

- 首页：http://localhost:8080/
- 登录：http://localhost:8080/login
- 充值：http://localhost:8080/payment/index.html

## 部署指南

本地执行以下命令构建，将制品 dist 文件夹中的内容部署到服务器上即可：

```shell
yarn build
```

## 许可证

MIT
