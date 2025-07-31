# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/wxingheng/markdown-to-image-serve.svg)](https://github.com/wxingheng/markdown-to-image-serve/issues)

<div align="center">

<h4>🚀 基于 Next.js 和 Puppeteer 的 Markdown 转图片服务</h4>
<p>将 Markdown 内容高效转换为精美图片，提供开箱即用的 API 接口，支持 Docker 快速部署与二次开发。</p>
简体中文 | [English](./README_EN.md)

</div>

---

## 🎯 项目简介

**Markdown To Image Serve** 是一款开箱即用的 Markdown 转图片 API 服务，基于 Next.js 14 和 Puppeteer 构建，具备以下特性：

### ✨ 核心优势
- 🚀 **一键部署** - 支持 Docker Compose 快速部署
- 🔄 **RESTful API** - 简洁易用的 API 接口
- 🎨 **多主题支持** - 内置 9 种精美主题
- 📱 **响应式设计** - 适配移动端和桌面端
- 🌐 **多平台兼容** - 支持 Docker、Railway、Render 等平台
- 🔒 **安全防护** - 最新安全补丁和防护机制
- ⚡ **性能优化** - 图片压缩、缓存优化

### 🛠️ 技术栈
- **前端**: Next.js 14, React 18, TypeScript
- **UI组件**: Radix UI, Tailwind CSS
- **Markdown**: markdown-to-poster, react-md-editor
- **浏览器**: Puppeteer Core, Chromium
- **部署**: Docker, Railway, Render, Fly.io

---

## 🖼️ 效果展示

<div align="center">
  <img src="https://github.com/user-attachments/assets/a0e641b8-9369-4cc6-b602-256f26089777" width="32%" alt="示例1" />
  <img src="https://github.com/user-attachments/assets/d67f3b84-0a1a-4b60-853b-fcf13d313d0e" width="32%" alt="示例2" />
  <img src="https://github.com/user-attachments/assets/e5e4ac59-a607-42d7-9d47-180eb7fe2268" width="32%" alt="示例3" />
</div>

---

## 🌟 核心功能

### 📝 内容转换
- Markdown 文本一键转图片
- 支持代码高亮和语法高亮
- 表格渲染和数学公式支持
- 图片和链接处理

### 🎨 样式定制
- **9种内置主题**: blue, pink, purple, green, yellow, gray, red, indigo, SpringGradientWave
- 自定义页眉页脚
- Logo 和品牌元素
- 响应式布局适配

### 🔧 开发工具
- 实时预览编辑器
- 主题切换和参数调整
- 一键复制图片功能
- 批量处理支持

### 📦 API 服务
- RESTful API 接口
- 图片生成和存储
- 错误处理和日志记录
- 健康检查机制

---

## 🚀 快速开始

### 🌐 在线体验

- [在线服务（Vercel）](https://markdown-to-image-serve.jcommon.top)
- [GitHub 仓库](https://github.com/wxingheng/markdown-to-image-serve)

### 💻 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/wxingheng/markdown-to-image-serve.git
   cd markdown-to-image-serve
   ```

2. **安装依赖**
   ```bash
   yarn install
   ```

3. **配置环境变量**  
   新建 `.env` 文件：
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   CHROME_PATH=/path/to/your/chrome  # Chrome 浏览器路径
   ```

4. **启动开发服务器**
   ```bash
   yarn dev
   ```

5. **访问应用**
   打开浏览器访问 `http://localhost:3000`

#### 🔧 Chrome 路径配置

**macOS**:
```bash
ls -l /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
```

**Linux**:
```bash
which google-chrome
# 或
which chromium
```

**Windows**:
```powershell
Get-Command chrome | Select-Object -ExpandProperty Definition
# 或在 chrome://version/ 查看"可执行文件路径"
```

---

### 🐳 Docker 部署（推荐）

#### 使用 Docker Compose（最简单）

```bash
# 克隆项目
git clone https://github.com/wxingheng/markdown-to-image-serve.git
cd markdown-to-image-serve

# 启动服务
docker-compose up -d

# 访问服务
open http://localhost:3000
```

#### 直接使用 Docker

```bash
# 拉取镜像
docker pull wxingheng/markdown-to-image-serve:0.0.6

# 运行容器
docker run -p 3000:3000 wxingheng/markdown-to-image-serve:0.0.6
```

#### 自行构建

```bash
# 构建镜像
docker build -f Dockerfile -t markdown-to-image-serve .

# 运行容器
docker run -p 3000:3000 markdown-to-image-serve
```

> **💡 提示**: 如果 Docker 构建遇到问题，可以尝试：
> ```bash
> export DOCKER_BUILDKIT=0
> export COMPOSE_DOCKER_CLI_BUILD=0
> ```

#### 🔧 Docker 设置帮助

如果遇到 Docker Hub 推送权限问题，请参考：[Docker 设置指南](./DOCKER_SETUP.md)

---

### ☁️ 云平台部署

由于项目使用了 Puppeteer，推荐使用以下支持 Docker 的平台：

#### 🏆 Railway (最推荐)
- **免费额度**: 每月 $5
- **优势**: 原生 Docker 支持，简单易用
- **部署**: 连接 GitHub 仓库自动部署

#### 🌐 Render
- **免费额度**: 免费 Web 服务
- **优势**: 简单配置，自动 HTTPS
- **限制**: 免费版有休眠机制

#### 🚀 Fly.io
- **免费额度**: 3个免费应用
- **优势**: 全球边缘部署，性能优秀

#### ☁️ Google Cloud Run
- **免费额度**: 每月 200万请求
- **优势**: 企业级稳定性

详细部署指南请参考：[部署指南](./DEPLOYMENT.md)

---

## 📚 API 文档

### 1. 生成海报图片

**接口**: `POST /api/generatePosterImage`

**请求参数**:

```json
{
  "markdown": "string",       // 必需：Markdown 内容
  "header": "string",         // 可选：页眉文本
  "footer": "string",         // 可选：页脚文本
  "logo": "string",           // 可选：logo图片URL
  "theme": "string"           // 可选：主题名称
}
```

**支持的主题**:
- `blue`, `pink`, `purple`, `green`, `yellow`, `gray`, `red`, `indigo`
- `SpringGradientWave` (默认)

**示例请求**:

```bash
curl -X POST 'http://localhost:3000/api/generatePosterImage' \
  -H 'Content-Type: application/json' \
  -d '{
    "markdown": "# Hello World\n\nThis is a test.\n\n## 功能特性\n- 支持 Markdown\n- 多主题选择\n- 自定义样式",
    "header": "我的项目",
    "footer": "Powered by Markdown To Image Serve",
    "theme": "SpringGradientWave"
  }'
```

**响应示例**:

```json
{
  "url": "http://localhost:3000/api/images/poster-1234567890-abc123def.png"
}
```

### 2. 获取图片

**接口**: `GET /api/images/[filename]`

**说明**: 获取生成的图片文件

### 3. 健康检查

**接口**: `GET /api/hello`

**说明**: 服务健康状态检查

---

## 🛠️ 开发工具

```bash
# 代码检查
yarn lint

# 自动修复代码问题
yarn lint:fix

# 类型检查
yarn type-check

# 构建项目
yarn build

# 启动开发服务器
yarn dev
```

---

## 📋 项目结构

```
markdown-to-image-serve/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── docs/           # 文档页面
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页
│   ├── components/         # React 组件
│   │   ├── ui/            # UI 组件库
│   │   ├── Editor.tsx     # 编辑器组件
│   │   ├── Header.tsx     # 头部组件
│   │   └── PosterView.tsx # 海报预览组件
│   ├── pages/             # Pages Router
│   │   └── api/           # API 路由
│   │       ├── generatePosterImage.ts  # 生成海报API
│   │       └── images/    # 图片服务API
│   └── lib/               # 工具函数
├── public/                # 静态资源
├── docker-compose.yml     # Docker Compose 配置
├── Dockerfile            # Docker 构建文件
├── railway.json          # Railway 配置
├── fly.toml             # Fly.io 配置
├── render.yaml           # Render 配置
└── package.json          # 项目配置
```

---

## 🛠 开发计划

### ✅ 已完成
- [x] Docker 部署支持
- [x] 自定义主题功能
- [x] 图片压缩优化
- [x] 批量生成功能
- [x] 中文字体优化
- [x] 自定义模板系统
- [x] API 访问控制
- [x] 安全性优化
- [x] 性能优化
- [x] 云平台部署支持

### 🚧 进行中
- [ ] 更多主题支持
- [ ] 批量处理优化
- [ ] 缓存机制完善

### 📅 计划中
- [ ] 用户认证系统
- [ ] 图片格式转换
- [ ] 模板市场
- [ ] 统计分析

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork 本仓库**
2. **创建特性分支**: `git checkout -b feature/AmazingFeature`
3. **提交改动**: `git commit -m 'Add some AmazingFeature'`
4. **推送分支**: `git push origin feature/AmazingFeature`
5. **提交 Pull Request**

### 开发环境设置

```bash
# 克隆项目
git clone https://github.com/wxingheng/markdown-to-image-serve.git
cd markdown-to-image-serve

# 安装依赖
yarn install

# 启动开发服务器
yarn dev
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 提交前运行 `yarn lint` 和 `yarn type-check`

---

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 感谢 [markdown-to-image](https://github.com/gcui-art/markdown-to-image) 项目的启发
- 感谢所有贡献者的支持

如果本项目对你有帮助，欢迎 ⭐️ **Star** 支持！

---

## 📞 联系我们

- **GitHub**: [wxingheng/markdown-to-image-serve](https://github.com/wxingheng/markdown-to-image-serve)
- **在线服务**: [markdown-to-image-serve.jcommon.top](https://markdown-to-image-serve.jcommon.top)
- **JCommon工场**: [jcommon.top](https://jcommon.top)

