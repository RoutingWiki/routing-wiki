export const appName = 'Routing Wiki';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

interface GitConfig {
  user: string;
  repo: string;
  branch: string;
}

// Fallback values used for local development or when no CI env vars are set.
const gitConfigFallback: GitConfig = {
  user: 'SkywolfCloud',
  repo: 'routing-wiki',
  branch: 'main',
};

function resolveGitConfig(): GitConfig {
  // `GITHUB_REPOSITORY` is provided by GitHub Actions as `owner/repo`.
  // A custom `NEXT_PUBLIC_GIT_REPO` (same `owner/repo` shape) takes precedence
  // so other CI providers (e.g. Cloudflare Pages) can set it explicitly.
  const repoSlug = process.env.NEXT_PUBLIC_GIT_REPO ?? process.env.GITHUB_REPOSITORY;
  let user = gitConfigFallback.user;
  let repo = gitConfigFallback.repo;

  if (repoSlug) {
    const [owner, name] = repoSlug.split('/');
    if (owner && name) {
      user = owner;
      repo = name;
    }
  }

  // `GITHUB_REF_NAME` (GitHub Actions) / `CF_PAGES_BRANCH` (Cloudflare Pages)
  // expose the current branch; `NEXT_PUBLIC_GIT_BRANCH` allows an explicit override.
  const branch =
    process.env.NEXT_PUBLIC_GIT_BRANCH ||
    process.env.GITHUB_REF_NAME ||
    process.env.CF_PAGES_BRANCH ||
    gitConfigFallback.branch;

  return { user, repo, branch };
}

export const gitConfig: GitConfig = resolveGitConfig();
