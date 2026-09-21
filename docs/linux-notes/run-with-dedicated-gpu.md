# 使用独立显卡运行程序

双显卡用户经常被程序默认运行在集成显卡中，而非独立显卡的问题所困扰，参考 AMD、NVIDIA 用户态驱动文档，检索到了一些解决方法。

## AMD 显卡

AMD 显卡的用户态驱动集成在 mesa3d 项目中，[Mesa 3D Environment Variables](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME) 文档说明，可以通过环境变量 `DRI_PRIME` 以切换显卡，原文如下：

```plaintext
## DRI_PRIME

默认 GPU 是 Wayland/Xorg 使用的 GPU 或连接到显示器的 GPU。这个变量允许选择不同的 GPU。它适用于 OpenGL 和 Vulkan（在这种情况下，“选择”意味着该 GPU 会排在报告的物理设备列表的首位）。支持的语法有：

DRI_PRIME=N：选择第 N 个非默认 GPU（N > 0）。

DRI_PRIME=pci-0000_02_00_0：选择连接到这个 PCIe 总线的 GPU。

DRI_PRIME=vendor_id:device_id：选择第一个匹配这些 ID 的 GPU。

对于 Vulkan，可以在后面加上 !，这时只会将所选 GPU 暴露给应用（例如：DRI_PRIME=1!）。
```

## NVIDIA 显卡

NVIDIA 驱动程序的 README 中说明：

```plaintext
配置图形应用程序使用 GPU 屏幕进行渲染
要将图形应用程序配置为使用 NVIDIA GPU 屏幕进行渲染，请将环境变量 __NV_PRIME_RENDER_OFFLOAD 设置为 1。如果图形应用程序使用 Vulkan 或 EGL，这就足够了。如果图形应用程序使用 GLX，还需要将环境变量 __GLX_VENDOR_LIBRARY_NAME 设置为 nvidia，这样 GLVND 就会加载 NVIDIA 的 GLX 驱动程序。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 vkcube
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxinfo | grep vendor

Vulkan 的更精细控制
环境变量 __NV_PRIME_RENDER_OFFLOAD 会导致加载特殊的 Vulkan 层 VK_LAYER_NV_optimus。Vulkan 应用程序使用 Vulkan API 枚举系统中的 GPU 并选择使用哪个 GPU；大多数 Vulkan 应用程序会使用 Vulkan 报告的第一个 GPU。更新的 Vulkan 加载器可以根据平台定义的标准对 GPU 枚举进行排序，将首选 GPU 放在最前面。VK_LAYER_NV_optimus 层会导致 GPU 按顺序排列，如果加载器没有自行排序，则 NVIDIA GPU 会优先枚举。为了更精细的控制，VK_LAYER_NV_optimus 层会查看环境变量 __VK_LAYER_NV_optimus。值 NVIDIA_only 会让 VK_LAYER_NV_optimus 始终将 GPU 排序，使 NVIDIA GPU 在 Vulkan 应用程序中优先枚举，覆盖任何 Vulkan 加载器的排序。值 non_NVIDIA_only 会让 VK_LAYER_NV_optimus 始终将 GPU 排序，使非 NVIDIA GPU 在 Vulkan 应用程序中优先枚举，同样覆盖加载器的排序。注意，VK_LAYER_NV_optimus 层只影响独立和集成 GPU 的排序，不会影响 CPU 设备。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=NVIDIA_only vkcube
__NV_PRIME_RENDER_OFFLOAD=1 __VK_LAYER_NV_optimus=non_NVIDIA_only vkcube

OpenGL 的更精细控制
对于使用 GLX 或 EGL 的 OpenGL，环境变量 __NV_PRIME_RENDER_OFFLOAD_PROVIDER 可提供更精细的控制。虽然 __NV_PRIME_RENDER_OFFLOAD=1 告诉 GLX 或 EGL 使用第一个 NVIDIA GPU 屏幕，__NV_PRIME_RENDER_OFFLOAD_PROVIDER 可以使用 RandR 提供程序的名称来选择特定的 NVIDIA GPU 屏幕，使用 `xrandr --listproviders` 报告的 NVIDIA GPU 屏幕名称。

示例：

__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
__NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
__NV_PRIME_RENDER_OFFLOAD=1 eglinfo
__NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 eglinfo
```

## 参考资料

- [Nvidia driver index](https://download.nvidia.com/XFree86/)
- [Arch linux wiki](https://wiki.archlinux.org.cn/title/PRIME)
- [Mesa 3D Environment Variables](https://docs.mesa3d.org/envvars.html#envvar-DRI_PRIME)