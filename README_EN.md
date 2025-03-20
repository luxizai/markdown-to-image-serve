<div align="center">

# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/your-username/markdown-to-image-serve.svg)](https://github.com/wxingheng/markdown-to-image-serve/issues)

<h4>Markdown to Image Service based on Next.js and Puppeteer, supporting Docker deployment and API integration</h4>

<p>A service that converts Markdown content into beautiful images, providing ready-to-use API interfaces, supporting Docker quick deployment and secondary development</p>

[简体中文](./README.md) | English

</div>

## 🎯 Project Introduction

Markdown To Image Serve is a ready-to-use Markdown to image API service. You can:

- 🚀 **One-click Deployment** - Supports Docker Compose one-click deployment
- 🔄 **API Integration** - Provides simple and easy-to-use RESTful API interfaces
- 🎨 **Custom Styles** - Supports custom headers, footers, and style templates
- 📱 **Responsive Design** - Adapts to different image output sizes
- 🌐 **Multi-platform Support** - Supports various deployment methods including Docker
- 🔒 **Secure and Reliable** - Supports image hotlink protection and access control

## 🌟 Core Features

- 📝 Convert Markdown text to beautiful images
- 🎨 Support for custom themes and styles
- 📊 Support for code highlighting and table rendering
- 🖼️ Support for custom headers and footers
- 📱 Adaptive to different device sizes
- 🔄 Support for batch conversion
- 📦 Provides complete API interfaces

## Quick Start

### Online Service (Based on Vercel, may be slow and unstable. Docker deployment recommended)

Visit our online service to experience it immediately:
- 🌐 [Online Service](https://markdown-to-image-serve.jcommon.top)
- 📦 [GitHub Repository](https://github.com/wxingheng/markdown-to-image-serve)

### Local Development

1. Clone the project
```bash
git clone https://github.com/your-username/markdown-to-image-serve.git
cd markdown-to-image-serve
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
Create a `.env` file:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CHROME_PATH=/path/to/your/chrome  # Chrome browser path
```

4. Start the development server
```bash
pnpm dev
```

### Chrome Path Configuration Guide

Chrome path can be obtained according to different operating systems:

**macOS**:
```bash
ls -l /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
```

**Linux**:
```bash
which google-chrome
# or
which chromium
```

**Windows**:
```powershell
Get-Command chrome | Select-Object -ExpandProperty Definition
# or visit chrome://version/ to check "Executable Path"
```

### Docker Deployment

Using Docker Compose (Recommended Recommended Recommended):
```bash
docker-compose up -d
```

```
docker compose build --no-cache 
```

> Note:
> 1. For x86 architecture (Linux platform, Windows platform, Mac Intel platform), please set the platform in docker-compose.yml to linux/x86
> 2. For Apple Silicon platform, please set the platform in docker-compose.yml to linux/amd64

Or deploy directly using Docker:
```bash
docker build -t markdown-to-image-serve .
docker run -p 3000:3000 markdown-to-image-serve
```

## 📚 API Documentation

### Generate Poster (POST /api/generatePoster)

**Request Parameters:**
```typescript
{
  markdown: string;       // Markdown content
  header?: string;       // Optional: header text
  footer?: string;       // Optional: footer text
  theme?: 'light' | 'dark'; // Optional: theme
  width?: number;        // Optional: image width
  height?: number;       // Optional: image height
}
```

**Example Request:**
```bash
curl -X POST 'http://localhost:3000/api/generatePoster' \
  -H 'Content-Type: application/json' \
  -d '{
    "markdown": "# Hello World\n\nThis is a test. \n # Hello, World!",
    "header": "My Header",
    "footer": "My Footer"
  }'
```

### Generate Image (POST /api/generatePosterImage)

**Request Parameters:**
```typescript
{
  markdown: string;      // Markdown content
  theme?: string;       // Optional: theme
  width?: number;       // Optional: image width
}
```

## 🛠 Development Plan

- [x] Docker deployment support
- [x] Custom theme functionality
- [ ] Image compression optimization
- [ ] Batch generation functionality
- [x] Chinese font optimization
- [ ] Custom template system
- [ ] API access control

## 🤝 Contribution Guide

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgements

Thanks to the [markdown-to-image](https://github.com/gcui-art/markdown-to-image) project for inspiration.

If this project helps you, please star to support! ⭐️
