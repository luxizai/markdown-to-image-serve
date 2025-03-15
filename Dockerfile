FROM node:20-slim

# 添加Google Chrome的密钥
ADD https://dl-ssl.google.com/linux/linux_signing_key.pub /tmp/linux_signing_key.pub
RUN apt-get update \
    && apt-get install -y gnupg \
    && cat /tmp/linux_signing_key.pub | apt-key add - \
    && rm /tmp/linux_signing_key.pub \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y \
        google-chrome-unstable \
        fonts-ipafont-gothic \
        fonts-wqy-zenhei \
        fonts-thai-tlwg \
        fonts-kacst \
        fonts-freefont-ttf \
        --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


# 设置工作目录
WORKDIR /app

# 首先复制依赖相关文件
COPY package*.json ./
COPY .env* ./

# 然后再复制其他源代码
COPY ./ .

# 安装依赖并构建
RUN npm install && \
    npm run build


# 暴露端口
EXPOSE 3000

# Puppeteer setup: Skip Chromium download and use the installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV CHROME_PATH=/usr/bin/chromium
# ENV NODE_ENV=production
# ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 启动命令
CMD ["npm", "start"] 