---
title: GitHub Pages 部署指南
abbrlink: github-pages-deploy
date: 2026-06-01 12:00:00
tags: [GitHub Pages, 部署, 教程]
categories: [技术]
---

本博客通过 GitHub Actions 自动部署到 GitHub Pages。

## 方案一：使用 GitHub Actions（推荐）

在 `.github/workflows/deploy.yml` 中配置：

```yaml
name: Deploy Hexo

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Generate
        run: npx hexo generate

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

每次推送到 `main` 分支就会自动构建并发布。

## 方案二：手动部署

在 `_config.yml` 中配置：

```yaml
deploy:
  type: git
  repo: https://github.com/用户名/用户名.github.io.git
  branch: gh-pages
```

安装部署插件：

```bash
npm install hexo-deployer-git
```

执行部署：

```bash
hexo deploy
```

## 启用 Pages

1. 进入 GitHub 仓库的 **Settings → Pages**
2. **Source** 选择 `gh-pages` 分支（或 `Deploy from a branch` 选 `gh-pages` / root）
3. 保存后等待几分钟即可通过 `https://用户名.github.io` 访问

## 自定义域名（可选）

在 `source/` 下创建 `CNAME` 文件，写入你的域名：

```
example.com
```

然后在域名服务商处添加 CNAME 记录指向 `用户名.github.io`。
