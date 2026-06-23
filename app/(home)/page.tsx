import Link from 'next/link';
import {
  Rocket,
  Settings,
  ListFilter,
  MessagesSquare,
  ArrowUpRight,
} from 'lucide-react';
import type { ReactNode } from 'react';

const title = 'Routing Wiki';
const tagline = '一篇关于路由的百科（或者手册）';

type Cta = { label: string; href: string; external?: boolean };

type Feature = {
  title: string;
  icon: ReactNode;
  description: string;
  cta: Cta;
};

const features: Feature[] = [
  {
    title: '新手教程',
    icon: <Rocket className="size-5" />,
    description: '快速学习如何配置和使用 Bird 路由软件。',
    cta: { label: '开始学习', href: '/docs/beginner' },
  },
  {
    title: 'Bird 配置',
    icon: <Settings className="size-5" />,
    description: '深入了解 Bird 的各种配置选项和最佳实践。',
    cta: { label: '访问 Bird Wiki', href: 'https://bird.xmsl.dev/', external: true },
  },
  {
    title: '过滤器',
    icon: <ListFilter className="size-5" />,
    description: '学习如何配置和使用 Bird 的过滤器功能。',
    cta: { label: '查看过滤器指南', href: '/docs/beginner/connect-with-others/filters' },
  },
  {
    title: '社区支持',
    icon: <MessagesSquare className="size-5" />,
    description: '加入我们的 TG 群获取帮助。',
    cta: { label: '加入社群', href: 'https://t.me/routing_wiki_group', external: true },
  },
];

const highlights = [
  '完整的入门到进阶路径',
  '覆盖过滤器、互联、运维等场景',
  '包括行业内实际配置',
];

function CtaLink({ cta, className }: { cta: Cta; className?: string }) {
  const external = cta.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Link href={cta.href} className={className} {...external}>
      <span>{cta.label}</span>
      <ArrowUpRight className="size-4" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-20 text-center">
        <span className="mb-5 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-sm font-medium text-fd-muted-foreground">
          BGP 中文指南
        </span>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mb-3 text-lg text-fd-muted-foreground">{tagline}</p>
        <p className="mb-8 max-w-2xl text-fd-muted-foreground">
          从理论到实践，一站式整理包括 Bird 在内多款路由软件的配置、路由过滤、跨地域互联等真实经验，带你搭建可靠的自治系统。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/beginner"
            className="rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            开始入门
          </Link>
          <Link
            href="/docs/misc"
            className="rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            杂项
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-fd-primary" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">快速入口</h2>
          <p className="mt-2 text-fd-muted-foreground">
            按照你的目标选择下一步，快速搭建 Bird / BGP 环境。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
                {feature.icon}
              </div>
              <h3 className="mb-1 font-semibold">{feature.title}</h3>
              <p className="mb-4 flex-1 text-sm text-fd-muted-foreground">
                {feature.description}
              </p>
              <CtaLink
                cta={feature.cta}
                className="inline-flex items-center gap-1 text-sm font-medium text-fd-primary hover:underline"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
