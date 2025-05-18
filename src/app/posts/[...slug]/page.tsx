import { generateStaticParams, getPostBySlug } from '@/lib/mdx';

export function generateStaticParamsWrapper() {
  return generateStaticParams();
}

// 동적 라우팅된 블로그 페이지 렌더링
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts.join('/');
  const Post = await getPostBySlug(slug);
  return <Post />;
}

// 지정된 slug 외의 경로 접근은 404
export const dynamicParams = false;