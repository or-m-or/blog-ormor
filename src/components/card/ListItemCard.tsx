'use client';

import Link from 'next/link';
import type { Post } from '@/lib/types';

interface Props {
  post: Post;
}

export function ListItemCard({ post }: Props) {
  return (
    <li>
      <Link
        href={`/posts/${post.slug}`}
        className="flex items-center gap-5 hover:bg-muted rounded-md px-0 py-0 transition-colors"
      >
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <span className="text-lg text-foreground">{post.title}</span>
      </Link>
    </li>
  );
}