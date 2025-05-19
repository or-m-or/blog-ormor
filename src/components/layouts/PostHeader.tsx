'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PostMatter } from '@/lib/types';
import { CATEGORY_CONFIG } from '@/setting/post';
import { CategoryBadge } from '@/components/badge/CategoryBadge';
import { TagBadge } from '@/components/badge/TagBadge';

interface Props {
  post: PostMatter;
}

export const PostHeader = ({ post }: Props) => {
  const { title, thumbnail, category, tags = [], date } = post;

  const categoryLabel =
    category in CATEGORY_CONFIG
      ? CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG].label
      : category;

  // 날짜를 '2025년 3월 26일' 형식으로 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mt-0 mb-20 text-center">
      {/* 썸네일 */}
      <div className="relative mx-auto mb-6 aspect-video w-full max-w-3xl overflow-hidden rounded-xl">
      {/* 카테고리 뱃지 */}
      <div className="absolute top-4 left-4 z-10">
        <Link href={`/?category=${category}`} className="group">
          <CategoryBadge category={category} className="transition-transform group-hover:scale-105" />
        </Link>
      </div>

      {/* 태그들 (하단 좌측) */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/posts?tag=${tag}`} className="group">
              <TagBadge tag={tag} className="transition-transform group-hover:scale-105" />
            </Link>
          ))}
        </div>
      )}

      {/* 썸네일 이미지 */}
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>

      {/* 제목 */}
      <h1 className="text-5xl font-bold text-left tracking-tight leading-tight text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h1>

      <div className="mb-2 max-w-3xl mx-auto text-left">
        {/* 설명 */}
        {post.description && (
          <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        )}
      </div>

      {/* 카테고리 + 태그 + 날짜 */}
      <div className="mb-2 max-w-3xl mx-auto text-left">        
        {/* 작성일 */}
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
        <div className="mt-4 border-t border-gray-300 dark:border-gray-700" />
      </div>
    </header>
  );
};