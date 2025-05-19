export default function PostLayout({ children }: { children: React.ReactNode }) {
  // @tailwindcss/typography의 .prose 클래스로 MDX 콘텐츠 전체 스타일 적용
  return (
    <div className="prose dark:prose-invert max-w-none">
      {children}
    </div>
  );
}