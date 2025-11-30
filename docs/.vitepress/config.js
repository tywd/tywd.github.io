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
      { text: '架构', link: '/architecture/' },
      { text: '工具', link: '/tools/' },
      { text: '关于', link: '/about/' }
    ],
    outline: {
      level: [2, 4], // 显示 h2~h4 级别的标题（对应页面的 ##/###...）
      label: '本页导航' // 自定义大纲标题（可选）
    },

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
      ],

      '/architecture/': [
        {
          text: '架构文章',
          items: [
            { text: '前端架构分类', link: '/architecture/architecture-type' },
            { text: '多端架构', link: '/architecture/architecture-multi-end' },
            { text: '其他主流架构', link: '/architecture/architecture-other' },
            { text: '前端架构演进', link: '/architecture/architecture-evolution' }
          ]
        }
      ],

      '/tools/': [
        {
          text: '工具文章',
          items: [
            { text: '前端性能优化检测工具', link: '/tools/performance-optimization' },
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