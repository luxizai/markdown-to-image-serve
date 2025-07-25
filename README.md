# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/your-username/markdown-to-image-serve.svg)](https://github.com/wxingheng/markdown-to-image-serve/issues)

<div align="center">

<h4>基于 Next.js 和 Puppeteer 的 Markdown 转图片服务，支持 Docker 一键部署与 API 调用</h4>
<p>将 Markdown 内容高效转换为精美图片，提供开箱即用的 API 接口，支持 Docker 快速部署与二次开发。</p>
简体中文 | [English](./README_EN.md)

</div>

---

## 🎯 项目简介

Markdown To Image Serve 是一款开箱即用的 Markdown 转图片 API 服务，具备以下特性：

- 🚀 一键部署（支持 Docker Compose）
- 🔄 简洁易用的 RESTful API
- 🎨 支持自定义样式、页眉页脚与主题模板
- 📱 响应式设计，适配多种尺寸
- 🌐 多平台兼容（如 Docker 等）
- 🔒 支持图片防盗链与访问控制

![示例1](https://github.com/user-attachments/assets/a0e641b8-9369-4cc6-b602-256f26089777)
![示例2](https://github.com/user-attachments/assets/d67f3b84-0a1a-4b60-853b-fcf13d313d0e)
![示例3](https://github.com/user-attachments/assets/e5e4ac59-a607-42d7-9d47-180eb7fe2268)

---

## 🌟 核心功能

- 📝 Markdown 文本一键转图片
- 🎨 多主题与自定义样式支持
- 📊 代码高亮与表格渲染
- 🖼️ 自定义页眉页脚
- 📱 响应式输出，适配多端
- 🔄 批量转换能力
- 📦 完善的 API 支持

---

## 🚀 快速开始

### 在线体验

- [在线服务（Vercel，速度较慢，建议本地部署）](https://markdown-to-image-serve.jcommon.top)
- [GitHub 仓库](https://github.com/wxingheng/markdown-to-image-serve)

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/markdown-to-image-serve.git
   cd markdown-to-image-serve
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量**  
   新建 `.env` 文件，内容如下：
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   CHROME_PATH=/path/to/your/chrome  # Chrome 浏览器路径
   ```

4. **启动开发服务器**
   ```bash
   pnpm dev
   ```

#### Chrome 路径获取方式

- **macOS**:
  ```bash
  ls -l /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
  ```
- **Linux**:
  ```bash
  which google-chrome
  # 或
  which chromium
  ```
- **Windows**:
  ```powershell
  Get-Command chrome | Select-Object -ExpandProperty Definition
  # 或在 chrome://version/ 查看"可执行文件路径"
  ```

---

### Docker 部署（推荐）

#### 1. 使用 Docker Compose

```bash
docker-compose up -d
```

#### 2. 直接使用 Docker

拉取镜像：
   ```bash
   docker pull wxingheng/markdown-to-image-serve:0.0.2
   ```
运行容器：
   ```bash
   docker run -p 3000:3000 wxingheng/markdown-to-image-serve:0.0.2
   ```

---

### 自行构建

```bash
# docker build --platform=linux/amd64 -t markdown-to-image-serve .

docker build -f Dockerfile -t markdown-to-image-serve .

docker run -p 3000:3000 markdown-to-image-serve
```

> **注意：** 如果你在 Docker 构建过程中遇到报错，可以尝试先执行以下命令关闭 BuildKit：
> ```bash
> export DOCKER_BUILDKIT=0
> export COMPOSE_DOCKER_CLI_BUILD=0
> ```

---

## 📚 API 文档

### 1. 生成海报（POST `/api/generatePosterImage`）

**请求参数：**

```json5
{
  "markdown": "string",       // Markdown 内容
  "header": "string",         // 可选：页眉文本
  "footer": "string",         // 可选：页脚文本
  "logo": "string",           // 可选：logo图片url
  "theme": "blue | pink | purple | green | yellow | gray | red | indigo | SpringGradientWave" // 可选：主题
}
```

**示例请求：**

```bash
curl -X POST 'http://localhost:3000/api/generatePosterImage' \
  -H 'Content-Type: application/json' \
  -d '{
    "markdown": "# Hello World\n\nThis is a test. \n # 你好，世界!",
    "header": "My Header",
    "footer": "My Footer"
  }'
```

---

## 🛠 开发计划

- [x] Docker 部署支持
- [x] 自定义主题功能
- [ ] 图片压缩优化
- [ ] 批量生成功能
- [x] 中文字体优化
- [ ] 自定义模板系统
- [ ] API 访问控制

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

## 致谢

感谢 [markdown-to-image](https://github.com/gcui-art/markdown-to-image) 项目的启发。

如果本项目对你有帮助，欢迎 star 支持！⭐️

