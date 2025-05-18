import { getSortedPostList } from '@/lib/mdx';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const posts = getSortedPostList(); // 서버에서 호출
  return <Navbar posts={posts} />;
}