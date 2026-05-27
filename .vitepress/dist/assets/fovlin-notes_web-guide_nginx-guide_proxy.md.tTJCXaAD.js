import{c as a,ah as n,L as e,O as i}from"./chunks/framework.YKVbmyBD.js";const k=JSON.parse('{"title":"Nginx 反向代理","description":"","frontmatter":{},"headers":[],"relativePath":"fovlin-notes/web-guide/nginx-guide/proxy.md","filePath":"fovlin-notes/web-guide/nginx-guide/proxy.md"}'),p={name:"fovlin-notes/web-guide/nginx-guide/proxy.md"};function t(l,s,c,h,o,d){return n(),e("div",null,[...s[0]||(s[0]=[i(`<h1 id="nginx-反向代理" tabindex="-1">Nginx 反向代理 <a class="header-anchor" href="#nginx-反向代理" aria-label="Permalink to “Nginx 反向代理”">​</a></h1><blockquote><p>推荐查看 Nginx 官方文档，此处记录并不全面。</p></blockquote><h2 id="http-反向代理" tabindex="-1">HTTP 反向代理 <a class="header-anchor" href="#http-反向代理" aria-label="Permalink to “HTTP 反向代理”">​</a></h2><p>配置此功能非常简单，在 <code>http {}</code> 板块下新建 <code>server {}</code> 板块：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 8080;</span></span>
<span class="line"><span>        server_name proxy.example.com;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass https://target.example.com/;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样当用户访问 <code>https://proxy.example.com:8080</code> 时，会被跳转到 <code>https://target.example.com</code>。</p><p>同时还可以借助 <code>location</code> 字段，实现在特定 URL 跳转：</p><p>仅需将 <code>location / {}</code> 改为 <code>location /proxy/ {}</code>，这样当用户访问 <code>https://proxy.example.com:8080/proxy</code> 时，会被跳转到 <code>https://target.example.com</code>。</p><p>使用反向代理还可以实现负载均衡，使用 <code>upstream name {}</code> 板块添加后端服务器组。</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>http {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    upstream backend {</span></span>
<span class="line"><span>        server backend.example.com:8080;</span></span>
<span class="line"><span>        server backend.example.com:8081;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 8080;</span></span>
<span class="line"><span>        server_name proxy.example.com;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass backend;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在 <code>upstream name {}</code> 中，可以用 <code>weight</code> 指定权重，ip_hash 固定同一 ip 的访问在同一台服务器中。</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># ...</span></span>
<span class="line"><span>    upstream backend {</span></span>
<span class="line"><span>        ip_hash;</span></span>
<span class="line"><span>        server backend.example.com:8080 weight=1;</span></span>
<span class="line"><span>        server backend.example.com:8081 weight=3;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span># ...</span></span></code></pre></div><h2 id="tcp-反向代理" tabindex="-1">TCP 反向代理 <a class="header-anchor" href="#tcp-反向代理" aria-label="Permalink to “TCP 反向代理”">​</a></h2><p>此模块依赖于 Nginx 的 Stream 模块，此模块的安装默认不包含在 Nginx 的默认编译选项中。</p><p>要使用此模块，在先前的基础上，添加 <code>--with-stream</code> 参数进行编译：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with-stream</span></span></code></pre></div><p>随后重新编译安装 Nginx 并冷重启 Nginx 服务：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span></span></code></pre></div><p>在 <code>nginx.conf</code> 中添加以下板块：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>stream {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 13157;</span></span>
<span class="line"><span>        proxy_pass acovia.net:29185;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样所有在 <code>acovia.net:29185</code> 的 tcp 流量会被转发在本机的 13157 端口。</p>`,21)])])}const g=a(p,[["render",t]]);export{k as __pageData,g as default};
