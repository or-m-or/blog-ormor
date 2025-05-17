import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import type { PostCategory, PostTag } from '@/constants/post';

// MDX 파일들이 저장된 디렉토리 경로
const POSTS_DIR = path.join(process.cwd(), 'src', 'content');

// 게시물 frontmatter 타입
export type FrontMatter = {
  title: string;        // 제목
  description: string;  // 요약
  thumbnail: string;    // 미리보기 이미지 경로
  category: PostCategory;     // 카테고리
  tags: PostTag[];       // 태그 목록
  date: string;         // 작성 일자
  slug: string;         // 경로
  draft?: boolean;      // 작성 중 (true 이면 작성 중)
};

// 전체 게시물 타입
export type Post = FrontMatter & {
  content: string;      // 본문 내용
  wordCount: number;    // 단어 수
};

// 주어진 디렉토리에서 .mdx 파일을 모두 재귀적으로 수집
function walkMdxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkMdxFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      return [fullPath];
    }
    return [];
  });
}

// 단일 mdx 파일에서 frontmatter와 본문 데이터 추출 후 가공
function parsePost(filePath: string): Post | undefined {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const fm = data as FrontMatter;

    if (fm.draft) return;

    const relativePath = path.relative(POSTS_DIR, filePath);
    const slug = relativePath.replace(/\.mdx$/, '').split(path.sep).join('/');

    return {
      ...fm,
      date: dayjs(fm.date).format('YYYY-MM-DD'),
      tags: fm.tags.filter(Boolean),
      slug,
      content,
      wordCount: content.split(/\s+/gu).length,
    };
  } catch (e) {
    console.error('Error parsing MDX file:', filePath, e);
    return;
  }
}

// 전체 게시물 목록 불러오기
export function getAllPosts(): Post[] {
  const files = walkMdxFiles(POSTS_DIR);
  return files.reduce<Post[]>((acc, filePath) => {
    const post = parsePost(filePath);
    if (post) acc.push(post);
    return acc;
  }, []);
}