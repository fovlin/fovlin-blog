# 磁盘管理

`test`

虽然一些发行版会配备图形化的磁盘管理工具，但手动管理仍然是 Linux 的必学项之一。

本文汇总了如何去手动管理磁盘，进行分区，自动挂载。

Linux 下常用的分区工具有，命令行的 `fdisk` `parted` `cfdisk` 以及图形化的 `gparted`，本文对磁盘的操作以 `fdisk` 为例。


> **注意!**

> 本文涉及到的大量命令需要使用 root 权限，请以 root 身份执行下列命令。

> 本文涵盖的所有操作在操作不当的前提下，会导致数据丢失，请务必在虚拟机中练习！


## 磁盘分区

使用 `lsblk` 可以查看连接在此计算机上的磁盘设备:

```bash
lsblk
```

将产生以下类似输出

```log
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0  14.9G  0 part [SWAP]
├─nvme0n1p2 259:2    0   250G  0 part /
├─nvme0n1p3 259:3    0     1G  0 part /boot
└─nvme0n1p4 259:4    0 326.1G  0 part /home
```

所有的磁盘设备在 `/dev` 路径下，使用 `fdisk` 工具来操作此磁盘。

```bash
fdisk /dev/nvme0n1
```

这将会进入一个交互式的命令行模式，输入 `m` 将打印操作选项:

```txt
  GPT
   M   进入 保护/混合 MBR

  常规
   d   删除分区
   F   列出未分区的空闲区
   l   列出已知分区类型
   n   添加新分区
   p   打印分区表
   t   更改分区类型
   v   检查分区表
   i   打印某个分区的相关信息
   e   调整分区大小
   T   discard (trim) sectors

  杂项
   m   打印此菜单
   x   更多功能(仅限专业人员)

  脚本
   I   从 sfdisk 脚本文件加载磁盘布局
   O   将磁盘布局转储为 sfdisk 脚本文件

  保存并退出
   w   将分区表写入磁盘并退出
   q   退出而不保存更改

  新建空磁盘标签
   g   新建一份 GPT 分区表
   G   新建一份空 GPT (IRIX) 分区表
   o   新建一份的空 DOS（MBR）分区表
   s   新建一份空 Sun 分区表
```

例如要新建一个分区，用来存储一些文件，首先输入 `p` 打印当前的分区表:

```txt
命令(输入 m 获取帮助):p
Disk /dev/nvme0n1:953.87 GiB，1024209543168 字节，2000409264 个扇区
磁盘型号:WD PC SN560 SDDPNQE-1T00-1102           
单元:扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理):512 字节 / 512 字节
I/O 大小(最小/最佳):512 字节 / 512 字节
磁盘标签类型:gpt
磁盘标识符:197A8B74-97C4-47DB-AB74-9BC51952A01E

设备                起点       末尾      扇区   大小 类型
/dev/nvme0n1p1      2048   31252479  31250432  14.9G Linux swap
/dev/nvme0n1p2  33454080  557742079 524288000   250G Linux 文件系统
/dev/nvme0n1p3  31252480   33454079   2201600     1G EFI 系统
/dev/nvme0n1p4 557742080 1241565183 683823104 326.1G Linux 文件系统
```

输入 `F` 查看剩余空间:

```txt
命令(输入 m 获取帮助):F

未分区的空间 /dev/nvme0n1:361.85 GiB，388528152064 个字节，758844047 个扇区
单元:扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理):512 字节 / 512 字节

      起点       末尾      扇区   大小
1241565184 2000409230 758844047 361.8G
```

可见有较大的剩余空间，使用 `n` 创建一个新分区，分区号最好按每个分区的起点终点的顺序排列:

```txt
命令(输入 m 获取帮助):n
分区号 (5-128, 默认  5): 5
第一个扇区 (1241565184-2000409230, 默认 1241565184): 
最后一个扇区，+/-sectors 或 +size{K,M,G,T,P} (1241565184-2000409230, 默认 2000408575): 
```

填写大小时候，填写终点对应的数字，或填写一个尺寸的变化量，例如 `+128G` `+12800M` 等，若要将本扇区的全部空闲空间应用，直接填写本扇区的终点，或直接回车，因为默认为本扇区的终点:

```txt
命令(输入 m 获取帮助):n
分区号 (5-128, 默认  5): 5
第一个扇区 (1241565184-2000409230, 默认 1241565184): 
最后一个扇区，+/-sectors 或 +size{K,M,G,T,P} (1241565184-2000409230, 默认 2000408575): 

创建了一个新分区 5，类型为“Linux filesystem”，大小为 361.8 GiB。
分区 #5 包含一个 ext4 签名。

您想移除该签名吗？是[Y]/否[N]:Y

写入命令将移除该签名。
```

随后写入操作，输入 `w`:

```txt
命令(输入 m 获取帮助):w
分区表已调整。
正在同步磁盘。
```

再使用 `lablk` 查看本计算机上的磁盘设备，将发现出现了新的分区:

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0  14.9G  0 part [SWAP]
├─nvme0n1p2 259:2    0   250G  0 part /
├─nvme0n1p3 259:3    0     1G  0 part /boot
├─nvme0n1p4 259:4    0 326.1G  0 part /home
└─nvme0n1p5 259:5    0 361.8G  0 part <--新分区!
```

## 格式化分区

在挂载之前，确保分区的文件系统类型为受支持的文件系统，如 `ext4`，否则无法挂载。

查看分区的文件系统，有以下几种方法:

**使用 `lsblk -f` 查看所有分区文件系统:**

```txt
NAME        FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
nvme0n1                                                                            
├─nvme0n1p1 swap   1           8942c221-27c8-4f5c-ad86-d31afade6458                [SWAP]
├─nvme0n1p2 ext4   1.0         397e208d-b1d0-42db-9e69-cd094b41c132  215.7G     7% /
├─nvme0n1p3 vfat   FAT32       A9FE-938A                            1016.9M     5% /boot
├─nvme0n1p4 ext4   1.0         4917aab9-8e61-4fc9-a4f3-ec2bb0a4d094  286.9G     5% /home
└─nvme0n1p5
```

**使用 `parted -l` 查看分区文件系统:**

```txt
型号：WD PC SN560 SDDPNQE-1T00-1102 (nvme)
磁盘 /dev/nvme0n1：1024GB
扇区大小 (逻辑/物理)：512B/512B
分区表：gpt
磁盘标志：

编号   起始点   结束点   大小    文件系统         名称                  标志
 1    1049kB  16.0GB  16.0GB  linux-swap(v1)                        交换
 3    16.0GB  17.1GB  1127MB  fat32           EFI System Partition  启动, esp
 2    17.1GB  286GB   268GB   ext4
 4    286GB   636GB   350GB   ext4
 5    636GB   1024GB  389GB
```


对于新分区，需要先将其格式化才能挂载，假设将 `nvme0n1p5` 格式化为 `ext4` 文件系统。

```bash
mkfs.ext4 /dev/nvme0n1p5
```

至此成功格式化。

## 挂载磁盘

将现有的受支持的文件系统挂载到系统中，使用 `mount` 命令，假设有一块名为 `nvme0n1p5` 的 `ext4` 文件系统的分区，并挂载在 `/mnt` 目录，使用以下命令: 

```bash
mount --mkdir /dev/nvme0n1p5 /mnt
```

> `--mkdir` 参数可以在挂载点目录不存在时自动创建该目录。

> 挂载后，该文件夹内原文件将会被覆盖，但并不会被替换，因为该路径的存储方式只是更换了一个扇区，同理的，卸载后目录内原文件会恢复。

使用 `lsblk` 将会查找到该分区对应的挂载点。

要想开机自动挂载硬盘，需要依靠 `/etc/fstab` 文件，系统启动会读取该文件内的内容，并挂载写入该文件的文件系统。

示例文件如下：

```txt
# /dev/nvme0n1p3
UUID=fef38f12-8b93-4609-8d14-e2fb766504d7       /              ext4             rw,relatime     0 1

# /dev/nvme0n1p1
UUID=8B04-0289          /boot           vfat            rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro   0 2

# /dev/nvme0n1p4
UUID=915304a9-718d-4299-a443-c26d73cdfa16       /home          ext4             rw,relatime     0 2

# /dev/nvme0n1p2
UUID=2e5a6b13-6e00-464c-8893-0078a6f437c4       none           swap             defaults        0 0
```


一行代表一个挂载点，系统的启动依靠该文件，写入该文件的内容格式如下：

`设备` `挂载点` `文件系统类型` `挂载选项` `dump` `fsck`

各项含义如下：

- **设备:** 

	推荐使用 UUID 或 LABEL，避免 /dev/sdX 变化导致挂载失败。

	设备的 UUID 可以通过 `blkid` 命令获取。

- **挂载点:** 

	如 /、/home、/mnt/data，swap 分区用 none。

- **文件系统类型:** 

	ext4、xfs、ntfs、vfat、nfs、cifs、iso9660、swap 等。

- **挂载选项:**

	控制挂载时的行为，如要选择多个选项，应使用 `,` 分开，可用项如下:

| 可用选项 | 描述 |
|-|-|
| defaults | 一组默认值，通常 rw,suid,dev,exec,auto,nouser,async,relatime。|
| auto / noauto | 有 auto 文件系统会在启动时自动挂载，或者通过以下方式挂载: mount -a。同 noauto 只有在明确指示的情况下才会挂载，这对于光驱或只想按需挂载的分区非常有用。|
| rw / ro | 强制挂载点以读写或只读模式运行。将某项标记为 rw 当系统或驱动程序倾向于挂载它时，这可能很有用。 默认只读这种情况有时会发生在 NTFS 或可移动介质上。|
| exec / noexec | 允许或阻止在该文件系统上执行二进制文件。|
| dev / nodev | 控制是否在文件系统中解释特殊设备（字符和块）。|
| suid / nosuid | 启用或禁用 SUID 和 SGID 位的效果。|
| user, users, nouser | 他们决定谁可以组装和拆卸。user 它允许普通用户挂载文件系统，并且只有他们可以卸载它，而 users 它允许相应组中的任何成员对其进行拆解。在这两种情况下，这都是默认设置，nouser 仅限root用户挂载。|
| owner （在  Linux 系统上）| 允许设备所有者（不一定是 root 用户）挂载该设备。|
| sync / async | 定义输入/输出操作是同步执行还是异步执行。|
| noatime, nodiratime, relatime, strictatime, lazytime | 它们控制访问分区的更新方式，减少这些写入操作可以显著提高性能并降低 SSD 的损耗。|
| nofail | 这样可以防止系统将设备挂载失败标记为严重错误。这对于……非常有用。 外部 磁盘或辅助分区 可能不存在；防止启动检查失败。|

- **dump:** 

	备份设置，0=不备份，1=根分区备份，2=其他分区备份。

- **fsck:** 

	检查设备，0=不检查，1=根分区优先检查，2=其他分区顺序检查。

假设我们要设置自动挂载 `nvme0n1p5` 到 `/home`，首先获取分区的 UUID: 

```bash
blkid /dev/nvme0n1p5
```

得到以下输出: 

```txt
/dev/nvme0n1p4: LABEL="Files" BLOCK_SIZE="512" UUID="7CFC1A1BFC19CFEE" TYPE="ntfs" PARTLABEL="Basic data partition" PARTUUID="6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f"
```

能看到，设备 UUID 条目为 `PARTUUID="6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f"`

随后设置自动挂载，将以下内容写入 `/etc/fstab` 文件：

```txt
UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  default  0  2
```
可以直接使用 `echo` 命令追加到行尾：

```bash
echo "UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  default  0  2" >> /etc/fstab
```

写入完成后执行以下命令:

```bash
mount -a
```

这将重新读取 fstab 文件并挂载文件内所写的设备，若无报错即成功。