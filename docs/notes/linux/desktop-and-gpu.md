# 桌面环境、驱动与显卡笔记

记录桌面环境、终端提示符、NVIDIA 驱动和双显卡切换。

## 桌面环境

桌面版发行版通常自带桌面；服务器也可以装，但会增加资源占用。

常见桌面：

- GNOME：简洁，Ubuntu/Debian/Fedora 默认。
- KDE Plasma：可定制性强。
- Xfce：轻量。
- 也可以只装 Hyprland 等窗口管理器，再自行组合。

### 启动

通常由显示管理器在登录后启动；也可以从 tty 手动启动。

```bash
startplasma-wayland   # KDE Wayland
startplasma-x11       # KDE X11
```

- Wayland：更现代，维护更活跃。
- X11：兼容性好，历史遗留问题多。

### 显示管理器

负责登录界面和启动桌面会话。

- GNOME：GDM
- KDE：SDDM；26.02 起有 `plasma-login-manager`
- 其他：LightDM、greetd 等

### 字体

包管理器安装，或把字体放到：

- 用户级：`~/.local/share/fonts/`
- 系统级：`/usr/share/fonts/`

刷新缓存：

```bash
fc-cache -fv
```

终端等宽字体：`Cascadia Code`。

## 终端提示符

bash 提示符由 `PS1` 控制。写入 `~/.bashrc`：

```bash
export PS1='\[\e[1;32m\]\u@\h\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '
```

```bash
source ~/.bashrc
```

常用转义：

| 转义 | 含义 |
| --- | --- |
| `\\a` | 响铃 |
| `\\d` | 日期 |
| `\\h` | 主机名 |
| `\\n` | 换行 |
| `\\s` | bash 版本 |
| `\\t` | 时间 |
| `\\u` | 用户名 |
| `\\v` | bash 版本 |
| `\\w` | 当前目录 |
| `\\$` | 权限符号 |

颜色格式：`\[\e[效果;...;Xm\]`。

| X | 效果 |
| --- | --- |
| 0 | 重置 |
| 1 | 粗体 |
| 2 | 变暗 |
| 3 | 斜体 |
| 4 | 下划线 |
| 5 | 闪烁 |
| 7 | 反色 |
| 8 | 隐藏 |
| 9 | 删除线 |
| 30–37 | 前景色：黑、红、绿、黄、蓝、紫、青、白 |
| 40–47 | 对应背景色 |

> `\[` 和 `\]` 标记非打印字符；漏写会导致长命令换行错乱。

示例：

```bash
export PS1='\[\e[1;32m\]<\h>\[\e[0m\]-\[\e[1;32m\]<\u>\[\e[0m\]-\[\e[1;34m\]<\w>\[\e[0m\]\n> '

export PS1='\[\e[1;32m\](\u\[\e[1;33m\]@\h\[\e[1;32m\])\[\e[0m\]-\[\e[1;34m\]<\w>\[\e[0m\]\n└<'
```

## 安装 NVIDIA 驱动

### Ubuntu

```bash
sudo ubuntu-drivers autoinstall   # 或“附加驱动”里安装
```

官方 `.run` 驱动：

```bash
sudo apt install linux-headers-$(uname -r)
sudo apt install build-essential
chmod +x NVIDIA-Linux-x86_64-580.142.run
sudo ./NVIDIA-Linux-x86_64-580.142.run
```

### Fedora

RPM Fusion：

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
sudo dnf install akmod-nvidia -y
sudo reboot
```

官方 `.run` 驱动：

```bash
sudo dnf update
sudo dnf install kernel-headers kernel-devel gcc
chmod +x NVIDIA-Linux-x86_64-580.142.run
sudo ./NVIDIA-Linux-x86_64-580.142.run
sudo reboot
```

### Arch Linux

```bash
sudo pacman -S nvidia-open-dkms
sudo reboot
```

`nvidia-open-dkms` 会随内核更新自动重编译。

## 双显卡

程序默认跑在集显时，用环境变量指定显卡。

### AMD

Mesa 的 `DRI_PRIME`：

```bash
DRI_PRIME=1 <命令>
```

支持：

- `DRI_PRIME=N`：第 N 个非默认 GPU。
- `DRI_PRIME=pci-0000_02_00_0`：按 PCI 总线选择。
- `DRI_PRIME=vendor_id:device_id`：按厂商/设备 ID 选择。
- Vulkan 加 `!` 只暴露所选 GPU，如 `DRI_PRIME=1!`。

### NVIDIA

```bash
__NV_PRIME_RENDER_OFFLOAD=1 <命令>
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <命令>   # GLX
```

更细的控制：

- Vulkan：`__VK_LAYER_NV_optimus=NVIDIA_only` 或 `non_NVIDIA_only`。
- OpenGL：`__NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0` 指定具体 GPU；名称用 `xrandr --listproviders` 查看。

参考：

- [NVIDIA driver index](https://download.nvidia.com/XFree86/)
- [Arch Linux Wiki: PRIME](https://wiki.archlinux.org.cn/title/PRIME)
- [Mesa 3D Environment Variables](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME)

## 常见问题

### SDDM + NVIDIA 开机黑屏

SDDM 的常见问题。可换显示管理器，或从 tty 登录后执行：

```bash
startplasma-wayland
```

### 无线网卡卡顿

```bash
lspci
```

确认型号后找驱动。以 Realtek RTL8852 为例，`rtw89` 已进入主线内核；旧内核可升级内核或另装驱动。

## 相关

- 桌面环境安装：[Linux 入门](/notes/linux/getting-started)
- 输入法主题：[fcitx5 主题](/notes/linux/fcitx5-theme)
