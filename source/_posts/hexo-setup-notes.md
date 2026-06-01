---
title: Hexo 建站笔记
abbrlink: hexo-setup
date: 2026-06-01 12:00:00
tags: [Hexo, 教程]
categories: [技术]
---

这篇文章记录我用 Hexo + Butterfly 主题搭建这个博客的过程。

## 为什么选 Hexo

- 纯静态，部署简单（GitHub Pages / Vercel / Netlify 都能托管）
- 中文社区活跃，主题丰富
- 基于 Node.js，扩展插件方便

## 核心命令

```bash
# 新建文章
hexo new "文章标题"

# 本地预览（http://localhost:4000）
hexo server

# 生成静态文件到 public/
hexo generate

# 部署（需配置 _config.yml 中的 deploy）
hexo deploy

# 清理缓存
hexo clean
```

## 目录结构

```
.
├── _config.yml         # 站点配置
├── _config.butterfly.yml  # 主题配置
├── source/             # 源文件（Markdown）
│   ├── _posts/         # 博客文章
│   ├── _data/          # 数据文件（如 projects.yml）
│   └── about/          # 页面
├── themes/butterfly/   # 主题
└── public/             # 生成产物
```

## 常用插件

- `hexo-renderer-pug` — 渲染 Pug 模板（Butterfly 主题需要）
- `hexo-renderer-stylus` — 渲染 Stylus
- `hexo-abbrlink` — 生成永久链接
- `hexo-word-counter` — 字数统计与阅读时长

安装：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus hexo-abbrlink hexo-word-counter
```

下一步：[部署到 GitHub Pages](/2026/06/01/github-pages-deploy/)。
