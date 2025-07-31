# 🔧 故障排除指南

## 🚨 GitHub Actions 缓存服务问题

### 问题描述
```
ERROR: failed to parse error response 400: <h2>Our services aren't available right now</h2>
<p>We're working to restore all services as soon as possible. Please check back soon.</p>
```

### 原因分析
这是 GitHub Actions 缓存服务的临时中断，通常是由于：
- GitHub 服务维护
- 网络连接问题
- 缓存服务过载

### 解决方案

#### 方案 1: 禁用缓存（推荐）
修改 `.github/workflows/docker-image.yml`：

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    file: ./Dockerfile
    platforms: linux/amd64
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    labels: ${{ steps.meta.outputs.labels }}
    # 注释掉缓存配置
    # cache-from: type=gha
    # cache-to: type=gha,mode=max
    build-args: |
      BUILDKIT_INLINE_CACHE=1
```

#### 方案 2: 使用备用工作流
使用 `.github/workflows/docker-image-no-cache.yml` 作为备用工作流。

#### 方案 3: 等待服务恢复
如果问题持续存在，可以：
1. 等待 1-2 小时后再试
2. 检查 [GitHub Status](https://www.githubstatus.com/)
3. 关注 [GitHub 官方通知](https://twitter.com/githubstatus)

### 预防措施

1. **监控服务状态**
   - 关注 GitHub Status 页面
   - 设置服务中断通知

2. **备用方案**
   - 准备多个工作流文件
   - 使用不同的缓存策略

3. **本地构建**
   ```bash
   # 本地构建测试
   docker build -t markdown-to-image-serve .
   docker run -p 3000:3000 markdown-to-image-serve
   ```

## 🔍 其他常见问题

### 1. Docker 构建失败

#### 问题：权限不足
```bash
# 解决方案
sudo chown -R $USER:$USER .
```

#### 问题：内存不足
```bash
# 增加 Docker 内存限制
docker build --memory=4g -t markdown-to-image-serve .
```

#### 问题：网络超时
```bash
# 使用国内镜像源
docker build --build-arg REGISTRY_MIRROR=https://registry.docker-cn.com .
```

### 2. Puppeteer 相关问题

#### 问题：Chrome 启动失败
```bash
# 检查 Chrome 路径
which google-chrome
which chromium

# 设置环境变量
export CHROME_PATH=/usr/bin/google-chrome-unstable
```

#### 问题：字体文件缺失
```bash
# 安装字体
sudo apt-get install fonts-noto-cjk
# 或复制字体文件到容器
```

### 3. Next.js 构建问题

#### 问题：内存不足
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### 问题：依赖安装失败
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 4. 部署平台问题

#### Railway 部署失败
1. 检查 `railway.json` 配置
2. 确认环境变量设置
3. 查看 Railway 日志

#### Render 部署失败
1. 检查 `render.yaml` 配置
2. 确认 Dockerfile 路径
3. 查看 Render 构建日志

#### Fly.io 部署失败
1. 检查 `fly.toml` 配置
2. 确认应用名称唯一性
3. 查看 Fly.io 日志

## 📊 性能优化

### Docker 构建优化

1. **多阶段构建**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   FROM node:18-alpine AS production
   WORKDIR /app
   COPY --from=builder /app/node_modules ./node_modules
   COPY . .
   ```

2. **缓存优化**
   ```dockerfile
   # 先复制 package.json，利用 Docker 层缓存
   COPY package*.json ./
   RUN npm install
   COPY . .
   ```

3. **镜像大小优化**
   ```dockerfile
   # 使用 Alpine 基础镜像
   FROM node:18-alpine
   
   # 清理不必要的文件
   RUN npm cache clean --force
   ```

### 应用性能优化

1. **Next.js 优化**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     compress: true,
     swcMinify: true,
     images: {
       formats: ['image/webp', 'image/avif'],
       minimumCacheTTL: 60,
     },
   }
   ```

2. **Puppeteer 优化**
   ```javascript
   const browser = await puppeteer.launch({
     args: [
       '--no-sandbox',
       '--disable-setuid-sandbox',
       '--disable-dev-shm-usage',
       '--disable-accelerated-2d-canvas',
       '--no-first-run',
       '--no-zygote',
       '--disable-gpu'
     ]
   });
   ```

## 🔗 有用链接

- [GitHub Status](https://www.githubstatus.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Docker 官方文档](https://docs.docker.com/)
- [Next.js 文档](https://nextjs.org/docs)
- [Puppeteer 文档](https://pptr.dev/)

## 📞 获取帮助

如果问题仍然存在：

1. **查看日志**
   ```bash
   # GitHub Actions 日志
   # 在 Actions 页面查看详细日志
   
   # Docker 日志
   docker logs <container_id>
   
   # 应用日志
   yarn dev 2>&1 | tee app.log
   ```

2. **提交 Issue**
   - 在 GitHub 仓库提交 Issue
   - 包含详细的错误信息和复现步骤

3. **社区支持**
   - GitHub Discussions
   - Stack Overflow
   - 相关技术社区

---

记住：大多数问题都是临时的，保持耐心并尝试不同的解决方案！ 