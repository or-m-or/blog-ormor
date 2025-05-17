import { getAllPosts } from '@/lib/posts';
import { VerticalPostCard } from '@/components/card/VerticalPostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <VerticalPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}