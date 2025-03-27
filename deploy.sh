#!/bin/bash
# 部署脚本 - 将dist目录部署到/var/www/sms-platform

# 构建前端应用
echo "正在构建前端应用..."
yarn build

# 确保目标目录存在
echo "检查目标目录..."
if [ ! -d "/var/www/sms-platform" ]; then
  echo "目标目录不存在，创建目录..."
  sudo mkdir -p /var/www/sms-platform
fi

# 复制文件到目标目录
echo "将构建文件复制到目标目录..."
sudo cp -R dist/* /var/www/sms-platform/

# 设置正确的权限
echo "设置目录权限..."
sudo chown -R nginx:nginx /var/www/sms-platform
sudo chmod -R 755 /var/www/sms-platform

echo "部署完成! 前端应用已成功部署到 /var/www/sms-platform/"
