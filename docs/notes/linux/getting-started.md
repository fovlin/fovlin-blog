# Linux 入门：从选择发行版到命令行

这一章从零开始：先选一个适合自己的发行版，再了解安装时的分区、网络和桌面环境，最后认识 Linux 的目录结构与命令行。读完之后，你应该能独立完成一次安装，并在终端里开始工作。

## 选择发行版

参考：[Linux.org](https://linux.org)。

Linux 只是一个内核，发行版把内核、工具和软件包组合成一套完整的操作系统。这一节介绍几个常见发行版的特点，帮助你做出选择；没有绝对“最好”的发行版，只有更适合你的那一个。

### Debian

官网：[debian.org](https://www.debian.org/)

Debian 是一个开源的 Linux 发行版，由 Debian GNU/Linux 社区开发，追求极致的系统稳定性，被广泛应用于服务器、桌面、移动设备等。

Debian 非常简洁，其镜像文件仅提供基本的操作系统，在安装过程中，你可以勾选一些预装的软件包，在安装时会自动安装这些软件包，如 GNOME、KDE Plasma、Xfce、OpenSSH Server 等。

Debian 使用 apt 包管理器来管理软件包，对应的软件包格式为 `.deb`，软件包生态非常丰富，各大软件也提供了 `.deb` 格式的安装包。

但 Debian 由于过于追求稳定性，软件包版本较为陈旧，即便如此，Debian 仍然被广泛使用。

### Ubuntu

官网：[ubuntu.com](https://ubuntu.com/)

Ubuntu 是一个开源的 Linux 发行版，基于 Debian，由 Canonical 公司开发，Ubuntu 的普通版免费，但 PRO 版本是付费的。

Ubuntu 默认使用经过深度定制的 GNOME 桌面环境，同时也提供预装 KDE、Xfce、LXDE 等桌面环境的风味版。

Ubuntu 对新手很友好，从安装到日常配置基本都有图形化界面；代价是桌面版相对笨重，追求轻量的用户可能更倾向其他发行版。

### Fedora

官网：[fedoraproject.org](https://fedoraproject.org/)

Fedora 是由 Red Hat 开发的 Linux 发行版，是红帽企业 Linux 的上游试验田，即便如此，Fedora 仍然很稳定，在非常新的软件包环境下，稳定性不逊于 Ubuntu。

Fedora 的软件包版本较新，默认搭配原生 GNOME 桌面，也提供其他桌面版本。它的更新节奏较快，适合想体验新版本软件、又希望系统保持稳定的用户。

Fedora 默认使用 dnf 包管理器，且有着丰富的第三方软件仓库，如 `RPM Fusion` 仓库，软件包生态丰富。

### Arch Linux

官网：[archlinux.org](https://www.archlinux.org/)

Arch Linux 是一个面向 x86-64 的通用 GNU/Linux 发行版。

Arch Linux 采用滚动升级模式，尽全力为用户提供最新的稳定版软件。初始安装完成的 Arch Linux 只是一个基本系统，随后用户可以根据自己的喜好安装需要的软件并配置成符合自己理想的个性化系统。

Arch Linux 默认使用 pacman 包管理器，同时有着庞大的 AUR 用户仓库，由用户自己上传软件包供其他用户使用。

### Linux Mint

官网：[linuxmint.com](https://www.linuxmint.com/)

Linux Mint 是一个基于 Ubuntu 的发行版，默认使用 Cinnamon 桌面环境，操作逻辑与 Windows 比较接近，对新手友好。

### Gentoo

官网：[gentoo.org](https://www.gentoo.org/)

Gentoo 是一个以源码编译为核心的发行版。虽然现在也提供了大量二进制包，但仍有不少软件需要自行编译；USE Flag 是它最重要的特性，可以让你只编译需要的功能。

如果不想折腾，优先考虑 Ubuntu 或 Linux Mint；想要较新的软件又希望稳定，可以选 Fedora；愿意自己动手、追求滚动更新，可以选 Arch；需要长期稳定运行，Debian 是稳妥的选择。

## 安装 Linux 注意事项

### 磁盘分区与挂载

磁盘分区和挂载会直接影响 Linux 系统的使用体验；所有磁盘设备都位于 `/dev` 目录下。

#### 分区

安装时通常需要以下分区：

| 分区 | 描述 | 分区类型 |
| --- | --- | --- |
| / | 系统根目录 | ext4 文件系统 |
| /boot | 引导分区 | EFI 系统分区（FAT32） |
| /home | 用户数据目录 | ext4 文件系统 |
| swap | 交换分区 | swap 分区 |

`/` 是系统根目录，`/boot` 存放引导文件，`/home` 存放用户数据；其中 `swap` 和 `/home` 是可选的。

`/home` 分区可以将用户数据和系统数据分开存储，这样当系统空间不足时，用户数据不会被系统数据所覆盖。

同时在重装或更换其他 Linux 系统时，可以保留用户数据，避免数据丢失。

#### 推荐大小

| 分区 | 推荐大小 |
| --- | --- |
| / | 30 GB 以上 |
| /boot | 1 GB |
| /home | 30 GB 以上 |

在安装时，请根据实际情况选择分区，并确保分区大小正确。

Ubuntu 等发行版提供图形化安装器，按向导分区即可；手动安装的发行版则需要在 Live 环境中自行分区。

#### 手动分区与格式化

手动安装时，需要先在 Live 环境中完成分区。

使用 `lsblk` 命令查看硬盘及其分区信息。

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

假设我们要在 sda 硬盘上安装系统，使用 `cfdisk` 命令进行分区。

```bash
sudo cfdisk /dev/sda
```

分区完成后，`lsblk` 的输出应类似下面这样：

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda           8:0    0 953.9G  0 disk
├─sda1        8:1    0  14.9G  0 part [SWAP]    #可选但推荐
├─sda2        8:2    0   250G  0 part /
├─sda3        8:3    0     1G  0 part /boot/efi
└─sda4        8:4    0 687.9G  0 part /home     #可选但推荐
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0   0.9G  0 part
├─nvme0n1p2 259:2    0 256.0G  0 part
└─nvme0n1p3 259:4    0 697.0G  0 part
```

分区完成后，还要把分区格式化成对应的文件系统。

格式化为 ext4：

```bash
sudo mkfs.ext4 /dev/<分区路径>
```

格式化为 FAT32：

```bash
sudo mkfs.fat -F 32 /dev/<分区路径>
```

创建 swap：

```bash
sudo mkswap /dev/<分区路径>
```

### 管理网络

对于一些需要手动安装的系统，如 Arch Linux 系统，需要手动安装以下软件来管理网络。

**NetworkManager** 是 Linux 系统中的网络管理软件，用于管理网络连接。

在 Arch Linux 系统中，可以使用以下命令安装 NetworkManager：

```bash
sudo pacman -S networkmanager
sudo systemctl enable --now NetworkManager
```

### 安装桌面环境

最小安装的发行版不会自带桌面。常见的桌面环境有 GNOME、KDE Plasma、Xfce、MATE、LXDE 等；也可以只安装 Hyprland 这类窗口管理器，再自行组合图形界面。

桌面环境的选择与显示管理器见[《桌面环境、驱动与显卡》](/notes/linux/desktop-and-gpu)一章。下面只给出 Ubuntu 和 Arch 上最常见的安装命令。

#### GNOME

Ubuntu 提供两个相关包：`ubuntu-desktop` 是 Ubuntu 定制版，`gnome` 更接近原生 GNOME，二选一即可。

```bash
sudo apt install ubuntu-desktop   # Ubuntu 定制版
sudo apt install gnome            # 原生 GNOME
```

Arch Linux 安装 GNOME 和 GDM：

```bash
sudo pacman -S gnome gdm
sudo systemctl enable --now gdm
```

#### KDE Plasma

KDE 对应 `kubuntu-desktop`（Ubuntu 定制版）和 `kde-plasma-desktop`（较原生的 KDE）。

```bash
sudo apt install kubuntu-desktop      # Ubuntu 定制版
sudo apt install kde-plasma-desktop   # 原生 KDE Plasma
```

Arch Linux 安装 KDE Plasma 和 SDDM：

```bash
sudo pacman -S plasma sddm
sudo systemctl enable --now sddm
```

## 了解 Linux 系统

### Linux 内核

Linux 内核（Linux Kernel）是系统的核心，负责管理硬件、内存、进程和文件系统。内核本身还不是一套完整可用的操作系统；发行版在内核之上打包了命令行工具、库和桌面环境，才形成我们看到的 Linux 系统。

不同发行版共享相似的内核和命令行逻辑，差别主要在包管理器、默认软件和更新策略。

### 系统文件目录结构

一个 Linux 系统的文件系统由一个根目录 `/` 以及此目录下的所有文件与目录构成，根目录下的文件与目录有着如下结构：

| 目录 | 用途 |
| --- | --- |
| `/` | 根文件系统，所有挂载点与路径的起点 |
| `bin` | 系统启动和单用户模式下必须的基础命令，所有用户可执行 |
| `boot` | 启动所需文件：内核、initramfs、引导配置 |
| `dev` | 设备节点集合，一切皆文件 |
| `etc` | 系统级配置中心，统一存放服务和系统配置 |
| `home` | 普通用户的个人主目录集合 |
| `lib` / `lib64` | 系统启动核心库与动态链接器所在位置 |
| `mnt` | 供磁盘设备挂载的目录 |
| `opt` | 可选附加应用程序，每个软件使用独立子目录 |
| `proc` | 内核提供的虚拟文件系统，展示系统与进程的实时信息 |
| `root` | `root` 用户的家目录 |
| `run` | 运行时数据存放点，重启后清空 |
| `sbin` | 系统管理与维护命令，主要面向 root |
| `srv` | 服务器提供的服务数据 |
| `sys` | sysfs 文件系统，展示内核设备、驱动及系统信息 |
| `tmp` | 临时文件目录，任何用户可写，重启后通常清空 |
| `usr` | 用户级程序与库的主集合，包含大部分系统软件、文档与工具 |
| `var` | 频繁变化的数据：日志、缓存、数据库运行文件等 |

### 路径

路径用来定位文件或目录，分为绝对路径和相对路径。

绝对路径从根目录 `/` 开始，例如 `/home/fovlin/file`。

相对路径从当前目录开始：`.` 表示当前目录，`..` 表示上级目录，`~` 表示用户家目录。例如 `./file` 表示当前目录下的 `file`。

在命令首项写可执行文件时，当前目录下的程序必须写成 `./name`，否则 shell 会把它当作命令名去 `$PATH` 中查找。

### 环境变量

环境变量是操作系统保存的一组键值对，程序启动时会读取它们来调整行为。在 Shell 中用 `$变量名` 引用变量，例如 `$PATH`。

查看当前所有环境变量：

```bash
env
```

可以用 `export` 临时设置变量，例如把 `/opt/java/bin` 加到 `$PATH` 末尾：

```bash
export PATH=$PATH:/opt/java/bin
```

这种设置只对当前会话有效。要永久生效，把同样的 `export` 行写进 Shell 的配置文件。以 bash 为例，可以编辑 `~/.bashrc` 或 `~/.bash_profile`：

```bash
echo 'export PATH=$PATH:/opt/java/bin' >> ~/.bashrc
source ~/.bashrc
```

> `$PATH` 的查找顺序会在下一节详细说明；文本编辑器的用法见下一章《Linux 命令行基础》。

## 认识命令行

> 命令行是 Linux 的精髓。服务器通常不会预装图形界面，因此即使你打算使用桌面环境，也值得先掌握命令行。

### 进入命令行

没有安装桌面环境时，开机后通常会进入 `tty` 文本终端。按 `Ctrl + F1` 到 `Ctrl + F6` 可以在 `tty1` 到 `tty6` 之间切换，这些会话彼此独立，可以同时运行不同任务。

装了桌面环境后，也可以在应用菜单里打开“终端”。它其实是桌面中的终端模拟器，但用法和真正的 tty 基本一致。

如果桌面卡死，仍然可以按 `Ctrl + F1` 切到 tty 登录，排查问题。

在 tty 中需要先输入用户名和密码。输入密码时屏幕不会显示任何字符，这是正常的安全设计，不是键盘故障。

### Shell

用户在终端输入的命令会由 shell 解释并交给系统执行。常见的 shell 有 `bash`、`zsh`、`fish`、`sh`，其中 `bash` 兼容性好，被绝大多数发行版预装。

安装其他 shell 后，直接输入 `zsh`、`fish` 等名称就能临时切换。要更改当前用户的默认 shell，使用 `chsh -s`，后面接 shell 的绝对路径，例如：

```bash
chsh -s /bin/bash
```

### 工作目录

工作目录就是当前所在的目录。很多命令默认以工作目录为基准，理解它能让路径操作简单很多。

登录终端后默认位于用户家目录，可以用 `pwd` 查看当前所在目录。

```bash
pwd
```

一个示例输出如下，表示你当前处于 `/home/fovlin` 目录下。

```log
/home/fovlin
```

`cd` 用于切换工作目录，参数可以是绝对路径，也可以是相对路径。例如进入 `/home/fovlin/Documents`：

```bash
cd /home/fovlin/Documents
```

### $PATH 变量

`$PATH` 是用 `:` 分隔的目录列表。系统至少会包含类似下面的路径：

```log
/usr/local/sbin:/usr/local/bin:/usr/bin
```

输入命令并回车时，shell 会按从左到右的顺序查询 `$PATH` 中的每个目录，左侧优先级更高；找到同名可执行文件后直接调用。命令后以空格分隔的内容会作为参数传给这个程序。

### 运行可执行程序

直接输入命令名时，shell 会去 `$PATH` 中查找。要运行不在 `$PATH` 中的程序，可以使用绝对路径或相对路径。

要运行不在 `$PATH` 中的程序，可以写绝对路径。例如：

```bash
/usr/local/nginx/sbin/nginx
```

当前目录下的程序则用 `./` 开头：

```bash
./code
```

> 如果提示权限不足，用 `chmod +x <文件名>` 添加可执行权限。

如果参数是当前目录下的路径，也可以直接写相对路径。例如进入当前目录下的 `dir`：

```bash
cd dir
```

它等效于 `cd ./dir`。

### 自动补全

命令或路径写到一半时按 `Tab`，shell 会自动补全；如果有多个候选项，连续按两次 `Tab` 会全部列出。这是提高命令行效率最直接的习惯之一。

### 管道

管道符 `|` 把前一个命令的输出交给后一个命令处理。例如用 `ls` 列出目录内容，再用 `grep` 筛选包含 `file` 的行：

```bash
ls -lah | grep file
```

### man 手册

忘记命令用法时，可以用 `man <命令名>` 查看手册，或加 `--help` 查看简要帮助。

例如查询 `ls` 命令的用法：

```bash
man ls
```

或：

```bash
ls --help
```

## 小结

到这里，你已经完成了从选择发行版到进入命令行的第一步。下一章会集中练习文件管理、输入输出重定向和进程管理这些最常用的命令。
