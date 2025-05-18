'use client';

import { ThumbnailPostCard } from '@/components/card/ThumbnailCard';
import { POST_CATEGORIES, CATEGORY_CONFIG, type PostCategory } from '@/setting/post';
import type { Post } from '@/lib/types';
import UnderlineTabs from '@/components/tabs/UnderlineTabs';

interface BoardProps {
  posts: Post[];
}

export function PostBoard({ posts }: BoardProps) {
  const getFilteredPosts = (category: PostCategory): Post[] => {
    return posts.filter((post) => {
      const matchesCategory = category === 'ALL' || post.category === category;
      return matchesCategory;
    });
  };

  const tabItems = POST_CATEGORIES.map((category) => ({
    value: category,
    label: CATEGORY_CONFIG[category].label,
    content: (
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 justify-items-center">
        {getFilteredPosts(category).map((post) => (
          <ThumbnailPostCard key={post.slug} post={post} />
        ))}
      </div>
    ),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* 카테고리 탭 필터 */}
      <UnderlineTabs
        items={tabItems}
        defaultValue="ALL"
        className="mb-8"
      />
    </div>
  );
}