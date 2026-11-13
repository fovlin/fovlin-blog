# 磁盘管理与双系统引导笔记

记录磁盘分区、格式化、挂载和 GRUB 双系统引导。

> 磁盘操作风险高：先备份，尽量在虚拟机里练习。

## 双系统引导

### 更新 GRUB

依赖：`grub`、`os-prober`、`efibootmgr`。

GRUB 主配置：`/etc/default/grub`，修改后重新生成 `grub.cfg`。

```bash
sudo os-prober          # 查找其他系统
sudo update-grub        # Debian/Ubuntu
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

备注：

- Fedora 等发行版命令名可能是 `grub2-mkconfig`，路径通常是 `/boot/grub2/grub.cfg`。
- 新版 Debian/Ubuntu 默认禁用 `os-prober`；扫描不到其他系统时，在 `/etc/default/grub` 中设置 `GRUB_DISABLE_OS_PROBER=false`。

### 引导分辨率

GRUB 字体过小：用 `xrandr` 查看支持的分辨率，修改 `/etc/default/grub`：

```txt
GRUB_GFXMODE=1024x768
```

然后重新生成 `grub.cfg`。

## 磁盘管理

常用分区工具：`fdisk`、`parted`、`cfdisk`、`gparted`。以 `fdisk` 为例。

### 查看磁盘

```bash
lsblk
```

示例：

```log
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk
├─nvme0n1p1 259:1    0  14.9G  0 part [SWAP]
├─nvme0n1p2 259:2    0   250G  0 part /
├─nvme0n1p3 259:3    0     1G  0 part /boot
└─nvme0n1p4 259:4    0 326.1G  0 part /home
```

设备都在 `/dev` 下。

### 分区

```bash
sudo fdisk /dev/nvme0n1
```

`fdisk` 常用键：

| 键 | 作用 |
| --- | --- |
| `m` | 帮助 |
| `p` | 打印分区表 |
| `n` | 新建分区 |
| `d` | 删除分区 |
| `t` | 修改分区类型 |
| `w` | 写入并退出 |
| `q` | 不保存退出 |

新建分区时：

- 输入 `F` 查看剩余空间。
- 分区号、起始扇区一般用默认值。
- 结束扇区可直接回车用满剩余空间，或输入 `+128G` 这样的相对大小。
- 确认后 `w` 写入。

写入后再看：

```bash
lsblk
```

### 格式化

挂载前确认文件系统；新分区要先格式化。

```bash
sudo mkfs.ext4 /dev/nvme0n1p5
```

查看文件系统：

```bash
lsblk -f
sudo parted -l
```

### 挂载

```bash
sudo mount --mkdir /dev/nvme0n1p5 /mnt
```

- `--mkdir`：挂载点不存在时自动创建。
- 挂载会暂时遮住挂载点里原有的文件，卸载后恢复；不是删除。

查看挂载点：

```bash
lsblk
```

### 开机自动挂载

写入 `/etc/fstab`。示例：

```txt
# <file system>  <mount point>  <type>  <options>  <dump>  <pass>
UUID=fef38f12-8b93-4609-8d14-e2fb766504d7  /      ext4  rw,relatime  0  1
UUID=8B04-0289                             /boot  vfat  rw,relatime  0  2
UUID=915304a9-718d-4299-a443-c26d73cdfa16  /home  ext4  rw,relatime  0  2
UUID=2e5a6b13-6e00-464c-8893-0078a6f437c4  none   swap  defaults     0  0
```

字段：设备、挂载点、文件系统类型、挂载选项、dump、fsck。

- 设备：推荐 UUID 或 LABEL；`blkid` 获取。
- 挂载点：`/`、`/home`、`/mnt/data` 等；swap 用 `none`。
- 类型：`ext4`、`xfs`、`ntfs`、`vfat`、`nfs`、`cifs`、`iso9660`、`swap` 等。
- 选项：多个用 `,` 分隔，常用项见下表。
- dump：通常 `0`。
- fsck：`0` 不检查，`1` 根分区优先，`2` 其他分区依次检查。

常用挂载选项：

| 选项 | 说明 |
| --- | --- |
| `defaults` | 默认值，通常 `rw,suid,dev,exec,auto,nouser,async,relatime` |
| `auto` / `noauto` | 启动时自动挂载 / 只手动挂载 |
| `rw` / `ro` | 读写 / 只读 |
| `exec` / `noexec` | 允许 / 禁止执行二进制 |
| `dev` / `nodev` | 是否解释设备节点 |
| `suid` / `nosuid` | 是否启用 SUID/SGID |
| `user` / `users` / `nouser` | 普通用户挂载权限 |
| `owner` | 设备所有者可挂载 |
| `sync` / `async` | 同步 / 异步 I/O |
| `noatime` / `relatime` / `lazytime` | 访问时间更新策略 |
| `nofail` | 设备不存在时不影响启动 |

示例：自动挂载 `nvme0n1p5` 到 `/home`。

```bash
sudo blkid /dev/nvme0n1p5
```

输出：

```txt
/dev/nvme0n1p5: UUID="6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f" TYPE="ext4" PARTUUID="..."
```

写入：

```txt
UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  defaults  0  2
```

```bash
echo 'UUID=6bf9b792-5a7a-4a6e-a665-2d8c4589ae1f  /home  ext4  defaults  0  2' | sudo tee -a /etc/fstab
sudo mount -a
```

`mount -a` 挂载 fstab 中尚未挂载的条目。无报错即配置可用；报错先修复再重启，否则可能无法开机。

## 相关

- 分区前的系统安装：[Linux 入门](/notes/linux/getting-started)
- 桌面与驱动：[桌面环境、驱动与显卡](/notes/linux/desktop-and-gpu)
