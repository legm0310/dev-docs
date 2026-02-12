import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import MarkdownRenderer from './MarkdownRenderer';
import type { SidebarItem } from '@/lib/sidebar';
import type { Heading } from '@/lib/docs';

interface DocLayoutProps {
  sidebarItems: SidebarItem[];
  content: string | ReactNode;
  headings: Heading[];
  bundleName: string;
}

export default function DocLayout({ sidebarItems, content, headings, bundleName }: DocLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header bundleName={bundleName} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-8 py-8 lg:px-16 flex gap-16">
            <div className="flex-1 min-w-0 prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-a:no-underline prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none">
              {typeof content === 'string' ? (
                <MarkdownRenderer content={content} />
              ) : (
                content
              )}
            </div>
            <TableOfContents headings={headings} />
          </div>
        </main>
      </div>
    </div>
  );
}
