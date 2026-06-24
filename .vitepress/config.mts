import { defineConfig } from "vitepress"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acovia 档案馆",
  appearance:"dark",
  description: "Fovlin 的档案存放处",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo:"/star.svg",
    outline: {
      level:2,
      label:"本页目录"
    },
    nav: [
      { text: "Home", link: "/"},
    ],
    search: {
      provider: "local"
    },
    sidebar: [
      {text:"Welcome", link:"/welcome"},
      {
        text: "Linux 简明指南",
        collapsed:false,
        items: [
          { text: "选择发行版", link: "/docs/linux-guide/choose" },
          { text: "安装选项", link: "/docs/linux-guide/install-linux-options" },
          { text: "认识 Linux 系统", link: "/docs/linux-guide/os-guide" },
          { text: "认识命令行", link: "/docs/linux-guide/cli-guide" },
          {
            text:"使用命令行",
        collapsed:false,
            items:[
              {text:"文件管理", link:"/docs/linux-guide/use-cli/file-manage"},
              {text:"I/O 重定向", link:"/docs/linux-guide/use-cli/io-redirection"},
              {text:"进程管理", link:"/docs/linux-guide/use-cli/proc-manage"}
            ]
          },
          {
            text: "配置系统",
            collapsed:false,
            items: [
              { text: "区域语言", link: "/docs/linux-guide/configure-system/locale" },
              { text: "用户管理", link: "/docs/linux-guide/configure-system/user-manage" },
              { text: "应用安装", link: "/docs/linux-guide/configure-system/application-install-manage" },
              { text: "双系统引导", link: "/docs/linux-guide/configure-system/double-system-grub" },
              { text: "磁盘管理", link: "/docs/linux-guide/configure-system/disk-manage"},
              { text: "更改提示符样式", link: "/docs/linux-guide/configure-system/custom-terminal" },
              { text: "桌面环境", link: "/docs/linux-guide/configure-system/desktop-env-choose" },
              { text: "Nvidia 驱动", link: "/docs/linux-guide/configure-system/nvidia-driver" },
              { text: "常见问题以及解决方案", link: "/docs/linux-guide/configure-system/solution" },
            ]
          },
          { text: "常见符号", link: "/docs/linux-guide/some-symbols" },
          { text: "快捷键", link: "/docs/linux-guide/shortcut-key" },
        ],
      },
      {
        text:"其他",
        collapsed:true,
        items:[
          {
            text:"前端 Notes",
            collapsed:false,
            items:[
              { text: "前端基础", link: "/docs/others/web-guide/web-base"},
              { text: "网站部署", link: "/docs/others/web-guide/web-release" },
              {
                text:"Nginx 指南",
                
                collapsed:false,
                items:[
                  {text:"Nginx 搭建下载站", link: "/docs/others/web-guide/nginx-guide/autoindex"},
                  {text:"Nginx 反向代理", link: "/docs/others/web-guide/nginx-guide/proxy"},
                ]
              }
            ]
          },
          {
            text:"放映厅",
            collapsed:false,
            items:[
              {text:"超时空辉夜姬", link:"/docs/others/novel/chrono-kaguya"},
            ]
          },
          {
            text:"Fovlin",
            collapsed:false,
            items:[
              {text:"关于 Fovlin", link:"/docs/others/fovlin/about-me"},
            ]
          },
          {
            text: "关于 Acovia",
            collapsed:false,
            items: [
              { text: "社区介绍", link: "/docs/others/acovia-server/1-1" },
              { text: "特殊玩法", link: "/docs/others/acovia-server/special-gameplay" },
              { text: "更新日志", link: "/docs/others/acovia-server/new" },
              {
                text:"剧本",
                collapsed:false,
                items:[
                  {text: "第一幕：安息香花海", link: "/docs/others/acovia-server/script/1-page"},
                ]
              },
            ]
          },
        ]
      },
    ],
    socialLinks: [
      { icon: {svg:"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#e07a5f'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>"}, link: "http://192.144.167.25" },
      { icon: "github", link:"https://github.com/fovlin/acovia-website" },
      { icon: "bilibili", link : "https://b23.tv/gOLGiGq" }
    ]
  }
})