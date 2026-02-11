'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarItem {
  title: string;
  slug: string;
  order: number;
  children: SidebarItem[];
}

function SidebarGroup({ item, currentSlug }: { item: SidebarItem; currentSlug: string }) {
  item.children = item.children.filter((item: SidebarItem) => item.title !== '마크다운 기능 테스트');
  const isActive = currentSlug === item.slug;
  const isChildActive = item.children.some(
    (child) => currentSlug === child.slug || child.children.some((c) => currentSlug === c.slug),
  );
  const [isOpen, setIsOpen] = useState(isActive || isChildActive);

  if (item.children.length === 0) {
    return (
      <Link
        href={`/docs/${item.slug}`}
        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
          isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full rounded-md hover:bg-gray-50 group">
        <Link
          href={`/docs/${item.slug}`}
          className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-900 text-left"
        >
          {item.title}
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="shrink-0 p-1.5 rounded hover:bg-gray-100 transition-colors"
          aria-expanded={isOpen}
          aria-label={isOpen ? '접기' : '펼치기'}
        >
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="ml-3 mt-1 border-l border-gray-200 pl-2">
          {item.children.map((child) => (
            <SidebarGroup key={child.slug} item={child} currentSlug={currentSlug} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\/docs\//, '');

  return (
    <nav className="w-72 shrink-0 border-gray-200 bg-white overflow-y-auto">
      <div className="px-2 py-4 space-y-1">
        {items.map((item) => (
          <SidebarGroup key={item.slug} item={item} currentSlug={currentSlug} />
        ))}
      </div>
    </nav>
  );
}
