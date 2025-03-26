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

```bash
npm start
# 或者使用 yarn
yarn start
```
