'use client';

import { useState } from 'react';
import { SearchInput } from '@/components/input/SearchInput';
import { CategoryFilter } from '@/components/button/CategoryFilter';
import { ThumbnailPostCard } from '@/components/card/ThumbnailCard';
import { POST_CATEGORIES, type PostCategory } from '@/setting/post';
import type { Post } from '@/lib/posts';

interface BoardProps {
  posts: Post[];
}

export function PostBoard({ posts }: BoardProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PostCategory>('ALL');

  const filtered = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || post.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* 검색창 */}
      <SearchInput
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8"
      />
     
     {/* 카테고리 필터 */}
      <CategoryFilter selected={category} onSelect={setCategory} className="mb-8" />
      
     {/* 게시물 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
        {filtered.map((post) => (
          <ThumbnailPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}