'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchInput } from '@/components/search/SearchInput';
import type { Post } from '@/lib/types';
import Link from 'next/link';
import { ListItemCard } from '@/components/card/ListItemCard';

interface Props {
  onClose: () => void;
  posts: Post[];
}

export default function SearchOverlay({ onClose, posts }: Props) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  // 오버레이 상태에서 스크롤 방지
  useEffect(() => {
  document.documentElement.style.overflow = 'hidden'; // html
  document.body.style.overflow = 'hidden'; // body

  const t = setTimeout(() => setVisible(true), 10);

  return () => {
    clearTimeout(t);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };
}, []);

  return (
    <div
  className={`
    fixed top-0 left-0 right-0 h-screen z-50
    px-6 py-10 overflow-y-auto
    bg-white dark:bg-background transition-opacity duration-300
    ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}
  `}
>
      <div className="max-w-3xl mx-auto">
        {/* 상단 바 */}
        <div className="flex justify-between items-center mb-8">
          {/* 로고 */}
          <Link
            href="/"
            className="font-seoleim flex items-center space-x-2 text-3xl font-bold whitespace-nowrap text-neutral-900 dark:text-white"
          >
            <img
              src="/icons/asterisk.png"
              alt="Logo"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span>ormor</span>
          </Link>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 검색 입력창 */}
        <SearchInput
          placeholder="제목 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-8"
        />

        {/* 검색 결과 */}
        <ul className="space-y-3">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} onClick={onClose}>
              <ListItemCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}