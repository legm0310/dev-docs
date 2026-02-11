'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px' },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="doc-toc w-56 shrink-0 hidden xl:block" aria-label="목차">
      <div className="sticky top-8 overflow-y-auto">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">목차</h4>
        <ul className="space-y-1 max-h-[calc(100vh-10rem)]">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm py-1 pr-2 transition-colors ${heading.level === 3 ? 'pl-4' : ''} ${
                  activeId === heading.id ? 'active' : ''
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
