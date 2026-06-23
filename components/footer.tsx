import Link from 'next/link';

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: '导航',
    items: [
      { label: 'Bird 新手教程', href: '/docs/beginner' },
      { label: '杂项', href: '/docs/misc' },
    ],
  },
  {
    title: '社区',
    items: [
      { label: 'Telegram 频道', href: 'https://t.me/routing_wiki', external: true },
      { label: 'Telegram 群组', href: 'https://t.me/routing_wiki_group', external: true },
    ],
  },
  {
    title: '更多',
    items: [
      { label: 'Bird Wiki', href: 'https://bird.xmsl.dev/', external: true },
      { label: 'GitHub', href: 'https://github.com/SkywolfCloud/routing-wiki', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-fd-border bg-fd-card/40">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-sm font-semibold text-fd-foreground">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-fd-border py-4 text-center text-sm text-fd-muted-foreground">
        Copyright © {new Date().getFullYear()} Skywolf Inc
      </div>
    </footer>
  );
}
