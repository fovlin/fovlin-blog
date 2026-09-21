# 安装 Linux 注意事项


## 关于硬盘挂载

硬盘挂载将直接影响 Linux 系统的使用体验，所有的硬盘都位于 `/dev` 目录下。

### 分区

在安装时，对硬盘进行分区，Linux 系统下共需要以下分区：

| 分区 | 描述 | 分区类型 |
| --- | --- | --- |
| / | 系统根目录 | ext4 文件系统 |
| /boot | 引导分区 | EFI 系统分区(FAT32) |
| /home | 用户数据目录 | ext4 文件系统 |
| swap | 交换分区 | swap 分区 |

其中 `/` 分区为系统根目录，`/boot` 分区为引导分区，`/home` 分区为用户数据目录，`swap` 分区为交换分区，其中 `swap` 和 `/home` 分区是可选的。

`/home` 分区可以将用户数据和系统数据分开存储，这样当系统空间不足时，用户数据不会被系统数据所覆盖。

同时在重装或更换其他 Linux 系统时，可以保留用户数据，避免数据丢失。

### 推荐大小

| 分区 | 推荐大小 |
| --- | --- |
| / | 30G以上 |
| /boot | 1G |
| /home | 30G以上 |

在安装时，请根据实际情况选择分区，并确保分区大小正确。

对于 Ubuntu 以及大部分 Linux 系统，都会存在图形化安装界面，选择并分区即可。

而对于手动安装的 Linux 系统，需要自己手动进行分区。

### 手动分区并挂载

对于需要手动安装的 Linux 系统，需要自己手动在 Live 环境进行分区。

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
cfdisk /dev/sda
```

正确进行分区后至少有以下分区，如：

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda           8:0    0 953.9G  0 disk
├─nvme0n1p1 259:1    0  14.9G  0 part [SWAP]    #可选但推荐
├─nvme0n1p2 259:2    0   250G  0 part /
├─nvme0n1p3 259:3    0     1G  0 part /boot/efi
└─nvme0n1p4 259:4    0 687.9G  0 part /home     #可选但推荐
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0   0.9G  0 part
├─nvme0n1p2 259:2    0 256.0G  0 part
└─nvme0n1p3 259:4    0 697.0G  0 part
```

在手动挂载前需要保证其为正确的文件系统，若不是，需要手动格式化。

对于格式化为 ext4 文件系统，使用以下命令：

```txt
mkfs.ext4 /dev/<分区路径>
```

对于格式化为 FAT32 文件系统，使用以下命令： 

```txt
mkfs.fat -F 32 /dev/<分区路径>
```

对于格式化为 swap 分区，使用以下命令：

```txt
mkswap /dev/<分区路径>
```

## 管理网络

对于一些需要手动安装的系统，如 Arch Linux 系统，需要手动安装以下软件来管理网络。

**NetworkManager** 是 Linux 系统中的网络管理软件，用于管理网络连接。

在 Arch Linux 系统中，可以使用以下命令安装 NetworkManager：

```bash
pacman -S networkmanager
```

## 图形化界面

Linux 系统有很多不同的桌面环境，如 GNOME、KDE、Xfce、Mate、LXDE 等，这些桌面环境提供了完整的图形化体验，除此之外，你也可以安装窗口管理器来手动配置图形界面，如 Hyprland。

Ubuntu 系统默认安装经过配置的 GNOME 桌面环境，对于手动安装的系统，可以自行选择桌面环境。

如下列举常用的2个桌面环境，Gnome 和 KDE 的安装：

### Gnome

对于 Ubuntu 安装 Gnome 桌面环境，提供两种选择，分别是 ubuntu-desktop 和 gnome，前者是 Ubuntu 默认的桌面环境，即对 Gnome 的修改，后者是 Gnome 桌面环境。
可以使用以下命令安装：

- Ubuntu 默认的桌面环境：

```bash
sudo apt install ubuntu-desktop
```

- Gnome 桌面环境：

```bash
sudo apt install gnome
```

对于 Arch Linux 系统，可以使用以下命令安装：

```bash
pacman -S gnome gdm
```

选择两者任意一个安装后，启动 gdm 显示管理器。

启动 gdm 显示管理器可以使用以下命令：

```bash
sudo systemctl enable --now gdm
```



### KDE

KDE 是一个开源的桌面环境，KDE 桌面环境提供了丰富的功能，如文件管理器、浏览器、音乐播放器、视频播放器、计算器、文字编辑器、图像处理工具、网络工具、系统工具等。

KDE 桌面环境同样分为两种，分别是 kubuntu-desktop 和 kde-plasma-desktop，前者是 Ubuntu 默认的桌面环境，后者是 KDE 桌面环境，安装可以使用以下命令：

- Ubuntu 默认的桌面环境：

```bash
sudo apt install kubuntu-desktop
```

- KDE 桌面环境：

```bash
sudo apt install kde-plasma-desktop
```

- Arch Linux 系统，可以使用以下命令安装：

```bash
pacman -S plasma sddm
```

选择两者任意一个安装后，启动 sddm 显示管理器。

启动 sddm 显示管理器可以使用以下命令：

```bash
sudo systemctl enable --now sddm
```