# 🚀 部署指南

由于项目使用了 Puppeteer，Vercel 等无服务器平台会有问题。以下是推荐的免费 Docker 部署平台：

## 🏆 推荐平台

### 1. **Railway** (最推荐)
- **免费额度**: 每月 $5 免费额度
- **优势**: 原生 Docker 支持，简单易用
- **部署时间**: 5-10 分钟

#### 部署步骤：
1. 访问 [Railway](https://railway.app/)
2. 使用 GitHub 登录
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择你的仓库
5. 等待自动部署完成

### 2. **Render**
- **免费额度**: 免费 Web 服务
- **优势**: 简单配置，自动 HTTPS
- **限制**: 免费版有休眠机制

#### 部署步骤：
1. 访问 [Render](https://render.com/)
2. 注册/登录账户
3. 点击 "New" → "Web Service"
4. 连接 GitHub 仓库
5. 配置环境变量（见下方）
6. 点击 "Create Web Service"

### 3. **Fly.io**
- **免费额度**: 3个免费应用，每月 3GB 存储
- **优势**: 全球边缘部署，性能优秀

#### 部署步骤：
1. 安装 Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. 登录: `fly auth login`
3. 部署: `fly launch`
4. 配置应用名称和区域
5. 等待部署完成

### 4. **Google Cloud Run**
- **免费额度**: 每月 200万请求免费
- **优势**: 企业级稳定性，按使用量付费

#### 部署步骤：
1. 安装 Google Cloud CLI
2. 启用 Cloud Run API
3. 构建镜像: `gcloud builds submit --tag gcr.io/PROJECT_ID/markdown-to-image-serve`
4. 部署: `gcloud run deploy --image gcr.io/PROJECT_ID/markdown-to-image-serve`

## ⚙️ 环境变量配置

### 必需的环境变量：
```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-app-domain.com
CHROME_PATH=/usr/bin/google-chrome-unstable
```

### 可选的环境变量：
```env
# 自定义端口（默认 3000）
PORT=3000

# 日志级别
LOG_LEVEL=info

# 缓存配置
CACHE_TTL=3600
```

## 🔧 平台特定配置

### Railway 配置
- 使用 `railway.json` 配置文件
- 自动检测 Dockerfile
- 支持健康检查

### Render 配置
- 使用 `render.yaml` 配置文件
- 支持自动部署
- 免费版有休眠机制

### Fly.io 配置
- 使用 `fly.toml` 配置文件
- 支持全球边缘部署
- 自动 HTTPS

## 🐳 Docker 优化

### 多阶段构建
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 生产阶段
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 健康检查
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/hello || exit 1
```

## 📊 性能优化

### 1. 镜像大小优化
- 使用 Alpine Linux 基础镜像
- 多阶段构建减少最终镜像大小
- 清理不必要的文件

### 2. 启动时间优化
- 预安装依赖
- 使用缓存层
- 优化 Dockerfile 指令顺序

### 3. 内存使用优化
- 设置合理的 Node.js 内存限制
- 使用 `--max-old-space-size` 参数
- 监控内存使用情况

## 🔍 故障排除

### 常见问题：

1. **Chrome 启动失败**
   ```bash
   # 检查 Chrome 路径
   which google-chrome
   # 或使用 Chromium
   which chromium
   ```

2. **内存不足**
   ```bash
   # 增加内存限制
   export NODE_OPTIONS="--max-old-space-size=2048"
   ```

3. **端口冲突**
   ```bash
   # 检查端口使用
   netstat -tulpn | grep :3000
   ```

4. **权限问题**
   ```bash
   # 修复权限
   sudo chown -R $USER:$USER .
   ```

### 日志查看：
```bash
# Railway
railway logs

# Render
在 Dashboard 中查看日志

# Fly.io
fly logs

# Google Cloud Run
gcloud logging read "resource.type=cloud_run_revision"
```

## 🚀 快速部署命令

### Railway
```bash
# 安装 Railway CLI
npm i -g @railway/cli

# 登录
railway login

# 部署
railway up
```

### Render
```bash
# 使用 GitHub 集成自动部署
# 或使用 Render CLI
render deploy
```

### Fly.io
```bash
# 安装 Fly CLI
curl -L https://fly.io/install.sh | sh

# 登录
fly auth login

# 部署
fly launch
```

## 📈 监控和维护

### 1. 性能监控
- 使用平台内置监控
- 设置告警规则
- 监控响应时间

### 2. 日志管理
- 集中日志收集
- 错误追踪
- 性能分析

### 3. 备份策略
- 定期备份数据
- 配置文件版本控制
- 灾难恢复计划

## 🔗 相关链接

- [Railway 文档](https://docs.railway.app/)
- [Render 文档](https://render.com/docs)
- [Fly.io 文档](https://fly.io/docs/)
- [Google Cloud Run 文档](https://cloud.google.com/run/docs)

## 💡 最佳实践

1. **使用环境变量**管理配置
2. **设置健康检查**确保服务可用性
3. **监控资源使用**避免超出免费额度
4. **定期更新依赖**保持安全性
5. **使用 CI/CD**自动化部署流程

---

选择适合你需求的平台，按照上述步骤进行部署即可！ 