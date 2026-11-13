# fovlin-blog

Personal notes, built with [docs-go](https://github.com/fovlin/docs-go).
No Node.js, no bundler: one Go binary reads the Markdown and writes static HTML.

## Layout

```text
docs/          the Markdown pages
  index.md     the home page
public/        files copied as-is (images, fonts, robots.txt)
docs.json      site title, language, nav, footer, outline
sidebar.json   the navigation tree
dist/          the generated site (git ignored)
```

## Build

```bash
./build.sh
```

The script downloads the published `docs-go` binary from
<https://repo.acovia.net/packages/docs-go>, runs it, and writes the site to
`dist/`. No Go toolchain is needed, which is why Cloudflare Pages can run it
as is: build command `./build.sh`, output directory `dist`.

To preview locally with on-demand rendering, install docs-go and run
`docs-go dev .`.

## Writing

A page is a Markdown file under `docs/`. The first `#` heading becomes the page
title, and every `##` shows up in the outline on the right. Tables need the
three dash delimiter row:

```markdown
| a | b |
| --- | --- |
| 1 | 2 |
```

Raw HTML is escaped, so the Markdown subset is what you get.
