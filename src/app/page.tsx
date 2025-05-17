import { getAllPosts } from '@/lib/posts';
import { PostBoard } from '@/components/board/PostBoard';

export default function HomePage() {
  const posts = getAllPosts();

  return <PostBoard posts={posts} />;
}