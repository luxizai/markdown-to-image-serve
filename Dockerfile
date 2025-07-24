# 文件：Dockerfile
FROM wxingheng/node-chrome-base:0.0.1

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装
COPY package*.json ./
COPY .env* ./

RUN npm install

# 复制应用代码并构建
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]