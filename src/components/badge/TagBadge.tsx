import { Badge } from "@/components/ui/Badge";
import { TAG_CONFIG } from "@/setting/post";

interface Props {
  tag: string;
  className?: string;
}

export const TagBadge = ({ tag, className }: Props) => {
  if (!(tag in TAG_CONFIG)) {
    return (
      <Badge className={`bg-gray-200 text-gray-600 ${className ?? ''}`}>
        #{tag}
      </Badge>
    );
  }

  const config = TAG_CONFIG[tag as keyof typeof TAG_CONFIG];
  const { style, icon: Icon } = config;

  return (
    <Badge className={`${style} ${className ?? ''}`}>
      {Icon && <Icon className="size-3" />}
      {tag}
    </Badge>
  );
};