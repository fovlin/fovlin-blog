import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'Fovlin Blog',
  appearance: 'dark',
  description: 'Fovlin Blog',
  sitemap: {
    hostname: 'https://fovlin.com'
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/fovlin/acovia-website'
    },
    logo: '/star.svg',
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      { text: 'Welcome', link: '/welcome' },
      {
        text: 'Linux Notes',
        collapsed: true,
        items: [
          { text: '使用独立显卡运行', link: '/docs/linux-notes/run-with-dedicated-gpu' },
          { text: '开发 fcitx5 主题', link: '/docs/linux-notes/fcitx5-theme-dev' },
        ],
      },
      {
        text: "Web Notes",
        collapsed: true,
        items: [
          { text: '前端基础', link: '/docs/web-guide/web-base' },
          { text: '网站部署', link: '/docs/web-guide/web-release' },
          { text: 'Nginx 搭建下载站', link: '/docs/web-guide/nginx-guide/autoindex' },
          { text: 'Nginx 反向代理', link: '/docs/web-guide/nginx-guide/proxy' },
          { text: '关于 Fovlin', link: '/docs/fovlin/about-me' },
        ]
      },
      {
        text: "Topics",
        collapsed: true,
        items: [
          { text: '关于 Fovlin', link: '/docs/fovlin/about-me' },
        ]
      },
    ],
    socialLinks: [
      { icon: { svg: "<svg t='1783554706923' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1700' width='256' height='256'><path d='M736.005 696.494H174.18c-17.673 0-32-14.327-32-32V255.582c0-17.673 14.327-32 32-32h157.213c7.96 0 15.635 2.967 21.525 8.321l47.547 43.222h335.54c17.673 0 32 14.327 32 32v357.369c0 17.673-14.327 32-32 32z m-529.825-64h497.825V339.125H388.094a32.002 32.002 0 0 1-21.525-8.321l-47.547-43.222H206.18v344.912z' fill=' p-id='1701'></path><path d='M853.18 821.092H317.509c-17.673 0-32-14.327-32-32s14.327-32 32-32H821.18V414.206c0-17.673 14.327-32 32-32s32 14.327 32 32v374.886c0 17.673-14.327 32-32 32z' fill=' p-id='1702'></path></svg>" }, link: 'https://hub.acovia.net' },
      { icon: 'github', link: 'https://github.com/fovlin' },
      { icon: 'bilibili', link: 'https://b23.tv/gOLGiGq' }
    ]
  }
})