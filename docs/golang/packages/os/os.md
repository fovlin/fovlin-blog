# 包 os

```go
import "os"
```

包 os 提供了与操作系统功能无关平台的接口。
其设计类似于 Unix，但错误处理类似于 Go；
失败的调用返回 error 类型的值，而非错误编号。
通常，错误中会包含更多信息。例如，
如果某个接受文件名的调用失败（如 Open 或 Stat），
打印时错误将包含失败的文件名，且类型为
*PathError，可以通过解包获取更多信息。

os 接口旨在所有操作系统上保持一致。
通常不可用的功能出现在特定于系统的包 syscall 中。

以下是一个简单示例，打开文件并读取部分内容。

```go
file, err := os.Open("file.go") // For read access.
if err != nil {
	log.Fatal(err)
}
```

如果打开失败，错误字符串将不言自明，例如

```go
open file.go: no such file or directory
```

然后可以将文件数据读入字节切片。Read 和
Write 的字节数由参数切片的长度决定。

```go
data := make([]byte, 100)
count, err := file.Read(data)
if err != nil {
	log.Fatal(err)
}
fmt.Printf("read %d bytes: %q\n", count, data[:count])
```

### Concurrency

File 的方法对应文件系统操作。所有操作
均可安全地并发使用。File 上的最大并发
操作数可能受操作系统或系统限制。该
数字应较高，但超出它可能会降低性能或
导致其他问题。

## 常量

```go
const (
	// Exactly one of O_RDONLY, O_WRONLY, or O_RDWR must be specified.
	O_RDONLY int = syscall.O_RDONLY // open the file read-only.
	O_WRONLY int = syscall.O_WRONLY // open the file write-only.
	O_RDWR   int = syscall.O_RDWR   // open the file read-write.
	// The remaining values may be or'ed in to control behavior.
	O_APPEND int = syscall.O_APPEND // append data to the file when writing.
	O_CREATE int = syscall.O_CREAT  // create a new file if none exists.
	O_EXCL   int = syscall.O_EXCL   // used with O_CREATE, file must not exist.
	O_SYNC   int = syscall.O_SYNC   // open for synchronous I/O.
	O_TRUNC  int = syscall.O_TRUNC  // truncate regular writable file when opened.
)
```

传递给 OpenFile 的标志，包装了底层系统的标志。并非所有
标志都能在给定系统上实现。

```go
const (
	SEEK_SET int = 0 // seek relative to the origin of the file
	SEEK_CUR int = 1 // seek relative to the current offset
	SEEK_END int = 2 // seek relative to the end
)
```

Seek 起始位置值。

已弃用：请使用 io.SeekStart、io.SeekCurrent 和 io.SeekEnd。

```go
const (
	PathSeparator     = '/' // OS-specific path separator
	PathListSeparator = ':' // OS-specific path list separator
)
```

```go
const (
	// The single letters are the abbreviations
	// used by the String method's formatting.
	ModeDir        = fs.ModeDir        // d: is a directory
	ModeAppend     = fs.ModeAppend     // a: append-only
	ModeExclusive  = fs.ModeExclusive  // l: exclusive use
	ModeTemporary  = fs.ModeTemporary  // T: temporary file; Plan 9 only
	ModeSymlink    = fs.ModeSymlink    // L: symbolic link
	ModeDevice     = fs.ModeDevice     // D: device file
	ModeNamedPipe  = fs.ModeNamedPipe  // p: named pipe (FIFO)
	ModeSocket     = fs.ModeSocket     // S: Unix domain socket
	ModeSetuid     = fs.ModeSetuid     // u: setuid
	ModeSetgid     = fs.ModeSetgid     // g: setgid
	ModeCharDevice = fs.ModeCharDevice // c: Unix character device, when ModeDevice is set
	ModeSticky     = fs.ModeSticky     // t: sticky
	ModeIrregular  = fs.ModeIrregular  // ?: non-regular file; nothing else is known about this file

	// Mask for the type bits. For regular files, none will be set.
	ModeType = fs.ModeType

	ModePerm = fs.ModePerm // Unix permission bits, 0o777
)
```

已定义的文件模式位是 FileMode 的最高有效位。
最低的九个有效位是标准的 Unix rwxrwxrwx 权限。
这些位的值应被视为公共 API 的一部分，
可以在网络协议或磁盘表示中使用：它们不得更改，
尽管可能会添加新位。

```go
const DevNull = "/dev/null"
```

DevNull 是操作系统"空设备"的名称。
在类 Unix 系统上为 "/dev/null"；在 Windows 上为 "NUL"。

## 变量

```go
var (
	// ErrInvalid indicates an invalid argument.
	// Methods on File will return this error when the receiver is nil.
	ErrInvalid = fs.ErrInvalid // "invalid argument"

	ErrPermission = fs.ErrPermission // "permission denied"
	ErrExist      = fs.ErrExist      // "file already exists"
	ErrNotExist   = fs.ErrNotExist   // "file does not exist"
	ErrClosed     = fs.ErrClosed     // "file already closed"

	ErrNoDeadline       = errNoDeadline()       // "file type does not support deadline"
	ErrDeadlineExceeded = errDeadlineExceeded() // "i/o timeout"
)
```

一些常见系统调用错误的可移植模拟。此包返回的错误可以使用 errors.Is 针对这些错误进行判断。

```go
var (
	// ErrProcessDone indicates a [Process] has finished.
	ErrProcessDone = errors.New("os: process already finished")

	// ErrNoHandle indicates a [Process] does not have a handle.
	ErrNoHandle = errors.New("os: process handle unavailable")
)
```

```go
var (
	Stdin  = NewFile(uintptr(syscall.Stdin), "/dev/stdin")
	Stdout = NewFile(uintptr(syscall.Stdout), "/dev/stdout")
	Stderr = NewFile(uintptr(syscall.Stderr), "/dev/stderr")
)
```

Stdin、Stdout 和 Stderr 是指向标准输入、
标准输出和标准错误文件描述符的已打开 File。

注意，Go 运行时在 panic 和崩溃时会写入标准错误；
关闭 Stderr 可能导致这些消息输出到其他地方，也许
是稍后打开的文件。

```go
var Args []string
```

Args 保存命令行参数，以程序名称开头。

## 函数

### func Chdir

```go
func Chdir(dir string) error
```

Chdir 将当前工作目录更改为命名目录。
如果有错误，其类型将为 *PathError。

### func Chmod

```go
func Chmod(name string, mode FileMode) error
```

Chmod 将命名文件的模式更改为 mode。
如果文件是符号链接，它更改链接目标的模式。
如果有错误，其类型将为 *PathError。

根据操作系统的不同，使用模式位的不同子集。

在 Unix 上，使用模式的权限位、ModeSetuid、ModeSetgid 和 ModeSticky。

在 Windows 上，仅使用 mode 的 0o200 位（所有者可写）；它控制文件的只读属性是设置还是清除。其他位当前未使用。为了与 Go 1.12 及更早版本兼容，请使用非零 mode。只读文件使用 mode 0o400，可读可写文件使用 0o600。

在 Plan 9 上，使用模式的权限位、ModeAppend、ModeExclusive 和 ModeTemporary。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	if err := os.Chmod("some-filename", 0644); err != nil {
		log.Fatal(err)
	}
}
```

### func Chown

```go
func Chown(name string, uid, gid int) error
```

Chown 更改命名文件的数字 uid 和 gid。
如果文件是符号链接，它更改链接目标的 uid 和 gid。
uid 或 gid 为 -1 表示不更改该值。
如果有错误，其类型将为 *PathError。

在 Windows 或 Plan 9 上，Chown 始终返回 syscall.EWINDOWS 或 syscall.EPLAN9 错误，包装在 *PathError 中。

### func Chtimes

```go
func Chtimes(name string, atime time.Time, mtime time.Time) error
```

Chtimes 更改命名文件的访问和修改时间，类似于 Unix 的 utime() 或 utimes() 函数。零值 time.Time 将保持相应的文件时间不变。

底层文件系统可能会将值截断或舍入到较低精度的时间单位。如果有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
	"time"
)

func main() {
	mtime := time.Date(2006, time.February, 1, 3, 4, 5, 0, time.UTC)
	atime := time.Date(2007, time.March, 2, 4, 5, 6, 0, time.UTC)
	if err := os.Chtimes("some-filename", atime, mtime); err != nil {
		log.Fatal(err)
	}
}
```

### func Clearenv

```go
func Clearenv()
```

Clearenv 删除所有环境变量。

### func CopyFS

加入版本：go1.23.0

```go
func CopyFS(dir string, fsys fs.FS) error
```

CopyFS 将文件系统 fsys 复制到目录 dir 中，必要时创建 dir。

文件以 mode 0o666 加上源文件的任何执行权限创建，目录以 mode 0o777 创建（在 umask 之前）。

CopyFS 不会覆盖现有文件。如果 fsys 中的文件名在目标中已存在，CopyFS 将返回一个错误，使得 errors.Is(err, fs.ErrExist) 为 true。

Dir 中的符号链接会被跟随。

CopyFS 运行时添加到 fsys 的新文件（包括如果 dir 是 fsys 的子目录）不保证被复制。

复制在遇到第一个错误时停止并返回该错误。

### func DirFS

加入版本：go1.16

```go
func DirFS(dir string) fs.FS
```

DirFS 返回一个文件系统（fs.FS），对应根目录为 dir 的文件树。

注意，DirFS("/prefix") 仅保证它对操作系统进行的 Open 调用将以 "/prefix" 开头：DirFS("/prefix").Open("file") 等同于 os.Open("/prefix/file")。因此，如果 /prefix/file 是指向 /prefix 树外部的符号链接，使用 DirFS 不会比使用 os.Open 更阻止访问。此外，为相对路径 DirFS("prefix") 返回的 fs.FS 的根将受后续 Chdir 调用的影响。因此当目录树包含任意内容时，DirFS 不能作为 chroot 风格安全机制的通用替代品。

请使用 Root.FS 来获取能够防止通过符号链接逃逸树的 fs.FS。

目录 dir 不能为 ""。

结果实现了 io/fs.StatFS、io/fs.ReadFileFS、io/fs.ReadDirFS 和 io/fs.ReadLinkFS。

### func Environ

```go
func Environ() []string
```

Environ 返回表示环境的字符串副本，格式为 "key=value"。

### func Executable

加入版本：go1.8

```go
func Executable() (string, error)
```

Executable 返回启动当前进程的可执行文件的路径名。不保证该路径仍然指向正确的可执行文件。如果使用符号链接启动进程，根据操作系统的不同，结果可能是符号链接或它指向的路径。如果需要稳定结果，path/filepath.EvalSymlinks 可能有所帮助。

Executable 返回绝对路径，除非发生错误。

主要用例是查找相对于可执行文件定位的资源。

### func Exit

```go
func Exit(code int)
```

Exit 使当前程序以给定的状态码退出。按照惯例，代码零表示成功，非零表示错误。程序立即终止；延迟函数不会运行。

为了可移植性，状态码应在 [0, 125] 范围内。

### func Expand

```go
func Expand(s string, mapping func(string) string) string
```

Expand 根据映射函数替换字符串中的 ${var} 或 $var。例如，os.ExpandEnv(s) 等价于 os.Expand(s, os.Getenv)。

示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	mapper := func(placeholderName string) string {
		switch placeholderName {
		case "DAY_PART":
			return "morning"
		case "NAME":
			return "Gopher"
		}

		return ""
	}

	fmt.Println(os.Expand("Good ${DAY_PART}, $NAME!", mapper))

}
```

Output:

```
Good morning, Gopher!
```

### func ExpandEnv

```go
func ExpandEnv(s string) string
```

ExpandEnv 根据当前环境变量的值替换字符串中的 ${var} 或 $var。对未定义变量的引用将替换为空字符串。

示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	os.Setenv("NAME", "gopher")
	os.Setenv("BURROW", "/usr/gopher")

	fmt.Println(os.ExpandEnv("$NAME lives in ${BURROW}."))

}
```

Output:

```
gopher lives in /usr/gopher.
```

### func Getegid

```go
func Getegid() int
```

Getegid 返回调用者的有效组 ID。在 Windows 上返回 -1。

### func Getenv

```go
func Getenv(key string) string
```

Getenv 检索键命名的环境变量的值。它返回值，如果变量不存在则为空。要区分空值和未设置值，请使用 LookupEnv。

示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	os.Setenv("NAME", "gopher")
	os.Setenv("BURROW", "/usr/gopher")

	fmt.Printf("%s lives in %s.\n", os.Getenv("NAME"), os.Getenv("BURROW"))

}
```

Output:

```
gopher lives in /usr/gopher.
```

### func Geteuid

```go
func Geteuid() int
```

Geteuid 返回调用者的有效用户 ID。在 Windows 上返回 -1。

### func Getgid

```go
func Getgid() int
```

Getgid 返回调用者的组 ID。在 Windows 上返回 -1。

### func Getgroups

```go
func Getgroups() ([]int, error)
```

Getgroups 返回调用者所属组的数字组 ID 列表。

### func Getpagesize

```go
func Getpagesize() int
```

Getpagesize 返回底层系统的内存页大小。

### func Getpid

```go
func Getpid() int
```

Getpid 返回调用者的进程 ID。

### func Getppid

```go
func Getppid() int
```

Getppid 返回调用者的父进程 ID。

### func Getuid

```go
func Getuid() int
```

Getuid 返回调用者的数字用户 ID。在 Windows 上返回 -1。

### func Getwd

```go
func Getwd() (dir string, err error)
```

Getwd 返回当前工作目录的根路径名。如果当前目录可以通过多条路径到达（由于符号链接），Getwd 可能返回其中任意一条。

### func Hostname

```go
func Hostname() (name string, err error)
```

Hostname 返回内核报告的主机名。

### func IsExist

```go
func IsExist(err error) bool
```

IsExist 返回一个布尔值，指示错误是否已知为报告文件或目录已存在。它满足 errors.Is(err, fs.ErrExist)。

### func IsNotExist

```go
func IsNotExist(err error) bool
```

IsNotExist 返回一个布尔值，指示错误是否已知为报告文件或目录不存在。它满足 errors.Is(err, fs.ErrNotExist)。

### func IsPathSeparator

```go
func IsPathSeparator(c uint8) bool
```

IsPathSeparator 报告 c 是否为目录分隔符。

### func IsPermission

```go
func IsPermission(err error) bool
```

IsPermission 返回一个布尔值，指示错误是否已知为报告权限被拒绝。它满足 errors.Is(err, fs.ErrPermission)。

### func IsTimeout

加入版本：go1.10

```go
func IsTimeout(err error) bool
```

IsTimeout 返回一个布尔值，指示错误是否已知为报告超时。

### func Lchown

```go
func Lchown(name string, uid, gid int) error
```

Lchown 更改命名文件的数字 uid 和 gid。如果文件是符号链接，它更改链接本身的 uid 和 gid，而不是链接指向的文件。uid 或 gid 为 -1 表示不更改该值。如果有错误，其类型将为 *PathError。

在 Windows 或 Plan 9 上，Lchown 始终返回 syscall.EWINDOWS 或 syscall.EPLAN9 错误，包装在 *PathError 中。

### func Link

```go
func Link(oldname, newname string) error
```

Link 创建一个名为 newname 的硬链接指向 oldname。如果有错误，其类型将为 *LinkError。

### func LookupEnv

加入版本：go1.5

```go
func LookupEnv(key string) (string, bool)
```

LookupEnv 检索键命名的环境变量。如果变量存在于环境中，则返回值（可能为空）和 true。否则返回的值为空，布尔值为 false。

示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	show := func(key string) {
		val, ok := os.LookupEnv(key)
		if !ok {
			fmt.Printf("%s not set\n", key)
		} else {
			fmt.Printf("%s=%s\n", key, val)
		}
	}

	os.Setenv("SOME_KEY", "value")
	os.Setenv("EMPTY_KEY", "")
	show("SOME_KEY")
	show("EMPTY_KEY")
	show("MISSING_KEY")

}
```

Output:

```
SOME_KEY=value
EMPTY_KEY=
MISSING_KEY not set
```

### func Mkdir

```go
func Mkdir(name string, perm FileMode) error
```

Mkdir 使用指定的名称和权限位创建一个新目录。如果有错误，其类型将为 *PathError。

### func MkdirAll

```go
func MkdirAll(path string, perm FileMode) error
```

MkdirAll 创建一个名为 path 的目录，以及任何必要的父目录，并设置权限位 perm。如果 path 已经是一个目录，MkdirAll 什么也不做并返回 nil。如果 path 包含一个以上路径元素，MkdirAll 将创建所有父目录（其权限也是 perm），如果父目录已经存在则忽略。如果 path 的最后一个元素是普通文件，将返回错误（不是 *PathError）。如果有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	err := os.MkdirAll("/tmp/dirs", 0750)
	if err != nil {
		log.Fatal(err)
	}
}
```

### func MkdirTemp

加入版本：go1.16

```go
func MkdirTemp(dir, pattern string) (string, error)
```

MkdirTemp 在目录 dir 中创建一个新的临时目录，并返回该目录的路径名。新目录的名称通过向 pattern 添加随机字符串生成。如果 pattern 包含 "*"，则随机字符串替换最后一个 "*"。如果 dir 为空字符串，MkdirTemp 使用 TempDir 返回的目录。如果创建目录或文件的多个程序调用，则同时调用 MkdirTemp 时，不同时存在的目录不太可能具有相同的名称。

示例：

```go
package main

import (
	"log"
	"os"
	"path/filepath"
)

func main() {
	dir, err := os.MkdirTemp("", "example")
	if err != nil {
		log.Fatal(err)
	}
	defer os.RemoveAll(dir)

	file := filepath.Join(dir, "tmpfile")
	if err := os.WriteFile(file, []byte("content"), 0666); err != nil {
		log.Fatal(err)
	}
}
```

### func NewSyscallError

```go
func NewSyscallError(syscall string, err error) error
```

NewSyscallError 返回一个新的 SyscallError，包含给定的系统调用名称和错误详细信息。如果 err 为 nil，则返回 nil。

### func Pipe

```go
func Pipe() (r *File, w *File, err error)
```

Pipe 返回一对连接的 File。从 r 读取返回写入 w 的数据。它返回文件和错误（如果有）。

### func ReadFile

加入版本：go1.16

```go
func ReadFile(name string) ([]byte, error)
```

ReadFile 读取命名文件并返回其内容。成功调用返回 nil 错误，而非 io.EOF。（因为 ReadFile 读取整个文件，最终 Read 时预期的 EOF 不会被视为需要报告的错误。）如果 name 中有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	data, err := os.ReadFile("testdata/hello")
	if err != nil {
		log.Fatal(err)
	}
	os.Stdout.Write(data)

}
```

Output:

```
Hello, Go!
```

### func Readlink

```go
func Readlink(name string) (string, error)
```

Readlink 返回命名符号链接的目标。如果有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	link, err := os.Readlink("some-symlink")
	if err != nil {
		// handle
	}
	fmt.Println(link)
}
```

### func Remove

```go
func Remove(name string) error
```

Remove 删除命名文件或（空）目录。如果有错误，其类型将为 *PathError。

### func RemoveAll

```go
func RemoveAll(path string) error
```

RemoveAll 删除 path 及其包含的任何子项。它删除 Remove 能删除的所有内容，如果 path 不存在，RemoveAll 返回 nil。（它不返回 fs.ErrNotExist。）如果 path 的路径中的父目录不存在，RemoveAll 返回错误。如果有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	err := os.RemoveAll("/tmp/example")
	if err != nil {
		log.Fatal(err)
	}
}
```

### func Rename

```go
func Rename(oldpath, newpath string) error
```

Rename 将 oldpath 重命名为 newpath。如果 newpath 已经存在且不是目录，Rename 将替换它。如果 oldpath 和 newpath 在同一目录中，则重命名是原子操作。如果 newpath 存在且是目录，Rename 将报告错误（不是原子操作）。如果 newpath 的父目录不存在，也会报告错误。如果有错误，其类型将为 *LinkError。

### func SameFile

```go
func SameFile(fi1, fi2 FileInfo) bool
```

SameFile 报告 fi1 和 fi2 是否描述同一文件。例如，在 Unix 上，这意味着两个底层操作系统文件描述符的设备和 inode 编号相同。

### func Setenv

```go
func Setenv(key, value string) error
```

Setenv 设置名为 key 的环境变量。它返回错误（如果有）。

### func Symlink

```go
func Symlink(oldname, newname string) error
```

Symlink 创建一个名为 newname 的符号链接指向 oldname。如果有错误，其类型将为 *LinkError。

### func TempDir

```go
func TempDir() string
```

TempDir 返回用于临时文件的默认目录。

在 Unix 系统上，它返回 $TMPDIR（如果非空），否则返回 /tmp。在 Windows 上，它使用 GetTempPath，从 %TMP%、%TEMP%、%USERPROFILE% 或 Windows 目录返回第一个非空值。在 Plan 9 上，它返回 /tmp。

该目录不能保证存在且具有访问权限。

### func Truncate

```go
func Truncate(name string, size int64) error
```

Truncate 更改命名文件的大小。如果文件是符号链接，它更改链接目标的大小。如果有错误，其类型将为 *PathError。

### func Unsetenv

加入版本：go1.4

```go
func Unsetenv(key string) error
```

Unsetenv 取消设置名为 key 的环境变量。它返回错误（如果有）。

示例：

```go
package main

import (
	"os"
)

func main() {
	os.Setenv("NAME", "gopher")
	os.Setenv("BURROW", "/usr/gopher")

	os.Unsetenv("BURROW")
}
```

### func UserCacheDir

加入版本：go1.11

```go
func UserCacheDir() (string, error)
```

UserCacheDir 返回当前用户缓存目录的默认根目录。在多个使用相同目录的程序中，用户可以使用应用程序特定的子目录。

在 Unix 系统上，它返回 $XDG_CACHE_HOME（如果非空），否则返回 $HOME/.cache。在 Darwin 上，它返回 $HOME/Library/Caches。在 Windows 上，它返回 %LocalAppData%。在 Plan 9 上，它返回 $home/lib/cache。

示例：

```go
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(cacheDir)
}
```

### func UserConfigDir

加入版本：go1.13

```go
func UserConfigDir() (string, error)
```

UserConfigDir 返回当前用户配置目录的默认根目录。在多个使用相同目录的程序中，用户可以使用应用程序特定的子目录。

在 Unix 系统上，它返回 $XDG_CONFIG_HOME（如果非空），否则返回 $HOME/.config。在 Darwin 上，它返回 $HOME/Library/Application Support。在 Windows 上，它返回 %AppData%。在 Plan 9 上，它返回 $home/lib/conf。

示例：

```go
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	configDir, err := os.UserConfigDir()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(configDir)
}
```

### func UserHomeDir

加入版本：go1.12

```go
func UserHomeDir() (string, error)
```

UserHomeDir 返回当前用户主目录的路径名。

在 Unix 上，包括 macOS，它返回 $HOME 环境变量（如果设置）；否则通过用户查找运行系统调用。在 Windows 上，它返回 %USERPROFILE%。在 Plan 9 上，它返回 $home 环境变量。

### func WriteFile

加入版本：go1.16

```go
func WriteFile(name string, data []byte, perm FileMode) error
```

WriteFile 将数据写入命名文件，如果文件不存在则创建。如果文件存在，WriteFile 在写入前将其截断。文件权限位在文件创建时设置为 perm。如果 name 中有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	err := os.WriteFile("/tmp/example.txt", []byte("Hello, Go!"), 0666)
	if err != nil {
		log.Fatal(err)
	}
}
```

## Types

### type DirEntry

加入版本：go1.16

```go
type DirEntry = fs.DirEntry
```

DirEntry 是从目录中读取的条目（使用 ReadDir 函数或 File.ReadDir 方法）。

#### func ReadDir

加入版本：go1.16

```go
func ReadDir(name string) ([]DirEntry, error)
```

ReadDir 读取命名目录，返回按文件名排序的目录条目列表。如果有错误，其类型将为 *PathError。

### type File

```go
type File struct {
	// Has unexported fields.
}
```

File 表示一个打开的文件描述符。

#### func Create

```go
func Create(name string) (*File, error)
```

Create 创建或截断命名文件。如果文件已经存在，它将被截断。如果文件不存在，则以 mode 0666（在 umask 之前）创建。如果成功，返回的 File 上的方法可用于 I/O；关联的文件描述符具有 O_RDWR 模式。如果有错误，其类型将为 *PathError。

#### func CreateTemp

加入版本：go1.16

```go
func CreateTemp(dir, pattern string) (*File, error)
```

CreateTemp 在目录 dir 中创建一个新的临时文件，打开该文件进行读写，并返回生成的 *File。文件名通过向 pattern 添加随机字符串生成。如果 pattern 包含 "*"，则随机字符串替换最后一个 "*"。如果 dir 为空字符串，CreateTemp 使用 TempDir 返回的目录。创建文件或多个程序调用的同时调用，不同时存在的文件不太可能具有相同的名称。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	f, err := os.CreateTemp("", "example")
	if err != nil {
		log.Fatal(err)
	}
	defer os.Remove(f.Name())
	if _, err := f.Write([]byte("content")); err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}
```

#### func NewFile

```go
func NewFile(fd uintptr, name string) *File
```

NewFile 返回一个具有给定文件描述符和名称的新 File。如果 fd 不是有效的文件描述符，返回值将为 nil。在 Unix 系统上，如果 fd 为 0（标准输入），则返回 Stdin。

#### func Open

```go
func Open(name string) (*File, error)
```

Open 打开命名文件进行读取。如果成功，返回的 File 上的方法可用于读取；关联的文件描述符具有 O_RDONLY 模式。如果有错误，其类型将为 *PathError。

#### func OpenFile

```go
func OpenFile(name string, flag int, perm FileMode) (*File, error)
```

OpenFile 是通用打开调用；大多数用户会使用 Open 或 Create。它使用指定的标志（O_RDONLY 等）打开命名文件。如果文件不存在并且传递了 O_CREATE 标志，则使用模式 perm（在 umask 之前）创建文件。如果成功，返回的 File 上的方法可用于 I/O。如果有错误，其类型将为 *PathError。

示例：

```go
package main

import (
	"log"
	"os"
)

func main() {
	f, err := os.OpenFile("notes.txt", os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}
```

#### func OpenInRoot

加入版本：go1.24.0

```go
func OpenInRoot(dir, name string) (*File, error)
```

OpenInRoot 在 Root dir 内打开命名文件，确保 name 在 dir 内，且 dir 本身在 root 内。Opts 只能指定 O_RDONLY、O_WRONLY、O_RDWR。如果有错误，其类型将为 *PathError。

#### func (*File) Chdir

```go
func (f *File) Chdir() error
```

Chdir 将当前工作目录更改为文件所在的目录，f 必须是目录。如果有错误，其类型将为 *PathError。

#### func (*File) Chmod

```go
func (f *File) Chmod(mode FileMode) error
```

Chmod 更改文件的模式。如果有错误，其类型将为 *PathError。

#### func (*File) Chown

```go
func (f *File) Chown(uid, gid int) error
```

Chown 更改文件的数字 uid 和 gid。如果有错误，其类型将为 *PathError。

#### func (*File) Close

```go
func (f *File) Close() error
```

Close 关闭 File，使其无法用于 I/O。如果可能，它会导致文件描述符上的阻塞 I/O 被取消，并等待所有延迟的 I/O 操作完成，然后返回任何错误。它返回错误（如果有）。

#### func (*File) Fd

```go
func (f *File) Fd() uintptr
```

Fd 返回与文件关联的整数 Unix 文件描述符。

#### func (*File) Name

```go
func (f *File) Name() string
```

Name 返回传递给 Open 的文件名。

#### func (*File) Read

```go
func (f *File) Read(b []byte) (n int, err error)
```

Read 从 File 中读取最多 len(b) 个字节，存储到 b 中。它返回读取的字节数和任何遇到的错误。在文件末尾，Read 返回 0 和 io.EOF。

#### func (*File) ReadAt

```go
func (f *File) ReadAt(b []byte, off int64) (n int, err error)
```

ReadAt 从文件偏移量 off 开始读取最多 len(b) 个字节，存储到 b 中。它返回读取的字节数和错误（如果有）。当 n < len(b) 时，ReadAt 始终返回非 nil 错误。在文件末尾，该错误是 io.EOF。

#### func (*File) ReadDir

加入版本：go1.16

```go
func (f *File) ReadDir(n int) ([]DirEntry, error)
```

ReadDir 读取与文件 f 关联的目录内容，并返回最多 n 个 DirEntry 值的切片（按目录顺序）。如果 n > 0，ReadDir 最多返回 n 个条目，如果 n <= 0，ReadDir 返回所有剩余条目。返回的切片包含从一次读取中获得的条目。如果在读取少于 n 个条目后到达目录末尾，ReadDir 返回此条目和 io.EOF。如果 ReadDir 没有读取任何条目就到达目录末尾，它返回 nil 切片和 io.EOF。

#### func (*File) ReadFrom

加入版本：go1.15

```go
func (f *File) ReadFrom(r io.Reader) (n int64, err error)
```

ReadFrom 从 r 读取数据直到 EOF 或错误。返回值 n 是读取的字节数。在读取期间遇到的任何错误也会返回。ReadFrom 使用 WriteTo 方法将请求委托给底层读取器（如果读取器具有 WriteTo 方法）。

#### func (*File) Readdir

```go
func (f *File) Readdir(n int) ([]FileInfo, error)
```

Readdir 读取与文件 f 关联的目录内容，并返回最多 n 个 FileInfo 值的切片（按目录顺序）。如果 n > 0，Readdir 最多返回 n 个 FileInfo 结构。如果 n <= 0，Readdir 返回单个切片中目录中所有 FileInfo。在切片末尾，错误是 io.EOF。

已弃用：请改用 ReadDir。

#### func (*File) Readdirnames

```go
func (f *File) Readdirnames(n int) (names []string, err error)
```

Readdirnames 读取与文件 f 关联的目录内容，并返回最多 n 个文件名的切片（按目录顺序）。如果 n > 0，Readdirnames 最多返回 n 个名称。如果 n <= 0，Readdirnames 返回单个切片中目录中所有名称。在切片末尾，错误是 io.EOF。

已弃用：请改用 ReadDir。

#### func (*File) Seek

```go
func (f *File) Seek(offset int64, whence int) (ret int64, err error)
```

Seek 设置下一次 Read 或 Write 的文件偏移量，根据 whence 解释：0 表示相对于文件起始位置，1 表示相对于当前偏移量，2 表示相对于结尾。它返回新的偏移量和错误（如果有）。文件偏移量的行为因操作系统而异；有些操作系统跟踪未写入结尾之后区域的虚拟零填充字节，而有些则不跟踪。

#### func (*File) SetDeadline

加入版本：go1.10

```go
func (f *File) SetDeadline(t time.Time) error
```

SetDeadline 设置文件的读写截止时间。它等价于同时调用 SetReadDeadline 和 SetWriteDeadline。

只有某些类型的文件支持设置截止时间。例如，普通文件不支持设置截止时间。支持截止时间的文件包括：os.Stdin、os.Stdout、os.Stderr、os.Pipe()、net.Conn 以及由 os.OpenFile 打开但仅使用 syscall.NONBLOCK 标志的设备文件。

#### func (*File) SetReadDeadline

加入版本：go1.10

```go
func (f *File) SetReadDeadline(t time.Time) error
```

SetReadDeadline 设置文件的读取截止时间。有关详细信息，请参见 SetDeadline。

#### func (*File) SetWriteDeadline

加入版本：go1.10

```go
func (f *File) SetWriteDeadline(t time.Time) error
```

SetWriteDeadline 设置文件的写入截止时间。有关详细信息，请参见 SetDeadline。

#### func (*File) Stat

```go
func (f *File) Stat() (FileInfo, error)
```

Stat 返回描述文件的 FileInfo。如果有错误，其类型将为 *PathError。

#### func (*File) Sync

```go
func (f *File) Sync() error
```

Sync 将文件的当前内容提交到稳定存储。通常，这意味着刷新文件系统中最近写入数据的内存副本。

#### func (*File) SyscallConn

加入版本：go1.12

```go
func (f *File) SyscallConn() (syscall.RawConn, error)
```

SyscallConn 返回一个原始文件（raw file）。该接口实现了原始系统调用接口。

#### func (*File) Truncate

```go
func (f *File) Truncate(size int64) error
```

Truncate 更改文件的大小。它不会改变 I/O 偏移量。如果有错误，其类型将为 *PathError。

#### func (*File) Write

```go
func (f *File) Write(b []byte) (n int, err error)
```

Write 将 len(b) 个字节从 b 写入 File 中。它返回写入的字节数和错误（如果有）。当 n != len(b) 时返回非 nil 错误。

#### func (*File) WriteAt

```go
func (f *File) WriteAt(b []byte, off int64) (n int, err error)
```

WriteAt 从文件偏移量 off 开始将 len(b) 个字节写入 File。它返回写入的字节数和错误（如果有）。当 n != len(b) 时返回非 nil 错误。

#### func (*File) WriteString

```go
func (f *File) WriteString(s string) (n int, err error)
```

WriteString 类似于 Write，但写入的是字符串 s 的内容而不是字节切片。

#### func (*File) WriteTo

加入版本：go1.22.0

```go
func (f *File) WriteTo(w io.Writer) (n int64, err error)
```

WriteTo 将数据从 f 写入 w，直到 f 上没有更多数据可读取或发生错误。返回值 n 是写入的字节数。在写入期间遇到的任何错误也会返回。WriteTo 使用 WriteTo 方法将请求委托给底层读取器（如果读取器具有 ReadFrom 方法）。WriteTo 不缓冲数据。

### type FileInfo

```go
type FileInfo = fs.FileInfo
```

FileInfo 描述一个文件，由 Stat 返回。

类型 FileInfo 是 fs.FileInfo 的别名。

#### func Lstat

```go
func Lstat(name string) (FileInfo, error)
```

Lstat 返回描述命名文件的 FileInfo。如果文件是符号链接，返回的 FileInfo 描述该符号链接本身。Lstat 不尝试跟随链接。如果有错误，其类型将为 *PathError。

#### func Stat

```go
func Stat(name string) (FileInfo, error)
```

Stat 返回描述命名文件的 FileInfo。如果有错误，其类型将为 *PathError。

### type FileMode

```go
type FileMode = fs.FileMode
```

FileMode 表示文件的模式和权限位。

### type LinkError

```go
type LinkError struct {
	Op  string
	Old string
	New string
	Err error
}
```

LinkError 记录链接或重命名操作中的错误以及导致错误的路径。

#### func (*LinkError) Error

```go
func (e *LinkError) Error() string
```

#### func (*LinkError) Unwrap

加入版本：go1.13

```go
func (e *LinkError) Unwrap() error
```

### type PathError

```go
type PathError = fs.PathError
```

PathError 记录错误以及导致错误的操作和文件路径。

### type ProcAttr

```go
type ProcAttr struct {
	Dir   string
	Env   []string
	Files []*File
	Sys   *syscall.SysProcAttr
}
```

ProcAttr 保存 StartProcess 将用于新进程的属性。

### type Process

```go
type Process struct {
	Pid int
	// Has unexported fields.
}
```

Process 存储有关由 StartProcess 创建的进程的信息。

#### func FindProcess

```go
func FindProcess(pid int) (*Process, error)
```

FindProcess 通过 pid 查找正在运行的进程。返回的 Process 可用于获取有关底层操作系统进程的信息。在 Unix 系统上，FindProcess 始终成功并返回一个 Process 用于给定的 pid，无论进程是否存在。要测试进程是否实际存在，请发送信号 0。

#### func StartProcess

```go
func StartProcess(name string, argv []string, attr *ProcAttr) (*Process, error)
```

StartProcess 使用 program 的参数、属性和资源启动一个新进程。StartProcess 是一个低级接口。os/exec 包提供了更高级别的接口。

如果 err != nil，它总是 *PathError。

#### func (*Process) Kill

```go
func (p *Process) Kill() error
```

Kill 导致进程立即退出。Kill 不会等待进程实际退出。这不会杀死其他进程或它自己的子进程。

#### func (*Process) Release

```go
func (p *Process) Release() error
```

Release 释放与 Process 关联的任何资源，使其无法在将来使用。仅调用 Wait 不足以释放与 Process 关联的资源：调用 Release 以释放与 p 关联的操作系统资源。

#### func (*Process) Signal

```go
func (p *Process) Signal(sig Signal) error
```

Signal 向 Process 发送信号。

#### func (*Process) Wait

```go
func (p *Process) Wait() (*ProcessState, error)
```

Wait 等待 Process 退出，然后返回一个 ProcessState 描述其状态和错误（如果有）。Wait 释放与 Process 关联的所有资源。在大多数操作系统上，Process 必须是启动的子进程；否则系统可能会阻止当前进程挂起。

#### func (*Process) WithHandle

加入版本：go1.26.0

```go
func (p *Process) WithHandle(f func(handle uintptr)) error
```

WithHandle 在进程的句柄上调用函数 f。句柄仅在调用 f 期间有效，不得存储。

### type ProcessState

```go
type ProcessState struct {
	// Has unexported fields.
}
```

ProcessState 存储有关进程的信息，由 Wait 报告。

#### func (*ProcessState) ExitCode

加入版本：go1.12

```go
func (p *ProcessState) ExitCode() int
```

ExitCode 返回进程的退出码。如果进程尚未退出或被信号终止，则返回 -1。

#### func (*ProcessState) Exited

```go
func (p *ProcessState) Exited() bool
```

Exited 报告进程是否已退出。

#### func (*ProcessState) Pid

```go
func (p *ProcessState) Pid() int
```

Pid 返回已退出进程的进程 ID。

#### func (*ProcessState) String

```go
func (p *ProcessState) String() string
```

#### func (*ProcessState) Success

```go
func (p *ProcessState) Success() bool
```

Success 报告进程是否成功退出，例如 Unix 上的退出码为 0。

#### func (*ProcessState) Sys

```go
func (p *ProcessState) Sys() any
```

Sys 返回关于该进程的底层系统特定退出信息。将其转换为适当的底层类型（例如 Unix 上的 syscall.WaitStatus）以访问其内容。

#### func (*ProcessState) SysUsage

```go
func (p *ProcessState) SysUsage() any
```

SysUsage 返回关于已退出进程的底层系统特定资源使用信息。

#### func (*ProcessState) SystemTime

```go
func (p *ProcessState) SystemTime() time.Duration
```

SystemTime 返回已退出进程及其子进程的系统 CPU 时间。

#### func (*ProcessState) UserTime

```go
func (p *ProcessState) UserTime() time.Duration
```

UserTime 返回已退出进程及其子进程的用户 CPU 时间。

### type Root

加入版本：go1.24.0

```go
type Root struct {
	// Has unexported fields.
}
```

Root 表示文件系统层次结构中的根目录。通过 Root 执行的文件系统操作保证不会通过解析路径中的符号链接逃离根目录。

#### func OpenRoot

加入版本：go1.24.0

```go
func OpenRoot(name string) (*Root, error)
```

OpenRoot 打开一个 Root。根目录 name 不得为 ""。如果有错误，其类型将为 *PathError。

#### func (*Root) Chmod

加入版本：go1.25.0

```go
func (r *Root) Chmod(name string, mode FileMode) error
```

Chmod 将根目录内命名文件的模式更改为 mode。

#### func (*Root) Chown

加入版本：go1.25.0

```go
func (r *Root) Chown(name string, uid, gid int) error
```

Chown 更改根目录内命名文件的数字 uid 和 gid。

#### func (*Root) Chtimes

加入版本：go1.25.0

```go
func (r *Root) Chtimes(name string, atime time.Time, mtime time.Time) error
```

Chtimes 更改根目录内命名文件的访问和修改时间。

#### func (*Root) Close

加入版本：go1.24.0

```go
func (r *Root) Close() error
```

Close 关闭根目录。

#### func (*Root) Create

加入版本：go1.24.0

```go
func (r *Root) Create(name string) (*File, error)
```

Create 在根目录内创建或截断命名文件。

#### func (*Root) FS

加入版本：go1.24.0

```go
func (r *Root) FS() fs.FS
```

FS 返回一个 fs.FS，其 Open 等方法在根目录内操作。

#### func (*Root) Lchown

加入版本：go1.25.0

```go
func (r *Root) Lchown(name string, uid, gid int) error
```

Lchown 更改根目录内命名链接的数字 uid 和 gid。

#### func (*Root) Link

加入版本：go1.25.0

```go
func (r *Root) Link(oldname, newname string) error
```

Link 在根目录内创建一个硬链接。

#### func (*Root) Lstat

加入版本：go1.24.0

```go
func (r *Root) Lstat(name string) (FileInfo, error)
```

Lstat 返回根目录内命名文件的 FileInfo，如果文件是符号链接则不跟随。

#### func (*Root) Mkdir

加入版本：go1.24.0

```go
func (r *Root) Mkdir(name string, perm FileMode) error
```

Mkdir 在根目录内创建一个新目录。

#### func (*Root) MkdirAll

加入版本：go1.25.0

```go
func (r *Root) MkdirAll(name string, perm FileMode) error
```

MkdirAll 在根目录内创建一个名为 name 的目录，以及任何必要的父目录。

#### func (*Root) Name

加入版本：go1.24.0

```go
func (r *Root) Name() string
```

Name 返回提供给 OpenRoot 的根目录名称。

#### func (*Root) Open

加入版本：go1.24.0

```go
func (r *Root) Open(name string) (*File, error)
```

Open 在根目录内打开命名文件进行读取。

#### func (*Root) OpenFile

加入版本：go1.24.0

```go
func (r *Root) OpenFile(name string, flag int, perm FileMode) (*File, error)
```

OpenFile 在根目录内以指定标志打开命名文件。

#### func (*Root) OpenRoot

加入版本：go1.24.0

```go
func (r *Root) OpenRoot(name string) (*Root, error)
```

OpenRoot 打开根目录内的一个子根目录。

#### func (*Root) ReadFile

加入版本：go1.25.0

```go
func (r *Root) ReadFile(name string) ([]byte, error)
```

ReadFile 读取根目录内命名文件的内容。

#### func (*Root) Readlink

加入版本：go1.25.0

```go
func (r *Root) Readlink(name string) (string, error)
```

Readlink 返回根目录内命名符号链接的目标。

#### func (*Root) Remove

加入版本：go1.24.0

```go
func (r *Root) Remove(name string) error
```

Remove 删除根目录内命名的文件或空目录。

#### func (*Root) RemoveAll

加入版本：go1.25.0

```go
func (r *Root) RemoveAll(name string) error
```

RemoveAll 删除根目录内 name 及其包含的任何子项。

#### func (*Root) Rename

加入版本：go1.25.0

```go
func (r *Root) Rename(oldname, newname string) error
```

Rename 在根目录内将 oldpath 重命名为 newpath。

#### func (*Root) Stat

加入版本：go1.24.0

```go
func (r *Root) Stat(name string) (FileInfo, error)
```

Stat 返回根目录内命名文件的 FileInfo。

#### func (*Root) Symlink

加入版本：go1.25.0

```go
func (r *Root) Symlink(oldname, newname string) error
```

Symlink 在根目录内创建一个符号链接。

#### func (*Root) WriteFile

加入版本：go1.25.0

```go
func (r *Root) WriteFile(name string, data []byte, perm FileMode) error
```

WriteFile 将数据写入根目录内的命名文件。

### type Signal

```go
type Signal interface {
	String() string
	Signal() // to distinguish from other Stringers
}
```

Signal 代表操作系统信号。通常的底层实现依赖于操作系统：在 Unix 上它是 syscall.Signal。

### type SyscallError

```go
type SyscallError struct {
	Syscall string
	Err     error
}
```

SyscallError 记录特定系统调用中的错误。

#### func (*SyscallError) Error

```go
func (e *SyscallError) Error() string
```

#### func (*SyscallError) Timeout

加入版本：go1.10

```go
func (e *SyscallError) Timeout() bool
```

Timeout 报告此错误是否表示超时。

#### func (*SyscallError) Unwrap

加入版本：go1.13

```go
func (e *SyscallError) Unwrap() error
```
