# 用户及其权限管理

在 Linux 中正确配置用户与文件权限，能够提升系统安全性。

## 用户管理

### 创建新用户

一般地，大部分发行版在安装完成后，会为你自动创建好一个新用户，但如果你需要创建一个新用户，可以使用 `useradd` 进行创建。

格式：

```
useradd [参数] 用户名
```

`useradd` 命令的参数如下：

|参数|描述|默认值|
|-|-|-|
|-d|指定用户主目录|/home/用户名|
|-g|指定用户所属组|用户名本身|
|-m|如果没有家目录，自动创建用户主目录| \- |
|-s|指定用户登录shell|因发行版而异|

例如创建一个名为 linux 的用户，将 `/home/linux` 用户主目录，并使用 `/bin/bash` 作为用户登录shell。

```bash
useradd -md /home/linux -s /bin/bash linux
```

创建完成后，可以使用 `passwd + 用户名` 命令设置密码。

### 管理用户

系统中记录用户信息的文件位于 `/etc/passwd`，每行都会代表一个用户，其中不少为系统内部用户，不建议对此类用户进行操作。

文件内一行内容如下：

```bash
fovlin:x:1000:1000:user:/home/fovlin:/bin/bash
```

---

`用户名` `密码（不存处于此）` `用户ID:UID` `用户组ID:GID` `描述信息` `家目录位置` `用户默认 Shell`

---

使用 `usermod` 命令对用户进行管理。

格式：

```
usermod [参数] 用户名
```

`usermod` 命令的参数如下：

|参数|描述|
|-|-|
|-d|修改用户主目录|
|-g|修改用户所属组|
|-G|修改用户的附属组|
|-s|修改用户shell|

例如将用户 `linux` 的主目录修改为 `/home/linuxos/`，并修改用户 `linux` 的登录shell为 `/bin/sh`。

```bash
usermod -d /home/linuxos/ -s /bin/sh linux
```

### 删除用户

使用 `userdel` 命令删除用户。

```bash
userdel 用户名
```

或使用 `userdel -r` 命令删除用户，并删除用户主目录。

### 用户组

使用以下命令添加用户组：

```bash
groupadd name
```

查询用户所在的组：

```bash
groups username
```

例如以下输出：

```bash
fovlin : fovlin wheel
```

表示用户 `fovlin` 的主组是 `fovlin`，其附属组为 `wheel`。

要更改用户所在组，使用 `usermod -G groupname username` 来更改用户的附属组，使用 `usermod -g groupname username` 来更改用户的主组。

### 更改文件所有者

使用 `chown` 可以改变文件权限，用法如下：

```bash
chown [选项] 用户名:用户组 文件名
```

例如将文件 script.sh 所有者改为 fovlin 执行以下命令：

```bash
sudo chown fovlin:fovlin script.sh
```

> 并非文件所有者，需要超级管理员权限进行操作。

例如将目录 docs 的所有者递归改为 fovlin，执行以下命令：

```bash
sudo chown -R fovlin:fovlin docs
```