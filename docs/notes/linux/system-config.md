# Linux 系统配置

安装完成之后，还需要把系统调整成顺手的日常环境。这一章涵盖本地化与时区、用户与权限、软件安装三部分，重点放在配置思路和常见坑上。

## 本地化与时区

本地化决定系统语言、字符编码和时区；输入法则是中文用户最常遇到的配置之一。

### 启用地区支持

编辑 `/etc/locale.conf`，取消注释需要的语言（Debian/Ubuntu 也可能使用 `/etc/default/locale`，内容同样是 `LANG=...`）：

```bash
#LANG=en_US.UTF-8
#LANG=zh_CN.UTF-8
```

`LANG` 决定默认语言：`zh_CN.UTF-8` 使用简体中文，`en_US.UTF-8` 使用英语。也可以直接在文件开头写入对应行。

部分发行版还需要在 `/etc/locale.gen` 中取消对应语言行的注释，然后生成 locale：

```bash
sudo locale-gen
```

### 配置语言

注销并重新登录，在桌面设置中选择语言即可。

> 如果中文显示为乱码，通常是缺少中文字体或语言包。可以安装 `Noto Sans CJK SC`、`adobe-source-han-sans-cn-fonts` 等。

如果希望用户目录（桌面、下载、文档等）使用英文名称，可以编辑 `~/.config/user-dirs.dirs`：

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

### 配置中文输入法

主流的中文输入法框架有 fcitx5 和 ibus。fcitx5 由社区驱动，中文支持更好；ibus 与 GNOME 集成更深。

#### fcitx5

安装本体、中文引擎和配置工具：

```bash
sudo apt install fcitx5 fcitx5-chinese-addons fcitx5-configtool
```

追求更好的词库可以安装雾凇拼音 `fcitx5-rime`；不同发行版的包名略有差异。

如果发行版没有自动配置开机自启，可以手动添加：

```bash
mkdir -p ~/.config/autostart
cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart
```

把输入法环境变量写入 `~/.bash_profile`（以 bash 为例）：

```bash
export XMODIFIERS=@im=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
```

注销并重新登录，然后打开配置工具：

```bash
fcitx5-configtool
```

添加“智能拼音”等引擎后即可使用。想换输入法皮肤，可以看看 [fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight)。

#### ibus

ibus 与 GNOME 集成较好，配置好中文后通常开箱即用，但拼音体验不如 fcitx5。常用引擎有 `ibus-libpinyin` 和 `ibus-rime`。

### 配置时区

查看当前时间设置：

```bash
timedatectl
```

如果时区是 UTC，改为中国时区：

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

双系统用户如果发现 Windows 和 Linux 时间不一致，可以让硬件时钟使用本地时间：

```bash
sudo timedatectl set-local-rtc 1
```

> 更推荐让两个系统都使用 UTC，只在一边调整时区；`set-local-rtc 1` 是兼容 Windows 默认行为的折中方案。

## 用户与权限

Linux 是多用户系统，用户、用户组和文件权限共同决定谁能读写哪些文件。

### 创建用户

安装时通常会创建好日常用户。需要新增用户时使用 `useradd`：

```txt
useradd [参数] 用户名
```

| 参数 | 描述 | 默认值 |
| --- | --- | --- |
| `-d` | 指定用户主目录 | `/home/用户名` |
| `-g` | 指定用户所属组 | 与用户名同名的主组 |
| `-m` | 主目录不存在时自动创建 | — |
| `-s` | 指定登录 shell | 因发行版而异 |

例如创建用户 `linux`，主目录 `/home/linux`，shell 为 `/bin/bash`：

```bash
sudo useradd -md /home/linux -s /bin/bash linux
sudo passwd linux
```

### 修改和删除用户

用户信息保存在 `/etc/passwd`，每行一个用户：

```bash
fovlin:x:1000:1000:user:/home/fovlin:/bin/bash
```

字段依次为：用户名、密码占位符、UID、GID、描述、主目录、登录 shell。密码本身保存在 `/etc/shadow`。

用 `usermod` 修改用户：

| 参数 | 描述 |
| --- | --- |
| `-d` | 修改主目录 |
| `-g` | 修改主组 |
| `-G` | 设置附加组（会覆盖原有附加组） |
| `-aG` | 追加附加组，不覆盖 |
| `-s` | 修改登录 shell |

例如修改主目录和 shell：

```bash
sudo usermod -d /home/linuxos/ -s /bin/sh linux
```

删除用户：

```bash
sudo userdel linux
sudo userdel -r linux   # 同时删除主目录
```

> 删除用户前确认没有正在运行的服务或 cron 任务依赖它。

### 用户组

创建用户组：

```bash
sudo groupadd name
```

查看用户所属的组：

```bash
groups username
```

输出中的第一个组是主组，后面是附加组。给用户追加附加组：

```bash
sudo usermod -aG groupname username
```

> `-G` 会覆盖原有附加组，追加时务必用 `-aG`。

### 文件所有者

文件权限位和 `chmod` 的用法见上一章 [文件管理](/notes/linux/command-line#chmod-命令)。修改所有者和所属组使用 `chown`：

```bash
sudo chown fovlin:fovlin script.sh
sudo chown -R fovlin:fovlin docs
```

`-R` 表示递归处理目录内容。

## 安装与管理软件

软件包优先用发行版的包管理器安装；官网安装包、源码编译和 AppImage 适合包管理器里没有的软件。

### 包管理器安装

包管理器负责下载、安装、升级和卸载软件。常见对应关系：

| 发行版 | 安装命令 |
| --- | --- |
| Debian / Ubuntu | `sudo apt install <包名>` |
| Fedora | `sudo dnf install <包名>` |
| Arch Linux | `sudo pacman -S <包名>` |

第三方包管理器如 `flatpak` 也可以作为补充。具体用法建议查阅对应发行版的文档。

### 安装 `.deb` / `.rpm` 包

官网下载的安装包常见 `.deb` 和 `.rpm` 两种格式。

`.deb` 用于 Debian / Ubuntu：

```bash
sudo dpkg -i package.deb
sudo apt install -f   # 补装缺失的依赖
```

也可以直接用 `apt` 安装本地包，它会自动处理依赖：

```bash
sudo apt install ./package.deb
```

`.rpm` 用于 Fedora 等发行版：

```bash
sudo rpm -ivh package.rpm
```

Fedora 上更推荐：

```bash
sudo dnf install ./package.rpm
```

### 从 tar.gz 安装

`.tar.gz` 解压后可能是源码、预编译二进制或 AppImage，先解压并查看目录内容：

```bash
tar -xzf package.tar.gz
cd package
```

#### 源码编译

源码目录通常有 `configure` 脚本，用于检查环境和生成 Makefile：

```bash
./configure --prefix=/usr/local
make
sudo make install
```

编译前需要安装工具链，例如 Debian / Ubuntu 上的 `build-essential`。不同软件的编译参数不同，以项目文档为准。

#### 预编译二进制

解压后如果有 `bin/` 目录，通常直接运行里面的程序即可。想全局调用，可以把该目录加入 `$PATH`，或把可执行文件软链接到 `/usr/local/bin`。

#### AppImage

AppImage 是打包好的单文件应用：

```bash
chmod +x app.AppImage
./app.AppImage
```

### 让应用程序全局可用

输入命令时，系统会扫描 `$PATH` 中的目录，可以用 `echo $PATH` 查看：

```bash
echo $PATH
```

如果程序位于 `/home/fovlin/opt/vscode/bin/code`，可以把它所在目录加入 `PATH`：

```bash
echo 'export PATH=/home/fovlin/opt/vscode/bin:$PATH' | sudo tee -a /etc/profile
```

> 写入 `/etc/profile` 对所有用户生效；只想对当前用户生效，可以写入 `~/.profile`。修改后重新登录或执行 `source ~/.profile`。

也可以创建软链接到已在 `$PATH` 中的目录，推荐 `/usr/local/bin`：

```bash
sudo ln -s /home/fovlin/opt/vscode/bin/code /usr/local/bin/code
```

如果想让应用出现在桌面菜单中，需要创建 `.desktop` 文件，放到 `/usr/share/applications`（系统级）或 `~/.local/share/applications`（用户级）。例如 `idea.desktop`：

```txt
[Desktop Entry]
Type=Application
Exec=/opt/idea/bin/idea.sh
Icon=/opt/idea/bin/idea.png
Name=IDEA
```

- `Exec`：可执行文件的绝对路径，后面可以带参数。
- `Icon`：图标文件的绝对路径。
- `Name`：应用名称。

保存后，应用就会出现在应用程序菜单中。

## 小结

这一章把系统调整成了更适合日常使用的状态。下一章[《磁盘管理与双系统引导》](/notes/linux/disk-and-boot)会处理更底层的磁盘分区、挂载和双系统引导。
