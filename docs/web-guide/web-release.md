# Linux 如何搭建网站

本文假设你已经了解前端基础，并已经制作了网页，想要将其部署在服务器上。

## Web 服务器软件

Web 服务器是运行在 Linux 上的程序，它监听客户端的 HTTP 请求，然后返回相应的 HTML 文件和资源。

### 常见的 Web 服务器

| 服务器 | 特点 | 适用场景 |
|------|------|--------|
| **Nginx** | 轻量级、高性能、反向代理能力强 | 高流量网站、反向代理 |
| **Apache** | 功能全面、配置灵活、插件丰富 | 传统网站、需要多模块支持 |
| **Caddy** | 自动HTTPS、配置简单、现代化 | 小型网站、快速部署 |

本文将围绕 Linux 上部署 Nginx 展开。

## 安装 Nginx

前往 Nginx 官方获取下载链接，对于 Linux 服务器，使用 wget 命令下载。

```bash
wget http://nginx.org/download/nginx-1.30.0.tar.gz
```

对安装包进行解压。

```bash
tar -xzf nginx-1.30.0.tar.gz
```

前往该目录。

```bash
cd nginx-1.30.0
```

根据 `README.md` 文件提示，安装依赖项。

```bash
sudo apt install libpcre3-dev zlib1g-dev gcc make
```

可以查看 Nginx 官方文档来查找自己需要添加的编译选项，例如要添加能够对 tcp/udp 协议进行管理的 Stream 模块，配置编译选项：

```bash
./configure --with-stream
```

关于完整的编译配置选项（按需可选）：

其他的编译选项可以阅读官方文档。

接下来就是编译安装，使用如下命令编译并安装。

```bash
sudo make && sudo make install
```

安装完成后，默认会被安装在 `/usr/local/nginx` 目录下，前提是你没有通过 configure 更改安装目录。

为 nginx 创建软链接，方便随时使用 nginx。

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
sudo /usr/sbin/nginx

# 重新加载配置（重启 Nginx）
sudo /usr/sbin/nginx -s reload

# 优雅关闭
sudo /usr/sbin/nginx -s quit

# 强制关闭
sudo /usr/sbin/nginx -s stop

```

### 基本配置

编译安装的 Nginx 的主配置文件位于 `/usr/local/nginx/conf/nginx.conf`。

配置后使用以下命令重新加载 nginx

```bash
nginx -s reload
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

如想要配置 SSL 证书，可借助 certbot 工具进行配置，但前提条件是你的 Nginx 配置文件位于 `/etc/nginx/nginx.conf`。

但默认编译安装的配置文件位于 `/usr/local/nginx/conf/nginx.conf`，所以你可以选择创建软链接到此处。

```bash
sudo ln -s /usr/local/nginx/conf /etc/nginx
```

随后将网站文件部署到其中即可，关于更多的 Nginx 配置，可阅读下一页。