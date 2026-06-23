import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';
import remarkRfcLink from './lib/remark-rfc-linker';
import remarkMermaid from './lib/remark-mermaid';
import birdLanguage from './langs/bird2.tmLanguage.json';
import interfacesLanguage from './langs/interfaces.tmLanguage.json';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMermaid, remarkMath, remarkRfcLink],
    rehypePlugins: (plugins) => [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          rel: ['noopener', 'noreferrer'],
          target: '_blank',
        },
      ],
      ...plugins,
    ],
    rehypeCodeOptions: {
      lazy: true,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        birdLanguage as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        interfacesLanguage as any,
      ],
    },
  },
});
