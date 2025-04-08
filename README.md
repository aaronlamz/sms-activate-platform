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

### 后端部署

1. 将`server`目录上传到服务器

2. 进入后端目录并安装依赖：

   ```bash
   cd server
   npm install
   ```

3. 配置环境变量（创建`.env`文件）：

   ```
   PORT=3000
   JWT_SECRET=your-secret-key
   DB_PATH=./database.sqlite
   ```

4. 启动服务：

   ```bash
   # 方式一：直接使用Node.js启动
   npm start

   # 方式二：使用PM2进程管理（推荐）
   npm install -g pm2
   pm2 start index.js --name "sms-platform"
   pm2 startup
   pm2 save
   ```

5. 验证部署：访问`http://服务器IP:3000/health`

### 前端部署

1. 在本地构建前端：

   ```bash
   # 设置API地址环境变量
   export VUE_APP_API_URL=http://服务器IP:3000

   # 设置跳转域名（可选）
   export VUE_APP_REDIRECT_DOMAIN=https://your-domain.com/

   # 构建项目
   yarn build
   ```

2. 将生成的`dist`目录内容上传到Web服务器（如Nginx）

3. Nginx配置示例：

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /path/to/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://服务器IP:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
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

## 许可证

MIT
