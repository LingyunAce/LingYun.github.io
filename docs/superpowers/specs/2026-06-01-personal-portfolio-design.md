# Personal Portfolio Website — Design Spec

**Date:** 2026-06-01
**Status:** Draft (awaiting user review)
**Reference:** Zhihu tutorial p/78467553 (user-specified; not directly accessible from this environment)

## 1. Purpose

Build a personal portfolio website using **Hexo + GitHub Pages**, styled with the **Butterfly** theme, and customized with a custom front-page layout to give a portfolio / creative-showcase feel. The site must work as a long-term home for the user, with placeholders they can later swap for real content.

## 2. Goals & Non-Goals

**Goals**
- A static personal site deployable to `username.github.io` (or a `username/username.github.io` repo).
- Portfolio front page (Hero + project grid + intro) that immediately communicates identity and work.
- Working blog subsystem (article list, archives, tags, categories) using Butterfly's built-in rendering.
- Dark/light mode toggle (Butterfly built-in).
- Placeholder content for all user-specific fields, clearly marked for later replacement.
- README with full local-dev + deployment instructions in Chinese (matches the user's language).

**Non-Goals (YAGNI)**
- Custom comments backend (Disqus / Giscus) — Butterfly config will be **commented out**, ready to enable.
- Analytics — commented out in config.
- Search backend — Butterfly's local search is enabled by default, no extra server.
- Custom domain / DNS — deployment will be on `*.github.io`; instructions for adding a custom domain in README only.
- i18n — Chinese primary, English optional in placeholders; no full i18n system.
- CMS / admin UI — Markdown files only.

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Site generator | `hexo` (latest stable) | User-confirmed |
| Theme | `hexo-theme-butterfly` | User-confirmed; built-in dark mode, code highlight, animations |
| Renderers | `hexo-renderer-pug`, `hexo-renderer-stylus` | Required by Butterfly |
| Deployer | `hexo-deployer-git` | Push to `gh-pages` branch |
| Optional | `hexo-abbrlink` (shorter permalinks) | Cleaner URLs |
| Optional | `hexo-word-counter` | Word count in articles |
| Node version | >= 18 | Required by modern Hexo |

## 4. Site Structure

```
D:\AI\project\my-portfolio\
├── _config.yml                 # Hexo site config (title, url, etc.)
├── _config.butterfly.yml       # Butterfly theme overrides
├── package.json
├── .gitignore                  # node_modules, public, .deploy_git, db.json
├── README.md                   # 安装/预览/部署指南 (中文)
├── source/
│   ├── _data/
│   │   └── projects.yml        # 作品集数据 (YAML, 单数据源)
│   ├── _posts/                 # 博客示例文章 (3 篇)
│   │   ├── hello-world.md
│   │   ├── hexo-setup-notes.md
│   │   └── github-pages-deploy.md
│   ├── about/index.md          # 关于我 (markdown)
│   ├── projects/index.md       # 作品集页 (使用 layout: projects 模板)
│   ├── index.md                # 自定义首页 (layout: portfolio)
│   └── img/
│       ├── avatar.png          # 头像占位符
│       ├── favicon.ico
│       └── projects/           # 项目封面占位符
│           ├── cover1.png
│           ├── cover2.png
│           ├── cover3.png
│           └── cover4.png
├── themes/
│   └── butterfly/              # git submodule 或 npm 安装
└── public/                     # 构建产物 (gitignored)
```

## 5. Pages

### 5.1 Home (`/`)

Custom layout `portfolio` (see §6). Sections in order:

1. **Hero** — large avatar (centered, ~160px), name (`[你的名字]`), tagline (`[一句话介绍]`), 4-5 social icon buttons (GitHub, 邮箱, Twitter, 微博, 掘金).
2. **Project grid** — 4 highlighted projects rendered from `source/_data/projects.yml` (`highlight: true`). Each card: cover image, title, 1-line description, tag chips, "查看 →" link.
3. **Three-column intro** — 我是谁 / 我做什么 / 联系我 (3 short paragraphs + icons).
4. **CTA strip** — two buttons: "查看博客" → `/archives/`, "关于我" → `/about/`.

### 5.2 About (`/about/`)

Markdown-rendered long-form bio + skill grid + timeline. Layout: `about`.

### 5.3 Projects (`/projects/`)

Full project list from `projects.yml`, with tag-filter chips (Butterfly's tag plugin). Layout: `projects` (custom — see §6).

### 5.4 Blog (`/archives/` and `/YYYY/MM/DD/slug/`)

Butterfly's built-in blog. Hexo provides archives page; `_posts/*.md` provide individual article pages with TOC, code highlight, reading time.

### 5.5 Footer

Social links + `© [年份] [你的名字]. Powered by Hexo & Butterfly.` + back-to-top button.

## 6. Custom Layouts

Because we want a portfolio front page and a tag-filterable project list (not just blog articles), we add **two custom layouts**. Two options, with trade-offs:

**Option A — Add directly to theme (chosen for v1)**

- Files added to `themes/butterfly/layout/portfolio.pug` and `themes/butterfly/layout/projects.pug`.
- Pros: simplest; no build pipeline change.
- Cons: these two files will be **wiped on `git pull` from the butterfly upstream**. Mitigation: README will instruct the user to (a) commit the two files to a fork / personal branch of butterfly, OR (b) keep a backup `patches/` folder in this repo, OR (c) just re-apply them after each update.

**Option B — Child theme (rejected for v1)**

- Create `themes/portfolio-butterfly/` that `extends` butterfly.
- Pros: clean isolation, no wipe risk.
- Cons: 2-3× more setup; many Butterfly docs and community examples assume direct theme use.

We ship **Option A** for v1, with the README documenting the wipe-risk and the mitigation. A follow-up could promote to Option B if the user updates the theme frequently.

## 7. Data Model

`source/_data/projects.yml` schema:

```yaml
- name: string                 # 项目名
  cover: /img/projects/x.png   # 封面图路径
  desc: string                 # 一句话描述
  tags: string[]               # 技术标签
  link: string                 # 详情/源码链接
  highlight: boolean           # 是否显示在首页
```

Homepage will only show `highlight: true` items, up to 4. The `/projects/` page shows all.

## 8. Configuration Strategy

Two config files:

- `_config.yml` — site-level (title, subtitle, author, url, language: zh-CN, theme: butterfly, deploy).
- `_config.butterfly.yml` — theme-level (per Butterfly docs). Overrides default theme config without forking the theme.

This separation means the theme can be updated via git without losing user config.

## 9. Placeholders

All user-replaceable content uses one of two patterns:

- **In markdown / pug:** square-bracket tokens like `[你的名字]`, `[一句话介绍]`, `[你的邮箱]`, `[你的GitHub用户名]`.
- **In YAML:** same bracket tokens in `projects.yml`.

README will list every placeholder with file path and line number. The user replaces them with `Edit` / search-and-replace.

## 10. Visual Style

- **Primary color:** `#4c72ff` (configurable in `_config.butterfly.yml` as `theme_color`).
- **Fonts:** system stack `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif`; code `JetBrains Mono`, `Fira Code`, monospace (loaded only if user installs the font).
- **Animations:** Butterfly defaults (fade-in on scroll, card hover lift, smooth page transitions).
- **Responsive:** Butterfly is mobile-first; verify breakpoints at 768px and 480px.

## 11. Deployment

- Build: `npm run build` → `public/`.
- Deploy: `npm run deploy` → pushes `public/` to `gh-pages` branch of `username/username.github.io` repo.
- CI (optional, documented not required): GitHub Actions workflow that runs `npm ci && npm run build && npm run deploy` on push to `main`.
- README will include both manual `git push` flow and the Actions flow.

## 12. Out-of-Scope (explicit)

- No comments integration (config commented out for Giscus / Disqus / Twikoo).
- No analytics (Google / 百度统计) — config commented out.
- No custom domain SSL setup — README mentions.
- No multi-author support.
- No newsletter / email subscription.

## 13. Success Criteria

A new clone of the repo can, after `npm install`:

1. Run `npm run server` and see the portfolio site at `http://localhost:4000` within 10 seconds.
2. See Hero with avatar and `[你的名字]` placeholders, 4 project cards, 3-column intro, CTA buttons.
3. Navigate to `/about/`, `/projects/`, `/archives/` and see all pages render without 404.
4. Toggle dark mode from the header and have it persist across pages.
5. Run `npm run deploy` after setting `deploy.repo` in `_config.yml` and have the site live at `https://username.github.io` within 1 minute.

## 14. Open Questions

None at this time. All clarifying questions answered by user.
