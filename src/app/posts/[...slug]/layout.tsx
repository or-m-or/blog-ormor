export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto p-6">
      {children}
    </div>
  );
}