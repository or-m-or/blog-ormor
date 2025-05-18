import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface UnderlineTabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export default function UnderlineTabs({
  items,
  defaultValue,
  className,
}: UnderlineTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || items[0]?.value} className={className}>
      {/* 밑줄 전체 확장 */}
      <div className="w-full border-b border-border">
        <TabsList className="flex gap-4 bg-transparent px-0 py-0">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="relative pb-2 text-base font-medium text-muted-foreground
                hover:text-foreground
                data-[state=active]:text-foreground
                data-[state=active]:font-semibold
                after:absolute after:inset-x-0 after:bottom-[-1px]
                after:h-0.5 after:bg-transparent
                data-[state=active]:after:bg-primary
                after:transition-all after:rounded-none
                outline-none ring-0 focus:ring-0 focus:outline-none
                shadow-none data-[state=active]:shadow-none
                border-none focus:border-none dark:border-none data-[state=active]:bg-transparent
                dark:data-[state=active]:bg-transparent"
            >
            {item.label}
          </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}