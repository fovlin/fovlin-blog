# 一些问题与解决方法

## sddm 在 nvidia 驱动下开机黑屏

这是 sddm 经典 bug，目前可以通过更换显示管理器，或者手动从 tty 使用 `startplasma-wayland` 来解决。

## 无线网络经常卡顿

使用 `lspci` 查看网卡型号，可以搜索一些开源驱动并安装来解决，如 realtek 8852 无线网卡等，在 github 中存在开源项目 `rtw89` 来解决驱动问题。