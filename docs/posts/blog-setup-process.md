---
title: 博客搭建全过程记录
date: 2025-11-26
tags: [VitePress, 部署, 技术博客]
---

# 博客搭建全过程记录

本文将详细记录使用 VitePress 搭建个人技术博客的全过程，包括遇到的问题和解决方案。

## 1. 项目初始化

首先创建项目目录并初始化：

```bash
mkdir tywd-blog
cd tywd-blog
npm init -y
```

## 2. 安装 VitePress

安装 VitePress 和 Vue 作为开发依赖：

```bash
npm install -D vitepress vue
```

## 3. 配置 package.json 脚本

在 package.json 中添加以下脚本：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

## 4. 创建目录结构

创建以下目录结构：

```
docs/
├── .vitepress/
│   └── config.js
├── posts/
│   ├── index.md
│   └── first-post.md
├── about/
│   └── index.md
└── index.md
```

## 5. 遇到的问题及解决方案

### 问题1: ESM 模块导入错误

在运行 `npm run docs:dev` 时遇到以下错误：

```
"vitepress" resolved to an ESM file. ESM file cannot be loaded by `require`.
```

**解决方案：**

在 package.json 中添加 `"type": "module"` 字段：

```json
{
  "type": "module"
}
```

### 问题2: 配置文件路径问题

确保配置文件使用正确的 ES 模块语法：

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 配置项
})
```

## 6. 部署到 GitHub Pages

为了将博客部署到 GitHub Pages，我们需要进行以下配置：

1. 在 GitHub 仓库中设置 Pages 源为 GitHub Actions
2. 创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## 7. 总结

通过以上步骤，我们成功搭建了一个基于 VitePress 的个人技术博客。整个过程虽然遇到了一些问题，但通过仔细查阅文档和搜索解决方案，最终都得到了圆满解决。

博客具备以下功能：
- 响应式设计
- Markdown 写作支持
- 代码高亮
- 搜索功能
- 移动端适配

后续可以考虑添加的功能：
- 评论系统
- Google Analytics 统计
- RSS 订阅
- 更丰富的主题定制