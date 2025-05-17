"use client";

import { useRouter } from "next/navigation";
import { CategoryBadge } from "@/components/badge/CategoryBadge";
import { TagBadge } from "@/components/badge/TagBadge";
import type { FrontMatter } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface Props {
  post: FrontMatter;
}

export const ThumbnailPostCard = ({ post }: Props) => {
  const router = useRouter();
  const { title, description, thumbnail, category, tags, date, slug } = post;

  return (
    <div
      className="w-full sm:max-w-sm md:max-w-md lg:max-w-[280px] cursor-pointer group"
      onClick={() => router.push(`/posts/${slug}`)}
    >
      <div
        className={cn(
          "relative h-[280px] sm:h-[440px] md:h-[480px] lg:h-[380px] rounded-xl shadow-xl overflow-hidden bg-cover bg-center flex flex-col justify-between p-4 transition-transform duration-300 group-hover:scale-[1.01]",
          "bg-[url('/fallback.jpg')]"
        )}
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-40 transition duration-300 group-hover:opacity-60" />
        
        {/* 상단 카테고리 + 날짜 */}
        <div className="z-10 flex items-center justify-between mb-2">
          <CategoryBadge category={category} />
          <p className="text-xs text-gray-300">{date}</p>
        </div>

        {/* 중간 텍스트 */}
        <div className="z-10 text-white mt-auto">
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-200 mt-1 line-clamp-3">{description}</p>
        </div>

        {/* 하단 태그 */}
        <div className="z-10 mt-3">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};