# Linux 命令行笔记

记录文件管理、输入输出重定向和进程管理的常用命令。

## 文件管理

常用命令：

| 命令 | 用途 |
| --- | --- |
| `ls` | 列出目录内容 |
| `mkdir` | 创建目录 |
| `cp` | 复制文件或目录 |
| `rm` | 删除文件或目录 |
| `touch` | 创建空文件、更新时间戳 |
| `chmod` | 修改权限 |
| `chown` | 修改所有者和所属组 |
| `nano` | 简单文本编辑 |

### ls

```txt
ls [选项] <路径>
```

常用选项：

| 选项 | 作用 |
| --- | --- |
| `-a` | 显示隐藏文件 |
| `-l` | 详细信息 |
| `-h` | 易读的大小单位，通常配 `-l` |

示例：

```bash
ls /etc
ls -a
ls -alh ../
```

### mkdir

```txt
mkdir [选项] <路径>
```

- `-p`：递归创建，父目录不存在时自动创建。

```bash
mkdir video
mkdir -p one/two/three
```

### cp

```txt
cp [选项] <源路径> <目标路径>
```

常用选项：

| 选项 | 作用 |
| --- | --- |
| `-r` | 递归复制目录 |
| `-i` | 覆盖前询问 |
| `-f` | 强制覆盖 |
| `-v` | 显示复制过程 |
| `-p` | 保留权限、时间戳等属性 |
| `-a` | 归档模式，等价于 `-dpr` |
| `-u` | 仅复制比目标新的文件 |
| `-l` | 创建硬链接 |
| `-s` | 创建符号链接 |

示例：

```bash
cp /home/fovlin/file /home/fovlin/Documents/
cp -r ./directory /home/fovlin/Documents
```

### rm

```txt
rm [选项] <路径>
```

| 选项 | 作用 |
| --- | --- |
| `-r` | 递归删除目录 |
| `-f` | 强制删除，不提示 |
| `-i` | 删除前逐个确认 |

```bash
rm file.txt
rm -rf dir/
rm -i file.txt
```

> `rm -rf` 不进回收站，执行前确认路径。

### touch

```txt
touch [选项] <路径>
```

- `-c`：只更新时间戳，不创建文件。
- `-t`：指定时间。

```bash
touch newfile.txt
touch file1.txt file2.txt file3.txt
touch -c existing.txt
```

### chmod 命令

`ls -l` 输出示例：

```log
drwxr-xr-x  2 fovlin fovlin 4096  4月17日 00:37 docs
```

字段依次为：文件类型与权限、硬链接数、所有者、所属组、大小、修改时间、文件名。

权限位：

- 第 1 位：文件类型。`-` 普通文件，`d` 目录，`l` 链接，`c` 字符设备，`b` 块设备，`s` 套接字，`p` 管道。
- 第 2–4 位：所有者权限。
- 第 5–7 位：所属组权限。
- 第 8–10 位：其他用户权限。
- `r` 读、`w` 写、`x` 执行；对目录来说，`x` 表示能否进入。

```txt
chmod [选项] <权限> <文件>
```

数字模式：`r=4`、`w=2`、`x=1`，三位数字分别对应所有者、所属组、其他用户。

```bash
chmod 751 script.sh   # rwx r-x --x
chmod -R 751 docs     # 递归修改目录
```

### chown

```txt
chown [选项] <所有者[:所属组]> <路径>
```

常用选项：

| 选项 | 作用 |
| --- | --- |
| `-R` | 递归修改 |
| `-v` | 显示详细过程 |
| `-c` | 只显示发生更改的文件 |
| `-f` | 抑制错误信息 |
| `--reference=<文件>` | 参考另一个文件的所有者和组 |
| `-h` | 修改符号链接本身 |
| `--from=<当前所有者>` | 仅当所有者匹配时修改 |

```bash
sudo chown fovlin:fovlin script.sh
sudo chown -R fovlin:fovlin docs
```

### nano

```bash
nano <文件>
```

常用快捷键：

| 快捷键 | 作用 |
| --- | --- |
| `Ctrl + G` | 帮助 |
| `Ctrl + O` | 写入文件 |
| `Ctrl + F` | 搜索 |
| `Ctrl + K` | 剪切 |
| `Ctrl + U` | 粘贴 |
| `Ctrl + R` | 读取文件 |
| `Ctrl + 反斜杠` | 替换 |
| `Ctrl + X` | 退出 |

修改先保存在缓冲区；退出前按 `Ctrl + O` 写入，再按 `Ctrl + X` 退出。

其他编辑器：`vim`、`neovim`。

## 输入/输出重定向

重定向把命令的输入、输出接到文件或其他命令。

### 输出重定向

```bash
command > file    # 覆盖
command >> file   # 追加
```

示例：向 `~/.bashrc` 追加别名。

```bash
echo "alias ll='ls -lh --color=auto'" >> ~/.bashrc
```

### 输入重定向

```bash
command < file
```

`wc -m` 统计字符数：

```bash
wc -m < README.md
```

与 `wc -m README.md` 结果相同，区别是前者从标准输入读取。

### 文件描述符

| 描述符 | 含义 |
| --- | --- |
| `0` | 标准输入 stdin |
| `1` | 标准输出 stdout |
| `2` | 标准错误 stderr |

```bash
command 2> error.log    # 错误输出到文件
command 2>> error.log   # 追加
```

### Here Document

`<<` 把一段文本作为标准输入，结束标记可自定义。

```txt
$ wc -m << maker
> Acovia docs
> maker
12
```

### 组合重定向

```bash
command > out.log 2>&1
```

`2>&1` 把标准错误重定向到标准输出当前指向的位置；顺序会影响结果，通常写成 `> out.log 2>&1`。

## 进程管理

### 查看 PID

`ps -e` 列出所有进程；`ps -ejH` 或 `pstree` 查看树状结构。

```bash
ps -e | grep -i code
```

`grep -i` 忽略大小写。输出示例：

```txt
   3289 ?        00:00:37     code
   3292 ?        00:00:00       code
   3337 ?        00:00:59         code
```

操作主进程通常即可，但子进程可能需要单独处理。

更多用法：`man ps`、`ps --help`。

### top 系列

常见工具：`top`、`htop`、`btop`、`atop`。`htop` 易用；`btop` 界面更好看，但对终端尺寸有要求。

```bash
htop
```

`top` 之外的多数需要手动安装。

### 资源占用

```bash
free -h    # 内存，-h 为易读单位
nload      # 网卡实时进出流量
```

端口占用：

```bash
sudo lsof -i:端口号
netstat -tunlp | grep <端口号>
```

`netstat` 属于 `net-tools`，多数发行版默认不装；`-tunlp` 列出监听中的 TCP/UDP 端口。

### 结束进程

`kill` 默认发送 SIGTERM。

```bash
kill 3389
kill -9 3389   # SIGKILL，强制结束
```

常用信号：

| 信号 | 说明 |
| --- | --- |
| `SIGKILL`（9） | 立即结束，不可捕获 |
| `SIGTERM`（15） | 请求正常退出，可捕获 |
| `SIGINT`（2） | 通常由 `Ctrl + C` 产生 |

按进程名：

```bash
pkill code
pkill -f prism   # 匹配完整命令行
```

### 接管进程

`reptyr` 可把进程从其他终端接管到当前终端，通常需要额外的 ptrace 权限设置。

```bash
reptyr <pid>
```

## 相关

- 快捷键：[Linux 常用快捷键](/notes/linux/shortcut-key)
- 用户与权限：[Linux 系统配置](/notes/linux/system-config)
