# Linux 系统配置笔记

记录本地化、用户权限和软件安装的常用配置。

## 本地化与时区

### locale

编辑 `/etc/locale.conf`，取消注释需要的语言：

```bash
#LANG=en_US.UTF-8
#LANG=zh_CN.UTF-8
```

- `LANG` 决定默认语言：`zh_CN.UTF-8` 简体中文，`en_US.UTF-8` 英语。
- Debian/Ubuntu 也可能使用 `/etc/default/locale`，内容同样是 `LANG=...`。
- 部分发行版还要在 `/etc/locale.gen` 取消对应语言行的注释，再执行 `sudo locale-gen`。

### 语言

注销并重新登录，在桌面设置中切换语言。

备注：

- 中文乱码通常是缺字体或语言包；可安装 `Noto Sans CJK SC`、`adobe-source-han-sans-cn-fonts`。
- 用户目录英文化：编辑 `~/.config/user-dirs.dirs`。

```bash
XDG_DESKTOP_DIR="$HOME/Desktop"
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_TEMPLATES_DIR="$HOME/Templates"
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_DOCUMENTS_DIR="$HOME/Documents"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Pictures"
XDG_VIDEOS_DIR="$HOME/Videos"
```

### 中文输入法

主流框架：fcitx5、ibus。fcitx5 中文支持更好；ibus 与 GNOME 集成更深。

#### fcitx5

安装本体、中文引擎和配置工具：

```bash
sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-configtool
```

雾凇拼音：`fcitx5-rime`。包名因发行版而异。

没有自动开机自启时：

```bash
mkdir -p ~/.config/autostart
cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart
```

环境变量写入 `~/.bash_profile`（bash）：

```bash
export XMODIFIERS=@im=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
```

注销并重新登录，然后：

```bash
fcitx5-configtool
```

添加“智能拼音”等引擎即可。皮肤可参考 [fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight)。

#### ibus

与 GNOME 集成好，配置中文后通常开箱即用；拼音体验不如 fcitx5。常用引擎：`ibus-libpinyin`、`ibus-rime`。

### 时区

```bash
timedatectl
sudo timedatectl set-timezone Asia/Shanghai
```

双系统时间不一致时，可让硬件时钟使用本地时间：

```bash
sudo timedatectl set-local-rtc 1
```

> 更推荐两个系统都用 UTC；`set-local-rtc 1` 是兼容 Windows 默认行为的折中方案。

## 用户与权限

### 创建用户

```txt
useradd [参数] 用户名
```

| 参数 | 作用 | 默认值 |
| --- | --- | --- |
| `-d` | 主目录 | `/home/用户名` |
| `-g` | 所属主组 | 与用户名同名的主组 |
| `-m` | 主目录不存在时创建 | — |
| `-s` | 登录 shell | 因发行版而异 |

```bash
sudo useradd -md /home/linux -s /bin/bash linux
sudo passwd linux
```

### 修改、删除用户

`/etc/passwd` 每行一个用户：

```bash
fovlin:x:1000:1000:user:/home/fovlin:/bin/bash
```

字段：用户名、密码占位符、UID、GID、描述、主目录、登录 shell。密码在 `/etc/shadow`。

```txt
usermod [参数] 用户名
```

| 参数 | 作用 |
| --- | --- |
| `-d` | 修改主目录 |
| `-g` | 修改主组 |
| `-G` | 设置附加组（覆盖原有附加组） |
| `-aG` | 追加附加组，不覆盖 |
| `-s` | 修改登录 shell |

```bash
sudo usermod -d /home/linuxos/ -s /bin/sh linux
sudo userdel linux
sudo userdel -r linux   # 同时删除主目录
```

> 删除用户前确认没有服务或 cron 任务依赖它。

### 用户组

```bash
sudo groupadd name
groups username
sudo usermod -aG groupname username
```

- `groups` 输出第一个是主组，后面是附加组。
- `-G` 会覆盖原有附加组，追加用 `-aG`。

### 文件所有者

权限位和 `chmod` 见[命令行基础](/notes/linux/command-line#chmod-命令)。修改所有者和所属组：

```bash
sudo chown fovlin:fovlin script.sh
sudo chown -R fovlin:fovlin docs
```

`-R` 递归处理目录内容。

## 软件安装

优先级：包管理器 → 官方安装包 → 源码编译 / AppImage。

### 包管理器

| 发行版 | 安装命令 |
| --- | --- |
| Debian / Ubuntu | `sudo apt install <包名>` |
| Fedora | `sudo dnf install <包名>` |
| Arch Linux | `sudo pacman -S <包名>` |

第三方包管理器：`flatpak`。

### .deb / .rpm

`.deb`（Debian/Ubuntu）：

```bash
sudo dpkg -i package.deb
sudo apt install -f          # 补依赖
sudo apt install ./package.deb  # 自动处理依赖
```

`.rpm`（Fedora 等）：

```bash
sudo rpm -ivh package.rpm
sudo dnf install ./package.rpm   # Fedora 推荐
```

### tar.gz

```bash
tar -xzf package.tar.gz
cd package
```

可能是源码、预编译二进制或 AppImage。

#### 源码编译

```bash
./configure --prefix=/usr/local
make
sudo make install
```

编译前装工具链；Debian/Ubuntu 可用 `build-essential`。编译参数以项目文档为准。

#### 预编译二进制

解压后通常有 `bin/`，直接运行；要全局调用，可加入 `$PATH` 或软链接到 `/usr/local/bin`。

#### AppImage

```bash
chmod +x app.AppImage
./app.AppImage
```

### 全局可用

```bash
echo $PATH
```

把程序目录加入 `PATH`：

```bash
echo 'export PATH=/home/fovlin/opt/vscode/bin:$PATH' | sudo tee -a /etc/profile
```

> `/etc/profile` 对所有用户生效；只对当前用户生效可写入 `~/.profile`。修改后重新登录或 `source ~/.profile`。

软链接到已在 `PATH` 的目录：

```bash
sudo ln -s /home/fovlin/opt/vscode/bin/code /usr/local/bin/code
```

### 桌面菜单项

创建 `.desktop` 文件，放到 `/usr/share/applications`（系统级）或 `~/.local/share/applications`（用户级）。

```txt
[Desktop Entry]
Type=Application
Exec=/opt/idea/bin/idea.sh
Icon=/opt/idea/bin/idea.png
Name=IDEA
```

- `Exec`：可执行文件绝对路径，可带参数。
- `Icon`：图标绝对路径。
- `Name`：应用名称。

## 相关

- 权限与文件操作：[命令行基础](/notes/linux/command-line)
- 磁盘与挂载：[磁盘管理与双系统引导](/notes/linux/disk-and-boot)
