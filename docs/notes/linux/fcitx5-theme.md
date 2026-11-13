# fcitx5 主题开发笔记

fcitx5 没有官方权威的主题文档；这里按程序行为和默认主题记录。

## 主题目录

系统级主题放在 `/usr/share/fcitx5/themes`，用户级主题放在 `~/.local/share/fcitx5/themes`。用户目录优先；自定义主题放这里。

复制默认主题作为起点：

```bash
mkdir -p ~/.local/share/fcitx5/themes
cp -r /usr/share/fcitx5/themes/default ~/.local/share/fcitx5/themes/custom-theme
```

一个主题目录通常包含：

```text
arrow.svg  next.svg  prev.svg  radio.svg  theme.conf
```

`theme.conf` 描述主题如何渲染、引用哪些 SVG。SVG 不是必需的；只有配置里引用了对应图片时才需要提供。

## theme.conf 的结构

默认主题的 `theme.conf` 可以直接作为模板：

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

## 关键配置项

### Metadata

`Name` 是主题显示名，`Version` 是主题版本，`ScaleWithDPI` 控制是否随 DPI 缩放。带 `[zh_CN]` 这类后缀的 `Name` 是本地化名称。

### 输入法面板

| 配置段 | 作用 |
| --- | --- |
| `[InputPanel]` | 普通文字色、高亮文字色、翻页按钮位置 |
| `[InputPanel/Background]` | 面板背景色、边框色和边框宽度 |
| `[InputPanel/Highlight]` | 高亮候选的背景色 |
| `[InputPanel/PrevPage]` / `[InputPanel/NextPage]` | 翻页按钮使用的图片 |
| `[InputPanel/TextMargin]` / `[InputPanel/ContentMargin]` | 文字和内容的内边距 |

### 菜单

| 配置段 | 作用 |
| --- | --- |
| `[Menu/Background]` | 候选菜单背景、边框 |
| `[Menu/Highlight]` | 选中项背景 |
| `[Menu/CheckBox]` | 勾选框图片 |
| `[Menu/SubMenu]` | 子菜单箭头图片 |
| `[Menu/Separator]` | 分隔线颜色 |
| `[Menu/TextMargin]` | 菜单文字边距 |

### AccentColorField

`[AccentColorField]` 把主题颜色映射到 fcitx5 的强调色字段，序号对应界面元素。支持系统强调色时调整这里。

## 调试

修改后重启 fcitx5：

```bash
fcitx5 -r -d
```

也可在 `fcitx5-configtool` 的“附加组件 → 经典用户界面 → 主题”中切换查看效果。

## 参考

- [fcitx5-theme-acovia](https://github.com/fovlin/fcitx5-theme-acovia)：按这份笔记的思路制作的主题
