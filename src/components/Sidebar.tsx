'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';

interface SidebarItem {
  title: string;
  slug: string;
  order: number;
  children: SidebarItem[];
}

const STORAGE_KEY = 'sidebar-open-slugs';

function loadOpenSlugs(): Set<string> | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {}
  return null;
}

function saveOpenSlugs(slugs: Set<string>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
  } catch {}
}

function findActiveAncestors(items: SidebarItem[], currentSlug: string): Set<string> {
  const result = new Set<string>();
  function walk(item: SidebarItem, ancestors: string[]): boolean {
    if (item.slug === currentSlug) {
      ancestors.forEach((a) => result.add(a));
      return true;
    }
    for (const child of item.children) {
      if (walk(child, [...ancestors, item.slug])) return true;
    }
    return false;
  }
  for (const item of items) {
    walk(item, []);
  }
  return result;
}

function SidebarGroup({
  item,
  currentSlug,
  isOpen,
  onToggle,
  openSlugs,
}: {
  item: SidebarItem;
  currentSlug: string;
  isOpen: boolean;
  onToggle: (slug: string) => void;
  openSlugs: Set<string>;
}) {
  const filteredChildren = item.children.filter((child) => child.title !== '마크다운 기능 테스트');
  const isActive = currentSlug === item.slug;

  if (filteredChildren.length === 0) {
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
      <div className={`flex items-center justify-between w-full rounded-md group ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}>
        <Link href={`/docs/${item.slug}`} onClick={() => { if (!isOpen) onToggle(item.slug); }} className={`flex-1 px-3 py-1.5 text-sm font-medium text-left ${
          isActive ? 'text-blue-700' : 'text-gray-900'
        }`}>
          {item.title}
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggle(item.slug);
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
          {filteredChildren.map((child) => (
            <SidebarGroup
              key={child.slug}
              item={child}
              currentSlug={currentSlug}
              isOpen={openSlugs.has(child.slug)}
              onToggle={onToggle}
              openSlugs={openSlugs}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\/docs\//, '');

  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => {
    const stored = loadOpenSlugs();
    const ancestors = findActiveAncestors(items, currentSlug);
    const result = stored ? new Set([...stored, ...ancestors]) : ancestors;
    saveOpenSlugs(result);
    return result;
  });

  const handleToggle = useCallback((slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      saveOpenSlugs(next);
      return next;
    });
  }, []);

  return (
    <nav className="w-72 shrink-0 border-gray-200 bg-white overflow-y-auto">
      <div className="px-2 py-4 space-y-1">
        {items.map((item) => (
          <SidebarGroup
            key={item.slug}
            item={item}
            currentSlug={currentSlug}
            isOpen={openSlugs.has(item.slug)}
            onToggle={handleToggle}
            openSlugs={openSlugs}
          />
        ))}
      </div>
    </nav>
  );
}
