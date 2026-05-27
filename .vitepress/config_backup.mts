import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acovia 档案馆",
  description: "Fovlin 的档案存放处",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo:'/star.svg',
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '关于 Acovia',
        collapsed:false,
        items: [
          { text: '社区介绍', link: '/about-acovia-community/1-1' },
          { text: '特殊玩法', link: '/about-acovia-community/special-gameplay' },
          { text: '新内容', link: '/about-acovia-community/new-1' },
        ]
      },
      // 3. Fovlin Notes
      {
        text: 'Fovlin Notes',
        items: [
          // --- MC服务器搭建指南 ---
          {
            text: 'MC服务器搭建指南',
            collapsed:false,
            items: [
              { text: '开始的准备', link: '/fovlin-notes/build-server-guide/1-1' },
              { text: 'Linux 搭建服务器', link: '/fovlin-notes/build-server-guide/1-2' },
              { text: 'Windows 搭建服务器', link: '/fovlin-notes/build-server-guide/1-3' },
              { text: '面板服搭建服务器', link: '/fovlin-notes/build-server-guide/1-4' },
              { text: '管理和维护服务器', link: '/fovlin-notes/build-server-guide/1-5' },
              { text: '性能优化', link: '/fovlin-notes/build-server-guide/1-6' },
              // 高级指南
              {
                text: '高级指南',
                collapsed: false,
                items: [
                  { text: '使用 Velocity 搭建群组服', link: '/fovlin-notes/build-server-guide/advanced-guide/1-1' },
                  { text: '开启对基岩版的支持', link: '/fovlin-notes/build-server-guide/advanced-guide/1-2' },
                  { text: '使用 LuckPerms 管理玩家权限', link: '/fovlin-notes/build-server-guide/advanced-guide/1-3' },
                ]
              },
            ]
          },
          // --- Linux 简明指南 ---
          {
            text: 'Linux 简明指南',
            collapsed:false,
            items: [
              { text: '选择发行版', link: '/fovlin-notes/linux-guide/choose' },
              { text: '安装选项', link: '/fovlin-notes/linux-guide/install-linux-options' },
              {
                text: '配置系统',
                collapsed:false,
                items: [
                  { text: '区域语言', link: '/fovlin-notes/linux-guide/configure-system/locale' },
                  { text: '用户管理', link: '/fovlin-notes/linux-guide/configure-system/user-manager' },
                  { text: '应用安装', link: '/fovlin-notes/linux-guide/configure-system/application-install-manager' },
                  { text: '双系统引导', link: '/fovlin-notes/linux-guide/configure-system/double-system-grub' },
                  { text: '自定义终端', link: '/fovlin-notes/linux-guide/configure-system/custom-terminal' },
                  { text: '桌面环境', link: '/fovlin-notes/linux-guide/configure-system/desktop-env-choose' },
                  { text: 'Nvidia驱动', link: '/fovlin-notes/linux-guide/configure-system/nvidia-driver' },
                  { text: '常见问题以及解决方案', link: '/fovlin-notes/linux-guide/configure-system/solution' },
                ]
              },
              { text: '常见符号', link: '/fovlin-notes/linux-guide/some-symbols' },
              { text: '快捷键', link: '/fovlin-notes/linux-guide/shortcut-key' },
            ],
          },
          {
            text: 'MC 数据包制作',
            collapsed:false,
            items: [
              { text: '入门指南', link: '/fovlin-notes/datapack-guide/1-1' }
            ]
          },
          {
            text:'前端 Notes',
            collapsed:false,
            items:[
              { text: '前端基础', link: '/fovlin-notes/web-guide/web-base'},
              { text: '网站部署', link: '/fovlin-notes/web-guide/web-release' },
              {
                text:"Nginx 指南",
                collapsed:false,
                items:[
                  {text:'Nginx 搭建下载站', link: '/fovlin-notes/web-guide/nginx-guide/autoindex'},
                ]
              }
            ]
          }
        ],
      },
      {
        text:'放映厅',
        collapsed:false,
        items:[
          {text:'超时空辉夜姬', link:'/video/chrono-kaguya'},
        ]
      },
      {
        text:'剧本',
        collapsed:false,
        items:[
          {text: '第一幕：安息香花海', link: '/script/1-page'},
        ]
      },
      {
        text:'Fovlin',
        collapsed:false,
        items:[
          {text:'关于 Fovlin', link:'/fovlin/about-me'},
        ]
      },
    ],
    socialLinks: [
      { icon: 'qq', link: 'https://qm.qq.com/q/agcAjFbwlw' }
    ]
  }
})
