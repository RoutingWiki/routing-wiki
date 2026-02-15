# AGENTS.md
Operational guide for agentic coding assistants in this repository.

## 1) Project Identity
- Project: `routing-wiki`
- Stack: Docusaurus 3 + TypeScript
- Package manager: `pnpm`
- Node: `>=20.0`
- Main content: Chinese docs about Bird/BGP
- Build output: `./build` (also used by Cloudflare assets)

## 2) Source-of-Truth Files
Read these first before changing behavior:
- `package.json` (scripts/engines/deps)
- `README.md` (workflow + authoring expectations)
- `docusaurus.config.ts` (plugins, i18n, quality gates)
- `sidebars.ts` (doc IA)
- `tsconfig.json` (TS baseline)
- `wrangler.toml` (deploy output)

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
- `pnpm run start` (Docusaurus dev server)

### Production Build + Preview
- `pnpm run build` (output to `./build`)
- `pnpm run serve` (preview built site)

### Type Checking
- `pnpm run typecheck` (`tsc`)

### Maintenance
- `pnpm run clear`
- `pnpm run write-translations`
- `pnpm run write-heading-ids`

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
- One-file TS check (ad hoc):
  - `npx tsc --noEmit src/plugins/remark-rfc-linker.ts`
  - This is not a real unit test
If tests are added later, document exact commands here, e.g.:
- Vitest single file: `pnpm vitest run path/to/file.test.ts`
- Vitest single case: `pnpm vitest run -t "case name"`
- Jest single file: `pnpm jest path/to/file.test.ts`
- Jest single case: `pnpm jest -t "case name"`

## 7) Code Style Baseline (Observed)
No formatter is enforced in repo, so match local file conventions.

### Imports
- Prefer ESM `import`/`export`
- Use `import type` for type-only imports
- React/TSX commonly uses `import type {ReactNode} from 'react'`
- For Docusaurus internals, follow existing aliases:
  - `@site/...`
  - `@theme/...`

### Quotes / Formatting
- TSX in `src/pages` and `src/components`: mostly single quotes
- Config/plugin TS files: may use double quotes
- Keep file-local consistency; avoid repository-wide quote rewrites
- Use 2-space indentation
- Keep semicolon style consistent with the file

### TypeScript
- Keep meaningful explicit types (props/options/returns)
- Prefer small composable `type`/`interface`
- Avoid `any`, `@ts-ignore`, `@ts-expect-error`
- Use type guards when narrowing unions

### React Components
- Prefer function components
- Existing pages/components often return `ReactNode`
- Keep components declarative and small
- Use CSS Modules for component-scoped styles

### Naming
- Components/types: `PascalCase`
- Functions/variables: `camelCase`
- Docs paths/slugs: kebab-case style is common
- Component entry file commonly: `index.tsx`

## 8) Error Handling & Safety
- Add defensive checks for user/content-derived data
- In plugins/transformers, return safe defaults for invalid matches
- Do not silently swallow errors in new logic
- Keep error messages specific and actionable

## 9) Docusaurus / Docs Authoring Conventions
- Every doc needs front matter (`title`, `description`)
- Keep `sidebars.ts` synchronized when adding/moving docs
- Use language-tagged code fences (`shell`, `bird2`, etc.)
- Prefer Docusaurus admonitions (`:::note`, `:::tip`, ...)
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
Use external Docusaurus best practices as reference only.
Repository facts and existing behavior always take precedence
unless the user explicitly requests migration.
