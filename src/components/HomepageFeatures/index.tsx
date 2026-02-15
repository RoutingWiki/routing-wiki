import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const IconMap = {
  rocket: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 18 18 6" />
      <path d="M8 6h10v10" />
      <path d="M6 12v6h6" />
    </svg>
  ),
  setting: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55" />
    </svg>
  ),
  'list-format': (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  ),
  comment: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
    </svg>
  ),
} as const;

type FeatureIcon = keyof typeof IconMap;

type Cta = {label: string; to: string} | {label: string; href: string};

type FeatureItem = {
  title: string;
  icon: FeatureIcon;
  description: ReactNode;
  cta?: Cta;
};

const FeatureList: FeatureItem[] = [
  {
    title: '新手教程',
    icon: 'rocket',
    description: '快速学习如何配置和使用 Bird 路由软件。',
    cta: {label: '开始学习', to: '/beginner'},
  },
  {
    title: 'Bird配置',
    icon: 'setting',
    description: '深入了解 Bird 的各种配置选项和最佳实践。',
    cta: {label: '访问 Bird Wiki', href: 'https://bird.xmsl.dev/'},
  },
  {
    title: '过滤器',
    icon: 'list-format',
    description: '学习如何配置和使用 Bird 的过滤器功能。',
    cta: {label: '查看过滤器指南', to: '/beginner/connect-with-others/filters'},
  },
  {
    title: '社区支持',
    icon: 'comment',
    description: '加入我们的 TG 群获取帮助。',
    cta: {label: '加入社群', href: 'https://t.me/routing_wiki_group'},
  },
];

function isExternal(cta: Cta): cta is {label: string; href: string} {
  return 'href' in cta;
}

function Feature({title, icon, description, cta}: FeatureItem) {
  const glyph = IconMap[icon];
  const isDescriptionString = typeof description === 'string';
  return (
    <article className={styles.card}>
      <div className={styles.cardTitle}>
        <span className={styles.cardIcon} aria-hidden="true">
          {glyph}
        </span>
        <Heading as="h3" className={styles.cardHeading}>
          {title}
        </Heading>
      </div>
      <div className={styles.cardBody}>
        {isDescriptionString ? <p>{description}</p> : description}
      </div>
      {cta ? (
        <Link
          className={styles.cardCta}
          {...(isExternal(cta)
            ? {href: cta.href, target: '_blank', rel: 'noopener noreferrer'}
            : {to: cta.to})}>
          <span>{cta.label}</span>
          <span aria-hidden="true" className={styles.cardCtaIcon}>
            ↗
          </span>
        </Link>
      ) : null}
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            快速入口
          </Heading>
          <p className={styles.sectionSubtitle}>
            按照你的目标选择下一步，快速搭建 Bird / BGP 环境。
          </p>
        </div>
        <div className={styles.cardGrid}>
          {FeatureList.map((item) => (
            <Feature key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
