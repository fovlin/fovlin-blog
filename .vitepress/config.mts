import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Acovia 档案馆',
  appearance: 'dark',
  description: 'Fovlin 的档案存放处',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/fovlin/acovia-website'
    },
    logo: '/star.svg',
    outline: {
      level: 2,
      label: '本页目录'
    },
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      { text: 'Welcome', link: '/welcome' },
      {
        text: 'Linux 简明指南',
        collapsed: false,
        items: [
          { text: '选择发行版', link: '/docs/linux-guide/choose' },
          { text: '安装选项', link: '/docs/linux-guide/install-linux-options' },
          { text: '认识 Linux 系统', link: '/docs/linux-guide/os-guide' },
          { text: '认识命令行', link: '/docs/linux-guide/cli-guide' },
          {
            text: '使用命令行',
            collapsed: false,
            items: [
              { text: '文件管理', link: '/docs/linux-guide/use-cli/file-manage' },
              { text: 'I/O 重定向', link: '/docs/linux-guide/use-cli/io-redirection' },
              { text: '进程管理', link: '/docs/linux-guide/use-cli/proc-manage' }
            ]
          },
          {
            text: '配置系统',
            collapsed: false,
            items: [
              { text: '区域语言', link: '/docs/linux-guide/configure-system/locale' },
              { text: '用户管理', link: '/docs/linux-guide/configure-system/user-manage' },
              { text: '应用安装', link: '/docs/linux-guide/configure-system/application-install-manage' },
              { text: '双系统引导', link: '/docs/linux-guide/configure-system/double-system-grub' },
              { text: '磁盘管理', link: '/docs/linux-guide/configure-system/disk-manage' },
              { text: '更改提示符样式', link: '/docs/linux-guide/configure-system/custom-terminal' },
              { text: '桌面环境', link: '/docs/linux-guide/configure-system/desktop-env-choose' },
              { text: 'Nvidia 驱动', link: '/docs/linux-guide/configure-system/nvidia-driver' },
              { text: '常见问题以及解决方案', link: '/docs/linux-guide/configure-system/solution' },
            ]
          },
          { text: '快捷键', link: '/docs/linux-guide/shortcut-key' },
        ],
      },
      {
        text: '其他',
        collapsed: true,
        items: [
          {
            text: '前端 Notes',
            collapsed: false,
            items: [
              { text: '前端基础', link: '/docs/web-guide/web-base' },
              { text: '网站部署', link: '/docs/web-guide/web-release' },
              {
                text: 'Nginx 指南',

                collapsed: false,
                items: [
                  { text: 'Nginx 搭建下载站', link: '/docs/web-guide/nginx-guide/autoindex' },
                  { text: 'Nginx 反向代理', link: '/docs/web-guide/nginx-guide/proxy' },
                ]
              }
            ]
          },
          {
            text: 'Fovlin',
            collapsed: false,
            items: [
              { text: '关于 Fovlin', link: '/docs/fovlin/about-me' },
            ]
          },
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