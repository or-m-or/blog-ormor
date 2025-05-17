import { Badge } from "@/components/ui/Badge";
import { TAG_CONFIG } from "@/setting/post";
import type { PostTag } from "@/setting/post";

interface Props {
  tag: PostTag;
  className?: string;
}

export const TagBadge = ({ tag, className }: Props) => {
  const { style, icon: Icon } = TAG_CONFIG[tag];
  return (
    <Badge className={`${style} ${className ?? ''}`}>
      {Icon && <Icon className="size-3" />}
      {tag}
    </Badge>
  );
};