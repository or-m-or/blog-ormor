'use client';

import type { Post } from '@/lib/types';

interface Props {
  post: Post;
}

export function ListItemCard({ post }: Props) {
  return (
    <div className="flex items-center gap-5 rounded-md px-0 py-0">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-16 h-16 object-cover rounded-md"
      />
      <span className="text-lg text-foreground">{post.title}</span>
    </div>
  );
}