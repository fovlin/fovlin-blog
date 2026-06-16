# 前端基础

> 本文着重于介绍运行原理，关于 HTML 及其其他语言的教程，这些语言的内容远不止本文介绍的这些，可参考其他系统性教程，推荐 [MDN](https://developer.mozilla.org/zh-CN/) 来学习上述语言!

## 什么是网站

网站使用 HTTP 协议将 HTML 语言编写的 HTML 文件映射到网络上，使用 IP 地址或者域名来访问这些文件，同时使用 CSS 语言对网页的样式进行点缀，使用 JavaScript 语言编写用户与网页交互行为的脚本。

## HTML

html 是网站的骨架，是一种标记性语言，html 文件由数个标签组成，一个可以插入内容的标签以 `<XXX>` 开始，并以 `</XXX>` 结束，功能单一的一些标签则不需要有结束标签，一个标准的 html 文件结构如下：

```html
<!DOCTYPE html> <!--声明 html 文件-->
<header>
    <meta charset="utf-8"> 
</header>

<body>
   <h1>一个示例 HTML 文件</h1>
   <p>Hello World!</p>
</body>

<!--插入的 CSS 样式表，可以用来改变网页的外观。-->
<style>
</style>
```

`<body>` 标签表示一个主体板块。

`<meta>` 标签表示网页的元数据，在标签内写入网页的元数据，例如使用 utf-8 编码，为 `<meta charset="utf-8">`

`<h1>`  表示插入一个标题，二级标题使用 `<h2>` 标签，以此类推。

`<p>` 表示插入一段段落

> 浏览器中可以通过 `F12` 按键或 `ctrl + u` 来查看网站源代码。

## CSS 样式表

html 的样式可能会太单调，假设我们需要给标题一个颜色，并设置字体大小为 32 px，则可以写入以下 css 样式：

```css
h1 {
    color: #ffaf00;
    font-size: 32px;
}
```

花括号前写需要应用此效果的对象，为一个选择器，花括号中写入要应用的效果。

选择器可以直接填写标签名，假设我们有一个 `<h1 class="title">` 标签，其中 class 已经指定了类名，则我们可以选择整个类包含的标签。

> 一个 html 里可以包含多个同类的标签。

选择类名以应用 CSS，使用 `.` + 类名的方式：

```css
.title {
    color: #ffaf00;
    font-size: 32px;
}
```
假设我们有一个 `<h1 id="title">` 标签，其中 id 指定了 id 名，则我们可以选择单个包含该 id 的标签的标签。

> 一个 id 只能对应一个标签，一个 html 文件里不可出现多个同名的 id。

选择 id 以应用 CSS，使用 `#` + id 名的方式：

```css
#title {
    color: #ffaf00;
    font-size: 32px;
}
```

## 前端框架

手写 html 文件是一件对双手极其不友好的行为，因此出现了前端框架，例如 React、Vue、Angular、Svelte、SolidJS 等。

还有一类比较特殊的，专注于静态内容的框架，例如 Astro，Vitepress，Starlight(Astro 的一个文档主题框架)，这类框架统称为静态站点生成器（SSG）。

这些框架极大的缩短了工期，你可以依靠框架快速构建网站。