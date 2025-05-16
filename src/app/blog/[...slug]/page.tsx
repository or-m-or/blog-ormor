export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts.join('/');

// 동적으로 MDX 파일 import
  const { default: Post } = await import(`@/content/${slug}.mdx`);

  return <Post />;
}

// 미리 렌더링할 경로들 명시
export function generateStaticParams() {
  return [
    { slug: ['welcome'] },
    { slug: ['about'] },
    { slug: ['docs', 'intro'] }, 
  ];
}

// 지정된 slug 외의 경로 접근은 404
export const dynamicParams = false;