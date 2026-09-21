# 选择适用于你的 Linux 发行版

参考：[Linux.org](https://linux.org)

Linux 只是一个内核，而 Linux 发行版将内核与其他软件包进行组合，从而创建一个完整的操作系统。

在文中，将介绍如何选择适用于你的 Linux 发行版。

## [Debian](https://www.debian.org/)

Debian 是一个开源的 Linux 发行版，由 Debian GNU/Linux 社区开发，追求极致的系统稳定性，被广泛应用于服务器、桌面、移动设备等。

Debian 非常简洁，其镜像文件仅提供基本的操作系统，在安装过程中，你可以勾选一些预装的软件包，在安装时会自动安装这些软件包，如 Gnome、KDE Plasma、Xfce、OpenSSH Server 等。

Debian 使用 apt 包管理器来管理软件包，对应的软件包格式为 `.deb`，软件包生态非常丰富，各大软件也提供了 `.deb` 格式的安装包。

但 Debian 由于过于追求稳定性，软件包版本较为陈旧，即便如此，Debian 仍然被广泛使用。

## [Ubuntu](https://ubuntu.com/)

Ubuntu 是一个开源的 Linux 发行版，基于 Debian，由 Canonical 公司开发，Ubuntu 的普通版免费，但 PRO 版本是付费的。

Ubuntu 默认安装的经过高度修改的 Gnome 桌面环境，是 Ubuntu 最常用的桌面环境，同时也提供了预装 KDE、Xfce、LXDE 桌面环境的风味版。

Ubuntu 是对新手最友好的发行版之一，基本提供了从安装到配置的全图形化界面，是最适合新手的发行版之一。

但 Ubuntu 桌面版较为笨重，对于一些追求性能的用户来说，Ubuntu 桌面版可能并不是最合适的选择。

## [Fedora](https://fedoraproject.org/)

Fedora 是由 Red Hat 开发的 Linux 发行版，是红帽企业 Linux 的上游试验田，即便如此，Fedora 仍然很稳定，在非常新的软件包环境下，稳定性不逊于 Ubuntu。

Fedora 软件包源版本较新，搭配原生的 Gnome 桌面，同时也提供搭载其他桌面的版本，更新较为激进，因此 Fedora 非常适合一些想要体验新版本软件的用户。

Fedora 默认使用 dnf 包管理器，且有着丰富的第三方软件仓库，如 `RPM Fusion` 仓库，软件包生态丰富。

## [Arch](https://www.archlinux.org/)

Arch Linux 是一种通用操作系统，基于 x86-64 架构的一类 GNU/Linux 发行版。

Arch Linux 采用滚动升级模式，尽全力为用户提供最新的稳定版软件。初始安装完成的 Arch Linux 只是一个基本系统，随后用户可以根据自己的喜好安装需要的软件并配置成符合自己理想的个性化系统。

Arch Linux 默认使用 pacman 包管理器，同时有着庞大的 AUR 用户仓库，由用户自己上传软件包供其他用户使用。

## [Mint](https://www.linuxmint.com/)

Mint 是一个基于 Ubuntu 开发的新手用户友好发行版，默认搭配的是 KDE 桌面环境，是公认的对新手友好的发行版之一，与 Windows 操作逻辑相近。

## [Gentoo](https://www.gentoo.org/)

Gentoo Linux 是一个源代码发行版，其 GCC 版本虽已有许多二进制包，但仍有些包需要自行编译，USE Flag 是 Gentoo 最重要的特性，它会让用户编译自己想要的功能进软件。

LLVM 版本仍在实验阶段，虽可用但需解决的问题较多。