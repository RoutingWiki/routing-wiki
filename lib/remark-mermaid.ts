import type { Root, Code } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Remark 插件：把 ```mermaid 代码块转换为 <Mermaid chart="..." /> 组件，
 * 以便在 Fumadocs 中通过客户端组件渲染图表。
 */
export default function remarkMermaid(): Transformer<Root> {
  return (tree) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.lang !== 'mermaid') return;

      const chart = node.value ?? '';

      parent.children[index] = {
        // 构造一个 MDX JSX 流式元素节点
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'chart',
            value: chart,
          },
        ],
        children: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
  };
}
