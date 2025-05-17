import fs from 'fs';
import path from 'path';

// MDX 파일들이 저장된 루트 디렉토리 지정
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// 재귀적으로 디렉토리를 순회하면서 .mdx 파일의 전체 경로 리스트를 반환
function getAllMdxFilePaths(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllMdxFilePaths(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      return [fullPath];
    }
    return [];
  });
  return files;
}

// 정적 경로 생성을 위한 slug 목록 자동 추출
export function generateStaticParams() {
  const files = getAllMdxFilePaths(CONTENT_DIR);

  return files.map(filePath => {
    const relativePath = path.relative(CONTENT_DIR, filePath);  // CONTENT_DIR 기준 상대 경로 추출
    const withoutExt = relativePath.replace(/\.mdx$/, '');      // 확장자 제거
    const slugArray = withoutExt.split(path.sep);               // 디렉토리 구분자 기준 파일명 추출 -> 배열

    return { slug: slugArray };
  });
}

// 동적 라우팅된 블로그 페이지 렌더링
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts.join('/');
  const { default: Post } = await import(`@/content/${slug}.mdx`);
  return <Post />;
}

// 지정된 slug 외의 경로 접근은 404
export const dynamicParams = false;