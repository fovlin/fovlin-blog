# 安装与管理软件

通常来说，软件包的安装都是借助系统的包管理工具，除此之外，在应用官网寻找安装包也是不错的选择。

一些官方还会提供可自行编译安装的源代码，以及与系统隔离的可运行文件。

## 包管理器安装

包管理器是发行版自带的管理软件包的工具，例如 Ubuntu 和 `Dibian` 使用 `apt` 和 `dpkg` 包管理器，Fedora 使用 `dnf` 以及 `rpm` 包管理器。 

要了解包管理器的用法，建议参阅对应发行版的官网文档。

同时也存在第三方的软件包管理器，如 `flatpak`。

## 安装软件包

某些软件包无法通过包管理器安装，此时需要手动安装。

前往软件包官网下载安装包，这可能为 `.deb`、`.rpm`、`.tar.gz` 等格式，其中`.deb` 格式为 Debian/Ubuntu 系统，`.rpm` 格式为 Fedora 系统，`.tar.gz` 格式解压后通常为源码或独立运行程序。

### 对于 `.deb` `.rpm` 格式安装包

- `.deb` 格式在 Debian/Ubuntu 系统中安装，使用 `dpkg -i` 命令。

```bash
sudo dpkg -i package.deb
```

- `.rpm` 格式在 Fedora 系统中安装，使用 `rpm -ivh` 命令。

```bash
sudo rpm -ivh package.rpm
```

### 对于 tar.gz 文件 

#### 通过源码编译安装

此类文件可分为源码、预编译的二进制包、独立的可运行程序几类，这些程序通常跨发行版可用。

源码可通过编译安装，请在编译前安装编译工具链。

随后解压 `tar.gz` 文件，进入目录，源码应当存在 `configure` 文件，此文件用于配置编译参数，运行此文件并在后附加编译参数，参数因软件而异。

```bash
./configure
```

随后编译并安装

```bash
make && make install
```


#### 通过预编译二进制文件安装

此类文件解压后通常会有 `bin` 目录存放应用程序文件，一般来说直接运行此文件夹内的可运行程序即可。

#### 独立应用程序

为打包好的应用程序，通常为 `AppImage` 格式，直接运行此文件即可使用。

### 使应用程序全局可用

当我们在控制台输入命令时，系统会扫描包含在 `PATH` 变量目录下的文件，使用 `echo $PATH` 即可查看所有包含在此变量下的目录。

```bash
echo $PATH
```

例如出现以下输出：

```bash
fovlin@archlinux:~$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/sbin
```

表示运行命令时会扫描 `/usr/local/bin` 、 `/usr/bin` 、 `/bin` 、 `/usr/local/sbin` 这几个路径下的文件，寻找可运行程序，即在安装应用程序时可以将可运行程序所在的文件夹添加到 `$PATH` 中，或创建软链接到任意一个在 `$PATH` 路径下的文件夹，如将 `/home/fovlin/opt/vscode/bin/code` 全局可用。

既可以添加 `/home/fovlin/opt/vscode/bin/` 到 `PATH`：

```bash
echo export PATH=/home/fovlin/opt/vscode/bin/:$PATH >> /etc/profile
```

> 也可以将将 `/etc/profile` 改为 `~/.profile` 以此仅对用户生效。

也可以将 `/home/fovlin/opt/vscode/bin/code` 创建软链接到 `$PATH` 目录下：

创建到 `/usr/local/bin` 为例（推荐）

```bash
ln -s /home/fovlin/opt/vscode/bin/code /usr/local/bin/code
```

如需添加应用到 Applications list，需要创建 `.desktop` 文件，并保存在 `/usr/share/applications` 或 `~/.local/share/applications` 目录下，前者为系统级应用，后者为用户级应用。

例如创建 `idea.desktop` 文件，并保存在 `/usr/share/applications` 目录下：

```txt
[Desktop Entry]
Type=Application
Exec=/opt/idea/bin/idea.sh
Icon=/opt/idea/bin/idea.png
Name=IDEA
```

- Exec 为可执行文件的绝对路径，其后的参数本质为运行该应用时执行的命令。

- Icon 为图标文件的绝对路径。

- Name 为应用名称。

添加完成后，在应用程序栏中就可以看到该应用了。