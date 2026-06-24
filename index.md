---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---
<script setup>
import Title from './.vitepress/vue/Title.vue'
import CardFiles from './.vitepress/vue/CardFiles.vue'
import GridThr from './.vitepress/vue/GridThr.vue'
import GridTwo from './.vitepress/vue/GridTwo.vue'
</script>


<Title url="/welcome" other_url="https://qm.qq.com/q/uvrNnH4bmg" title="Fovlin 档案册" tagline="记录了一些柏茯灵学习计算机的笔记，以及正在运营的一些项目" tag="翻阅 ->" other_tag="添加我的 QQ 好友" img="/fovlin.png"></Title>

<center><h1>项目</h1></center>

---

<GridTwo>

<CardFiles title="Acovia" href="/docs/acovia-server/">更新激进的原版中世纪风格服务器</CardFiles>
<p style="border-left:4px solid #ffaf00 ;background-color:var(--vp-c-yellow-soft); border-radius:16px; padding:12px 16px">柏茯灵初学 Linux 时，尝试使用 Linux 系统运营的 MInecraft 服务器，目前主要面向生存中世纪风格建筑向玩法，启用正版验证，支持基岩版，最重要的是，<a href="https://files.acovia.net/acovia-backups/">存档是公开的！！！</a></p>

<CardFiles title="Obsidian Acovia Theme" href="https://github.com/fovlin/obsidian-acovia-theme">护眼为主的 Obsidian 主题</CardFiles>
<p style="border-left:4px solid #ffaf00 ;background-color:var(--vp-c-yellow-soft); border-radius:16px; padding:12px 16px">与此网站有着相同配色方案的 Obsidian 主题，在护眼方面做了深度优化，适合长时间写作。</p>

</GridTwo>

---


<center>使用 <a href="https://vitepress.dev/">Vitepress</a> 构建 | 鲁ICP备 2025208075 号</center>