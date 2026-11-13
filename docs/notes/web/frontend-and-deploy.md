# Web 前端与部署笔记

记录 HTML/CSS 基础、Nginx 安装配置、下载站和反向代理。

## 前端基础

### 网站

浏览器通过 HTTP 请求 HTML 文件，用域名或 IP 找到服务器。

- HTML：结构
- CSS：样式
- JavaScript：交互

### HTML

HTML 由标签组成：成对标签 `<tag>...</tag>`，部分标签不需要闭合。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>示例页面</title>
    <style>
        /* CSS */
    </style>
</head>
<body>
    <h1>一个示例 HTML 文件</h1>
    <p>Hello World!</p>
</body>
</html>
```

常用标签：

- `<body>`：页面主体
- `<meta>`：元数据，如 `<meta charset="utf-8">`
- `<h1>`～`<h6>`：标题
- `<p>`：段落

查看源码：`F12` 或 `Ctrl + U`。

### CSS

```css
h1 {
    color: #ffaf00;
    font-size: 32px;
}
```

- 花括号前是选择器，花括号内是声明。
- 标签选择器：`h1`
- 类选择器：`.title`，对应 `class="title"`
- ID 选择器：`#title`，对应 `id="title"`；ID 在页面中唯一。

### 前端框架

- React、Vue、Angular、Svelte、SolidJS：应用型框架。
- Astro、VitePress、Starlight：静态站点生成器（SSG）。

## Nginx 安装

### 编译依赖

Debian/Ubuntu：

```bash
sudo apt install libpcre3-dev zlib1g-dev gcc make
```

### 下载、编译

版本号以官网为准：

```bash
wget https://nginx.org/download/nginx-1.30.0.tar.gz
tar -xzf nginx-1.30.0.tar.gz
cd nginx-1.30.0
```

按需加编译选项，例如 Stream 模块：

```bash
./configure --with-stream
make
sudo make install
```

默认安装到 `/usr/local/nginx`。

```bash
sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
nginx -v
```

### 启停

```bash
sudo nginx                 # 启动
sudo nginx -s reload       # 重载配置
sudo nginx -s quit         # 优雅关闭
sudo nginx -s stop         # 强制关闭
```

### 静态站点

主配置：`/usr/local/nginx/conf/nginx.conf`。

```txt
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        root /home/web;
        index index.html index.htm;
    }

    error_page 404 /404.html;
}
```

```bash
sudo nginx -s reload
```

HTTPS 可用 certbot；它默认读取 `/etc/nginx/nginx.conf`。编译安装的配置在 `/usr/local/nginx/conf/nginx.conf`，`/etc/nginx` 不存在时可创建软链接：

```bash
sudo ln -s /usr/local/nginx/conf /etc/nginx
```

## 下载站：autoindex

目录下没有 `index.html` 时，`autoindex on` 让 Nginx 生成文件列表。

```txt
server {
    listen 80;
    server_name localhost;

    location / {
        root /home/fovlin;
        autoindex on;
        autoindex_exact_size off;
    }
}
```

- `autoindex on;`：开启目录索引。
- `autoindex_exact_size off;`：用 KB/MB/GB 显示大小。
- 不会列出 `.` 开头的文件，但仍可通过 URL 访问，不能当访问控制。

### 用 add_before_body 美化

依赖 `ngx_http_addition_module`，编译时加 `--with-http_addition_module`。

在站点根目录创建 `/.autoindex.html`，配置：

```txt
location / {
    root /home/fovlin;
    autoindex on;
    autoindex_exact_size off;
    add_before_body /.autoindex.html;
}
```

`/.autoindex.html` 内容示例：

```html
<style>
pre { line-height: 32px; }
a { color: #ffaf00; font-size: 20px; padding: 0 12px; }
a:hover { color: #ff00af; }
html, body {
    color: bisque;
    background: #1f1a0f;
    font-family: 'Cascadia Code', 'Menlo', monospace;
}
</style>
```

```bash
sudo nginx -s reload
```

### Fancyindex

[Fancyindex](https://github.com/aperezdc/ngx-fancyindex) 是第三方模块，支持图标、排序和自定义主题。

## 反向代理

### HTTP

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

访问 `http://proxy.example.com:8080`，请求转发到 `https://target.example.com`。

按路径转发：

```txt
location /proxy/ {
    proxy_pass https://target.example.com/;
}
```

### 负载均衡

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

- `weight`：权重。
- `ip_hash`：同一 IP 固定到同一后端。

```txt
upstream backend {
    ip_hash;
    server backend.example.com:8080 weight=1;
    server backend.example.com:8081 weight=3;
}
```

### TCP

依赖 Stream 模块，默认编译不包含：

```bash
./configure --with-stream
make && sudo make install && sudo nginx -s stop && sudo nginx
```

```txt
stream {
    server {
        listen 13157;
        proxy_pass acovia.net:29185;
    }
}
```

本机 `13157` 端口的 TCP 流量转发到 `acovia.net:29185`。

## 相关

- 笔记目录：[欢迎](/notes/welcome)
