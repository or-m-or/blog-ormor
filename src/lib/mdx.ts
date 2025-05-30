import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import { PostMatter, Post } from './types';
import { parseToc } from './parseTOC';

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

// slug로 게시물 불러오기
export async function getPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const { slug: parsedSlug } = parsePostAbstract(filePath);

  const toc = parseToc(content);

  const frontmatter: PostMatter = {
    ...(data as PostMatter),
    slug: parsedSlug,
    tags: (data.tags ?? []).filter(Boolean),
    date: dayjs(data.date).format('YYYY-MM-DD'),
    toc,
  };

  // MDX import
  // remark-frontmatter, remark-mdx-frontmatter 설치 후 등록해야, frontmatter이 화면에 렌더링 되지 않음
  const mod = await import(`@/content/${slug}.mdx`);
  const Post = mod.default;

  if (typeof Post !== 'function') {
    throw new Error(`MDX 파일에서 React 컴포넌트 default export 누락됨: ${slug}`);
  }

  return {
    Post,
    frontmatter,
  };
}

// post 개요 정보 추출
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