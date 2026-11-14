# Linux 入门笔记

记录发行版选择、安装分区、系统目录和命令行的基础内容。

## 发行版

Linux 只是内核；发行版 = 内核 + 工具 + 软件包。参考 [Linux.org](https://linux.org)。

| 发行版 | 特点 | 包管理 |
| --- | --- | --- |
| [Debian](https://www.debian.org/) | 稳定，软件版本偏旧；服务器、桌面都常用 | `apt` / `.deb` |
| [Ubuntu](https://ubuntu.com/) | 基于 Debian，定制 GNOME，新手友好；桌面版偏重 | `apt` / `.deb` |
| [Fedora](https://fedoraproject.org/) | Red Hat 上游，软件新，默认 GNOME；更新节奏快 | `dnf` / `.rpm` |
| [Arch Linux](https://www.archlinux.org/) | x86-64，滚动更新，初始系统很精简 | `pacman` / AUR |
| [Linux Mint](https://www.linuxmint.com/) | 基于 Ubuntu，Cinnamon，操作接近 Windows | `apt` / `.deb` |
| [Gentoo](https://www.gentoo.org/) | 源码编译为主，USE Flag 定制功能 | `emerge` |

选择参考：

- 开箱即用：Ubuntu、Linux Mint
- 新软件 + 相对稳定：Fedora
- 滚动更新、愿意自己配置：Arch
- 长期稳定：Debian
- 想按需编译、深度定制：Gentoo

## 安装

### 分区

常见分区：

| 分区 | 作用 | 类型 | 备注 |
| --- | --- | --- | --- |
| `/` | 根目录 | ext4 | 30 GB 以上 |
| `/boot` | 引导文件 | EFI FAT32 | 约 1 GB |
| `/home` | 用户数据 | ext4 | 可选，30 GB 以上 |
| `swap` | 交换分区 | swap | 可选 |

- `/home` 单独分区：重装系统时可保留用户数据。
- 图形化安装器按向导分区即可；手动安装需在 Live 环境中分区。

### 手动分区与格式化

查看磁盘：

```bash
lsblk
```

示例输出：

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda           8:0    0 953.9G  0 disk
├─sda1        8:1    0 256.0G  0 part
└─sda2        8:2    0 687.9G  0 part
nvme0n1     259:0    0 953.9G  0 disk
├─nvme0n1p1 259:1    0   0.9G  0 part
├─nvme0n1p2 259:2    0 256.0G  0 part
└─nvme0n1p3 259:4    0 697.0G  0 part
```

分区：

```bash
sudo cfdisk /dev/sda
```

分区后输出类似：

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda           8:0    0 953.9G  0 disk
├─sda1        8:1    0  14.9G  0 part [SWAP]
├─sda2        8:2    0   250G  0 part /
├─sda3        8:3    0     1G  0 part /boot/efi
└─sda4        8:4    0 687.9G  0 part /home
```

格式化：

```bash
sudo mkfs.ext4 /dev/sda2          # ext4
sudo mkfs.fat -F 32 /dev/sda3     # EFI
sudo mkswap /dev/sda1             # swap
```

### 网络

最小安装的系统可能没有网络管理工具。以 Arch 为例：

```bash
sudo pacman -S networkmanager
sudo systemctl enable --now NetworkManager
```

### 桌面环境

最小安装不带桌面。常见选择：GNOME、KDE Plasma、Xfce、MATE、LXDE；也可以只装 Hyprland 等窗口管理器。

桌面环境的选择和显示管理器见[桌面环境、驱动与显卡](/notes/linux/desktop-and-gpu)。

Ubuntu：

```bash
sudo apt install ubuntu-desktop   # Ubuntu 定制版
# 或
sudo apt install gnome            # 原生 GNOME

sudo apt install kubuntu-desktop      # Ubuntu KDE 定制版
# 或
sudo apt install kde-plasma-desktop   # 原生 KDE Plasma
```

Arch：

```bash
sudo pacman -S gnome gdm
sudo systemctl enable --now gdm

sudo pacman -S plasma sddm
sudo systemctl enable --now sddm
```

## 系统结构

### 内核

Linux 内核负责硬件、内存、进程和文件系统。内核本身不是完整操作系统；发行版在内核上打包工具、库和桌面环境。

不同发行版的命令行逻辑相近，差异主要在包管理器、默认软件和更新策略。

### 目录

| 目录 | 用途 |
| --- | --- |
| `/` | 根文件系统，所有挂载点和路径的起点 |
| `bin` | 单用户模式下的基础命令 |
| `boot` | 内核、initramfs、引导配置 |
| `dev` | 设备节点 |
| `etc` | 系统和服务的配置 |
| `home` | 普通用户主目录 |
| `lib` / `lib64` | 启动核心库、动态链接器 |
| `mnt` | 临时挂载点 |
| `opt` | 可选附加软件 |
| `proc` | 内核提供的进程/系统信息 |
| `root` | root 用户主目录 |
| `run` | 运行时数据，重启清空 |
| `sbin` | 系统管理命令，主要面向 root |
| `srv` | 服务数据 |
| `sys` | 内核设备、驱动、系统信息 |
| `tmp` | 临时文件，重启通常清空 |
| `usr` | 用户级程序、库、文档 |
| `var` | 日志、缓存、数据库等频繁变化的数据 |

### 路径

- 绝对路径：从 `/` 开始，如 `/home/fovlin/file`。
- 相对路径：从当前目录开始；`.` 当前目录，`..` 上级目录，`~` 用户家目录。
- 当前目录下的程序必须写 `./name`，否则 shell 会去 `$PATH` 里找命令。

### 环境变量

环境变量是程序启动时读取的键值对；Shell 中用 `$变量名` 引用。

```bash
env                              # 查看所有环境变量
export PATH=$PATH:/opt/java/bin  # 临时追加 PATH
```

永久生效：把 `export` 行写入 `~/.bashrc` 或 `~/.bash_profile`。

```bash
echo 'export PATH=$PATH:/opt/java/bin' >> ~/.bashrc
source ~/.bashrc
```

## 命令行

### 进入终端

- 无桌面：开机进入 `tty`，`Ctrl + F1` 到 `Ctrl + F6` 切换 `tty1`～`tty6`。
- 有桌面：应用菜单里的“终端”是终端模拟器，用法与 tty 基本一致。
- 桌面卡死时，可切到 tty 登录排错。
- tty 登录时密码不回显，属正常现象。

### Shell

常见 Shell：`bash`、`zsh`、`fish`、`sh`。`bash` 兼容性最好，绝大多数发行版默认预装。

```bash
chsh -s /bin/bash   # 修改当前用户默认 shell
```

### 工作目录

```bash
pwd                        # 当前目录
cd /home/fovlin/Documents  # 绝对路径
cd dir                     # 相对路径，等价于 cd ./dir
```

### $PATH

`$PATH` 是用 `:` 分隔的目录列表：

```txt
/usr/local/sbin:/usr/local/bin:/usr/bin
```

输入命令时，Shell 按从左到右的顺序查找；左侧优先。

### 运行程序

```bash
/usr/local/nginx/sbin/nginx   # 绝对路径
./code                        # 当前目录下的程序
```

提示权限不足时：

```bash
chmod +x ./code
```

### 补全、管道、手册

- `Tab`：补全命令或路径；连按两次列出候选。
- `|`：把前一个命令的输出交给后一个命令。

```bash
ls -lah | grep file
```

- `man <命令>`：查看手册；`<命令> --help`：查看简要帮助。

## 相关

- 命令细节：[Linux 命令行基础](/notes/linux/command-line)
- 系统配置：[Linux 系统配置](/notes/linux/system-config)
