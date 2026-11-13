# 前端基础与网站部署

这一章把“网页是怎么构成的”和“网站怎么放到服务器上”串起来：先介绍 HTML、CSS 与前端框架，再用 Nginx 完成安装、静态站点配置、下载站和反向代理。

## 前端基础

> 这一节只讲运行原理，不追求覆盖 HTML/CSS 的全部语法；系统学习推荐 [MDN](https://developer.mozilla.org/zh-CN/)。

### 什么是网站

网站通过 HTTP 协议把 HTML 文件发送给浏览器，浏览器用域名或 IP 找到服务器。简单来说：HTML 负责结构，CSS 负责样式，JavaScript 负责交互。

### HTML

HTML 是网站的骨架，用来描述页面结构。它由标签组成：成对标签以 `<tag>` 开始、`</tag>` 结束，有些标签不需要结束标签。一个标准的 HTML 文件结构如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>示例页面</title>
    <style>
        /* 在这里写 CSS */
    </style>
</head>
<body>
    <h1>一个示例 HTML 文件</h1>
    <p>Hello World!</p>
</body>
</html>
```

`<body>` 标签表示页面的主体内容。

`<meta>` 标签描述网页的元数据，例如用 `<meta charset="utf-8">` 指定编码。

`<h1>` 表示一级标题，二级标题用 `<h2>`，以此类推。

`<p>` 表示一个段落。

> 浏览器中可以通过 `F12` 按键或 `Ctrl + U` 来查看网站源代码。

### CSS 样式表

只有 HTML 的页面通常很单调。例如给一级标题设置颜色和字号：

```css
h1 {
    color: #ffaf00;
    font-size: 32px;
}
```

花括号前是选择器，花括号内是声明。选择器可以直接写标签名；如果标签带有 `class`，也可以用类选择器。

> 一个 HTML 文件里可以有多个同类标签。

选择类名以应用 CSS，使用 `.` + 类名的方式：

```css
.title {
    color: #ffaf00;
    font-size: 32px;
}
```

`.title` 会选中所有 `class="title"` 的元素。假设标签带有 `id="title"`，也可以用 `#title` 精确选中它。

> 一个 `id` 在一个页面中只能出现一次。

选择 id 以应用 CSS，使用 `#` + id 名的方式：

```css
#title {
    color: #ffaf00;
    font-size: 32px;
}
```

### 前端框架

手写大量 HTML 很繁琐，于是出现了 React、Vue、Angular、Svelte、SolidJS 等前端框架。

还有一类专注于静态内容的工具，例如 Astro、VitePress，以及基于 Astro 的 Starlight，它们统称为静态站点生成器（SSG）。这类工具可以显著减少重复劳动。

## 在 Linux 上搭建网站

这一节假设你已经有一个静态网页，想把它放到 Linux 服务器上。

### Web 服务器软件

Web 服务器是运行在 Linux 上的程序，它监听客户端的 HTTP 请求，然后返回相应的 HTML 文件和资源。

#### 常见的 Web 服务器

| 服务器 | 特点 | 适用场景 |
| --- | --- | --- |
| **Nginx** | 轻量级、高性能、反向代理能力强 | 高流量网站、反向代理 |
| **Apache** | 功能全面、配置灵活、插件丰富 | 传统网站、需要多模块支持 |
| **Caddy** | 自动 HTTPS、配置简单、现代化 | 小型网站、快速部署 |

下面以 Nginx 为例。

### 安装 Nginx

从 Nginx 官网获取源码包（版本号以官网为准），然后下载、解压并进入目录：

```bash
wget https://nginx.org/download/nginx-1.30.0.tar.gz
tar -xzf nginx-1.30.0.tar.gz
cd nginx-1.30.0
```

安装编译依赖（以 Debian/Ubuntu 为例）：

```bash
sudo apt install libpcre3-dev zlib1g-dev gcc make
```

按需添加编译选项。例如要启用 TCP/UDP 的 Stream 模块：

```bash
./configure --with-stream
```

更多选项可以阅读 Nginx 官方文档。然后编译并安装：

```bash
make
sudo make install
```

安装完成后，默认会被安装在 `/usr/local/nginx` 目录下，前提是你没有通过 configure 更改安装目录。

创建软链接，方便直接运行 `nginx`：

```bash
sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
```

然后运行此命令验证安装。

```bash
nginx -v
```

### 启动和管理 Nginx

```bash
# 启动 Nginx
sudo nginx

# 重新加载配置（重启 Nginx）
sudo nginx -s reload

# 优雅关闭
sudo nginx -s quit

# 强制关闭
sudo nginx -s stop
```

### 基本配置

编译安装的 Nginx 的主配置文件位于 `/usr/local/nginx/conf/nginx.conf`。

修改配置后重新加载：

```bash
sudo nginx -s reload
```

#### 简单的网站配置示例

在 `/usr/local/nginx/conf/nginx.conf` 的 `http {}` 块中编辑以下内容：

```txt
server {
    listen 80;
    server_name example.com www.example.com;

    location / {

        # 网站根目录，网站源代码放置在此处。
        root /home/web;
        index index.html index.htm;
        
    }

    # 错误页面
    error_page 404 /404.html;
}
```

需要 HTTPS 时可以用 certbot 申请证书，它默认读取 `/etc/nginx/nginx.conf`。编译安装的配置在 `/usr/local/nginx/conf/nginx.conf`；如果 `/etc/nginx` 不存在，可以创建软链接：

```bash
sudo ln -s /usr/local/nginx/conf /etc/nginx
```

最后把网站文件放到 `root` 指向的目录即可。更多 Nginx 配置见下一节。

## Nginx 搭建下载站

网站需要提供多个文件的下载时，手写每个链接很麻烦。Nginx 的 `autoindex` 可以自动生成目录列表和下载链接。

### 启用 Autoindex 选项

当目录下没有 `index.html` 时，`autoindex on` 会让 Nginx 生成文件列表页面。在 `nginx.conf` 的 `server` 中加入：

```txt
http {
    server {
        listen 80;
        server_name localhost;

        location / {
            root /home/fovlin;
            autoindex on;
            autoindex_exact_size off;
        }
    }
}
```

`autoindex on;` 开启目录索引；`autoindex_exact_size off;` 用 KB、MB、GB 显示大小，而不是精确字节数。

> `autoindex` 不会列出以 `.` 开头的文件，但仍然可以通过 URL 直接访问，不能当作访问控制。

### Autoindex 页面美化

默认列表页面比较简陋，而且由 Nginx 自动生成，无法直接改 HTML 布局。常见的美化方式有两种。

### 使用 add_before_body 或 add_after_body

可以借助 `add_before_body` / `add_after_body` 在自动生成页面的前后插入 HTML 片段。该功能依赖 `ngx_http_addition_module`，编译时需要加 `--with-http_addition_module`，然后重新安装并重启 Nginx。

在站点根目录创建一个 HTML 片段，例如 `/.autoindex.html`，并在 `location` 中引用：

```txt
http {
    server {
        listen 80;
        server_name localhost;

        location / {
            root /home/fovlin;
            autoindex on;
            autoindex_exact_size off;
            add_before_body /.autoindex.html; # <-- 此处
        }
    }
}
```

重新加载 Nginx：

```bash
sudo nginx -s reload
```

`.autoindex.html` 的内容可以是：

```html
<style>
pre {
    line-height: 32px;
}

a {
    color: #ffaf00;
    font-size: 20px;
    padding: 0px 12px;
}

a:hover {
    color:#ff00af;
}

h1 {
    font-size:22px;
}

html,body {
    color: bisque;
    background: #1f1a0f;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Cascadia code','menlo';
}
</style>
```

### 使用 Fancyindex

[Fancyindex](https://github.com/aperezdc/ngx-fancyindex) 是第三方模块，能生成更完整的目录列表，支持图标、排序和自定义主题。

## Nginx 反向代理

> 这一节只记录常用配置，完整指令以 Nginx 官方文档为准。

### HTTP 反向代理

在 `http {}` 中新建 `server {}`：

```txt
http {
    server {
        listen 8080;
        server_name proxy.example.com;
        location / {
            proxy_pass https://target.example.com/;
        }
    }
}
```

访问 `http://proxy.example.com:8080` 时，请求会被转发到 `https://target.example.com`。

`location` 指令可以把特定路径转发到不同后端。例如：

```txt
location /proxy/ {
    proxy_pass https://target.example.com/;
}
```

访问 `/proxy` 时，请求就会转发到目标服务器。

反向代理还可以配合 `upstream` 做负载均衡：

```txt
http {

    upstream backend {
        server backend.example.com:8080;
        server backend.example.com:8081;
    }

    server {
        listen 8080;
        server_name proxy.example.com;
        location / {
            proxy_pass http://backend;
        }
    }
}
```

`weight` 用于指定权重；`ip_hash` 让同一 IP 的请求固定到同一台后端。

```txt
# ...
    upstream backend {
        ip_hash;
        server backend.example.com:8080 weight=1;
        server backend.example.com:8081 weight=3;
    }
# ...
```

### TCP 反向代理

TCP 反向代理依赖 Stream 模块，默认编译不包含。编译时加上 `--with-stream`：

```bash
./configure --with-stream
```

重新编译安装并重启 Nginx：

```bash
make && sudo make install && sudo nginx -s stop && sudo nginx
```

在 `nginx.conf` 中添加以下板块：

```txt
stream {
    server {
        listen 13157;
        proxy_pass acovia.net:29185;
    }
}
```

这样所有访问本机 `13157` 端口的 TCP 流量都会被转发到 `acovia.net:29185`。

## 小结

前端负责页面本身，Nginx 负责把页面送到浏览器。先把静态站点跑通，再根据需要加下载站、反向代理和 HTTPS，会更容易排查问题。

回到[笔记目录](/notes/welcome)。
