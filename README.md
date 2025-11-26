# TYWD's Blog

这是我的个人技术博客，基于 VitePress 构建，部署在 GitHub Pages 上。

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.js
│   ├── posts/
│   │   ├── index.md
│   │   ├── first-post.md
│   │   ├── blog-setup-process.md
│   │   ├── troubleshooting.md
│   │   ├── vitepress-themes.md
│   │   └── conclusion.md
│   ├── about/
│   │   └── index.md
│   └── index.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── README.md
```

## 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run docs:dev
   ```

3. 构建静态站点：
   ```bash
   npm run docs:build
   ```

4. 预览构建结果：
   ```bash
   npm run docs:preview
   ```

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。每次推送到 `main` 分支都会触发部署流程。

## 博客写作

1. 在 `docs/posts/` 目录下创建新的 Markdown 文件
2. 在文件顶部添加 Frontmatter 配置：

```yaml
---
title: 文章标题
date: 2025-11-26
tags: [标签1, 标签2]
---
```

3. 使用 Markdown 语法编写文章内容

## 配置说明

主要配置文件位于 `docs/.vitepress/config.js`，包含以下配置项：

- 站点标题和描述
- 导航栏和侧边栏
- 社交链接
- 页脚信息
- Markdown 配置

## 访问地址

博客可通过以下地址访问：

- GitHub Pages: https://tywd.github.io/tywd-blog/

## 许可证

MIT License