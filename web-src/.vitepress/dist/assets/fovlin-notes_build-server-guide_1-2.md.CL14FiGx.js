import{c as n,ao as l,ah as e,L as p,O as h,I as i,Q as t,aY as k,P as r}from"./chunks/framework.YKVbmyBD.js";const u=JSON.parse('{"title":"Linux 搭建服务器","description":"","frontmatter":{},"headers":[],"relativePath":"fovlin-notes/build-server-guide/1-2.md","filePath":"fovlin-notes/build-server-guide/1-2.md"}'),d={name:"fovlin-notes/build-server-guide/1-2.md"};function g(c,s,o,E,y,b){const a=l("center");return e(),p("div",null,[s[1]||(s[1]=h(`<h1 id="linux-搭建服务器" tabindex="-1">Linux 搭建服务器 <a class="header-anchor" href="#linux-搭建服务器" aria-label="Permalink to “Linux 搭建服务器”">​</a></h1><p>:::caution 确保你已经完成了 <a href="./1-1.html"><strong>开始前的准备</strong></a> 这个环节，并安装了合适的 JAVA 环境 :::</p><blockquote><p>根据不同核心，操作步骤略有不同，但整体非常相似。</p></blockquote><h2 id="安装服务端" tabindex="-1">安装服务端 <a class="header-anchor" href="#安装服务端" aria-label="Permalink to “安装服务端”">​</a></h2><p>:::note 不同核心对应的服务端安装逻辑一般相同，但 Neoforge/Forge 这两个核心与其他核心相比略有不同。 :::</p><p>下载服务端核心。</p><p>在官网选择好合适的版本后，右键并复制链接，使用 wget 进行下载。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 下载链接url</span></span></code></pre></div><p>下载完成后你的目录下会出现 <code>xxxxx-xxx-xx.jar</code> 文件。</p><p>:::caution 下载得到的服务器核心一般是一个jar文件，运行命令时请将 <code>xxxxx-xxx-xx.jar</code> 替换为实际 jar 文件全称。 :::</p><p>创建一个目录，即文件夹，名称随意，如mc-server目录为例,创建后将 <code>xxxxx-xxx-xx.jar</code> 移动至新目录并进入该目录。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mc-server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxxxx-xxx-xx.jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mc-server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mc-server</span></span></code></pre></div><p>使用如下命令安装并构建服务端根目录，以及加载协议文件。</p><h3 id="对于-paper-及其-fabric-spigot-等核心" tabindex="-1">对于 Paper 及其 Fabric/Spigot 等核心 <a class="header-anchor" href="#对于-paper-及其-fabric-spigot-等核心" aria-label="Permalink to “对于 Paper 及其 Fabric/Spigot 等核心”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> paper-xxx-xx.jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nogui</span></span></code></pre></div><blockquote><p>此命令表示运行jar可执行文件，<code>nogui</code> 表示无需图形化。</p></blockquote><p>在安装完成后会输出。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>[XX:XX:XX INFO]: You need to agree to the EULA in order to run the server. Go to eula.txt for more info.</span></span></code></pre></div><p>此时会在服务端根目录生成一个 <code>eula.txt</code> 文件，终端输出表示需要你去同意协议，在eula.txt中了解更多信息。</p><h3 id="对于-neoforge-forge-核心" tabindex="-1">对于 Neoforge/Forge 核心 <a class="header-anchor" href="#对于-neoforge-forge-核心" aria-label="Permalink to “对于 Neoforge/Forge 核心”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> neoforge-xx-xx-xx-installer.jar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nogui</span></span></code></pre></div><blockquote><p>此命令表示运行jar可执行文件，<code>nogui</code>表示无需图形化。</p></blockquote><p>运行完成后会输出</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>The server installed successfully</span></span>
<span class="line"><span>You can delete this installer file now if you wish</span></span></code></pre></div><p>接下来需要运行启动脚本去加载协议文件。</p><p>给予启动脚本执行权限，否则我们无法运行脚本。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 711</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run.sh</span></span></code></pre></div><p>随后运行以下命令来运行脚本。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./run.sh</span></span></code></pre></div><p>:::note Neoforge服务端下载会小概率因为网络原因出现错误，如果在服务端无法正常安装，可以选择在本地电脑进行安装然后上传到服务器，如果仍然无法成功安装，删掉本地服务端根目录除 <code>neoforge-xx-xx-xx-installer.jar</code> 以外的所有文件后，更换网络或使用热点重试（有些时候使用魔法报错比使用正常网络还快，这是我至今也搞不懂的，但是在我个人的环境中 <strong>使用热点能很好地解决这一问题</strong> ） :::</p><h2 id="配置服务端" tabindex="-1">配置服务端 <a class="header-anchor" href="#配置服务端" aria-label="Permalink to “配置服务端”">​</a></h2><p>使用vim编辑器同意协议,将末行的 <code>eula=false</code> 更改为 <code>eula=true</code> 如下</p><div class="language-vim"><button title="Copy Code" class="copy"></button><span class="lang">vim</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">By changing the setting below </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TRUE you are indicating your agreement </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> our EULA (https://aka.ms/MinecraftEULA).</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Sat XXX XX XX:XX:XX CST XXXX</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">eula</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><p>编辑server.properties文件</p><p>该文件已经是预设好的，不需要额外配置即可正常使用，可以根据需求进行对某些配置进行设置此处仅展示一些简单的讲解</p><p>关于该文件的更多配置请参阅<a href="https://minecraft.fandom.com/zh/wiki/Server.properties#Java%E7%89%88_3" target="_blank" rel="noreferrer"><strong>Minecraft Wiki-server.properties详解</strong></a></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server.properties</span></span></code></pre></div><div class="language-properties"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#Minecraft server properties</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#Sat Jan 10 12:20:36 CST 2026</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">accepts-transfers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#允许通过 /transfer 命令使玩家服务器间传输。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">allow-flight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#是否允许飞行，与玩家能否飞行无关，若关闭，当玩家在空中停留过久会被踢出服务器。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">allow-nether</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#服务器是否启用下界维度。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">broadcast-console-to-ops</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#是否向所有在线OP发送所执行命令的输出</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">broadcast-rcon-to-ops</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#是否向所有在线OP发送通过RCON执行的命令的输出</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bug-report-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#bug反馈链接</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#调试模式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">difficulty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=easy</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#难度</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enable-code-of-conduct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enable-jmx-monitoring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enable-query</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enable-rcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#允许服务端控制台远程连接</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enable-status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enforce-secure-profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enforce-whitelist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">entity-broadcast-range-percentage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=100</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">force-gamemode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function-permission-level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">gamemode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=survival</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">generate-structures</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">generator-settings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">={}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">hardcore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">hide-online-players</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#隐藏在线玩家</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">initial-disabled-packs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">initial-enabled-packs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=vanilla</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">level-name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=world</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#存档文件夹的名称</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">level-seed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#地图种子</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">level-type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=minecraft\\:normal</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#世界类型，normal 表示普通主世界类型。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">log-ips</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-allowed-origins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=localhost</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-secret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0y7vj7nMWbxZz446HCR01sE3f8yiCgLI1yzoc7fh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-tls-enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-tls-keystore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">management-server-tls-keystore-password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max-chained-neighbor-updates</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=1000000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max-players</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=20</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最大玩家数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max-tick-time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=60000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max-world-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=29999984</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最大世界尺寸</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">motd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=A Minecraft Server</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#在多人游戏中显示的服务器副标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">network-compression-threshold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=256</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">online-mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#在线模式，若打开，则会进行正版验证，离线玩家将无法进入，如果有离线玩家，建议关闭</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">op-permission-level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pause-when-empty-seconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=-1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">player-idle-timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">prevent-proxy-connections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">query.port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=25565</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rate-limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rcon.password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#rcon远程控制台密码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rcon.port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=25575</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">region-file-compression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=deflate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">require-resource-pack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">resource-pack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">resource-pack-id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">resource-pack-prompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">resource-pack-sha1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server-ip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#服务器ip，建议留空</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server-port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=25565</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#服务器端口号</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">simulation-distance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">spawn-protection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=16</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#出生点保护范围</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">status-heartbeat-interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">sync-chunk-writes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">text-filtering-config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">text-filtering-version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use-native-transport</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">view-distance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#视距</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">white-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#是否开启白名单模式，开启后只有被添加到白名单的玩家才能加入服务器</span></span></code></pre></div><blockquote><p>请记住端口号，你将通过端口号连接到服务器</p></blockquote><h2 id="运行服务端" tabindex="-1">运行服务端 <a class="header-anchor" href="#运行服务端" aria-label="Permalink to “运行服务端”">​</a></h2><p>配置完成后就可以开始开启服务器了，因为ssh远程会话的任务会随着会话关闭而结束，此时需要用到 <code>screen</code> 工具使我们的 MC 服务端在后台运行</p><blockquote><p>screen 是一个强大的后台会话管理工具，可以守护会话在后台运行，在你不需要的时候挂至后台，需要的时候进行重连继续管理。 使用如下命令创建一个名为 server 的后台会话（你也可以在 -S 后指定自己想要的名称），创建后，会自动进入这个后台新会话。</p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server</span></span></code></pre></div><blockquote><p>此处S要大写</p></blockquote><h3 id="对于-paper-核心-在后台会话中运行" tabindex="-1">对于 Paper 核心，在后台会话中运行 <a class="header-anchor" href="#对于-paper-核心-在后台会话中运行" aria-label="Permalink to “对于 Paper 核心，在后台会话中运行”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> paper-xxx-xx.jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nogui</span></span></code></pre></div><p>来启动服务器</p><h3 id="对于-neoforge-forge-核心-1" tabindex="-1">对于 Neoforge/Forge 核心 <a class="header-anchor" href="#对于-neoforge-forge-核心-1" aria-label="Permalink to “对于 Neoforge/Forge 核心”">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./run.sh</span></span></code></pre></div><p>出现以下输出则启动成功</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[12:48:50 INFO]: Done (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">13.140s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> For</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> help,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;help&quot;</span></span></code></pre></div><p>如果要临时离开 screen 后台会话，使用 <code>Ctrl+A 并松开，然后轻敲 D</code> 来临时离开会话</p><p>如果要重新进入这个后台对话，使用如下命令</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #此处填写你的会话名称</span></span></code></pre></div><h2 id="加入服务器" tabindex="-1">加入服务器 <a class="header-anchor" href="#加入服务器" aria-label="Permalink to “加入服务器”">​</a></h2><p>随后需要找到设备的公网ip，并确保 Minecraft 服务端端口对应的防火墙规则为开启，在你购买的云服务商控制台主页找到购买的云服务器，找到公网ip并复制，同时寻找安全组/防火墙等字眼，并前往该页面开启放通MC服务端端口对应的防火墙</p><p>此时进入与服务端版本相同的Minecraft客户端后，进入多人游戏，添加服务器，地址填写如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你的公网ip:端口号</span></span></code></pre></div><p>完成后随后即可看到在多人游戏中看到该服务器，此时Paper服务端已经搭建完成</p><br><br><br>`,62)),i("p",null,[i("em",null,[i("strong",null,[t(a,null,{default:k(()=>[...s[0]||(s[0]=[r("--- 由 柏茯灵_RsDline 编写 ---",-1)])]),_:1})])])])])}const f=n(d,[["render",g]]);export{u as __pageData,f as default};
