import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: 'MATARI', url: '/' }}
      githubUrl="https://github.com/Heronesukun/matari"
    >
      {children}
    </DocsLayout>
  );
}
