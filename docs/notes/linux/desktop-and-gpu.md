# 桌面环境、驱动与显卡

这一章面向已经装好系统、准备配置图形界面的读者：选择并启动桌面环境、定制终端提示符、安装 NVIDIA 驱动，以及让程序使用独立显卡运行。最后附上几个常见问题的处理办法。

## 桌面环境

桌面版发行版通常自带桌面环境；服务器也可以安装，但会增加资源占用。大多数发行版默认使用 GNOME，例如 Ubuntu、Debian 和 Fedora。

### 选择桌面环境

桌面环境没有绝对优劣：GNOME 简洁、KDE Plasma 可定制、Xfce 轻量。可以先用发行版默认的，熟悉后再换；更详细的对比可以查阅 Arch Wiki。

### 启动桌面环境

桌面环境通常由显示管理器在登录后启动，也可以从 tty 手动启动。以 KDE 为例：

```bash
startplasma-wayland
```

也可以使用 `startplasma-x11`。推荐 Wayland，它是更现代、维护更活跃的显示服务器；X11 兼容性更好，但历史遗留问题较多。

### 显示管理器

显示管理器负责提供登录界面并启动桌面会话。GNOME 默认使用 GDM，KDE 默认使用 SDDM；KDE 在 26.02 中引入了 `plasma-login-manager`。也可以换用 LightDM、greetd 等其他实现。

### 字体

如果默认字体不合适，可以用包管理器安装字体，或把字体文件放到 `~/.local/share/fonts/`（用户级）或 `/usr/share/fonts/`（系统级），然后刷新字体缓存：

```bash
fc-cache -fv
```

终端等宽字体可以试试 `Cascadia Code`。

## 自定义终端提示符

bash 的提示符由 `PS1` 环境变量控制。编辑 `~/.bashrc`，加入下面这行：

```bash
export PS1='\[\e[1;32m\]\u@\h\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '
```

重新打开终端，或执行 `source ~/.bashrc` 使其生效。

这是 Ubuntu 默认风格的提示符，可以按喜好修改。

### 各变量含义

常用转义字符如下：

| 变量 | 描述 |
| --- | --- |
| `\\a` | 响铃 |
| `\\d` | 显示当前日期 |
| `\\h` | 显示当前主机名 |
| `\\n` | 换行 |
| `\\s` | 显示当前 bash 的版本 |
| `\\t` | 显示当前时间 |
| `\\u` | 显示当前用户名 |
| `\\v` | 显示当前 bash 版本 |
| `\\w` | 显示当前工作目录 |
| `\\$` | 显示当前用户权限 |

颜色设置：

使用 `\[\e[a;b;...;Xm\]` 或 `\[\033[a;b;...;Xm\]` 设置后续字符的颜色。`a`、`b` 等是附加效果，用 `;` 分隔且可省略；`X` 是主要效果。例如只把字体设为绿色：`\[\e[32m\]`。

> `\[` 和 `\]` 用来标记非打印字符，告诉 bash 这些字符不占显示宽度；漏写会导致长命令换行错乱。

不同 X 值代表的字体效果如下：

| 效果 | 描述 |
| --- | --- |
| 0 | 重置效果 |
| 1 | 粗体 |
| 2 | 变暗 |
| 3 | 斜体 |
| 4 | 下划线 |
| 5 | 闪烁 |
| 7 | 反色 |
| 8 | 隐藏 |
| 9 | 删除线 |
| 30 | 黑色 |
| 31 | 红色 |
| 32 | 绿色 |
| 33 | 黄色 |
| 34 | 蓝色 |
| 35 | 紫色 |
| 36 | 青色 |
| 37 | 白色 |
| 40 | 黑色背景 |
| 41 | 红色背景 |
| 42 | 绿色背景 |
| 43 | 黄色背景 |
| 44 | 蓝色背景 |
| 45 | 紫色背景 |
| 46 | 青色背景 |
| 47 | 白色背景 |

例如使用以下 PS1 环境变量：

```bash
export PS1='\[\e[1;32m\]<\h>\[\e[0m\]-\[\e[1;32m\]<\u>\[\e[0m\]-\[\e[1;34m\]<\w>\[\e[0m\]\n> '
```

或是得到 Kali 的终端效果：

```bash
export PS1='\[\e[1;32m\](\u\[\e[1;33m\]@\h\[\e[1;32m\])\[\e[0m\]-\[\e[1;34m\]<\w>\[\e[0m\]\n└<'
```

## 安装 NVIDIA 驱动

不同发行版的安装方式略有差异。

### Ubuntu

**方法一：下载官方仓库开源驱动**

在“附加驱动”中安装，或执行 `sudo ubuntu-drivers autoinstall`。

**方法二：安装 NVIDIA 官方闭源驱动**

从 NVIDIA 官网下载对应驱动，通常是 `.run` 文件；赋予执行权限后以 root 身份运行。

在开始运行之前，首先安装必要的软件包。

- 内核头文件

对应的包名是 `linux-headers-你的内核版本`。如果缺少它，驱动安装程序会报“无法发现内核源文件”。

使用 `uname -r` 命令可以查询内核版本号，同时我们可以使用 `$(command)` 的方式将输出转换为字符串，故安装内核头文件可以使用以下方法：

```bash
sudo apt install linux-headers-$(uname -r)
```

- gcc 编译器

安装编译工具链，推荐直接装 `build-essential`：

```bash
sudo apt install build-essential
```

随后赋予安装程序权限，运行安装程序。

```bash
chmod +x NVIDIA-Linux-x86_64-580.142.run
```

```bash
sudo ./NVIDIA-Linux-x86_64-580.142.run
```

### Fedora

**方法一：安装官方 rpm 仓库内驱动**

参考：[Fedora 官方文档](https://docs.fedoraproject.org/en-US/gaming/drivers/)

启用 rpm 仓库：

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
```

安装 NVIDIA 驱动：

```bash
sudo dnf install akmod-nvidia -y
```

随后执行 `sudo reboot` 重启系统。

**方法二：安装 NVIDIA 官方闭源驱动**

从 NVIDIA 官网下载对应驱动，通常是 `.run` 文件；赋予执行权限后以 root 身份运行。

在开始运行之前，首先安装必要的软件包。

- 内核头文件

此包在仓库内的名称为 `kernel-headers`，若未安装此包直接运行驱动安装程序，会返回 `无法发现内核源文件` 的报错。

此软件包默认会安装当前系统支持的最新内核版本的头文件，故需要先使用 `sudo dnf update` 将内核版本升级到此系统支持的最新版本。

若上一步升级了内核版本，则需要重启系统。

随后安装内核头文件。

```bash
sudo dnf install kernel-headers kernel-devel
```

- gcc 编译器

```bash
sudo dnf install gcc
```

随后赋予安装程序权限，运行安装程序。

```bash
chmod +x NVIDIA-Linux-x86_64-580.142.run
```

```bash
sudo ./NVIDIA-Linux-x86_64-580.142.run
```

运行完成后，重启系统。

### Arch Linux

官方仓库提供 `nvidia-open` 和 `nvidia-open-dkms`，推荐后者：dkms 会在内核更新后自动重新编译。

```bash
sudo pacman -S nvidia-open-dkms
```

安装后重启系统。

## 使用独立显卡运行程序

双显卡用户经常遇到程序默认跑在集成显卡上的问题。最常用的两种方式：

```bash
# AMD
DRI_PRIME=1 <命令>

# NVIDIA
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <命令>
```

下面保留了 AMD 和 NVIDIA 驱动文档中的完整说明。

### AMD 显卡

AMD 显卡的用户态驱动集成在 mesa3d 项目中，[Mesa 3D Environment Variables](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME) 文档说明，可以通过环境变量 `DRI_PRIME` 以切换显卡，原文如下：

```plaintext
## DRI_PRIME

默认 GPU 是 Wayland/Xorg 使用的 GPU 或连接到显示器的 GPU。这个变量允许选择不同的 GPU。它适用于 OpenGL 和 Vulkan（在这种情况下，“选择”意味着该 GPU 会排在报告的物理设备列表的首位）。支持的语法有：

DRI_PRIME=N：选择第 N 个非默认 GPU（N > 0）。

DRI_PRIME=pci-0000_02_00_0：选择连接到这个 PCIe 总线的 GPU。

DRI_PRIME=vendor_id:device_id：选择第一个匹配这些 ID 的 GPU。

对于 Vulkan，可以在后面加上 !，这时只会将所选 GPU 暴露给应用（例如：DRI_PRIME=1!）。
```

运行时在命令前加上对应环境变量即可。

### NVIDIA 显卡

NVIDIA 驱动程序的 README 中说明：

```plaintext
配置图形应用程序使用 GPU 屏幕进行渲染
要将图形应用程序配置为使用 NVIDIA GPU 屏幕进行渲染，请将环境变量 __NV_PRIME_RENDER_OFFLOAD 设置为 1。如果图形应用程序使用 Vulkan 或 EGL，这就足够了。如果图形应用程序使用 GLX，还需要将环境变量 __GLX_VENDOR_LIBRARY_NAME 设置为 nvidia，这样 GLVND 就会加载 NVIDIA 的 GLX 驱动程序。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 vkcube
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxinfo | grep vendor

Vulkan 的更精细控制
环境变量 __NV_PRIME_RENDER_OFFLOAD 会导致加载特殊的 Vulkan 层 VK_LAYER_NV_optimus。Vulkan 应用程序使用 Vulkan API 枚举系统中的 GPU 并选择使用哪个 GPU；大多数 Vulkan 应用程序会使用 Vulkan 报告的第一个 GPU。更新的 Vulkan 加载器可以根据平台定义的标准对 GPU 枚举进行排序，将首选 GPU 放在最前面。VK_LAYER_NV_optimus 层会导致 GPU 按顺序排列，如果加载器没有自行排序，则 NVIDIA GPU 会优先枚举。为了更精细的控制，VK_LAYER_NV_optimus 层会查看环境变量 __VK_LAYER_NV_optimus。值 NVIDIA_only 会让 VK_LAYER_NV_optimus 始终将 GPU 排序，使 NVIDIA GPU 在 Vulkan 应用程序中优先枚举，覆盖任何 Vulkan 加载器的排序。值 non_NVIDIA_only 会让 VK_LAYER_NV_optimus 始终将 GPU 排序，使非 NVIDIA GPU 在 Vulkan 应用程序中优先枚举，同样覆盖加载器的排序。注意，VK_LAYER_NV_optimus 层只影响独立和集成 GPU 的排序，不会影响 CPU 设备。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only vkcube
__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=non_NVIDIA_only vkcube

OpenGL 的更精细控制
对于使用 GLX 或 EGL 的 OpenGL，环境变量 __NV_PRIME_RENDER_OFFLOAD_PROVIDER 可提供更精细的控制。虽然 __NV_PRIME_RENDER_OFFLOAD=1 告诉 GLX 或 EGL 使用第一个 NVIDIA GPU 屏幕，__NV_PRIME_RENDER_OFFLOAD_PROVIDER 可以使用 RandR 提供程序的名称来选择特定的 NVIDIA GPU 屏幕，使用 `xrandr --listproviders` 报告的 NVIDIA GPU 屏幕名称。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
__NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
__NV_PRIME_RENDER_OFFLOAD=1 eglinfo
__NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 eglinfo
```

### 参考资料

- [NVIDIA driver index](https://download.nvidia.com/XFree86/)
- [Arch Linux Wiki](https://wiki.archlinux.org.cn/title/PRIME)
- [Mesa 3D Environment Variables](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME)

## 常见问题及解决

### SDDM 在 NVIDIA 驱动下开机黑屏

这是 SDDM 的常见问题。可以更换显示管理器，或从 tty 登录后手动执行 `startplasma-wayland` 进入桌面。

### 无线网卡经常卡顿

先用 `lspci` 确认网卡型号。以 Realtek RTL8852 系列为例，`rtw89` 驱动已经进入主线内核，较新的内核通常无需额外安装；如果内核较旧，可以升级内核或安装对应驱动。

## 小结

桌面环境、驱动和显卡配置往往相互牵连：先确认驱动正常，再排查显示管理器和桌面会话。输入法见下一章[《开发 fcitx5 主题》](/notes/linux/fcitx5-theme)。
