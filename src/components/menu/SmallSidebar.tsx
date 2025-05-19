'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import type { TocItem } from '@/lib/parseTOC';

interface Props {
  toc?: TocItem[];
}

const getIndentClass = (level: number) => {
  switch (level) {
    case 1:
      return 'pl-0';
    case 2:
      return 'pl-4'; 
    case 3:
      return 'pl-8';
    case 4:
    case 5:
    case 6:
    default:
      return 'pl-0';
  }
};

export const SmallSidebar = ({ toc = [] }: Props) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
  const onScroll = () => {
    const headings = toc.map(item => document.getElementById(item.id));
    const offset = 100;

    const visibleIds: string[] = [];

    for (const heading of headings) {
      if (heading) {
        const { top, bottom } = heading.getBoundingClientRect();
        const inView = top < window.innerHeight - offset && bottom > 0;
        if (inView) {
          visibleIds.push(heading.id);
        }
      }
    }

    setActiveIds(visibleIds);
  };

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, [toc]);

  return (
    <aside
      className={`
        hidden lg:block
        w-56
        rounded-xl
        p-4
        shadow-none
        text-sm text-gray-800 dark:text-gray-300
        overflow-y-auto max-h-[90vh]
        sticky top-[100px]
      `}
    >
      {/* 제목 */}
      <div className="mb-3 font-semibold">목차</div>
      <hr className="mb-3 mt-3 border-t border-gray-200 dark:border-zinc-700" />

      {/* TOC 항목 */}
      <nav className="space-y-1">
        {toc.map((item) => {
        const isActive = activeIds.includes(item.id);
        const indentClass = getIndentClass(item.level);
        return (
            <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1 pr-2 whitespace-normal break-words no-underline ${indentClass} ${
                isActive ? '!text-blue-500 font-extrabold' : ''
            } hover:text-blue-400 transition-colors`}
            >
            {item.text}
            </a>
        );
        })}
      </nav>

      <hr className="mt-4 mb-2 border-t border-gray-200 dark:border-zinc-700" />

      {/* 맨 위로 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="mt-2 p-1 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:text-blue-400 transition"
      >
        <ArrowUp size={20} />
      </button>
    </aside>
  );
};