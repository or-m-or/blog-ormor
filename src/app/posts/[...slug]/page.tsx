import { generateStaticParams, getPostBySlug } from '@/lib/mdx';
import { PostHeader } from '@/components/layouts/PostHeader';
import type { PostMatter } from '@/lib/types';
import { SmallSidebar } from '@/components/menu/SmallSidebar';

export function generateStaticParamsWrapper() {
  return generateStaticParams();
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts.join('/');

  const { Post, frontmatter } = await getPostBySlug(slug) as {
    Post: React.FC;
    frontmatter: PostMatter;
  };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex justify-center gap-6">
        {/* 본문 */}
        <div className="flex-1 max-w-[720px]">
          <PostHeader post={frontmatter} />
          <article className="py-0">
            <Post />
          </article>
          <hr />
        </div>

        {/* TOC 사이드바 */}
        <aside className="hidden lg:block w-[240px] shrink-0 self-start sticky top-[100px]">
          <SmallSidebar toc={frontmatter.toc} />
        </aside>
      </div>
);
}

export const dynamicParams = false;