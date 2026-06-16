import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acovia 档案馆",
  appearance:'dark',
  description: "Fovlin 的档案存放处",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo:'/star.svg',
    outline: {
      level:2,
      label:"本页目录"
    },
    nav: [
      { text: 'Home', link: '/'},
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {text:'Welcome', link:'/welcome'},
      {
        text: 'Linux 简明指南',
        items: [
          { text: '选择发行版', link: '/docs/linux-guide/choose' },
          { text: '安装选项', link: '/docs/linux-guide/install-linux-options' },
          { text: '认识 Linux 系统', link: '/docs/linux-guide/os-guide' },
          { text: '认识命令行', link: '/docs/linux-guide/cli-guide' },
          {
            text:'使用命令行',
            items:[
              {text:'文件管理', link:'/docs/linux-guide/use-cli/file-manage'},
              {text:'I/O 重定向', link:'/docs/linux-guide/use-cli/io-redirection'},
              {text:'进程管理', link:'/docs/linux-guide/use-cli/proc-manage'}
            ]
          },
          {
            text: '配置系统',
            items: [
              { text: '区域语言', link: '/docs/linux-guide/configure-system/locale' },
              { text: '用户管理', link: '/docs/linux-guide/configure-system/user-manage' },
              { text: '应用安装', link: '/docs/linux-guide/configure-system/application-install-manage' },
              { text: '双系统引导', link: '/docs/linux-guide/configure-system/double-system-grub' },
              { text: '磁盘管理', link: '/docs/linux-guide/configure-system/disk-manage'},
              { text: '更改提示符样式', link: '/docs/linux-guide/configure-system/custom-terminal' },
              { text: '桌面环境', link: '/docs/linux-guide/configure-system/desktop-env-choose' },
              { text: 'Nvidia 驱动', link: '/docs/linux-guide/configure-system/nvidia-driver' },
              { text: '常见问题以及解决方案', link: '/docs/linux-guide/configure-system/solution' },
            ]
          },
          { text: '常见符号', link: '/docs/linux-guide/some-symbols' },
          { text: '快捷键', link: '/docs/linux-guide/shortcut-key' },
        ],
      },
      {
        text: 'Go 语言',
        items: [
          { text:'关于本板块', link: '/docs/golang/about-this'},
        ]
      },
      {
        text:'前端 Notes',
        items:[
          { text: '前端基础', link: '/docs/web-guide/web-base'},
          { text: '网站部署', link: '/docs/web-guide/web-release' },
          {
            text:"Nginx 指南",
            
            items:[
              {text:'Nginx 搭建下载站', link: '/docs/web-guide/nginx-guide/autoindex'},
              {text:'Nginx 反向代理', link: '/docs/web-guide/nginx-guide/proxy'},
            ]
          }
        ]
      },
      {
        text:'放映厅',
        items:[
          {text:'超时空辉夜姬', link:'/docs/novel/chrono-kaguya'},
          {text:'四叶奏合集', link:'/docs/novel/siye'},
          {
            text:'源于阿古亚的故事',
            items:[
              {text:'我们的相遇', link:'/docs/novel/the-story-from-aqua/our-meeting.md'}
            ]
          },
        ]
      },
      {
        text:'Fovlin',
        items:[
          {text:'关于 Fovlin', link:'/docs/fovlin/about-me'},
        ]
      },
      {
        text: '关于 Acovia',
        items: [
          { text: '社区介绍', link: '/docs/acovia-server/1-1' },
          { text: '特殊玩法', link: '/docs/acovia-server/special-gameplay' },
          { text: '更新日志', link: '/docs/acovia-server/new' },
          {
            text:'剧本',
            items:[
              {text: '第一幕：安息香花海', link: '/docs/acovia-server/script/1-page'},
            ]
          },
        ]
      },
    ],
    socialLinks: [
      { icon: {svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e07a5f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'}, link: 'http://192.144.167.25' },
      { icon: {svg:'<svg t="1778858689366" class="icon" viewBox="0 0 1078 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7323" width="64" height="64"><path d="M488.967512 0q8.048848 18.109908 31.189286 71.433525t29.177074 68.415208q6.036636 15.09159 27.164862 63.384677t34.207603 75.45795q13.079378 27.164862 40.24424 81.494585t55.33583 107.653341q28.170968 53.323618 67.409101 128.781568t87.531222 163.995276q-52.317512-30.18318-134.818203-52.317511 30.18318 16.097696 58.354147 34.207603t42.256452 28.170968q14.085484 10.06106 38.232027 29.177074t30.18318 25.15265q62.378572 114.696083 82.500692 152.928111-235.428802-136.830415-382.320277-165.001383 6.036636-24.146544 6.036635-52.317512 2.012212-74.451843-29.177073-130.793779T495.004148 570.462098q-46.280876-3.018318-79.482373 46.280875t-35.21371 123.751037v6.036636q0 32.195392 6.036636 66.402996-146.891475 28.170968-386.344701 165.001383Q261.587558 509.089632 356.161521 309.880646q52.317512 44.268664 140.854839 80.488479-66.402995-46.280876-126.769355-110.671659 32.195392-66.402995 118.720507-279.697466z m492.991937 891.409909v-28.170968h-8.048848v-2.012211h22.134331v2.012211h-10.061059v28.170968z m20.122119 0v-30.183179h6.036636l6.036636 20.122119q2.012212 4.024424 2.012212 6.036636 0-2.012212 2.012212-6.036636l6.036636-20.122119h6.036636v30.183179h-4.024424v-26.158756l-8.048848 26.158756h-4.024424l-8.048848-26.158756v26.158756z" p-id="7324"></path></svg>'},link:'/arch-wiki-zh-cn/zh-cn/首页.html'}
    ]
  }
})