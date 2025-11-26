import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "TYWD's Blog",
  description: "Personal blog of TYWD",
  
  // 如果你想部署到 tywd.github.io 根域名而不是子路径，需要修改这里
  base: '/', // 对于根域名部署使用 '/'
  // base: '/tywd-blog/', // 对于子路径部署使用 '/tywd-blog/'

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '关于', link: '/about/' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '博客文章',
          items: [
            { text: '博客搭建全过程记录', link: '/posts/blog-setup-process' },
            { text: '欢迎来到我的博客', link: '/posts/first-post' },
            { text: 'VitePress 博客常见问题与解决方案', link: '/posts/troubleshooting' },
            { text: '为 VitePress 博客选择和集成主题', link: '/posts/vitepress-themes' },
            { text: '博客搭建总结与未来规划', link: '/posts/conclusion' },
            { text: 'GitHub Pages 部署指南', link: '/posts/github-pages-deployment' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tywd' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present TYWD'
    }
  },

  // 添加 Markdown 配置
  markdown: {
    lineNumbers: true
  }
})