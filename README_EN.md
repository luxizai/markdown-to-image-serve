<div align="center">

# Markdown To Image Serve

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Node Version](https://img.shields.io/node/v/next.svg)](https://nodejs.org)
[![Issues](https://img.shields.io/github/issues/your-username/markdown-to-image-serve.svg)](https://github.com/your-username/markdown-to-image-serve/issues)

<h4>A Markdown to Image service based on Next.js and Puppeteer, supporting Vercel deployment and API integration</h4>

<p>A service that converts Markdown content into beautiful images, providing out-of-the-box API interfaces, supporting quick Vercel deployment and secondary development</p>

[简体中文](./README.md) | English

</div>

## 🎯 Project Overview

Markdown To Image Serve is an out-of-the-box Markdown to Image API service. You can:

- 🚀 **One-Click Deploy** - Deploy to Vercel with one click, no server setup needed
- 🔄 **API Integration** - Simple and easy-to-use RESTful API interfaces
- 🎨 **Custom Styling** - Support for custom headers, footers, and style templates
- 📱 **Responsive Design** - Adaptive image output for different sizes

## ⚡️ Quick Deploy

### Vercel Deployment

1. Click the button below to deploy to Vercel instantly
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/markdown-to-image-serve)

2. After deployment, you'll get a usable API address, e.g.: `https://your-project.vercel.app`

## ✨ Features

- 🎯 **Markdown Rendering** - Full Markdown syntax support
- 🔄 **Image Processing** - Support for external image references and optimization
- 🎨 **Custom Templates** - Configurable headers, footers, and styles
- ⚡️ **High Performance** - Efficient rendering based on Puppeteer
- 📦 **Simple Integration** - Easy API implementation

## 📦 Quick Start

### Local Development

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

### API Usage

#### Generate Poster

```bash
curl --location 'http://localhost:3000/api/generatePoster' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# Title",
    "header": "Header Text",
    "footer": "Footer Text"
}'
```

#### Generate Image

```bash
curl --location 'http://localhost:3000/api/generatePosterImage' \
--header 'Content-Type: application/json' \
--data '{
    "markdown": "# Title"
}'
```

## 📚 API Documentation

### POST /api/generatePoster

Generate a poster with header and footer.

**Request Parameters:**

```json
{
    "markdown": "Markdown content",
    "header": "Header text (optional)",
    "footer": "Footer text (optional)"
}
```

### POST /api/generatePosterImage

Generate a poster in pure image format.

**Request Parameters:**

```json
{
    "markdown": "Markdown content"
}
```

## 🚀 Best Practices

### Running Example Code
1. Enter the example directory:
```bash
cd example
```

2. Run the example script:
```bash
node api_buffer_2_image.js
```

### Usage Recommendations
- Recommended to use Buffer method for image data processing for better performance
- Refer to example code in the `example` directory for integration
- Recommended to use async API calls to avoid blocking the main thread

## 🛠 Development Plans

- [ ] Optimize image loading performance
- [ ] Add image compression options
- [ ] Implement online template preview
- [ ] Support batch generation functionality

## 🤝 Contributing

Pull requests and Issues are welcome!

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

This project is developed based on [markdown-to-image](https://github.com/gcui-art/markdown-to-image). Thanks to the original author for the open-source contribution. markdown-to-image is an excellent React component that renders Markdown into beautiful poster images.

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wxingheng/markdown-to-image-serve&type=Date)](https://star-history.com/#wxingheng/markdown-to-image-serve&Date)

---

If this project helps you, please star it! ⭐️ 