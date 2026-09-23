# 开发 fcitx5 主题

## 前言

fcitx5 没有官方权威的主题开发文档，本文档依照程序行为逆向而来。

## 主题路径

在 `/usr/share/fcitx5/themes` 目录下存放着默认的主题目录，程序会读取此文件夹下的 `.cong` 文件来显示外观。

通过复制此文件夹到等效目录，即用户目录下的 `~/.local/share/fcitx5/themes`，并进行自定义来定制的主题：

```bash
mkdir -p ~/.local/share/fcitx5/themes
cp -r /usr/share/fcitx5/themes/default ~/.local/share/fcitx5/themes/custom-theme
```

目录下包含下列文件：

```text
arrow.svg  next.svg  prev.svg  radio.svg  theme.conf
```

`theme.conf` 指定了程序渲染输入法主题的行为，以及如何使用这些 `svg` 文件，这些 `svg` 文件并不是必须的，仅仅因为 `theme.conf` 文件指定需要这些文件。

## 定制主题

修改 `theme.conf` 来定制你自己的输入法主题，搭配 `fcitx5-configtool` GUI 工具可以简化开发，默认的 `theme.conf` 文件内容如下：

```toml
[Metadata]
Name[ca]=Per defecte
Name[da]=Standard
Name[de]=Standard
Name[fr]=Par défaut
Name[ja]=デフォルト
Name[ka]=ნაგულისხმევი
Name[ko]=기본값
Name[ru]=По умолчанию
Name[sv]=Standard
Name[vi]=Mặc định
Name[zh_CN]=默认
Name[zh_TW]=預設
Name=Default
Version=1
Author=Fcitx
Description=Default Theme
ScaleWithDPI=True

[InputPanel]
NormalColor=#000000
HighlightColor=#ffffff
PageButtonAlignment=Last Candidate

[InputPanel/TextMargin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/ContentMargin]
Left=2
Right=2
Top=2
Bottom=2

[InputPanel/Background]
Color=#ffffff
BorderColor=#c0c0c0
BorderWidth=2

[InputPanel/Background/Margin]
Left=2
Right=2
Top=2
Bottom=2

[InputPanel/Highlight]
Color=#808080

[InputPanel/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/PrevPage]
Image=prev.svg

[InputPanel/PrevPage/ClickMargin]
Left=5
Right=5
Top=4
Bottom=4

[InputPanel/NextPage]
Image=next.svg

[InputPanel/NextPage/ClickMargin]
Left=5
Right=5
Top=4
Bottom=4

[Menu/Background]
Color=#ffffff
BorderColor=#c0c0c0
BorderWidth=2

[Menu/Background/Margin]
Left=2
Right=2
Top=2
Bottom=2

[Menu/ContentMargin]
Left=2
Right=2
Top=2
Bottom=2

[Menu/CheckBox]
Image=radio.svg

[Menu/SubMenu]
Image=arrow.svg

[Menu/Highlight]
Color=#808080

[Menu/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/Separator]
Color=#c0c0c0

[Menu/TextMargin]
Left=5
Right=5
Top=5
Bottom=5

[AccentColorField]
0=Input Panel Border
1=Input Panel Highlight Candidate Background
2=Input Panel Highlight
3=Menu Border
4=Menu Separator
5=Menu Selected Item Background
```

依据本文档开发出的可供参考的主题：

- [fcitx5-theme-acovia](https://github.com/fovlin/fcitx5-theme-acovia)