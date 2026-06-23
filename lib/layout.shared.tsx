import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Bird 新手教程',
        url: '/docs/beginner',
      },
      {
        text: '杂项',
        url: '/docs/misc',
      },
    ],
  };
}
