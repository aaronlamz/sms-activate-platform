# 使用 Node.js 作为构建环境
FROM node:18-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock
COPY package*.json yarn.lock* ./

# 安装依赖
RUN yarn install

# 复制项目文件
COPY . .

# 构建应用
RUN yarn build

# 使用轻量级 nginx 镜像提供静态文件服务
FROM nginx:alpine

# 将构建结果复制到 nginx 静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 添加自定义 nginx 配置
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 