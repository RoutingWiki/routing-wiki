# Routing Wiki

Routing Wiki 是一个围绕 Bird / BGP 的中文知识库，使用 [Fumadocs](https://fumadocs.dev/)（基于 [Next.js](https://nextjs.org/)）构建，旨在把零散的教程、配置经验与常用工具整理为易于维护的文档站点。

## 快速开始

```bash
pnpm install
pnpm run dev
```

开发服务器默认运行在 `http://localhost:3000`，保存文档或源码后会自动热更新。

### 生产构建

```bash
pnpm run build   # 静态导出到 ./out
pnpm run serve   # 本地预览构建结果
```

生成的 `./out` 目录是纯静态站点，可直接部署到任意静态托管平台（如 Cloudflare Pages、Vercel、Netlify 等）。Cloudflare 部署配置见 `wrangler.toml`。

### 类型检查

```bash
pnpm run typecheck
```

## 项目结构

```
.
├── content/docs/             # 文档根目录（Markdown/MDX）
│   ├── beginner/             # 「Bird 新手教程」章节内容
│   │   └── meta.json         # 该章节的导航顺序与标题（root 侧边栏）
│   └── misc/                 # 「杂项」工具与补充资料
├── app/                      # Next.js App Router
│   ├── (home)/               # 首页与营销页布局
│   ├── docs/                 # 文档页面与布局
│   └── layout.tsx            # 根布局与全局 metadata
├── components/               # 站点组件（首页卡片、页脚、Mermaid 等）
├── lib/                      # 共享配置与 remark 插件
│   ├── source.ts             # Fumadocs 内容源
│   ├── remark-rfc-linker.ts  # 自动把 RFC 引用转换为链接
│   └── remark-mermaid.ts     # 把 mermaid 代码块转换为图表组件
├── langs/                    # 额外 Shiki 语法高亮（bird2、interfaces）
├── public/                   # 静态资源
├── source.config.ts          # Fumadocs MDX 配置（插件、Shiki、数学公式）
├── next.config.mjs           # Next.js 配置（静态导出）
├── package.json / pnpm-lock.yaml
└── README.md
```

## 文档撰写约定

- 所有文档放在 `content/docs/` 下，支持 **Markdown** 与 **MDX**。
- 每篇文档都需要 Front Matter，常用字段：
  ```md
  ---
  title: 二、拉起一个 BGP 会话
  description: 快速与上游建立连接
  ---
  ```
- 章节的导航顺序由对应目录下的 `meta.json` 控制：
  - 顶层目录（如 `beginner`、`misc`）通过 `"root": true` 成为独立的侧边栏分组。
  - `pages` 数组按顺序列出页面文件名（不含扩展名）与子目录名；也可写 `"[文本](URL)"` 形式的外链。
  - 与目录同名的 `index.md(x)` 作为该目录的首页。
- 推荐使用 Fumadocs 的组件：
  - 提示块：`<Callout type="info|success|warn|error" title="...">…</Callout>`。
  - 标签页：`<Tabs items={['A','B']}><Tab value="A">…</Tab></Tabs>`。
  - 流程图：直接使用 mermaid 代码块。
  - 数学公式：使用 `$...$` 行内或 `$$...$$` 块级（KaTeX 渲染）。
  - 代码块：在三引号后加上语言（如 `shell`、`bird2`）；自定义语法高亮可在 `langs/` 中添加对应 tmLanguage 并在 `source.config.ts` 注册。

## 自定义导航与样式

- 顶部导航与 GitHub 链接位于 `lib/layout.shared.tsx`
- 首页内容在 `app/(home)/page.tsx`，页脚在 `components/footer.tsx`
- 全局样式在 `app/global.css`（Tailwind CSS + Fumadocs 主题）

## 贡献指南

欢迎通过 Issues / Pull Requests 贡献内容或反馈问题。提交前建议：

1. 运行 `pnpm run typecheck` 与 `pnpm run build` 确认可以成功构建。
2. 检查文档 Front Matter 与 `meta.json` 是否已同步更新。
3. 对 UI 调整附上截图或说明，便于 Review。

感谢为 Routing Wiki 添砖加瓦！
