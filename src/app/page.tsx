import { getPostList } from '@/lib/mdx';
import { PostBoard } from '@/components/board/PostBoard';

export default function HomePage() {
  const posts = getPostList();

  return <PostBoard posts={posts} />;
}