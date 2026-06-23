'use client';

import { useMemo } from 'react';
import { renderMermaidSVG } from 'beautiful-mermaid';

export function Mermaid({ chart }: { chart: string }) {
  const { svg, error } = useMemo(() => {
    try {
      return {
        svg: renderMermaidSVG(chart, {
          // 使用 Fumadocs 主题变量，深浅色切换时自动跟随，无需重新渲染
          bg: 'var(--color-fd-background)',
          fg: 'var(--color-fd-foreground)',
          accent: 'var(--color-fd-primary)',
          muted: 'var(--color-fd-muted-foreground)',
          transparent: true,
        }),
        error: null as string | null,
      };
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }, [chart]);

  if (error || svg === null) {
    return (
      <pre className="my-4 overflow-x-auto text-fd-muted-foreground">{error ?? chart}</pre>
    );
  }

  return (
    <div
      className="my-4 flex justify-center [&_svg]:max-w-full"
      role="img"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
