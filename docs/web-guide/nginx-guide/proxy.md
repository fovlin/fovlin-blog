# Nginx 反向代理

> 推荐查看 Nginx 官方文档，此处记录并不全面。

## HTTP 反向代理

配置此功能非常简单，在 `http {}` 板块下新建 `server {}` 板块：

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

这样当用户访问 `https://proxy.example.com:8080` 时，会被跳转到 `https://target.example.com`。

同时还可以借助 `location` 字段，实现对特定的 URL 请求跳转：

仅需将 `location / {}` 改为 `location /proxy/ {}`，这样当用户访问 `https://proxy.example.com:8080/proxy` 时，会被跳转到 `https://target.example.com`。

使用反向代理还可以实现负载均衡，使用 `upstream name {}` 板块添加后端服务器组。

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
            proxy_pass backend;
        }
    }
}
```

在 `upstream name {}` 中，可以用 `weight` 指定权重，ip_hash 固定同一 ip 的访问在同一台服务器中。

```txt
# ...
    upstream backend {
        ip_hash;
        server backend.example.com:8080 weight=1;
        server backend.example.com:8081 weight=3;
    }
# ...
```

## TCP 反向代理

此模块依赖于 Nginx 的 Stream 模块，此模块的安装默认不包含在 Nginx 的默认编译选项中。

要使用此模块，在先前的基础上，添加 `--with-stream` 参数进行编译：

```bash
./configure --with-stream
```

随后重新编译安装 Nginx 并冷重启 Nginx 服务：

```bash
make && sudo make install && nginx -s stop && nginx
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

这样所有在 `acovia.net:29185` 的 tcp 流量会被转发本机的 13157 端口。