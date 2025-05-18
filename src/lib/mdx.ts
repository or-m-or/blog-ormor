import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import { PostMatter, Post } from './types';

// MDX 파일들이 저장된 루트 디렉토리 경로
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// 모든 MDX 파일 경로 수집
export function getAllPostPaths(): string[] {
  const walk = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      if (entry.isFile() && entry.name.endsWith('.mdx')) return [fullPath];
      return [];
    });
  }
  return walk(CONTENT_DIR);
}

// 정적경로를 생성하기 위해 MDX 파일 경로로부터 slug 추출
export function generateStaticParams() {
  return getAllPostPaths().map((filePath) => {
    const relativePath = path.relative(CONTENT_DIR, filePath);
    const withoutExt = relativePath.replace(/\.mdx$/, '');
    const slugArray = withoutExt.split(path.sep);
    return { slug: slugArray };
  });
}

// 슬러그를 기반으로 MDX 컴포넌트를 동적으로 로드
export async function getPostBySlug(slug: string) {
  const { default: Post } = await import(`@/content/${slug}.mdx`);
  return Post;
}

// slug, 경로 등 요약 정보 추출
export function parsePostAbstract(filePath: string) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const slug = relativePath.replace(/\.mdx$/, '').split(path.sep).join('/');
  const slugArray = relativePath.replace(/\.mdx$/, '').split(path.sep);
  const category = slugArray.length > 1 ? slugArray[0] : 'Uncategorized';
  return { slug, category };
}

// MDX파일로부터 frontmatter, 게시물 상세 정보 추출
function parsePostDetail(filePath: string): Post | undefined {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const fm = data as PostMatter;
    if (fm.draft) return;

    const { slug } = parsePostAbstract(filePath);

    return {
      ...fm,
      date: dayjs(fm.date).format('YYYY-MM-DD'),
      tags: fm.tags.filter(Boolean),
      slug,
      content,
      wordCount: content.split(/\s+/gu).length,
    };
  } catch (e) {
    console.error('MDX 파일 파싱 중 오류 발생:', filePath, e);
    return;
  }
}

// 전체 게시물 목록 반환
export function getPostList(): Post[] {
  const files = getAllPostPaths();
  return files.reduce<Post[]>((acc, filePath) => {
    const post = parsePostDetail(filePath);
    if (post) acc.push(post);
    return acc;
  }, []);
}

// 날짜 기준 정렬
export function getSortedPostList(): Post[] {
  return getPostList().sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 개수 반환
export function getAllPostCount(): number {
  return getPostList().length;
}

// sitemap용 URL 목록
export function getSitemapPostList(baseUrl: string): { url: string; lastModified: Date }[] {
  return getPostList().map(({ slug }) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date(),
  }));
}