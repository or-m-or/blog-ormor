"use client";

import { CATEGORY_CONFIG, PostCategory, POST_CATEGORIES } from '@/setting/post';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CategoryFilterProps {
  selected: PostCategory;
  onSelect: (category: PostCategory) => void;
  className?: string;
}

export function CategoryFilter({ selected, onSelect, className }: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {POST_CATEGORIES.map((category) => {
        const config = CATEGORY_CONFIG[category];
        const Icon = config.icon;

        const isSelected = selected === category;

        return (
          <Button
            key={category}
            variant={isSelected ? 'default' : 'outline'}
            onClick={() => onSelect(category)}
            className={cn(
              'flex items-center gap-1 text-sm px-3 py-1.5 h-auto rounded-md',
              config.style
            )}
          >
            <Icon className="w-4 h-4" />
            {config.label}
          </Button>
        );
      })}
    </div>
  );
}
