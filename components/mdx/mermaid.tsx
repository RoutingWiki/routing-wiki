'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svg, setSvg] = useState('');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let active = true;

    async function renderChart() {
      const { default: mermaid } = await import('mermaid');

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      });

      try {
        const { svg: rendered } = await mermaid.render(
          `mermaid-${id.replace(/[^a-zA-Z0-9]/g, '')}`,
          chart,
        );
        if (active) setSvg(rendered);
      } catch (error) {
        console.error('Failed to render mermaid chart', error);
      }
    }

    void renderChart();

    return () => {
      active = false;
    };
  }, [chart, id, resolvedTheme]);

  return (
    <div
      className="my-4 flex justify-center [&_svg]:max-w-full"
      role="img"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
