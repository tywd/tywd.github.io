---
title: VitePress 博客常见问题与解决方案
date: 2025-11-26
tags: [VitePress, 问题解决, 技术博客]
---

# VitePress 博客常见问题与解决方案

在搭建和使用 VitePress 博客的过程中，可能会遇到各种问题。本文将记录一些常见问题及其解决方案。

## 1. ESM 模块相关问题

### 问题描述

在运行 VitePress 开发服务器时，出现以下错误：

```
"vitepress" resolved to an ESM file. ESM file cannot be loaded by `require`.
```

### 解决方案

在 `package.json` 中添加 `"type": "module"` 字段：

```json
{
  "type": "module"
}
```

## 2. 路径配置问题

### 问题描述

部署到 GitHub Pages 后，页面资源加载失败或链接错误。

### 解决方案

在 VitePress 配置文件中正确设置 `base` 路径：

```js
export default defineConfig({
  base: '/your-repo-name/',
})
```

## 3. Markdown 语法高亮问题

### 问题描述

代码块没有语法高亮显示。

### 解决方案

VitePress 默认支持语法高亮，确保在代码块中指定正确的语言：

```javascript
console.log('Hello, world!')
```

## 4. 部署到 GitHub Pages 失败

### 问题描述

GitHub Actions 部署失败或页面无法访问。

### 解决方案

1. 确保在 GitHub 仓库设置中将 Pages 源设置为 GitHub Actions
2. 检查工作流文件路径是否正确：`.github/workflows/deploy.yml`
3. 确保构建输出路径正确：`docs/.vitepress/dist`

## 5. 本地开发服务器启动缓慢

### 问题描述

运行 `npm run docs:dev` 后，服务器启动很慢。

### 解决方案

1. 检查网络连接，确保 npm registry 访问正常
2. 使用国内镜像源：

```bash
npm config set registry https://registry.npmmirror.com
```

3. 清除缓存后重新安装依赖：

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 6. 自定义样式不生效

### 问题描述

添加的自定义 CSS 样式没有应用到页面上。

### 解决方案

在 `.vitepress/theme/index.js` 中正确引入自定义样式：

```js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

## 7. 图片资源无法加载

### 问题描述

Markdown 中引用的图片无法显示。

### 解决方案

1. 将图片放在 `public` 目录下
2. 使用相对路径引用图片：

```markdown
![alt text](/image.png)
```

## 8. 导航栏和侧边栏配置问题

### 问题描述

导航栏或侧边栏没有按预期显示。

### 解决方案

检查 `.vitepress/config.js` 中的配置是否正确：

```js
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '博客', link: '/posts/' }
  ],
  sidebar: {
    '/posts/': [
      {
        text: '博客文章',
        items: [
          { text: '文章1', link: '/posts/article1' },
          { text: '文章2', link: '/posts/article2' }
        ]
      }
    ]
  }
}
```

## 总结

以上是搭建和使用 VitePress 博客过程中可能遇到的一些常见问题及其解决方案。随着使用的深入，可能会遇到更多问题，建议：

1. 仔细阅读官方文档
2. 查看 GitHub Issues 和社区讨论
3. 善用搜索引擎查找解决方案
4. 及时记录和总结问题解决过程

持续更新中...