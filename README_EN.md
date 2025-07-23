<div align="center">

# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/your-username/markdown-to-image-serve.svg)](https://github.com/wxingheng/markdown-to-image-serve/issues)

<h4>Markdown to Image Service based on Next.js and Puppeteer, supporting Docker one-click deployment and API integration</h4>
<p>Efficiently convert Markdown content into beautiful images, with ready-to-use API endpoints, Docker quick deployment, and support for secondary development.</p>
[简体中文](./README.md) | English

</div>

---

## 🎯 Project Introduction

Markdown To Image Serve is a ready-to-use Markdown to image API service with the following features:

- 🚀 One-click deployment (Docker Compose supported)
- 🔄 Simple and easy-to-use RESTful API
- 🎨 Custom styles, headers, footers, and theme templates
- 📱 Responsive design for various sizes
- 🌐 Multi-platform compatibility (e.g., Docker)
- 🔒 Image hotlink protection and access control

![Example 1](https://github.com/user-attachments/assets/a0e641b8-9369-4cc6-b602-256f26089777)
![Example 2](https://github.com/user-attachments/assets/d67f3b84-0a1a-4b60-853b-fcf13d313d0e)
![Example 3](https://github.com/user-attachments/assets/e5e4ac59-a607-42d7-9d47-180eb7fe2268)

---

## 🌟 Core Features

- 📝 One-click Markdown to image
- 🎨 Multiple themes and custom styles
- 📊 Code highlighting and table rendering
- 🖼️ Custom headers and footers
- 📱 Responsive output for multiple devices
- 🔄 Batch conversion capability
- 📦 Comprehensive API support

---

## 🚀 Quick Start

### Online Demo

- [Online Service (Vercel, may be slow, local deployment recommended)](https://markdown-to-image-serve.jcommon.top)
- [GitHub Repository](https://github.com/wxingheng/markdown-to-image-serve)

### Local Development

1. **Clone the project**
   ```bash
   git clone https://github.com/your-username/markdown-to-image-serve.git
   cd markdown-to-image-serve
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**  
   Create a `.env` file with the following content:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   CHROME_PATH=/path/to/your/chrome  # Chrome browser path
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

#### How to get Chrome path

- **macOS**:
  ```bash
  ls -l /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
  ```
- **Linux**:
  ```bash
  which google-chrome
  # or
  which chromium
  ```
- **Windows**:
  ```powershell
  Get-Command chrome | Select-Object -ExpandProperty Definition
  # or check "Executable Path" in chrome://version/
  ```

---

### Docker Deployment (Recommended)

#### 1. Using Docker Compose

```bash
docker-compose up -d
# or
docker compose build --no-cache
```

#### 2. Using Docker directly

```bash
docker build --platform=linux/amd64 -t markdown-to-image-serve .
docker run -p 3000:3000 markdown-to-image-serve
```

> **Note:** If you encounter errors during Docker build, try disabling BuildKit first:
> ```bash
> export DOCKER_BUILDKIT=0
> export COMPOSE_DOCKER_CLI_BUILD=0
> ```

---

## 📚 API Documentation

### 1. Generate Poster (POST `/api/generatePosterImage`)

**Request Parameters:**

```json5
{
  "markdown": "string",       // Markdown content
  "header": "string",         // Optional: header text
  "footer": "string",         // Optional: footer text
  "logo": "string",           // Optional: logo image url
  "theme": "blue | pink | purple | green | yellow | gray | red | indigo | SpringGradientWave" // Optional: theme
}
```

**Example Request:**

```bash
curl -X POST 'http://localhost:3000/api/generatePosterImage' \
  -H 'Content-Type: application/json' \
  -d '{
    "markdown": "# Hello World\n\nThis is a test. \n # Hello, World!",
    "header": "My Header",
    "footer": "My Footer"
  }'
```

---

## 🛠 Development Plan

- [x] Docker deployment support
- [x] Custom theme functionality
- [ ] Image compression optimization
- [ ] Batch generation functionality
- [x] Chinese font optimization
- [ ] Custom template system
- [ ] API access control

---

## 🤝 Contribution Guide

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Submit a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

Thanks to the [markdown-to-image](https://github.com/gcui-art/markdown-to-image) project for inspiration.

If this project helps you, please star to support! ⭐️
