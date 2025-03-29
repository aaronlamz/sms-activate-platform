# SMS Activate Platform Server

短信激活平台的后端服务器。

## 部署指南

### 1. 环境要求

- Node.js >= 16.0.0
- SQLite3
- Git

### 2. 获取代码

```bash
# 把server目录放到服务器，然后进入server目录
cd sms-activate-platform/server

# 安装依赖
npm install
# 或者使用 yarn
yarn install
```

### 3. 配置环境变量

创建 `.env` 文件：

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，设置以下必要的环境变量
PORT=3000                    # 服务器端口
JWT_SECRET=your-secret-key   # JWT 密钥，请使用随机字符串
DB_PATH=./database.sqlite    # SQLite 数据库路径
```

### 4. 启动服务器

#### 方式一：直接使用 Node.js 启动

```bash
# 开发环境
npm run dev
# 或
yarn dev

# 生产环境
npm start
# 或
yarn start
```

#### 方式二：使用 PM2 进程管理（推荐用于生产环境）

1. 安装 PM2

```bash
npm install -g pm2
```

2. 启动服务

```bash
# 启动服务
pm2 start index.js --name "sms-platform"

# 设置开机自启
pm2 startup
pm2 save

# 查看运行状态
pm2 status

# 查看日志
pm2 logs sms-platform
```

3. 管理服务

```bash
# 重启服务
pm2 restart sms-platform

# 停止服务
pm2 stop sms-platform

# 删除服务
pm2 delete sms-platform
```

### 5. 验证部署

访问 `http://服务器IP:3000/health` 检查服务是否正常运行。
