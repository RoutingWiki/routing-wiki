# AGENTS.md
Operational guide for agentic coding assistants in this repository.

## 1) Project Identity
- Project: `routing-wiki`
- Stack: Fumadocs (fumadocs-ui + fumadocs-mdx) on Next.js 16 (App Router) + TypeScript
- Styling: Tailwind CSS v4 + Fumadocs preset
- Package manager: `pnpm`
- Node: `>=20.0`
- Main content: Chinese docs about Bird/BGP
- Build output: `./out` (static export; also used by Cloudflare assets)

## 2) Source-of-Truth Files
Read these first before changing behavior:
- `package.json` (scripts/engines/deps)
- `README.md` (workflow + authoring expectations)
- `source.config.ts` (Fumadocs MDX pipeline: remark/rehype plugins, Shiki langs, math)
- `next.config.mjs` (Next.js config, static export)
- `lib/source.ts` (content source loader)
- `lib/layout.shared.tsx` (nav/header config)
- `content/docs/**/meta.json` (doc IA / sidebar order)
- `tsconfig.json` (TS baseline, path aliases)
- `wrangler.toml` (deploy output)
- `pnpm-workspace.yaml` (pnpm `onlyBuiltDependencies`/`allowBuilds`)

## 3) Cursor / Copilot Rules
- `.cursor/rules/`: not found
- `.cursorrules`: not found
- `.github/copilot-instructions.md`: not found
If these files appear later, treat them as high-priority instructions.

## 4) Install / Build / Check Commands
Run from repo root.

### Install
- `pnpm install`

### Local Development
- `pnpm run dev` (Next.js dev server, default `http://localhost:3000`)

### Production Build + Preview
- `pnpm run build` (static export to `./out`)
- `pnpm run serve` (preview built site via `serve out`)

### Type Checking
- `pnpm run typecheck` (`fumadocs-mdx && next typegen && tsc --noEmit`)

## 5) Lint/Test Reality (Current State)
Do not assume missing tools exist.
- No `lint` script in `package.json`
- No ESLint/Prettier config discovered
- No configured test runner (`vitest`/`jest`/`playwright`)
- No `test` script
Current quality gate is:
1. `pnpm run typecheck`
2. `pnpm run build`

## 6) Single-Test Guidance
There is no test framework configured, so single-test execution is unavailable.
If asked to run one test, state repo facts first.
Fallback verification options:
- Full typecheck: `pnpm run typecheck`
- Full build: `pnpm run build`
If tests are added later, document exact commands here.

## 7) Code Style Baseline (Observed)
No formatter is enforced in repo, so match local file conventions.

### Imports
- Prefer ESM `import`/`export`
- Use `import type` for type-only imports
- Use the `@/*` path alias for repo-local modules (configured in `tsconfig.json`)
- Fumadocs imports follow package entry points, e.g. `fumadocs-ui/components/tabs`

### Quotes / Formatting
- TS/TSX in `app`, `components`, `lib`: single quotes
- Use 2-space indentation
- Keep semicolon style consistent with the file

### TypeScript
- Keep meaningful explicit types (props/options/returns)
- Prefer small composable `type`/`interface`
- Avoid `any`, `@ts-ignore`, `@ts-expect-error` where practical

### React Components
- Prefer function components; mark client components with `'use client'`
- Keep components declarative and small
- Style with Tailwind utility classes and Fumadocs theme tokens (`fd-*`)

### Naming
- Components/types: `PascalCase`
- Functions/variables: `camelCase`
- Docs paths/slugs: kebab-case style is common

## 8) Error Handling & Safety
- Add defensive checks for user/content-derived data
- In plugins/transformers, return safe defaults for invalid matches
- Do not silently swallow errors in new logic
- Keep error messages specific and actionable

## 9) Fumadocs / Docs Authoring Conventions
- Docs live under `content/docs/` (Markdown/MDX)
- Every doc needs front matter (`title`, `description`)
- Navigation order/labels come from `meta.json` (`pages`, `title`, `root`)
- Top-level sections use `"root": true` to become separate sidebar groups
- A folder's `index.md(x)` is its landing page
- Use Fumadocs components:
  - Admonitions: `<Callout type="info|success|warn|error" title="...">`
  - Tabs: `<Tabs items={[...]}><Tab value="...">`
  - Diagrams: ` ```mermaid ` code blocks (converted by `lib/remark-mermaid.ts`)
  - Math: `$...$` / `$$...$$` (remark-math + rehype-katex)
- Use language-tagged code fences (`shell`, `bird2`, ...). Custom grammars live in
  `langs/` and are registered in `source.config.ts` (`rehypeCodeOptions.langs`)
- Preserve Chinese-first tone and terminology consistency

## 10) Change Strategy for Agents
Before editing:
1. Read target file + nearby patterns
2. Prefer minimal diffs over broad refactors
3. Do not add dependencies unless requested
After editing:
1. Run `pnpm run typecheck`
2. Run `pnpm run build`
3. Report pre-existing failures separately

## 11) Commit / PR Hygiene
- Do not commit unless explicitly asked
- Keep commit scope focused (one concern per commit)
- In PR description, include:
  - what changed
  - why it changed
  - validation commands run

## 12) Notes on External Best Practices
Use external Fumadocs / Next.js best practices as reference only.
Repository facts and existing behavior always take precedence
unless the user explicitly requests migration.
