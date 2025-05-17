import { Badge } from "@/components/ui/Badge";
import { CATEGORY_CONFIG } from "@/setting/post";
import type { PostCategory } from "@/setting/post";

interface Props {
  category: PostCategory;
  className?: string;
}

export const CategoryBadge = ({ category, className }: Props) => {
  const { label, style, icon: Icon } = CATEGORY_CONFIG[category];
  return (
    <Badge className={`${style} ${className ?? ''}`}>
      {Icon && <Icon className="size-3" />}
      {label}
    </Badge>
  );
};