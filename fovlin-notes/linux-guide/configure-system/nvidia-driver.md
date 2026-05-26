# 安装 Nvidia 驱动

对于不同的 Linux 发行版，安装方式略不相同。

## Ubuntu

**方法一：下载官方仓库开源驱动**

在附加驱动应用程序中直接下载，或者使用 ubuntu-driver autoinstall 命令进行安装。

**方法二：安装 NVIDIA 官方闭源驱动**

前往 Nvidia 官网下载对应的驱动安装文件，通常为 `.run` 文件，赋予权限并以 root 身份运行此文件。

在开始运行之前，首先安装必要的软件包。

- 内核头文件

此包在仓库内的名称为 `linux-headers-你的内核版本`，若未安装此包直接运行驱动安装程序，会返回 `无法发现内核源文件` 的报错。

使用 `uname -r` 命令可以查询内核版本号，同时我们可以使用 `$(command)` 的方式将输出转换为字符串，故安装内核头文件可以使用以下方法：

```bash
sudo apt install linux-headers-$(uname -r)
```

- gcc 编译器

安装 gcc，但更推荐安装编译包集合：`build-essential`

```bash
sudo apt install gcc # build-essential
```

随后赋予安装程序权限，运行安装程序。

```bash
chmod 711 NVIDIA-Linux-x86_64-580.142.run
```

```bash
sudo ./NVIDIA-Linux-x86_64-580.142.run
```

## Fedora

**方法一：安装官方 rpm 仓库内驱动**

参考：[Fedodra 官方文档](https://docs.fedoraproject.org/en-US/gaming/drivers/)

启用 rpm 仓库：

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
```

安装 nvidia 驱动：

```bash
sudo dnf install akmod-nvidia -y
```

随后使用 `reboot` 重启系统即可。

**方法二：安装 NVIDIA 官方闭源驱动**

前往 Nvidia 官网下载对应的驱动安装文件，通常为 `.run` 文件，赋予权限并以 root 身份运行此文件。

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
chmod 711 NVIDIA-Linux-x86_64-580.142.run
```

```bash
sudo ./NVIDIA-Linux-x86_64-580.142.run
```

运行完成后，重启系统。

## Arch Linux

官方仓库提供 `nvidia-open`、`nvidia-open-dkms`包，推荐使用后者，dkms 会在内核更新后自动触发重新编译以适应新内核