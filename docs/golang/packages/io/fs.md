# 包 fs

```go
import "io/fs"
```

包 fs 定义了文件系统的基本接口。
文件系统可以由宿主操作系统提供，
也可以由其他包提供。

## 路径名（Path Names）

本包中的接口都使用相同的路径名语法，与宿主操作系统无关。

路径名是 UTF-8 编码的，
无根节点、以斜杠分隔的路径元素序列，例如 "x/y/z"。
路径名不得包含 "." 或 ".." 或空字符串作为路径元素，
但有一个特例：名称 "." 可用于根目录。
路径不得以斜杠开头或结尾："/x" 和 "x/" 都是无效的。

## 测试

有关文件系统实现的测试支持，请参见 [testing/fstest](https://pkg.go.dev/testing/fstest) 包。

## 索引

### 变量

### 函数

- [func FormatDirEntry(dir DirEntry) string](#FormatDirEntry)
- [func FormatFileInfo(info FileInfo) string](#FormatFileInfo)
- [func Glob(fsys FS, pattern string) (matches []string, err error)](#Glob)
- [func ReadFile(fsys FS, name string) ([]byte, error)](#ReadFile)
- [func ReadLink(fsys FS, name string) (string, error)](#ReadLink)
- [func ValidPath(name string) bool](#ValidPath)
- [func WalkDir(fsys FS, root string, fn WalkDirFunc) error](#WalkDir)

### 类型

- [type DirEntry](#DirEntry)
  - [func FileInfoToDirEntry(info FileInfo) DirEntry](#FileInfoToDirEntry)
  - [func ReadDir(fsys FS, name string) ([]DirEntry, error)](#ReadDir)
- [type FS](#FS)
  - [func Sub(fsys FS, dir string) (FS, error)](#Sub)
- [type File](#File)
- [type FileInfo](#FileInfo)
  - [func Lstat(fsys FS, name string) (FileInfo, error)](#Lstat)
  - [func Stat(fsys FS, name string) (FileInfo, error)](#Stat)
- [type FileMode](#FileMode)
  - [func (m FileMode) IsDir() bool](#FileMode.IsDir)
  - [func (m FileMode) IsRegular() bool](#FileMode.IsRegular)
  - [func (m FileMode) Perm() FileMode](#FileMode.Perm)
  - [func (m FileMode) String() string](#FileMode.String)
  - [func (m FileMode) Type() FileMode](#FileMode.Type)
- [type GlobFS](#GlobFS)
- [type PathError](#PathError)
  - [func (e *PathError) Error() string](#PathError.Error)
  - [func (e *PathError) Timeout() bool](#PathError.Timeout)
  - [func (e *PathError) Unwrap() error](#PathError.Unwrap)
- [type ReadDirFS](#ReadDirFS)
- [type ReadDirFile](#ReadDirFile)
- [type ReadFileFS](#ReadFileFS)
- [type ReadLinkFS](#ReadLinkFS)
- [type StatFS](#StatFS)
- [type SubFS](#SubFS)
- [type WalkDirFunc](#WalkDirFunc)

### 示例

- [Glob](#example-Glob)
- [ReadFile](#example-ReadFile)
- [ValidPath](#example-ValidPath)
- [WalkDir](#example-WalkDir)

### 常量

本节为空。

### 变量

```go
var (
    ErrInvalid    = errInvalid()    // "invalid argument"
    ErrPermission = errPermission() // "permission denied"
    ErrExist      = errExist()      // "file already exists"
    ErrNotExist   = errNotExist()   // "file does not exist"
    ErrClosed     = errClosed()     // "file already closed"
)
```

通用的文件系统错误。
文件系统返回的错误可以使用 [errors.Is](https://pkg.go.dev/errors#Is) 针对这些错误进行判断。

```go
var SkipAll = errors.New("skip everything and stop the walk")
```

SkipAll 用作 [WalkDirFunc](#WalkDirFunc) 的返回值，表示跳过所有剩余文件和目录。它不会作为任何函数的错误返回。

```go
var SkipDir = errors.New("skip this directory")
```

SkipDir 用作 [WalkDirFunc](#WalkDirFunc) 的返回值，表示跳过调用中指定的目录。它不会作为任何函数的错误返回。

## 函数

### func FormatDirEntry

```go
func FormatDirEntry(dir DirEntry) string
```

加入版本：go1.21.0

FormatDirEntry 返回 dir 的格式化版本，便于人类阅读。
[DirEntry](#DirEntry) 的实现可以在 String 方法中调用此函数。
对于名为 subdir 的目录和名为 hello.go 的文件的输出如下：
```
d subdir/
- hello.go
```

### func FormatFileInfo

```go
func FormatFileInfo(info FileInfo) string
```

加入版本：go1.21.0

FormatFileInfo 返回 info 的格式化版本，便于人类阅读。
[FileInfo](#FileInfo) 的实现可以在 String 方法中调用此函数。
对于名为 "hello.go"、100 字节、模式 0o644、创建于
1970 年 1 月 1 日中午的文件的输出如下：
```
-rw-r--r-- 100 1970-01-01 12:00:00 hello.go
```

### func Glob

```go
func Glob(fsys FS, pattern string) (matches []string, err error)
```

Glob 返回所有与模式匹配的文件名，如果没有匹配的文件则返回 nil。模式的语法与 [path.Match](https://pkg.go.dev/path#Match) 相同。模式可以描述层次化名称，例如 usr/*/bin/ed。

Glob 忽略文件系统错误，例如读取目录时的 I/O 错误。
唯一可能返回的错误是 [path.ErrBadPattern](https://pkg.go.dev/path#ErrBadPattern)，报告模式格式错误。

如果 fs 实现了 [GlobFS](#GlobFS)，Glob 调用 fs.Glob。
否则，Glob 使用 [ReadDir](#ReadDir) 遍历目录树并查找与模式匹配的文件。


示例：

代码：

```go
package main

import (
    "fmt"
    "io/fs"
    "log"
    "testing/fstest"
)

func main() {
    fsys := fstest.MapFS{
        "file.txt":        {},
        "file.go":         {},
        "dir/file.txt":    {},
        "dir/file.go":     {},
        "dir/subdir/x.go": {},
    }

    patterns := []string{
        "*.txt",
        "*.go",
        "dir/*.go",
        "dir/*/x.go",
    }

    for _, pattern := range patterns {
        matches, err := fs.Glob(fsys, pattern)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Printf("%q matches: %v\n", pattern, matches)
    }
}
```

输出：

```
"*.txt" matches: [file.txt]
"*.go" matches: [file.go]
"dir/*.go" matches: [dir/file.go]
"dir/*/x.go" matches: [dir/subdir/x.go]
```


### func ReadFile

```go
func ReadFile(fsys FS, name string) ([]byte, error)
```

ReadFile 从文件系统 fs 中读取命名文件并返回其内容。
成功调用返回 nil 错误，而非 [io.EOF](https://pkg.go.dev/io#EOF)。
（因为 ReadFile 读取整个文件，最终 Read 时预期的 EOF
不会被视为需要报告的错误。）

如果 fs 实现了 [ReadFileFS](#ReadFileFS)，ReadFile 调用 fs.ReadFile。
否则 ReadFile 调用 fs.Open，并在返回的 [File](#File) 上使用 Read 和 Close。


示例：

代码：

```go
package main

import (
    "fmt"
    "io/fs"
    "log"
    "testing/fstest"
)

func main() {
    fsys := fstest.MapFS{
        "hello.txt": {
            Data: []byte("Hello, World!\n"),
        },
    }

    data, err := fs.ReadFile(fsys, "hello.txt")
    if err != nil {
        log.Fatal(err)
    }

    fmt.Print(string(data))
}
```

输出：

```
Hello, World!
```


### func ReadLink

```go
func ReadLink(fsys FS, name string) (string, error)
```

加入版本：go1.25.0

ReadLink 返回命名符号链接的目标。

如果 fsys 没有实现 [ReadLinkFS](#ReadLinkFS)，则 ReadLink 返回错误。

### func ValidPath

```go
func ValidPath(name string) bool
```

ValidPath 报告给定的路径名是否可用于调用 Open。

注意，所有系统（甚至 Windows）上的路径都使用斜杠分隔。
包含反斜杠和冒号等其他字符的路径被视为有效，但 [FS](#FS) 实现
绝不能将这些字符解释为路径元素分隔符。
更多详情请参见 [Path Names](#hdr-Path_Names) 部分。


示例：

代码：

```go
package main

import (
    "fmt"
    "io/fs"
)

func main() {
    paths := []string{
        ".",
        "x",
        "x/y/z",
        "",
        "..",
        "/x",
        "x/",
        "x//y",
        "x/./y",
        "x/../y",
    }

    for _, path := range paths {
        fmt.Printf("ValidPath(%q) = %t\n", path, fs.ValidPath(path))
    }
}
```

输出：

```
ValidPath(".") = true
ValidPath("x") = true
ValidPath("x/y/z") = true
ValidPath("") = false
ValidPath("..") = false
ValidPath("/x") = false
ValidPath("x/") = false
ValidPath("x//y") = false
ValidPath("x/./y") = false
ValidPath("x/../y") = false
```


### func WalkDir

```go
func WalkDir(fsys FS, root string, fn WalkDirFunc) error
```

WalkDir 遍历以 root 为根的文件树，对树中的每个文件或目录（包括 root 本身）调用 fn。

所有访问文件和目录时产生的错误都由 fn 过滤处理：
详情请参见 [fs.WalkDirFunc](#WalkDirFunc) 的文档。

文件按字典序遍历，这使得输出具有确定性，
但要求 WalkDir 在继续遍历该目录之前将整个目录读入内存。

WalkDir 不跟随目录中的符号链接，
但如果 root 本身是符号链接，则会遍历其目标。


示例：

代码：

```go
package main

import (
    "fmt"
    "io/fs"
    "log"
    "os"
)

func main() {
    root := "/usr/local/go/bin"
    fileSystem := os.DirFS(root)

    fs.WalkDir(fileSystem, ".", func(path string, d fs.DirEntry, err error) error {
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(path)
        return nil
    })
}
```


## 类型

### type DirEntry

```go
type DirEntry interface {
    // Name 返回文件（或子目录）的名称，由该条目描述。
    // 此名称仅为路径的最后一段（基名），而非整个路径。
    // 例如，Name 返回 "hello.go" 而不是 "home/gopher/hello.go"。
    Name() string

    // IsDir 报告该条目是否描述一个目录。
    IsDir() bool

    // Type 返回该条目的类型位。
    // 类型位是通常的 FileMode 位的一个子集，即 FileMode.Type 方法返回的那些位。
    Type() FileMode

    // Info 返回该条目所描述的文件或子目录的 FileInfo。
    // 返回的 FileInfo 可能来自原始目录读取的时刻，
    // 也可能来自 Info 调用的时刻。如果文件自目录读取后
    // 已被删除或重命名，Info 可能返回满足 errors.Is(err, ErrNotExist) 的错误。
    // 如果该条目表示一个符号链接，Info 报告链接本身的信息，
    // 而非链接目标的信息。
    Info() (FileInfo, error)
}
```

DirEntry 是从目录中读取的条目（使用 [ReadDir](#ReadDir) 函数或 [ReadDirFile](#ReadDirFile) 的 ReadDir 方法）。

#### func FileInfoToDirEntry

```go
func FileInfoToDirEntry(info FileInfo) DirEntry
```

加入版本：go1.17

FileInfoToDirEntry 返回一个 [DirEntry](#DirEntry)，它从 info 中返回信息。
如果 info 为 nil，FileInfoToDirEntry 返回 nil。

#### func ReadDir

```go
func ReadDir(fsys FS, name string) ([]DirEntry, error)
```

ReadDir 读取命名目录，
并返回按文件名排序的目录条目列表。

如果 fs 实现了 [ReadDirFS](#ReadDirFS)，ReadDir 调用 fs.ReadDir。
否则 ReadDir 调用 fs.Open，并在返回的文件上使用 ReadDir 和 Close。

### type FS

```go
type FS interface {
    // Open 打开命名文件。
    // 必须调用 [File.Close] 以释放所有相关资源。
    //
    // 当 Open 返回错误时，应为 *PathError 类型，
    // 其中 Op 字段设置为 "open"，Path 字段设置为 name，
    // Err 字段描述问题。
    //
    // Open 应拒绝尝试打开不满足 ValidPath(name) 的名称，
    // 返回一个 *PathError，其中 Err 设置为 ErrInvalid 或 ErrNotExist。
    Open(name string) (File, error)
}
```

FS 提供对分层文件系统的访问。

FS 接口是文件系统所需的最小实现。
文件系统可以实现其他接口，
例如 [ReadFileFS](#ReadFileFS)，以提供额外或优化的功能。

[testing/fstest.TestFS](https://pkg.go.dev/testing/fstest#TestFS) 可用于测试 FS 实现的正确性。

#### func Sub

```go
func Sub(fsys FS, dir string) (FS, error)
```

Sub 返回一个 [FS](#FS)，对应于 fsys 的 dir 下的子树。

如果 dir 是 "."，Sub 返回未改变的 fsys。
否则，如果 fs 实现了 [SubFS](#SubFS)，Sub 返回 fsys.Sub(dir)。
否则，Sub 返回一个新的 [FS](#FS) 实现 sub，
该实现实际上将 sub.Open(name) 实现为 fsys.Open(path.Join(dir, name))。
该实现还会适当地转换对 ReadDir、ReadFile、ReadLink、Lstat 和 Glob 的调用。

注意，Sub(os.DirFS("/"), "prefix") 等价于 os.DirFS("/prefix")，
并且这两者都不保证避免对 "/prefix" 之外的操作系统访问，
因为 [os.DirFS](https://pkg.go.dev/os#DirFS) 的实现不检查 "/prefix" 内指向
其他目录的符号链接。也就是说，[os.DirFS](https://pkg.go.dev/os#DirFS) 不能替代
chroot 风格的安全机制，Sub 也并未改变这一点。

### type File

```go
type File interface {
    Stat() (FileInfo, error)
    Read([]byte) (int, error)
    Close() error
}
```

File 提供对单个文件的访问。
File 接口是文件所需的最小实现。
目录文件还应实现 [ReadDirFile](#ReadDirFile)。
文件可以实现 [io.ReaderAt](https://pkg.go.dev/io#ReaderAt) 或 [io.Seeker](https://pkg.go.dev/io#Seeker) 作为优化。

### type FileInfo

```go
type FileInfo interface {
    Name() string       // 文件的基本名
    Size() int64        // 普通文件的字节长度；其他文件类型依赖于系统
    Mode() FileMode     // 文件模式位
    ModTime() time.Time // 修改时间
    IsDir() bool        // Mode().IsDir() 的缩写
    Sys() any           // 底层数据源（可返回 nil）
}
```

FileInfo 描述一个文件，由 [Stat](#Stat) 返回。

#### func Lstat

```go
func Lstat(fsys FS, name string) (FileInfo, error)
```

加入版本：go1.25.0

Lstat 返回描述命名文件的 [FileInfo](#FileInfo)。
如果文件是符号链接，返回的 [FileInfo](#FileInfo) 描述该符号链接本身。
Lstat 不尝试跟随链接。

如果 fsys 没有实现 [ReadLinkFS](#ReadLinkFS)，则 Lstat 等同于 [Stat](#Stat)。

#### func Stat

```go
func Stat(fsys FS, name string) (FileInfo, error)
```

Stat 从文件系统返回描述命名文件的 [FileInfo](#FileInfo)。

如果 fs 实现了 [StatFS](#StatFS)，Stat 调用 fs.Stat。
否则，Stat 打开 [File](#File) 以获取其状态。

### type FileMode

```go
type FileMode uint32
```

FileMode 表示文件的模式和权限位。
这些位在所有系统上具有相同的定义，以便
文件信息可以在系统之间可移植地移动。
并非所有位都适用于所有系统。
唯一必需的位是目录的 [ModeDir](#ModeDir)。

```go
const (
    // 单个字母是 String 方法格式化时使用的缩写。
    ModeDir        FileMode = 1 << (32 - 1 - iota) // d: 是目录
    ModeAppend                                      // a: 仅追加
    ModeExclusive                                   // l: 独占使用
    ModeTemporary                                   // T: 临时文件；仅 Plan 9
    ModeSymlink                                     // L: 符号链接
    ModeDevice                                      // D: 设备文件
    ModeNamedPipe                                   // p: 命名管道（FIFO）
    ModeSocket                                      // S: Unix 域套接字
    ModeSetuid                                      // u: setuid
    ModeSetgid                                      // g: setgid
    ModeCharDevice                                  // c: Unix 字符设备，当 ModeDevice 已设置时
    ModeSticky                                      // t: sticky 位
    ModeIrregular                                   // ?: 非普通文件；关于此文件没有其他信息

    // 类型位的掩码。对于普通文件，不设置任何类型位。
    ModeType = ModeDir | ModeSymlink | ModeNamedPipe | ModeSocket | ModeDevice | ModeCharDevice | ModeIrregular

    ModePerm FileMode = 0777 // Unix 权限位
)
```

已定义的文档模式位是 [FileMode](#FileMode) 的最高有效位。
最低的九个有效位是标准的 Unix rwxrwxrwx 权限。
这些位的值应被视为公共 API 的一部分，
可以在网络协议或磁盘表示中使用：它们不得更改，尽管可能会添加新位。

#### func (FileMode) IsDir

```go
func (m FileMode) IsDir() bool
```

IsDir 报告 m 是否描述一个目录。
即，它测试 m 中是否设置了 [ModeDir](#ModeDir) 位。

#### func (FileMode) IsRegular

```go
func (m FileMode) IsRegular() bool
```

IsRegular 报告 m 是否描述一个普通文件。
即，它测试没有任何模式类型位被设置。

#### func (FileMode) Perm

```go
func (m FileMode) Perm() FileMode
```

Perm 返回 m 中的 Unix 权限位（m & [ModePerm](#ModePerm)）。

#### func (FileMode) String

```go
func (m FileMode) String() string
```

#### func (FileMode) Type

```go
func (m FileMode) Type() FileMode
```

Type 返回 m 中的类型位（m & [ModeType](#ModeType)）。

### type GlobFS

```go
type GlobFS interface {
    FS

    // Glob 返回所有与模式匹配的文件名，
    // 提供顶层 Glob 函数的实现。
    Glob(pattern string) ([]string, error)
}
```

GlobFS 是一个具有 Glob 方法的文件系统。

### type PathError

```go
type PathError struct {
    Op   string
    Path string
    Err  error
}
```

PathError 记录错误以及导致该错误所涉及的操作和文件路径。

#### func (*PathError) Error

```go
func (e *PathError) Error() string
```

#### func (*PathError) Timeout

```go
func (e *PathError) Timeout() bool
```

Timeout 报告此错误是否表示超时。

#### func (*PathError) Unwrap

```go
func (e *PathError) Unwrap() error
```

### type ReadDirFS

```go
type ReadDirFS interface {
    FS

    // ReadDir 读取命名目录
    // 并返回按文件名排序的目录条目列表。
    ReadDir(name string) ([]DirEntry, error)
}
```

ReadDirFS 是由提供 [ReadDir](#ReadDir) 优化实现的文件系统
所实现的接口。

### type ReadDirFile

```go
type ReadDirFile interface {
    File

    // ReadDir 读取目录的内容并返回
    // 最多 n 个 DirEntry 值，按目录顺序排列。
    // 在同一文件上的后续调用将产生更多的 DirEntry 值。
    //
    // 如果 n > 0，ReadDir 返回最多 n 个 DirEntry 结构。
    // 在这种情况下，如果 ReadDir 返回空切片，它将返回
    // 一个非 nil 的错误说明原因。
    // 在目录末尾，错误是 io.EOF。
    // （ReadDir 必须返回 io.EOF 本身，而不是包装了 io.EOF 的错误。）
    //
    // 如果 n <= 0，ReadDir 在单个切片中返回目录中
    // 所有剩余的 DirEntry 值。在这种情况下，如果 ReadDir 成功（一直读取
    // 到目录末尾），它返回该切片和一个 nil 错误。
    // 如果在到达目录末尾之前遇到错误，
    // ReadDir 返回已读取到的 DirEntry 列表和一个非 nil 错误。
    ReadDir(n int) ([]DirEntry, error)
}
```

ReadDirFile 是一个目录文件，其条目可以通过 ReadDir 方法读取。
每个目录文件都应实现此接口。
（任何文件都可以实现此接口，
但如果这样做，对于非目录文件，ReadDir 应返回错误。）

### type ReadFileFS

```go
type ReadFileFS interface {
    FS

    // ReadFile 读取命名文件并返回其内容。
    // 成功调用返回 nil 错误，而不是 io.EOF。
    // （因为 ReadFile 读取整个文件，最终 Read 时预期的 EOF
    // 不会被视为需要报告的错误。）
    //
    // 允许调用者修改返回的字节切片。
    // 此方法应返回底层数据的副本。
    ReadFile(name string) ([]byte, error)
}
```

ReadFileFS 是由提供 [ReadFile](#ReadFile) 优化实现的文件系统
所实现的接口。

### type ReadLinkFS

```go
type ReadLinkFS interface {
    FS

    // ReadLink 返回命名符号链接的目标。
    // 如果有错误，应为 [*PathError] 类型。
    ReadLink(name string) (string, error)

    // Lstat 返回描述命名文件的 [FileInfo]。
    // 如果文件是符号链接，返回的 [FileInfo] 描述该符号链接本身。
    // Lstat 不尝试跟随链接。
    // 如果有错误，应为 [*PathError] 类型。
    Lstat(name string) (FileInfo, error)
}
```

加入版本：go1.25.0

ReadLinkFS 是由支持读取符号链接的文件系统
所实现的接口。

### type StatFS

```go
type StatFS interface {
    FS

    // Stat 返回描述该文件的 FileInfo。
    // 如果有错误，应为 *PathError 类型。
    Stat(name string) (FileInfo, error)
}
```

StatFS 是一个具有 Stat 方法的文件系统。

### type SubFS

```go
type SubFS interface {
    FS

    // Sub 返回一个 FS，对应于 dir 下的子树。
    Sub(dir string) (FS, error)
}
```

SubFS 是一个具有 Sub 方法的文件系统。

### type WalkDirFunc

```go
type WalkDirFunc func(path string, d DirEntry, err error) error
```

WalkDirFunc 是 [WalkDir](#WalkDir) 调用的函数类型，用于访问
每个文件或目录。

path 参数包含 [WalkDir](#WalkDir) 的参数作为前缀。
也就是说，如果 WalkDir 以 root 参数 "dir" 调用并在该目录中找到
名为 "a" 的文件，则 walk 函数将以
参数 "dir/a" 调用。

d 参数是命名路径的 [DirEntry](#DirEntry)。

函数返回的错误结果控制 [WalkDir](#WalkDir) 如何
继续。如果函数返回特殊值 [SkipDir](#SkipDir)，WalkDir
跳过当前目录（如果 d.IsDir() 为 true 则跳过 path，否则跳过
path 的父目录）。如果函数返回特殊值
[SkipAll](#SkipAll)，WalkDir 跳过所有剩余文件和目录。否则，
如果函数返回非 nil 错误，WalkDir 完全停止并
返回该错误。

err 参数报告与 path 相关的错误，表示
[WalkDir](#WalkDir) 不会深入该目录。该函数可以决定如何
处理该错误；如前所述，返回该错误将
导致 WalkDir 停止遍历整个树。

[WalkDir](#WalkDir) 在两种情况下使用非 nil 的 err 参数调用函数。

首先，如果根目录的初始 [Stat](#Stat) 失败，WalkDir
使用 path 设置为 root、d 设置为 nil、err 设置为
来自 [Stat](#Stat) 的错误调用函数。

其次，如果目录的 ReadDir 方法（参见 [ReadDirFile](#ReadDirFile)）失败，WalkDir 使用
path 设置为目录路径、d 设置为描述该目录的
[DirEntry](#DirEntry)、err 设置为来自
ReadDir 的错误调用函数。在第二种情况下，该函数会以
目录的 path 被调用两次：第一次调用在尝试读取目录之前，
err 设置为 nil，使函数有机会
返回 [SkipDir](#SkipDir) 或 [SkipAll](#SkipAll) 以完全避免 ReadDir。第二次调用
在 ReadDir 失败后，报告来自 ReadDir 的错误。
（如果 ReadDir 成功，则没有第二次调用。）

与 [path/filepath.WalkFunc](https://pkg.go.dev/path/filepath#WalkFunc) 相比，WalkDirFunc 的不同之处在于：
- 第二个参数的类型为 [DirEntry](#DirEntry) 而不是 [FileInfo](#FileInfo)。
- 该函数在读取目录之前被调用，以允许 [SkipDir](#SkipDir) 或 [SkipAll](#SkipAll) 完全绕过目录读取，或分别跳过所有剩余文件和目录。
- 如果目录读取失败，会第二次为该目录调用该函数以报告错误。
