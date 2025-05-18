'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/types';

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  const { title, thumbnail, categoryPath, category, tags, date } = post;

  return (
    <header className="mt-10 text-center">
      {/* 썸네일 */}
      <div className="relative mx-auto mb-6 aspect-video w-full max-w-3xl overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 제목 */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h1>

      {/* 카테고리 + 태그 */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {/* 카테고리 */}
        <Link
          href={`/blog/${categoryPath}`}
          className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          #{category}
        </Link>

        {/* 태그 목록 */}
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tag}`}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* 작성일 */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
    </header>
  );
};