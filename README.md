<div align="center">

# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/your-username/markdown-to-image-serve.svg)](https://github.com/your-username/markdown-to-image-serve/issues)

<h4>基于 Next.js 和 Puppeteer 的 Markdown 转图片服务，支持 Vercel 一键部署和 API 调用</h4>

<p>一个将 Markdown 内容转换为精美图片的服务，提供开箱即用的 API 接口，支持 Vercel 快速部署和二次开发</p>

简体中文 | [English](./README_EN.md)

</div>

## 🎯 项目简介

Markdown To Image Serve 是一个开箱即用的 Markdown 转图片 API 服务。你可以：

- 🚀 **一键部署** - 支持 Vercel 一键部署，无需自建服务器
- 🔄 **API 集成** - 提供简单易用的 RESTful API 接口
- 🎨 **自定义样式** - 支持自定义页眉页脚和样式模板
- 📱 **响应式设计** - 自适应不同尺寸的图片输出

## 🌐 快速使用

### 在线服务

- 🔗 [在线服务](https://markdown-to-image-serve.jcommon.top) - 直接访问使用
- 📦 [GitHub 仓库](https://github.com/wxingheng/markdown-to-image-serve) - 获取源码

使用 Markdown To Image Serve 有两种方式：
1. **API 调用**：通过 RESTful API 接口集成到您的项目中
2. **在线使用**：访问我们的[在线服务](https://markdown-to-image-serve.jcommon.top)直接使用

⭐ [点击 Star 和 Watch 来获取最新动态](https://github.com/wxingheng/markdown-to-image-serve)

## ⚡️ 快速部署

### Vercel 部署

1. 点击下方按钮一键部署到 Vercel
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/markdown-to-image-serve)

2. 部署完成后，你将获得一个可用的 API 地址，例如：`https://your-project.vercel.app`

### Docker 部署

1. 使用 Docker Compose 部署（推荐）

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

2. 使用 Docker 直接部署

```bash
# 构建镜像
docker build -t markdown-to-image-serve .

# 运行容器
docker run -p 3000:3000 markdown-to-image-serve
```

访问 [http://localhost:3000](http://localhost:3000) 即可使用服务。

## ✨ 特性

- 🎯 **Markdown 渲染** - 完整支持 Markdown 语法
- 🔄 **图片处理** - 支持外部图片引用和优化
- 🎨 **自定义模板** - 可配的页眉页脚和样式
- ⚡️ **高性能** - 基于 Puppeteer 的高效渲染
- 📦 **简单集成** - 提供简单的 API 调用方式

## 📦 快速开始

### 本地开发

```bash
# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install

# 启动开发服务器
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### API 使用

#### 生成海报

```bash
curl --location 'https://markdown-to-image-serve.jcommon.top/api/generatePoster' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# 标题",
    "header": "页眉文本",
    "footer": "页脚文本"
}'
```

```bash
curl --location 'http://localhost:3000/api/generatePoster' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# 标题",
    "header": "页眉文本",
    "footer": "页脚文本"
}'
```

#### 生成图片


```bash
curl --location 'https://markdown-to-image-serve.jcommon.top/api/generatePosterImage' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# 标题"
}'
```

```bash
curl --location 'http://localhost:3000/api/generatePosterImage' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# 标题"
}'
```

## 📚 API 文档

### POST /api/generatePoster

生成包含页眉页脚的海报。

**请求参数：**

```json
{
    "markdown": "Markdown 内容",
    "header": "页眉文本（可选）",
    "footer": "页脚文本（可选）"
}
```

### POST /api/generatePosterImage

生成纯图片格式的海报。

**请求参数：**

```json
{
    "markdown": "Markdown 内容"
}
```

## 🚀 最佳实践

### 示例代码运行
1. 进入示例目录：
```bash
cd example
```

2. 运行示例脚本：
```bash
node api_buffer_2_image.js
```

### 使用建议
- 建议使用 Buffer 方式处理图片数据以获得更好的性能
- 可以参考 `example` 目录下的示例代码进行集成
- 推荐使用异步方式调用 API，避免阻塞主线程

## 🛠 开发计划

- [x] 支持Vercel一键部署
- [x] 支持Docker部署
- [ ] 优化图片加载性能
- [ ] 添加图片压缩选项
- [ ] 支持批量生成功能
- [ ] 海报中文乱码问题

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

本项目基于 [markdown-to-image](https://github.com/gcui-art/markdown-to-image) 开发,感谢原作者的开源贡献。markdown-to-image 是一个优秀的 React 组件,可以将 Markdown 渲染成精美的海报图片。


如果这个项目对你有帮助，欢迎 star 支持！ ⭐️

