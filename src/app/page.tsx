import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

   return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">📚 블로그 글 목록</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div className="group">
                <h2 className="text-2xl font-semibold group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  {post.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
