import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Routing Wiki',
    template: '%s | Routing Wiki',
  },
  description: '一篇关于路由的百科（或者手册）——围绕 Bird / BGP 的中文知识库。',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-Hans" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
