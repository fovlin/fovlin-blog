# 本地化

## 启用地区支持

编辑 `/etc/locale.conf` 文件，此文件中的所有地区默认都会被注释，寻找以下行取消注释。

```bash
#LANG=en_US.UTF-8
#LANG=zh_CN.UTF-8
```

`LANG=en_US.UTF-8` 将启用英语，`LANG=zh_CN.UTF-8` 将启用中文。

> **或者**直接将以上行添加到文件开头。

编辑完成后，执行以下命令使配置生效。

```bash
locale-gen
```

## 配置语言

启用地区支持后，在图形化界面注销并重新登录后，在设置中找到更改语言的选项更改即可。

> 如果发现中文部分显示全部为乱码，那你需要安装正确的中文语言包，如 `Noto Sans CJK SC`、`adobe-source-han-sans-cn-fonts`。

如需将用户目录英文化，则可以编辑用户家目录下的 `.config/user-dirs.dirs` 文件。

示例：

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

## 配置中文输入法

目前主流的中文输入法框架有 fcitx5 以及 ibus，fcitx5 由社区驱动，对中文支持强大，ibus 为 gnome 自带，与 gnome 深度集成。

### fcitx5

资料来源：[Fcitx5 官方 wiki](https://fcitx-im.org/wiki/Setup_Fcitx_5/zh-cn)

通过包管理器安装 `fcitx5` 后，默认没有中文输入法引擎支持，需要安装 `fcitx5-chinese-addons`，来启用中文输入法支持，若想追求更好的中文体验，可以安装雾凇拼音 `fcitx5-rime`，同时你需要安装图形化的 `fcitx5-configtool` fcitx5配置工具。

大部分发行版会配置好开机自启动，若你的发行版没有，执行以下命令设置开机自启动：

```bash
mkdir -p ~/.config/autostart && cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart
```

随后需要添加环境变量到 `.bash_profile`（如果你的 shell 是 bash）：

```bash
export XMODIFIERS=@im=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
```

注销后重新登录

使用以下命令打开 `fcitx5` 的配置菜单：

```bash
fcitx5-configtool
```

一般地，在选择好智能拼音以后，就可以正常使用了。

如果你要追求更好的 UI 体验，可以使用 github 上的开源项目 [fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight) 来更改输入法框的皮肤，使其更美观。

### ibus

ibus 深度集成于 gnome，在 gnome 中，配置好中文以后一般是开箱即用的，但他的拼音输入法不如 fcitx5 强大，经常出现错别字。

目前推荐的 ibus 输入法引擎有 `ibus-libpinyin`、`ibus-rime`。

## 配置时区

使用以下命令查看当前系统日期时间设置。

```bash
timedatectl
```

可以得到类似的输出:

```bash
               Local time: Thu 2026-03-19 14:59:22 CST
           Universal time: Thu 2026-03-19 14:59:22 UTC
                 RTC time: Thu 2026-03-19 14:59:22
                Time zone: UTC (UTC, +0000)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
```

此时时间是UTC时间，需要设置成中国时区。

```bash
timedatectl set-timezone Asia/Shanghai
```

如果配备了双系统，可能会出现两系统时间不同的情况，这时需要同步硬件时间。

```bash
timedatectl set-local-rtc 1
```