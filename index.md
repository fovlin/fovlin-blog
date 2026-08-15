---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
import Title from './.vitepress/vue/Title.vue'
import CardFiles from './.vitepress/vue/LinkCard.vue'
import Block from './.vitepress/vue/Block.vue'
import GridThr from './.vitepress/vue/GridThr.vue'
import GridTwo from './.vitepress/vue/GridTwo.vue'
import Connect from './.vitepress/vue/Connect.vue'
</script>


<Title url="/welcome" other_url="https://qm.qq.com/q/uvrNnH4bmg" title="Fovlin 档案册" tagline='Hi，我叫 Fovlin，可以叫我柏茯灵！一个化学生兼 JavaScript、GoLang 学习者，喜欢二次元、音乐、计算机、Minecraft。' tag="翻阅 ->" other_tag="添加我的 QQ 好友" img="/fovlin.png"></Title>

<Block title="联系方式">

<Connect name="邮箱-1" connect="fovlin@163.com"/>

<Connect name="邮箱-2" connect="user.fovlin@outlook.com" />

<Connect name="QQ" connect="339853356" url="https://qm.qq.com/q/uvrNnH4bmg"/>

<Connect name="微信" connect="BFling_06"/>

</Block>

<Block title="项目">

<GridTwo>

<CardFiles title="Acovia" href="https://acovia.net">更新激进的原版中世纪风格服务器，启用正版验证，支持基岩版，最重要的是，<a href="https://files.acovia.net/acovia-backups/">存档是公开的！！！</a></CardFiles>

<CardFiles title="Obsidian Acovia Theme" href="https://github.com/fovlin/obsidian-acovia-theme">与此网站有着相同配色方案的 Obsidian 主题，在护眼方面做了深度优化，适合长时间写作。</CardFiles>

<CardFiles title="Mc-saver" href="https://github.com/fovlin/mc-saver">使用 Go 语言编写的 MC 存档备份工具，可使用 Json 编写备份规则，进行自定义备份。</CardFiles>

</GridTwo>

</Block>

<center>使用 <a href="https://vitepress.dev/">Vitepress</a> 构建</center>