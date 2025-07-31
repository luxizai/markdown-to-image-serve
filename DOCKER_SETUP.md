# Docker Hub 设置指南

## 🔧 解决 Docker Hub 推送权限问题

### 问题描述
```
unauthorized: access token has insufficient scopes
Error: Password required
```

这些错误表明你的 Docker Hub 访问令牌权限不足或配置不正确。

### 解决方案

#### 1. 创建新的 Docker Hub 访问令牌

1. **登录 Docker Hub**
   - 访问 [Docker Hub](https://hub.docker.com/)
   - 使用你的账户登录

2. **创建访问令牌**
   - 点击右上角头像 → **Account Settings**
   - 左侧菜单选择 **Security**
   - 点击 **New Access Token**

3. **配置令牌权限**
   - **Token Name**: `github-actions-markdown-to-image-serve`
   - **Access permissions**: 选择 **Read & Write**
   - 确保勾选以下权限：
     - ✅ **Read & Write** (用于推送镜像)
     - ✅ **Read** (用于拉取镜像)

4. **生成令牌**
   - 点击 **Generate**
   - **立即复制令牌** (重要：令牌只显示一次)

#### 2. 更新 GitHub Secrets

1. **进入 GitHub 仓库设置**
   - 访问你的 GitHub 仓库
   - 点击 **Settings** 标签
   - 左侧菜单选择 **Secrets and variables** → **Actions**

2. **更新或添加 Secrets**
   - 点击 **New repository secret**
   - 添加以下两个 secret：

   **DOCKERHUB_USERNAME**
   ```
   你的 Docker Hub 用户名
   ```

   **DOCKERHUB_TOKEN**
   ```
   刚才生成的访问令牌
   ```

3. **删除旧的 Secrets** (如果存在)
   - 找到并删除 `DOCKERHUB_PASSWORD` secret
   - 确保没有重复的 secret

#### 3. 验证设置

1. **检查 Secrets 是否正确设置**
   - 确保 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_TOKEN` 都存在
   - 确保没有 `DOCKERHUB_PASSWORD`

2. **测试推送**
   - 推送代码到 `main` 或 `master` 分支
   - 检查 GitHub Actions 是否成功运行

### 🔍 故障排除

#### 如果遇到 "Password required" 错误：

1. **检查 Secrets 名称**
   ```yaml
   # 确保使用正确的 secret 名称
   username: ${{ secrets.DOCKERHUB_USERNAME }}
   password: ${{ secrets.DOCKERHUB_TOKEN }}  # 不是 DOCKERHUB_PASSWORD
   ```

2. **验证令牌格式**
   - 确保令牌是完整的，没有多余的空格
   - 令牌通常以 `dckr_pat_` 开头

3. **测试本地登录**
   ```bash
   # 测试登录
   echo "你的令牌" | docker login -u "你的用户名" --password-stdin
   ```

#### 如果仍然遇到权限问题：

1. **检查令牌权限**
   - 确保令牌有 Read & Write 权限
   - 确保令牌没有过期

2. **验证仓库权限**
   - 确保你的 Docker Hub 账户有权限推送到 `wxingheng/markdown-to-image-serve`
   - 如果是组织仓库，确保你有推送权限

3. **检查令牌是否过期**
   - Docker Hub 令牌可能会过期
   - 如果令牌过期，重新生成一个新的

#### 常见错误及解决方案：

**错误**: `denied: requested access to the resource is denied`
**解决**: 检查 Docker Hub 用户名是否正确，确保有推送权限

**错误**: `unauthorized: authentication required`
**解决**: 检查访问令牌是否正确，确保令牌有足够的权限

**错误**: `manifest unknown: manifest unknown`
**解决**: 这通常是构建问题，检查 Dockerfile 是否正确

**错误**: `Password required`
**解决**: 
- 确保使用 `DOCKERHUB_TOKEN` 而不是 `DOCKERHUB_PASSWORD`
- 检查令牌是否正确复制
- 确保令牌没有过期

### 🛠️ 备用解决方案

如果复杂的工作流出现问题，可以使用简化的备用工作流：

1. **启用备用工作流**
   - 在 `.github/workflows/` 目录下创建 `docker-simple.yml`
   - 使用更简单的构建和推送步骤

2. **手动测试**
   ```bash
   # 本地测试构建
   docker build -t test-image .
   
   # 本地测试登录
   docker login -u your-username
   ```

### 📋 最佳实践

1. **使用专用令牌**
   - 为每个项目创建专用的访问令牌
   - 不要使用账户密码

2. **定期轮换令牌**
   - 建议每 6 个月更新一次令牌
   - 删除不再使用的旧令牌

3. **最小权限原则**
   - 只给令牌必要的权限
   - 定期审查令牌权限

4. **监控使用情况**
   - 定期检查 Docker Hub 的使用统计
   - 监控镜像的下载和推送情况

5. **使用环境变量**
   ```yaml
   env:
     REGISTRY: docker.io
     IMAGE_NAME: wxingheng/markdown-to-image-serve
   ```

### 🔗 相关链接

- [Docker Hub 访问令牌文档](https://docs.docker.com/docker-hub/access-tokens/)
- [GitHub Actions Secrets 文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub 权限管理](https://docs.docker.com/docker-hub/repos/)
- [Docker Login Action 文档](https://github.com/docker/login-action)

### 📞 获取帮助

如果按照以上步骤仍然无法解决问题：

1. **检查 Docker Hub 状态**: [Docker Hub Status](https://status.docker.com/)
2. **查看 GitHub Actions 日志**: 在 Actions 标签页查看详细错误信息
3. **联系支持**: 如果是 Docker Hub 问题，联系 Docker 支持

### 🚀 快速修复步骤

如果急需修复，按以下步骤操作：

1. **立即创建新令牌**
   - 登录 Docker Hub
   - 创建新的访问令牌，选择 Read & Write 权限

2. **更新 GitHub Secrets**
   - 删除所有旧的 Docker Hub 相关 secrets
   - 添加 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_TOKEN`

3. **测试推送**
   - 推送一个小的更改到主分支
   - 检查 Actions 是否成功

---

**注意**: 请确保你的 Docker Hub 账户有足够的权限来推送镜像到指定的仓库。 