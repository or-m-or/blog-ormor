import { Badge } from "@/components/ui/Badge";
import { CATEGORY_CONFIG } from "@/setting/post";

interface Props {
  category: string;
  className?: string;
}

export const CategoryBadge = ({ category, className }: Props) => {
  if (!(category in CATEGORY_CONFIG)) {
    return (
      <Badge className={`bg-gray-200 text-gray-600 ${className ?? ''}`}>
        #{category}
      </Badge>
    );
  }

  const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
  const { label, style, icon: Icon } = config;

  return (
    <Badge className={`${style} ${className ?? ''}`}>
      {Icon && <Icon className="size-3" />}
      {label}
    </Badge>
  );
};