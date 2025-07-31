# Docker Hub 设置指南

## 🔧 解决 Docker Hub 推送权限问题

### 问题描述
```
unauthorized: access token has insufficient scopes
```

这个错误表明你的 Docker Hub 访问令牌权限不足。

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

3. **删除旧的 DOCKERHUB_PASSWORD** (如果存在)
   - 找到 `DOCKERHUB_PASSWORD` secret
   - 点击删除按钮移除它

#### 3. 验证设置

1. **检查 Secrets 是否正确设置**
   - 确保 `DOCKERHUB_USERNAME` 和 `DOCKERHUB_TOKEN` 都存在
   - 确保没有 `DOCKERHUB_PASSWORD`

2. **测试推送**
   - 推送代码到 `main` 或 `master` 分支
   - 检查 GitHub Actions 是否成功运行

### 🔍 故障排除

#### 如果仍然遇到权限问题：

1. **检查令牌权限**
   ```bash
   # 测试登录
   echo "你的令牌" | docker login -u "你的用户名" --password-stdin
   ```

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

### 🔗 相关链接

- [Docker Hub 访问令牌文档](https://docs.docker.com/docker-hub/access-tokens/)
- [GitHub Actions Secrets 文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub 权限管理](https://docs.docker.com/docker-hub/repos/)

### 📞 获取帮助

如果按照以上步骤仍然无法解决问题：

1. **检查 Docker Hub 状态**: [Docker Hub Status](https://status.docker.com/)
2. **查看 GitHub Actions 日志**: 在 Actions 标签页查看详细错误信息
3. **联系支持**: 如果是 Docker Hub 问题，联系 Docker 支持

---

**注意**: 请确保你的 Docker Hub 账户有足够的权限来推送镜像到指定的仓库。 