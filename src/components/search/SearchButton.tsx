'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import type { Post } from '@/lib/types';

interface SearchButtonProps {
  posts: Post[];
}

export function SearchButton({ posts }: SearchButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-muted-foreground hover:text-foreground"
      >
        <Search className="w-5 h-5" />
      </button>
      {open && <SearchOverlay posts={posts} onClose={() => setOpen(false)} />}
    </>
  );
}