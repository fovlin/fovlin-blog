# 配置双系统引导


## 配置双系统引导

首先确保系统中正确安装了 `grub`、`os-prober`、`efibootmgr`。

grub 的配置文件位于 `/etc/default/grub` 中，所有的配置都应在此处更改，然后更新同步到系统中。

运行 `sudo os-prober` 命令，查找其他系统的引导信息。

```bash
sudo os-prober
```

运行 `sudo update-grub` 命令，更新 grub 引导信息。

```bash
sudo update-grub
```

若系统不支持此命令，需要手动更新配置文件。

```bash
sudo grub-makecfg -o /etc/grub/grub.cfg
```

> 部分发行版的 grub 命令可能是 grub2。

若 grub 分辨率过高而引起引导界面字体过小，可以运行 `xrandr` 查看显示器支持的分辨率，并修改 `/etc/default/grub` 文件中的 `GRUB_GFXMODE` 配置项降低分辨率。