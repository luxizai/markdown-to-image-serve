<!--
 * @Author: wxingheng
 * @Date: 2025-07-23 17:55:43
 * @LastEditTime: 2025-07-23 17:56:47
 * @LastEditors: wxingheng
 * @Description: Docker 镜像推送与使用说明
 * @FilePath: /markdown-to-image-serve/dev.md
-->

# Docker 镜像推送与使用说明

## 1. 推送镜像到 Docker Hub

1. 登录 Docker Hub：
   ```bash
   docker login
   ```
2. 给镜像打标签（假设本地镜像名为 markdown-to-image-serve）：
   ```bash
   docker tag markdown-to-image-serve wxingheng/markdown-to-image-serve:0.0.1
   ```
3. 推送到 Docker Hub：
   ```bash
   docker push wxingheng/markdown-to-image-serve:0.0.1
   ```

---

## 2. 拉取和使用镜像

1. 拉取镜像：
   ```bash
   docker pull wxingheng/markdown-to-image-serve:0.0.1
   ```
2. 运行容器：
   ```bash
   docker run -p 3000:3000 wxingheng/markdown-to-image-serve:0.0.1
   ```

---

## 3. 镜像优化建议

- 镜像太大？
  - 可用 `docker images` 查看镜像大小。
  - 优化建议：多阶段构建、精简依赖、清理缓存等。

---

如需自动化推送，可结合 GitHub Actions 等 CI 工具实现自动构建与推送。