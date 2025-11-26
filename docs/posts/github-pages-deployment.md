# GitHub Pages 部署指南

本文档详细说明如何将博客部署到 GitHub Pages，包括根域名部署和子路径部署两种方式。

## 部署方式选择

### 1. 根域名部署 (tywd.github.io)
- URL: https://tywd.github.io/
- 需要将博客设置为 GitHub 用户页面
- 需要将仓库命名为 `tywd.github.io`

### 2. 子路径部署 (tywd.github.io/tywd-blog)
- URL: https://tywd.github.io/tywd-blog/
- 可以使用当前仓库名称
- 更适合项目文档类型的站点

## 根域名部署步骤

### 1. 重命名仓库
将当前仓库 `tywd-blog` 重命名为 `tywd.github.io`：

1. 在 GitHub 上进入仓库设置页面
2. 找到 "Repository name" 选项
3. 将名称改为 `tywd.github.io`
4. 点击 "Rename" 按钮

### 2. 修改配置文件
确保 [docs/.vitepress/config.js](file:///Users/shichuyu/Desktop/web/qoder/tywd-blog/docs/.vitepress/config.js) 中的 base 设置为根路径：

```js
export default defineConfig({
  base: '/', // 根域名部署使用 '/'
  // ...其他配置
})
```

### 3. 配置 GitHub Pages
1. 在 GitHub 仓库中点击 "Settings" 选项卡
2. 在左侧菜单中找到 "Pages" 选项
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 4. 推送代码触发部署
```bash
git add .
git commit -m "Configure for root domain deployment"
git push origin main
```

## 子路径部署步骤

如果你想保留当前仓库名称并部署到子路径，请按以下步骤操作：

### 1. 恢复配置文件
修改 [docs/.vitepress/config.js](file:///Users/shichuyu/Desktop/web/qoder/tywd-blog/docs/.vitepress/config.js) 中的 base 设置为子路径：

```js
export default defineConfig({
  base: '/tywd-blog/', // 子路径部署使用 '/tywd-blog/'
  // ...其他配置
})
```

### 2. 配置 GitHub Pages
1. 在 GitHub 仓库中点击 "Settings" 选项卡
2. 在左侧菜单中找到 "Pages" 选项
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 3. 推送代码触发部署
```bash
git add .
git commit -m "Configure for sub-path deployment"
git push origin main
```

## 部署验证

部署完成后，可以通过以下方式验证：

1. 检查 GitHub Actions 构建状态
2. 访问对应 URL 查看博客是否正常显示
3. 检查页面资源是否正确加载（CSS、JS、图片等）

## 常见问题

### 1. 页面样式丢失
通常是 base 路径配置错误导致的，确保根据部署方式正确设置 base 值。

### 2. 页面无法访问
检查 GitHub Pages 设置是否正确，确保选择了 GitHub Actions 作为构建源。

### 3. 自定义域名
如果想使用自定义域名，可以在仓库的 Pages 设置中添加自定义域名，并在 DNS 提供商处配置相应的 CNAME 记录。

## 注意事项

1. 首次部署可能需要几分钟时间生效
2. 每次推送到 main 分支都会自动触发重新部署
3. 确保 GitHub Actions 工作流文件没有语法错误
4. 构建失败时检查 GitHub Actions 日志找出问题原因