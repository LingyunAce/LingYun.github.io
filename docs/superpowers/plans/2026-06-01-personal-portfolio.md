# Personal Portfolio Website (Hexo + Butterfly) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable personal portfolio site using Hexo + Butterfly theme, with a custom portfolio front page, project list, blog, and GitHub Pages deployment guide.

**Architecture:** Static site. Hexo generates HTML from Markdown + Pug templates + data files. Two custom Pug layouts (`portfolio`, `projects`) extend the Butterfly theme. Single data file (`projects.yml`) drives both the home grid and the projects page. Builds to `public/`, deploys to `gh-pages` branch.

**Tech Stack:** Hexo 7+, hexo-theme-butterfly, Node.js ≥ 18, npm, Git, optional GitHub Actions.

**Reference Spec:** `D:\AI\project\docs\superpowers\specs\2026-06-01-personal-portfolio-design.md`

---

## File Structure (what this plan creates)

```
D:\AI\project\PersonalWebsite\
├── _config.yml                    # Hexo site config
├── _config.butterfly.yml          # Butterfly theme overrides
├── package.json                   # npm scripts + deps
├── .gitignore
├── README.md                      # Chinese install/deploy guide
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions: build + deploy on push
├── source/
│   ├── _data/
│   │   └── projects.yml           # 4 sample projects (YAML)
│   ├── _posts/                    # 3 sample blog posts
│   │   ├── hello-world.md
│   │   ├── hexo-setup-notes.md
│   │   └── github-pages-deploy.md
│   ├── about/
│   │   └── index.md               # About page
│   ├── projects/
│   │   └── index.md               # Projects page
│   ├── index.md                   # Home page (layout: portfolio)
│   └── img/
│       ├── avatar.svg             # Placeholder avatar
│       ├── favicon.svg
│       └── projects/              # 4 project cover SVGs
│           ├── cover1.svg
│           ├── cover2.svg
│           ├── cover3.svg
│           └── cover4.svg
├── themes/
│   └── butterfly/
│       ├── layout/
│       │   ├── portfolio.pug      # Custom: Hero + grid + intro + CTA
│       │   └── projects.pug       # Custom: full project list + filter
│       └── source/
│           └── css/
│               └── portfolio.styl # Custom styles for portfolio layouts
│       └── source/
│           └── js/
│               └── projects-filter.js # Tag filter for /projects/
└── patches/                       # Backup of custom layouts (mitigation for theme updates)
    ├── portfolio.pug
    └── projects.pug
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `D:\AI\project\PersonalWebsite\package.json`
- Create: `D:\AI\project\PersonalWebsite\.gitignore`

- [ ] **Step 1: Create the project directory**

```bash
mkdir -p "D:/AI/project/PersonalWebsite"
cd "D:/AI/project/PersonalWebsite"
```

- [ ] **Step 2: Create `package.json`**

Write to `D:\AI\project\PersonalWebsite\package.json`:

```json
{
  "name": "personal-website",
  "version": "1.0.0",
  "private": true,
  "description": "Personal portfolio website built with Hexo + Butterfly",
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "server": "hexo server",
    "deploy": "hexo deploy",
    "new": "hexo new"
  },
  "hexo": {
    "version": "7.3.0"
  }
}
```

- [ ] **Step 3: Create `.gitignore`**

Write to `D:\AI\project\PersonalWebsite\.gitignore`:

```
node_modules/
public/
.deploy_git/
db.json
*.log
.DS_Store
.idea/
.vscode/
*.iml
```

- [ ] **Step 4: Verify Node and npm are available**

```bash
node --version
npm --version
```

Expected: `node` prints version `v18.x.x` or higher; `npm` prints version `9.x.x` or higher.

If Node < 18: install Node 18+ from https://nodejs.org/ before continuing.

---

## Task 2: Install Hexo and Core Dependencies

**Files:**
- Create: `D:\AI\project\PersonalWebsite\package.json` (modified — adds deps)
- Create: `D:\AI\project\PersonalWebsite\node_modules\`

- [ ] **Step 1: Install Hexo CLI globally (or use npx)**

Prefer `npx` to avoid global pollution. Verify the latest stable version:

```bash
npm view hexo version
```

Expected: prints something like `7.3.0` (the current latest). Note this version number.

- [ ] **Step 2: Add Hexo and all plugins as devDependencies**

```bash
cd "D:/AI/project/PersonalWebsite"
npm install --save-dev \
  hexo@^7.3.0 \
  hexo-renderer-pug \
  hexo-renderer-stylus \
  hexo-deployer-git \
  hexo-abbrlink \
  hexo-word-counter
```

Expected: installation completes; `node_modules/` directory exists; `package.json` now lists these under `devDependencies`.

- [ ] **Step 3: Verify installs**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo --version
```

Expected: prints `hexo: 7.x.x`, plus `os: ...`, `node: ...`, and a list of installed plugins (pug, stylus, git, abbrlink, word-counter).

---

## Task 3: Initialize Hexo Site Structure

**Files:**
- Create: `D:\AI\project\PersonalWebsite\scaffolds\`
- Create: `D:\AI\project\PersonalWebsite\source\_posts\hello-world.md` (default scaffold, will be replaced later)
- Create: `D:\AI\project\PersonalWebsite\themes\landscape\` (default theme; will be replaced)
- Create: `D:\AI\project\PersonalWebsite\_config.yml` (default; will be replaced in Task 4)
- Create: `D:\AI\project\PersonalWebsite\package.json` (may be modified to add hexo-cli)

- [ ] **Step 1: Run `hexo init` in the project directory**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo init . --no-install
```

The `--no-install` flag prevents re-installing (we already installed in Task 2).

Expected output includes: `INFO  Created: ...` for several files, and `INFO  Start blogging with Hexo!`

- [ ] **Step 2: Verify structure was created**

```bash
cd "D:/AI/project/PersonalWebsite"
ls -la
```

Expected: contains `scaffolds/`, `source/`, `themes/`, `_config.yml`, `package.json`, `.gitignore` (which `hexo init` may have overwritten — restore it from Task 1 if needed).

- [ ] **Step 3: Re-write `.gitignore` (hexo init may have replaced it)**

Write to `D:\AI\project\PersonalWebsite\.gitignore`:

```
node_modules/
public/
.deploy_git/
db.json
*.log
.DS_Store
.idea/
.vscode/
*.iml
```

- [ ] **Step 4: Verify hexo server starts with the default scaffold**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo server --port 4000
```

Expected: `INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.`

Open `http://localhost:4000` in a browser — you should see the default "Hello World" page with the **landscape** theme. Press `Ctrl+C` to stop.

If port 4000 is busy, use `--port 4001` and adjust later commands.

---

## Task 4: Replace Default Theme with Butterfly

**Files:**
- Delete: `D:\AI\project\PersonalWebsite\themes\landscape\` (after butterfly is installed)
- Create: `D:\AI\project\PersonalWebsite\themes\butterfly\` (installed via npm)

- [ ] **Step 1: Install hexo-theme-butterfly**

```bash
cd "D:/AI/project/PersonalWebsite"
npm install --save-dev hexo-theme-butterfly
```

Expected: `node_modules/hexo-theme-butterfly/` exists with files like `package.json`, `layout/`, `source/`.

- [ ] **Step 2: Configure Hexo to use the butterfly theme**

Edit `D:\AI\project\PersonalWebsite\_config.yml`. Find the `theme:` line and change it:

```yaml
theme: butterfly
```

(Replace the existing value `landscape`.)

- [ ] **Step 3: Create `_config.butterfly.yml` (empty placeholder for now)**

Write to `D:\AI\project\PersonalWebsite\_config.butterfly.yml`:

```yaml
# Butterfly theme overrides
# Documentation: https://butterfly.js.org/
# Override only the values you want to change; everything else uses theme defaults.
```

- [ ] **Step 4: Remove the default landscape theme**

```bash
cd "D:/AI/project/PersonalWebsite"
rm -rf themes/landscape
```

(On Windows / Git Bash this works; in PowerShell use `Remove-Item -Recurse themes/landscape`.)

- [ ] **Step 5: Start server and verify butterfly loads**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Expected: page loads with the **butterfly** theme. Header shows "Hexo" and the default article list. Press `Ctrl+C` to stop.

If you see "extends" errors or the page is unstyled: verify `themes/butterfly/layout/includes/` exists; verify `_config.butterfly.yml` is at the project root (not inside `themes/butterfly/`).

---

## Task 5: Write Site Config (`_config.yml`)

**Files:**
- Modify: `D:\AI\project\PersonalWebsite\_config.yml`

- [ ] **Step 1: Replace `_config.yml` with the full site config**

Write to `D:\AI\project\PersonalWebsite\_config.yml`:

```yaml
# Hexo site configuration
# Documentation: https://hexo.io/docs/configuration

# Site
title: [你的名字]
subtitle: [一句话介绍]
description: [个人简介，1-2 句话，用于 SEO meta 描述]
keywords: [关键词1, 关键词2, 关键词3]
author: [你的名字]
language: zh-CN
timezone: Asia/Shanghai

# URL
# Replace 'your-github-username' with your actual GitHub username before deploying
url: https://your-github-username.github.io
root: /
permalink: :year/:month/:day/:abbrlink/
permalink_defaults:
pretty_urls:
  trailing_index: true
  trailing_html: true

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md
default_layout: post
titlecase: false
external_link:
  enable: true
  field: site
  exclude:
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
syntax_highlighter: highlight.js
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ""

# Plugins (loaded in this order)
plugins:
  - hexo-renderer-pug
  - hexo-renderer-stylus
  - hexo-abbrlink
  - hexo-word-counter

# abbrlink
abbrlink:
  alg: crc16
  rep: hex
  auto_space:
  per_posts: true

# Markdown
marked:
  gfm: true
  pedantic: false
  breaks: false

# Search
search:
  path: search.xml
  field: post
  content: true
  format: html

# Deployment
# Replace with your actual repo URL before deploying
deploy:
  type: git
  repo: https://github.com/your-github-username/your-github-username.github.io.git
  branch: gh-pages
  message: "Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"

# Theme
theme: butterfly
```

- [ ] **Step 2: Verify the config loads without errors**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo generate
```

Expected: ends with `INFO  49 files generated in XXX ms`. No error messages. The `public/` directory now exists.

If you see errors: re-check YAML indentation (use 2 spaces, no tabs) and that all colons have a space after them.

---

## Task 6: Configure Butterfly Theme (`_config.butterfly.yml`)

**Files:**
- Modify: `D:\AI\project\PersonalWebsite\_config.butterfly.yml`

- [ ] **Step 1: Write the full butterfly config**

Write to `D:\AI\project\PersonalWebsite\_config.butterfly.yml`:

```yaml
# Butterfly theme configuration
# Full reference: https://butterfly.js.org/posts/4aa8abbe/

# Navigation menu (top of every page)
menu:
  首页: / || fa-solid fa-house
  归档: /archives/ || fa-solid fa-box-archive
  作品集: /projects/ || fa-solid fa-briefcase
  关于: /about/ || fa-solid fa-user
  博客 || fa-solid fa-feather-pointed:
    - 标签: /tags/ || fa-solid fa-tags
    - 分类: /categories/ || fa-solid fa-folder-open

# Code block style
highlight_theme: light
highlight_theme_dark: dark
code_copy: enable
code_lang: enable
code_widget: copy
code_expanded: false
code_height_limit: 200

# Sidebar
sidebar:
  position: right
  display: always

# Avatar
avatar:
  img: /img/avatar.svg
  effect: true

# Social links (icons in header)
social:
  GitHub: https://github.com/[你的GitHub用户名] || fa-brands fa-github
  邮箱: mailto:[你的邮箱] || fa-solid fa-envelope
  知乎: https://www.zhihu.com/people/[你的知乎ID] || fa-brands fa-zhihu
  掘金: https://juejin.cn/user/[你的掘金ID] || fa-brands fa-zhihu
  微博: https://weibo.com/[你的微博ID] || fa-brands fa-weibo

# Footer
footer:
  owner:
    enable: true
    since: 2026
  custom_text: <p>Powered by <a target="_blank" rel="noopener" href="https://hexo.io">Hexo</a> & <a target="_blank" rel="noopener" href="https://github.com/jerryc127/hexo-theme-butterfly">Butterfly</a></p>
  copyright: false

# Related articles
related_post:
  enable: true
  limit: 6

# Local search
local_search:
  enable: true
  preload: true
  CDN:

# Dark mode
darkmode:
  enable: true
  default: light
  dark: dark
  toggle:
    enable: true
    type: preference  # Use system preference by default; click switches

# Code blocks
copy_button:
  enable: true
  show_text: true

# Comments (DISABLED by default — set enable: true to activate)
# To enable, pick one of: Disqus, Disqusjs, Giscus, Twikoo, Valine, Artalk
comments:
  # Use Disqus
  # Disqus: ...
  # Disqusjs: ...
  # Use Giscus (recommended for GitHub Pages)
  # giscus:
  #   repo: your-username/your-username.github.io
  #   repo_id: ...
  #   category: Announcements
  #   category_id: ...
  use: []

# Analytics (DISABLED by default)
analytics:
  enable: false

# Advertisement (DISABLED by default)
advertisement: false

# Mathjax / KaTeX (off by default; enable if writing math articles)
mathjax:
  enable: false
katex:
  enable: false

# Reward (donation) (off)
reward:
  enable: false

# Share buttons (off)
share:
  enable: false

# Article reading progress bar
reading_progress:
  enable: false
```

- [ ] **Step 2: Verify the theme renders**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Expected: page renders with the configured menu (首页 / 归档 / 作品集 / 关于 / 博客), avatar in the sidebar, social icons in the top right. Press `Ctrl+C` to stop.

If the menu shows `||` literally: check there are no trailing spaces after the icon names.

---

## Task 7: Create Project Data (`projects.yml`)

**Files:**
- Create: `D:\AI\project\PersonalWebsite\source\_data\projects.yml`

- [ ] **Step 1: Create the `_data` directory**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/source/_data"
```

- [ ] **Step 2: Write the projects data file**

Write to `D:\AI\project\PersonalWebsite\source\_data\projects.yml`:

```yaml
# 作品集数据
# highlight: true 的项目会显示在首页
# 字段说明见 docs/superpowers/specs/2026-06-01-personal-portfolio-design.md

- name: 电商前端重构
  cover: /img/projects/cover1.svg
  desc: 基于 React + TypeScript 的电商平台重构项目，提升 30% 加载速度
  tags: [React, TypeScript, Vite]
  link: https://github.com/[你的GitHub用户名]/ecommerce-refactor
  highlight: true

- name: 自动化数据看板
  cover: /img/projects/cover2.svg
  desc: Python + ECharts 实现的实时数据可视化看板，支持多数据源接入
  tags: [Python, ECharts, FastAPI]
  link: https://github.com/[你的GitHub用户名]/data-dashboard
  highlight: true

- name: 移动端记账 App
  cover: /img/projects/cover3.svg
  desc: React Native 跨平台移动应用，支持离线记账和云同步
  tags: [React Native, TypeScript, SQLite]
  link: https://github.com/[你的GitHub用户名]/expense-tracker
  highlight: true

- name: 开源 CLI 工具
  cover: /img/projects/cover4.svg
  desc: Go 开发的命令行工具，用于批量处理文件和环境配置
  tags: [Go, CLI]
  link: https://github.com/[你的GitHub用户名]/go-cli-toolkit
  highlight: true

- name: 机器学习实验
  cover: /img/projects/cover1.svg
  desc: PyTorch 实现的图像分类实验，对比多个预训练模型
  tags: [Python, PyTorch, ML]
  link: https://github.com/[你的GitHub用户名]/ml-experiments
  highlight: false

- name: 技术博客
  cover: /img/projects/cover2.svg
  desc: 本网站本身就是一个项目 - Hexo + Butterfly 主题定制
  tags: [Hexo, JavaScript]
  link: https://github.com/[你的GitHub用户名]/personal-website
  highlight: false
```

- [ ] **Step 3: Verify YAML is valid**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo generate
```

Expected: build completes with no YAML-related errors. (Hexo reads `_data/*.yml` automatically and exposes it as `site.data.projects` in templates.)

If you see `YAMLException`: check for tabs (use spaces), missing colons, or misaligned list items.

---

## Task 8: Create Placeholder SVG Images

**Files:**
- Create: `D:\AI\project\PersonalWebsite\source\img\avatar.svg`
- Create: `D:\AI\project\PersonalWebsite\source\img\favicon.svg`
- Create: `D:\AI\project\PersonalWebsite\source\img\projects\cover1.svg`
- Create: `D:\AI\project\PersonalWebsite\source\img\projects\cover2.svg`
- Create: `D:\AI\project\PersonalWebsite\source\img\projects\cover3.svg`
- Create: `D:\AI\project\PersonalWebsite\source\img\projects\cover4.svg`

- [ ] **Step 1: Create the img directories**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/source/img/projects"
```

- [ ] **Step 2: Write the avatar SVG placeholder**

Write to `D:\AI\project\PersonalWebsite\source\img\avatar.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4c72ff"/>
      <stop offset="100%" stop-color="#9c5fff"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="100" fill="url(#g)"/>
  <text x="50%" y="55%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="80" font-weight="600" fill="#fff" dominant-baseline="middle">你</text>
</svg>
```

- [ ] **Step 3: Write the favicon SVG**

Write to `D:\AI\project\PersonalWebsite\source\img\favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#4c72ff"/>
  <text x="50%" y="55%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="700" fill="#fff" dominant-baseline="middle">P</text>
</svg>
```

- [ ] **Step 4: Write 4 project cover SVGs (distinct gradients)**

Write to `D:\AI\project\PersonalWebsite\source\img\projects\cover1.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4c72ff"/><stop offset="100%" stop-color="#7d3fff"/></linearGradient></defs>
  <rect width="600" height="360" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="600" fill="#fff" dominant-baseline="middle">项目 1</text>
</svg>
```

Write to `D:\AI\project\PersonalWebsite\source\img\projects\cover2.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs>
  <rect width="600" height="360" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="600" fill="#fff" dominant-baseline="middle">项目 2</text>
</svg>
```

Write to `D:\AI\project\PersonalWebsite\source\img\projects\cover3.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs>
  <rect width="600" height="360" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="600" fill="#fff" dominant-baseline="middle">项目 3</text>
</svg>
```

Write to `D:\AI\project\PersonalWebsite\source\img\projects\cover4.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient></defs>
  <rect width="600" height="360" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="600" fill="#fff" dominant-baseline="middle">项目 4</text>
</svg>
```

- [ ] **Step 5: Verify images are copied to public/**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo generate
ls public/img/
ls public/img/projects/
```

Expected: `public/img/` contains `avatar.svg`, `favicon.svg`; `public/img/projects/` contains `cover1.svg` through `cover4.svg`.

---

## Task 9: Create Custom Layout — `portfolio.pug`

**Files:**
- Create: `D:\AI\project\PersonalWebsite\themes\butterfly\layout\portfolio.pug`
- Create: `D:\AI\project\PersonalWebsite\themes\butterfly\source\css\portfolio.styl`
- Create: `D:\AI\project\PersonalWebsite\patches\portfolio.pug` (backup)

- [ ] **Step 1: Create the `patches` directory**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/patches"
```

- [ ] **Step 2: Write the `portfolio.pug` layout**

Write to `D:\AI\project\PersonalWebsite\themes\butterfly\layout\portfolio.pug`:

```pug
extends includes/layout.pug

block content
  include ./includes/mixins/post-ui.pug

  #portfolio-home
    //- Hero section
    .hero
      .hero__avatar
        img(src=url_for(theme.avatar.img) alt="avatar")
      h1.hero__name= config.author
      p.hero__tagline= config.subtitle
      .hero__social
        each item, label in theme.social
          a.hero__social-link(href=split_first(item) target="_blank" rel="noopener" title=label)
            i(class=split_second(item))

    //- Project grid
    section.projects
      h2.section-title 精选项目
      .project-grid
        each project in site.data.projects.filter(p => p.highlight).slice(0, 4)
          a.project-card(href=project.link target="_blank" rel="noopener")
            .project-card__cover
              img(src=project.cover alt=project.name loading="lazy")
            .project-card__body
              h3.project-card__title= project.name
              p.project-card__desc= project.desc
              .project-card__tags
                each tag in project.tags
                  span.project-card__tag= tag

      .projects__more
        a.btn.btn-primary(href="/projects/") 查看全部作品 →

    //- Three-column intro
    section.intro
      .intro__col
        .intro__icon
          i.fa-solid fa-user
        h3 我是谁
        p 独立开发者 / 工程师，热爱构建有用的产品。在 [你的城市] 远程工作。
      .intro__col
        .intro__icon
          i.fa-solid fa-code
        h3 我做什么
        p 全栈开发，专注于 Web 应用、数据可视化和工具链。喜欢用现代技术栈解决实际问题。
      .intro__col
        .intro__icon
          i.fa-solid fa-paper-plane
        h3 联系我
        p 欢迎通过 GitHub 或邮件与我交流。也欢迎查看我的技术博客。

    //- CTA
    section.cta
      a.btn.btn-primary(href="/archives/") 查看博客
      a.btn.btn-outline(href="/about/") 关于我
```

- [ ] **Step 3: Write the portfolio custom styles**

Write to `D:\AI\project\PersonalWebsite\themes\butterfly\source\css\portfolio.styl`:

```stylus
// Portfolio custom styles
// Loaded automatically by Butterfly when this file exists in source/css/

#portfolio-home
  max-width: 1100px
  margin: 0 auto
  padding: 2rem 1rem

  // Hero
  .hero
    text-align: center
    padding: 3rem 1rem
    &__avatar
      img
        width: 160px
        height: 160px
        border-radius: 50%
        box-shadow: 0 8px 32px rgba(76, 114, 255, 0.3)
    &__name
      font-size: 2.5rem
      margin: 1.5rem 0 0.5rem
      font-weight: 700
    &__tagline
      font-size: 1.25rem
      color: var(--font-color, #666)
      margin-bottom: 1.5rem
    &__social
      display: flex
      gap: 1rem
      justify-content: center
      flex-wrap: wrap
      &-link
        display: inline-flex
        align-items: center
        justify-content: center
        width: 44px
        height: 44px
        border-radius: 50%
        background: var(--card-bg, #fff)
        color: var(--font-color, #333)
        text-decoration: none
        transition: transform 0.2s, box-shadow 0.2s
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
        i
          font-size: 1.2rem
        &:hover
          transform: translateY(-3px)
          box-shadow: 0 6px 16px rgba(76, 114, 255, 0.3)

  // Project grid
  .projects
    padding: 2rem 0
    .section-title
      text-align: center
      font-size: 1.75rem
      margin-bottom: 2rem
    .project-grid
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
      gap: 1.5rem
    .project-card
      display: block
      background: var(--card-bg, #fff)
      border-radius: 12px
      overflow: hidden
      text-decoration: none
      color: inherit
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06)
      transition: transform 0.2s, box-shadow 0.2s
      &:hover
        transform: translateY(-4px)
        box-shadow: 0 8px 24px rgba(76, 114, 255, 0.2)
      &__cover
        aspect-ratio: 5 / 3
        overflow: hidden
        img
          width: 100%
          height: 100%
          object-fit: cover
      &__body
        padding: 1rem 1.25rem 1.25rem
      &__title
        font-size: 1.15rem
        margin: 0 0 0.5rem
        font-weight: 600
      &__desc
        color: var(--font-color, #666)
        font-size: 0.9rem
        margin-bottom: 0.75rem
        line-height: 1.5
      &__tags
        display: flex
        gap: 0.5rem
        flex-wrap: wrap
      &__tag
        font-size: 0.75rem
        padding: 0.2rem 0.6rem
        background: rgba(76, 114, 255, 0.1)
        color: #4c72ff
        border-radius: 12px
    &__more
      text-align: center
      margin-top: 2rem

  // Three-column intro
  .intro
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    gap: 2rem
    padding: 2rem 0
    &__col
      text-align: center
      padding: 1.5rem
      background: var(--card-bg, #fff)
      border-radius: 12px
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04)
    &__icon
      i
        font-size: 2rem
        color: #4c72ff
    h3
      margin: 0.75rem 0
    p
      color: var(--font-color, #666)
      line-height: 1.6

  // CTA
  .cta
    display: flex
    gap: 1rem
    justify-content: center
    padding: 2rem 0
    flex-wrap: wrap

// Buttons (reusable in this layout only)
.btn
  display: inline-block
  padding: 0.75rem 1.75rem
  border-radius: 8px
  text-decoration: none
  font-weight: 500
  transition: all 0.2s
  &-primary
    background: #4c72ff
    color: #fff
    &:hover
      background: darken(#4c72ff, 10%)
      transform: translateY(-2px)
  &-outline
    background: transparent
    color: #4c72ff
    border: 2px solid #4c72ff
    &:hover
      background: #4c72ff
      color: #fff
```

- [ ] **Step 4: Tell butterfly to inject the custom CSS**

Butterfly loads any `.styl` file from `themes/butterfly/source/css/`. Create an import file:

Write to `D:\AI\project\PersonalWebsite\themes\butterfly\source\css\portfolio-import.styl`:

```stylus
@import 'portfolio.styl'
```

To make this load, append to `_config.butterfly.yml` (inside the `inject:` section, or use butterfly's `css` include mechanism). Simpler approach: add a `<link>` tag via the `inject.head` config.

Edit `D:\AI\project\PersonalWebsite\_config.butterfly.yml` and add at the bottom:

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/portfolio.styl">
```

- [ ] **Step 5: Create the mixin helpers used by portfolio.pug**

The layout uses `split_first` and `split_second` mixins (used in butterfly to split "url || icon" strings). They are defined in `themes/butterfly/layout/includes/mixins/index.pug`. Verify they exist by running:

```bash
grep -n "split_first" "D:/AI/project/PersonalWebsite/themes/butterfly/layout/includes/mixins/index.pug" || echo "not found"
```

Expected: prints at least one line containing `split_first`. (If absent, fall back to a manual split in the pug — adjust Task 9 Step 2.)

- [ ] **Step 6: Backup the layout to patches/**

```bash
cp "D:/AI/project/PersonalWebsite/themes/butterfly/layout/portfolio.pug" "D:/AI/project/PersonalWebsite/patches/portfolio.pug"
```

- [ ] **Step 7: Verify the home page renders with the new layout**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Expected: the home page shows the Hero, project grid (4 cards), three-column intro, and CTA buttons — not the default blog list. Press `Ctrl+C` to stop.

If you see "extends includes/layout.pug not found": the `extends` path is relative — verify `themes/butterfly/layout/includes/layout.pug` exists.

---

## Task 10: Create Custom Layout — `projects.pug`

**Files:**
- Create: `D:\AI\project\PersonalWebsite\themes\butterfly\layout\projects.pug`
- Create: `D:\AI\project\PersonalWebsite\themes\butterfly\source\js\projects-filter.js`
- Create: `D:\AI\project\PersonalWebsite\patches\projects.pug` (backup)

- [ ] **Step 1: Write the `projects.pug` layout**

Write to `D:\AI\project\PersonalWebsite\themes\butterfly\layout\projects.pug`:

```pug
extends includes/layout.pug

block content
  #projects-page
    h1.page-title 作品集
    p.page-subtitle 这里收录了我做过的所有项目。点击标签可以筛选。

    //- Tag filter chips
    .tag-filter#project-tag-filter
      button.tag-chip.tag-chip--active(data-tag="all") 全部
      each tag in [...new Set(site.data.projects.flatMap(p => p.tags))]
        button.tag-chip(data-tag=tag)= tag

    //- Project list
    .project-list
      each project in site.data.projects
        a.project-item(href=project.link target="_blank" rel="noopener" data-tags=project.tags.join(','))
          .project-item__cover
            img(src=project.cover alt=project.name loading="lazy")
          .project-item__body
            h3= project.name
            p= project.desc
            .project-item__tags
              each tag in project.tags
                span.project-item__tag= tag
```

- [ ] **Step 2: Add projects list styles to portfolio.styl**

Append to `D:\AI\project\PersonalWebsite\themes\butterfly\source\css\portfolio.styl`:

```stylus

// Projects page
#projects-page
  max-width: 1100px
  margin: 0 auto
  padding: 2rem 1rem
  .page-title
    text-align: center
    font-size: 2rem
    margin-bottom: 0.5rem
  .page-subtitle
    text-align: center
    color: var(--font-color, #666)
    margin-bottom: 2rem

.tag-filter
  display: flex
  flex-wrap: wrap
  gap: 0.5rem
  justify-content: center
  margin-bottom: 2rem

.tag-chip
  padding: 0.4rem 1rem
  border: 1px solid #4c72ff
  background: transparent
  color: #4c72ff
  border-radius: 20px
  cursor: pointer
  font-size: 0.9rem
  transition: all 0.2s
  &:hover
    background: rgba(76, 114, 255, 0.1)
  &--active
    background: #4c72ff
    color: #fff

.project-list
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 1.5rem

.project-item
  display: block
  background: var(--card-bg, #fff)
  border-radius: 12px
  overflow: hidden
  text-decoration: none
  color: inherit
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06)
  transition: transform 0.2s, box-shadow 0.2s
  &:hover
    transform: translateY(-4px)
    box-shadow: 0 8px 24px rgba(76, 114, 255, 0.2)
  &__cover
    aspect-ratio: 5 / 3
    img
      width: 100%
      height: 100%
      object-fit: cover
  &__body
    padding: 1rem 1.25rem 1.25rem
    h3
      margin: 0 0 0.5rem
      font-size: 1.15rem
  p
    color: var(--font-color, #666)
    font-size: 0.9rem
    line-height: 1.5
  &__tags
    display: flex
    gap: 0.4rem
    flex-wrap: wrap
    margin-top: 0.75rem
  &__tag
    font-size: 0.75rem
    padding: 0.2rem 0.6rem
    background: rgba(76, 114, 255, 0.1)
    color: #4c72ff
    border-radius: 12px
```

- [ ] **Step 3: Write the filter JavaScript**

Write to `D:\AI\project\PersonalWebsite\themes\butterfly\source\js\projects-filter.js`:

```javascript
(function () {
  'use strict';

  function init() {
    const chips = document.querySelectorAll('#project-tag-filter .tag-chip');
    const items = document.querySelectorAll('.project-item');
    if (!chips.length || !items.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const tag = chip.getAttribute('data-tag');

        chips.forEach(function (c) { c.classList.remove('tag-chip--active'); });
        chip.classList.add('tag-chip--active');

        items.forEach(function (item) {
          const tags = (item.getAttribute('data-tags') || '').split(',');
          if (tag === 'all' || tags.indexOf(tag) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

- [ ] **Step 4: Register the script via inject**

Edit `D:\AI\project\PersonalWebsite\_config.butterfly.yml` — find the `inject:` block and update:

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/portfolio.styl">
  bottom:
    - <script src="/js/projects-filter.js" defer></script>
```

- [ ] **Step 5: Backup the layout**

```bash
cp "D:/AI/project/PersonalWebsite/themes/butterfly/layout/projects.pug" "D:/AI/project/PersonalWebsite/patches/projects.pug"
```

- [ ] **Step 6: Verify the projects page renders**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Visit `http://localhost:4000/projects/`. Expected: title, tag filter chips ("全部" + the 8 unique tags from projects.yml), and a grid of all 6 project cards. Click a chip — non-matching cards should disappear. Press `Ctrl+C` to stop.

If chips don't filter: open the browser DevTools console; verify `projects-filter.js` loaded (Network tab) and contains no syntax errors.

---

## Task 11: Create Home Page Source (`source/index.md`)

**Files:**
- Replace: `D:\AI\project\PersonalWebsite\source\index.md`

- [ ] **Step 1: Write the home page markdown**

Write to `D:\AI\project\PersonalWebsite\source\index.md`:

```markdown
---
title: 首页
layout: portfolio
description: [一句话介绍]
---
```

- [ ] **Step 2: Verify the home page renders with the portfolio layout**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Visit `http://localhost:4000/`. Expected: custom portfolio layout (Hero, project grid, intro, CTA). Press `Ctrl+C` to stop.

If the page shows the default blog list: confirm the front-matter says `layout: portfolio` (not `post` or `page`).

---

## Task 12: Create About Page (`source/about/index.md`)

**Files:**
- Create: `D:\AI\project\PersonalWebsite\source\about\index.md`

- [ ] **Step 1: Create the about directory and file**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/source/about"
```

Write to `D:\AI\project\PersonalWebsite\source\about\index.md`:

```markdown
---
title: 关于我
date: 2026-06-01 12:00:00
type: about
---

## 👋 你好

我是 **[你的名字]**，一名 [职业，例如：全栈工程师 / 设计师 / 研究生]。

[在这里写一段 2-3 句的自我介绍。写什么吸引你、你在做什么、你想寻找什么样的机会。]

## 🛠️ 技术栈

- **前端：** React、Vue、TypeScript、Vite
- **后端：** Node.js、Python、Go
- **数据库：** PostgreSQL、MongoDB、Redis
- **工具：** Git、Docker、Vim

## 💼 经历

- **2024 - 至今**  [公司 / 项目] —— 角色
- **2022 - 2024**  [公司 / 项目] —— 角色
- **2018 - 2022**  [学校] —— 专业

## 🎯 兴趣方向

- 独立开发 / Side projects
- 写技术博客
- [其他兴趣]

## 📬 联系方式

- 邮箱：[你的邮箱]
- GitHub：[@你的GitHub用户名](https://github.com/你的GitHub用户名)
- 知乎：[你的知乎ID](https://www.zhihu.com/people/你的知乎ID)
```

- [ ] **Step 2: Verify**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Visit `http://localhost:4000/about/`. Expected: markdown-rendered about page with sections, links, and lists. Press `Ctrl+C` to stop.

---

## Task 13: Create Projects Page (`source/projects/index.md`)

**Files:**
- Create: `D:\AI\project\PersonalWebsite\source\projects\index.md`

- [ ] **Step 1: Create the projects directory and file**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/source/projects"
```

Write to `D:\AI\project\PersonalWebsite\source\projects\index.md`:

```markdown
---
title: 作品集
date: 2026-06-01 12:00:00
layout: projects
---
```

- [ ] **Step 2: Verify**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Visit `http://localhost:4000/projects/`. Expected: full project grid (6 items), tag filter chips at the top. Press `Ctrl+C` to stop.

---

## Task 14: Create Sample Blog Posts

**Files:**
- Create: `D:\AI\project\PersonalWebsite\source\_posts\hello-world.md`
- Create: `D:\AI\project\PersonalWebsite\source\_posts\hexo-setup-notes.md`
- Create: `D:\AI\project\PersonalWebsite\source\_posts\github-pages-deploy.md`

Note: A `hello-world.md` already exists from `hexo init` (Task 3). Overwrite it.

- [ ] **Step 1: Write `hello-world.md`**

Write to `D:\AI\project\PersonalWebsite\source\_posts\hello-world.md`:

```markdown
---
title: Hello World
date: 2026-06-01 12:00:00
tags: [随笔]
categories: [随笔]
description: 欢迎来到我的个人博客！这是第一篇文章。
---

欢迎来到我的个人博客！这是我用 **Hexo + Butterfly** 搭建的第一个站点。

## 为什么写博客

记录想法、分享学到的东西、认识新朋友。博客是个人的一扇窗。

## 这里会写什么

- 技术笔记
- 项目经验
- 读书 / 思考
- 生活琐事

如果你觉得有用，欢迎留言交流。
```

- [ ] **Step 2: Write `hexo-setup-notes.md`**

Write to `D:\AI\project\PersonalWebsite\source\_posts\hexo-setup-notes.md`:

```markdown
---
title: Hexo 搭建笔记
date: 2026-06-01 13:00:00
tags: [Hexo, 教程]
categories: [技术]
description: 记录我用 Hexo 搭建这个站点的过程和踩过的坑。
---

## 为什么选 Hexo

- 纯静态，对 GitHub Pages 友好
- 主题生态丰富（用 Butterfly）
- Markdown 写作
- 一键部署

## 主要步骤

1. `npm install` 安装依赖
2. 编辑 `_config.yml` 配置站点信息
3. 写文章（`source/_posts/*.md`）
4. `hexo generate` 生成 `public/`
5. `hexo deploy` 推送到 `gh-pages`

## 踩过的坑

- YAML 缩进必须用 2 空格，不能用 Tab
- Butterfly 主题需要 `hexo-renderer-pug` 和 `hexo-renderer-stylus`
- 自定义 layout 放在 `themes/butterfly/layout/`，主题更新时记得备份

```bash
# 启动本地预览
hexo server
```

## 总结

Hexo 上手成本低，社区活跃，适合做长期的内容站点。
```

- [ ] **Step 3: Write `github-pages-deploy.md`**

Write to `D:\AI\project\PersonalWebsite\source\_posts\github-pages-deploy.md`:

```markdown
---
title: 部署到 GitHub Pages
date: 2026-06-01 14:00:00
tags: [GitHub Pages, 部署]
categories: [技术]
description: 一步步把 Hexo 站点部署到 GitHub Pages。
---

## 准备 GitHub 仓库

1. 在 GitHub 新建一个 repo，命名为 `你的用户名.github.io`
2. 不要初始化 README（Hexo 已经生成了 `.gitignore`）

## 配置 deploy

编辑 `_config.yml`：

```yaml
deploy:
  type: git
  repo: https://github.com/你的用户名/你的用户名.github.io.git
  branch: gh-pages
```

## 部署

```bash
npm run deploy
```

这个命令会做两件事：
1. `hexo generate` 构建 `public/`
2. `hexo deploy` 把 `public/` 推送到 `gh-pages` 分支

## 自动部署（可选）

用 GitHub Actions 自动化：在 `.github/workflows/deploy.yml` 配置 push 到 `main` 时触发。

## 访问

部署完成后访问 `https://你的用户名.github.io` 即可看到站点。
```

- [ ] **Step 4: Verify the blog list and archive pages**

```bash
cd "D:/AI/project/PersonalWebsite"
npx hexo clean
npx hexo server --port 4000
```

Visit:
- `http://localhost:4000/archives/` — should show 3 posts
- `http://localhost:4000/2026/06/01/hello-world/` — should show the post
- `http://localhost:4000/tags/` — should show tag list

Press `Ctrl+C` to stop.

---

## Task 15: Add GitHub Actions Workflow

**Files:**
- Create: `D:\AI\project\PersonalWebsite\.github\workflows\deploy.yml`

- [ ] **Step 1: Create the workflow directory and file**

```bash
mkdir -p "D:/AI/project/PersonalWebsite/.github/workflows"
```

Write to `D:\AI\project\PersonalWebsite\.github\workflows\deploy.yml`:

```yaml
name: Deploy Hexo site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate YAML syntax (offline)**

```bash
cd "D:/AI/project/PersonalWebsite"
npx --yes js-yaml .github/workflows/deploy.yml > /dev/null && echo "OK" || echo "INVALID YAML"
```

Expected: `OK`. (This requires `npx` to fetch `js-yaml` on first run; subsequent runs use cache.)

---

## Task 16: Write the README (Chinese)

**Files:**
- Create: `D:\AI\project\PersonalWebsite\README.md`

- [ ] **Step 1: Write the README**

Write to `D:\AI\project\PersonalWebsite\README.md`:

```markdown
# 个人作品集站点

基于 **Hexo + Butterfly** 主题的个人作品集网站。包含首页 Hero、作品集网格、博客、关于页、标签云、深色模式等。

## 📦 技术栈

- [Hexo](https://hexo.io/) 7.x —— 静态站点生成器
- [hexo-theme-butterfly](https://butterfly.js.org/) —— 主题
- Node.js ≥ 18

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地预览

```bash
npm run server
# 浏览器打开 http://localhost:4000
```

### 3. 构建静态文件

```bash
npm run build
# 产物在 public/ 目录
```

## ✏️ 替换占位符

本项目所有需要你个性化的地方都用 `[方括号]` 标出。搜索以下关键词并替换：

| 占位符 | 出现位置 | 替换为 |
|---|---|---|
| `[你的名字]` | `_config.yml`, `_config.butterfly.yml`, `source/about/index.md` | 你的真实姓名 |
| `[一句话介绍]` | `_config.yml`, `source/index.md` | 个人 slogan |
| `[你的邮箱]` | `_config.butterfly.yml`, `source/about/index.md` | 你的邮箱 |
| `[你的GitHub用户名]` | `_config.yml`, `_config.butterfly.yml`, `source/about/index.md`, `source/_data/projects.yml` | 你的 GitHub 用户名 |
| `[你的知乎ID]` | `_config.butterfly.yml`, `source/about/index.md` | 你的知乎 ID |
| `[你的掘金ID]` | `_config.butterfly.yml` | 你的掘金 ID |
| `[你的微博ID]` | `_config.butterfly.yml` | 你的微博 ID |
| `[你的城市]` | `themes/butterfly/layout/portfolio.pug` | 你所在的城市 |
| `[年份]` | `_config.butterfly.yml`（footer.since） | 当前年份 |

VS Code 全局搜索：按 `Ctrl+Shift+F`，搜索 `[你的`，逐个替换。

### 替换项目封面图

`source/img/projects/cover[1-4].svg` 是 SVG 占位图。建议替换为你自己项目的真实截图：

1. 截图尺寸建议 600×360 像素
2. 格式推荐 PNG（兼容性最好）或 WebP（体积小）
3. 替换文件后保持文件名一致

### 替换头像

`source/img/avatar.svg` 是 SVG 占位图。把你的头像（推荐正方形、最少 200×200）放到 `source/img/avatar.png` 或 `.jpg`，然后修改 `_config.butterfly.yml` 里的 `avatar.img` 路径。

## 🌐 部署到 GitHub Pages

### 方式 A：手动部署

1. 在 GitHub 新建一个 repo，命名为 `你的用户名.github.io`（必须是这个名字）
2. 修改 `_config.yml` 里的 `url` 和 `deploy.repo`：
   ```yaml
   url: https://你的用户名.github.io
   deploy:
     type: git
     repo: https://github.com/你的用户名/你的用户名.github.io.git
     branch: gh-pages
   ```
3. 推送源码到 `main` 分支（推荐先把 `PersonalWebsite` 关联到 GitHub 仓库）：
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
   git push -u origin main
   ```
4. 部署：
   ```bash
   npm run deploy
   ```
5. 在 GitHub repo 的 `Settings → Pages` 里把 source 设为 `gh-pages` 分支（如果还没自动设置）
6. 等 1-2 分钟，访问 `https://你的用户名.github.io`

### 方式 B：GitHub Actions 自动部署（推荐）

项目已包含 `.github/workflows/deploy.yml`。第一次部署时：

1. 在 GitHub repo 的 `Settings → Pages` 里把 source 设为 **GitHub Actions**
2. 推送代码到 `main` 分支就会自动部署

```bash
git push origin main
```

## 📁 目录结构

```
.
├── _config.yml              # 站点配置
├── _config.butterfly.yml    # 主题配置
├── source/
│   ├── _data/projects.yml   # 作品集数据（单数据源）
│   ├── _posts/              # 博客文章
│   ├── about/               # 关于页
│   ├── projects/            # 作品集页
│   ├── index.md             # 首页（layout: portfolio）
│   └── img/                 # 图片资源
├── themes/butterfly/
│   ├── layout/
│   │   ├── portfolio.pug    # 自定义：首页布局
│   │   └── projects.pug     # 自定义：作品集页布局
│   └── source/css/portfolio.styl  # 自定义样式
├── patches/                 # 自定义 layout 的备份（主题更新时使用）
└── .github/workflows/deploy.yml
```

## ⚠️ 关于主题更新

`themes/butterfly/layout/portfolio.pug` 和 `projects.pug` 是自定义 layout 文件。

**当你想 `git pull` 更新 butterfly 主题时，这两个文件会被覆盖。** 解决方案：

1. 主题更新前，备份 `patches/` 目录
2. 更新后，从 `patches/` 重新复制：
   ```bash
   cp patches/portfolio.pug themes/butterfly/layout/portfolio.pug
   cp patches/projects.pug  themes/butterfly/layout/projects.pug
   ```
3. 或者改用子主题（child theme），见 `docs/superpowers/specs/2026-06-01-personal-portfolio-design.md` §6

## 🆘 常见问题

### 端口 4000 被占用

```bash
npm run server -- --port 4001
```

### 改了 `_config.yml` 后没生效

```bash
npm run clean
npm run server
```

### 自定义 layout 不生效

确认 `source/index.md` 的 front-matter 是 `layout: portfolio`（不是 `post`）。同时确认 `themes/butterfly/layout/portfolio.pug` 文件存在。

### GitHub Actions 部署失败

查看 `Actions` 页签的日志。常见原因：
- Node 版本过低（已在 workflow 里固定 20）
- 依赖安装失败（删除 `node_modules` 和 `package-lock.json` 后重试）

## 📄 License

MIT
```

---

## Task 17: Initialize Git Repo and First Commit

**Files:**
- Create: `D:\AI\project\PersonalWebsite\.git\` (initialized)

- [ ] **Step 1: Initialize the repo**

```bash
cd "D:/AI/project/PersonalWebsite"
git init
git branch -M main
git add .
git status
```

Expected: lists the project files but NOT `node_modules/`, `public/`, `.deploy_git/`, `db.json`. If these are listed, the `.gitignore` from Task 1 is missing or wrong.

- [ ] **Step 2: First commit**

```bash
cd "D:/AI/project/PersonalWebsite"
git commit -m "feat: initial portfolio site with Hexo + Butterfly"
```

Expected: a commit is created. Run `git log --oneline` to verify.

---

## Task 18: End-to-End Verification

**Files:** none modified — verification only

- [ ] **Step 1: Clean and rebuild**

```bash
cd "D:/AI/project/PersonalWebsite"
npm run clean
npm run build
```

Expected: ends with `INFO  XX files generated in XXX ms`. No errors.

- [ ] **Step 2: Verify build artifacts exist**

```bash
cd "D:/AI/project/PersonalWebsite"
test -f public/index.html && echo "home OK"
test -f public/about/index.html && echo "about OK"
test -f public/projects/index.html && echo "projects OK"
test -f public/archives/index.html && echo "archives OK"
test -f public/2026/06/01/hello-world/index.html && echo "post OK"
test -f public/img/avatar.svg && echo "avatar OK"
test -f public/img/projects/cover1.svg && echo "cover1 OK"
```

Expected: all 7 lines print `OK`.

- [ ] **Step 3: Start server and check each route**

```bash
cd "D:/AI/project/PersonalWebsite"
npm run server -- --port 4000 &
SERVER_PID=$!
sleep 5
curl -sS -o /dev/null -w "%{http_code} /\n"        http://localhost:4000/
curl -sS -o /dev/null -w "%{http_code} /about/\n"   http://localhost:4000/about/
curl -sS -o /dev/null -w "%{http_code} /projects/\n" http://localhost:4000/projects/
curl -sS -o /dev/null -w "%{http_code} /archives/\n" http://localhost:4000/archives/
kill $SERVER_PID
```

Expected: all 4 lines show `200`.

- [ ] **Step 4: Verify content has the right placeholders**

```bash
cd "D:/AI/project/PersonalWebsite"
grep -l "\[你的名字\]" public/index.html public/about/index.html && echo "placeholders present"
grep -l "highlight: true" public/index.html || echo "no project grid in home (check layout)"
```

Expected: first grep finds the file(s), second may pass or fail depending on whether the projects data has been embedded; if the second fails, the projects grid is missing.

- [ ] **Step 5: Final summary**

If all checks pass, print:

```
✅ Portfolio site is ready!

Next steps:
1. Replace [bracketed] placeholders (see README)
2. Replace avatar and project cover images
3. Push to GitHub and enable Pages
4. Visit https://your-username.github.io
```

If any step failed, fix the specific issue (most common: YAML indentation, missing file, stale build — try `npm run clean && npm run build` again).

---

## Self-Review

**Spec coverage check:**

| Spec § | Requirement | Plan task(s) |
|---|---|---|
| 2 | Goals: deployable, portfolio, blog, dark/light, placeholders, README | Tasks 1, 5, 6, 7, 11, 12, 13, 14, 16 |
| 2 | Non-Goals: comments/analytics/i18n commented out | Task 6 (butterfly config) |
| 3 | Stack: hexo, butterfly, renderers, deployer, abbrlink, word-counter | Task 2 |
| 4 | Site structure | Tasks 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 |
| 5.1 | Home: Hero + grid + intro + CTA | Tasks 9 (layout), 11 (page), 8 (assets) |
| 5.2 | About | Task 12 |
| 5.3 | Projects page with tag filter | Tasks 10, 13 |
| 5.4 | Blog | Task 14 |
| 5.5 | Footer | Task 6 (butterfly config) |
| 6 | Custom layouts (portfolio + projects), wipe risk documented | Tasks 9, 10, 16 (README §"关于主题更新") |
| 7 | projects.yml schema | Task 7 |
| 8 | Two config files | Tasks 5, 6 |
| 9 | Placeholders with bracket convention | All tasks; documented in Task 16 |
| 10 | Visual style (color, fonts, animations, responsive) | Task 6, 9 (stylus), 10 (stylus) |
| 11 | Deployment manual + Actions | Tasks 15, 16 |
| 12 | Out-of-scope (comments, analytics, custom domain) | Task 6 (commented out), Task 16 (mentioned) |
| 13 | Success criteria | Task 18 |

**No placeholders, TBD, TODO, or "implement later" patterns** — all code blocks are complete.

**Type / name consistency:**
- `site.data.projects` referenced in Tasks 9 and 10; loaded from `source/_data/projects.yml` (Task 7). Consistent.
- `split_first` / `split_second` mixins referenced in Task 9; verified to exist in Task 9 Step 5.
- `theme.avatar.img`, `theme.social`, `config.author`, `config.subtitle` all used in Task 9; all defined in Task 6 butterfly config.
- File paths match across tasks (e.g., `source/_data/projects.yml` is referenced in Tasks 7, 9, 10; never conflicts).

Plan complete. Ready for execution.
