# 磁盘管理与双系统引导

这一章处理两块相对底层、也更容易出问题的内容：磁盘分区、格式化、挂载与开机自动挂载，以及双系统环境下 GRUB 的配置。操作前请确认已经备份重要数据。

## 配置双系统引导

### 更新引导

先确认已安装 `grub`、`os-prober`、`efibootmgr`。GRUB 的主配置在 `/etc/default/grub`，修改后需要重新生成 `grub.cfg`。

运行 `sudo os-prober` 命令，查找其他系统的引导信息。

```bash
sudo os-prober
```

运行 `sudo update-grub` 命令，更新 GRUB 引导信息。

```bash
sudo update-grub
```

如果发行版没有 `update-grub`，可以用 `grub-mkconfig` 手动生成：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> 部分发行版（如 Fedora）的命令名是 `grub2-mkconfig`，配置路径通常是 `/boot/grub2/grub.cfg`。
>
> 新版 Debian/Ubuntu 默认禁用 `os-prober`，如果扫描不到其他系统，需要在 `/etc/default/grub` 中设置 `GRUB_DISABLE_OS_PROBER=false`。

### 调整引导界面分辨率

如果 GRUB 分辨率过高、引导界面字体太小，可以用 `xrandr` 查看显示器支持的分辨率，再修改 `/etc/default/grub` 中的 `GRUB_GFXMODE`，选择较低的分辨率。

## 磁盘管理

虽然一些发行版会配备图形化的磁盘管理工具，但手动管理仍然是 Linux 的必备技能。本节介绍如何手动分区、格式化、挂载，以及设置开机自动挂载。

常用的分区工具有命令行的 `fdisk`、`parted`、`cfdisk`，以及图形化的 `gparted`；本节以 `fdisk` 为例。

> **注意**：以下操作涉及磁盘分区，操作不当会导致数据丢失。请先备份重要数据，并尽量在虚拟机中练习。

### 磁盘分区

先用 `lsblk` 查看磁盘和分区：

```bash
lsblk
```

输出类似下面这样：

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
sudo fdisk /dev/nvme0n1
```

`fdisk` 会进入交互模式，输入 `m` 可以查看操作选项：

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

填写大小时，可以写终点扇区号，也可以写 `+128G`、`+12800M` 这样的相对大小。要用完整个空闲空间，直接回车使用默认终点即可：

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

再使用 `lsblk` 查看，可以看到新分区：

```txt
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0  14.9G  0 part [SWAP]
├─nvme0n1p2 259:2    0   250G  0 part /
├─nvme0n1p3 259:3    0     1G  0 part /boot
├─nvme0n1p4 259:4    0 326.1G  0 part /home
└─nvme0n1p5 259:5    0 361.8G  0 part <--新分区!
```

### 格式化分区

挂载前要确认分区已经是受支持的文件系统；新分区需要先格式化。

可以用下面的方法查看文件系统：

**使用 `lsblk -f`：**

```txt
NAME        FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
nvme0n1                                                                            
├─nvme0n1p1 swap   1           8942c221-27c8-4f5c-ad86-d31afade6458                [SWAP]
├─nvme0n1p2 ext4   1.0         397e208d-b1d0-42db-9e69-cd094b41c132  215.7G     7% /
├─nvme0n1p3 vfat   FAT32       A9FE-938A                            1016.9M     5% /boot
├─nvme0n1p4 ext4   1.0         4917aab9-8e61-4fc9-a4f3-ec2bb0a4d094  286.9G     5% /home
└─nvme0n1p5
```

**使用 `parted -l`：**

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

新分区需要先格式化。假设要把 `nvme0n1p5` 格式化为 ext4：

```bash
sudo mkfs.ext4 /dev/nvme0n1p5
```

格式化完成后即可挂载。

### 挂载磁盘

用 `mount` 把分区挂载到目录。例如把 `nvme0n1p5` 挂到 `/mnt`：

```bash
sudo mount --mkdir /dev/nvme0n1p5 /mnt
```

> `--mkdir` 参数可以在挂载点目录不存在时自动创建该目录。

> 挂载会暂时遮住挂载点里原有的文件，卸载后它们会重新出现；这并不是删除。

可以用 `lsblk` 确认分区当前的挂载点。

要开机自动挂载，需要把挂载项写进 `/etc/fstab`。一个示例：

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

每一行是一个挂载项，字段依次为：

`设备` `挂载点` `文件系统类型` `挂载选项` `dump` `fsck`

各项含义如下：

- **设备**：推荐使用 UUID 或 LABEL，避免 `/dev/sdX` 变化导致挂载失败。UUID 可以用 `blkid` 获取。
- **挂载点**：如 `/`、`/home`、`/mnt/data`；swap 分区填 `none`。
- **文件系统类型**：`ext4`、`xfs`、`ntfs`、`vfat`、`nfs`、`cifs`、`iso9660`、`swap` 等。
- **挂载选项**：多个选项用 `,` 分隔，常用项如下：

| 可用选项 | 描述 |
| --- | --- |
| `defaults` | 一组默认值，通常 `rw,suid,dev,exec,auto,nouser,async,relatime`。|
| `auto` / `noauto` | `auto` 在启动时自动挂载；`noauto` 只在手动执行 `mount` 时挂载。|
| `rw` / `ro` | 以读写或只读模式挂载。|
| `exec` / `noexec` | 允许或禁止在该文件系统上执行二进制文件。|
| `dev` / `nodev` | 是否解释文件系统中的特殊设备节点。|
| `suid` / `nosuid` | 是否启用 SUID 和 SGID 位。|
| `user` / `users` / `nouser` | `user` 允许普通用户挂载并卸载；`users` 允许同组用户操作；`nouser` 仅 root 可挂载。|
| `owner` | 允许设备所有者挂载该设备。|
| `sync` / `async` | 输入/输出操作是同步还是异步执行。|
| `noatime` / `relatime` / `lazytime` | 控制访问时间更新方式；减少写入可以提升性能并降低 SSD 损耗。|
| `nofail` | 设备不存在时不阻止系统启动，适合移动硬盘或辅助分区。|

- **dump**：备份设置，通常为 `0`。
- **fsck**：开机检查顺序，`0` 不检查，`1` 根分区优先，`2` 其他分区依次检查。

假设要自动挂载 `nvme0n1p5` 到 `/home`，先获取它的 UUID：

```bash
sudo blkid /dev/nvme0n1p5
```

输出类似：

```txt
/dev/nvme0n1p5: UUID="6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f" TYPE="ext4" PARTUUID="..."
```

把下面一行加入 `/etc/fstab`：

```txt
UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  defaults  0  2
```

可以用 `tee` 追加：

```bash
echo 'UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  defaults  0  2' | sudo tee -a /etc/fstab
```

写入后先测试挂载：

```bash
sudo mount -a
```

`mount -a` 会挂载 fstab 中尚未挂载的条目。没有报错说明配置可用；如果报错，先修复再重启，否则可能无法正常开机。

## 小结

磁盘和引导是风险最高的部分：分区前备份，改完 `/etc/fstab` 先用 `mount -a` 检查。下一章[《桌面环境、驱动与显卡》](/notes/linux/desktop-and-gpu)转向桌面环境、驱动和显卡配置。
