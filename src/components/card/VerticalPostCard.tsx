"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FrontMatter } from '@/lib/posts';
import { CategoryBadge } from '@/components/badge/CategoryBadge';
import { TagBadge } from '@/components/badge/TagBadge';

interface PostCardProps {
  post: FrontMatter;
}

export const VerticalPostCard = ({ post }: PostCardProps) => {
  const router = useRouter();

  if (!post) return null;

  const { title, description, thumbnail, category, tags, date, slug } = post;
  return (
    <div
      onClick={() => router.push(`/posts/${slug}`)}
      className='group relative flex max-w-xs w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-transparent dark:border-neutral-800 transition-all bg-white dark:bg-neutral-900 hover:shadow-md dark:hover:shadow-lg'
    >
      <div className='relative h-[180px] mb-4 aspect-video overflow-hidden rounded-md'>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <div className='flex flex-1 flex-col px-4 pb-4'>
        <div className='mb-2 flex items-start justify-between gap-2'>
          <h3 className='text-xl font-semibold text-neutral-900 dark:text-white line-clamp-2'>{title}</h3>
          <CategoryBadge category={category} />
        </div>
        <p className='mb-4 text-sm text-neutral-500 dark:text-neutral-400'>{date}</p>
        <p className='mb-6 flex-1 text-neutral-700 dark:text-neutral-300 line-clamp-3'>{description}</p>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};