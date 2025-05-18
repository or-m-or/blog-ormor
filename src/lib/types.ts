// 게시물 frontmatter 타입
export type PostMatter = {
  title: string;        // 제목
  description: string;  // 요약
  thumbnail: string;    // 미리보기 이미지 경로
  category: string;     // 카테고리
  tags: string[];       // 태그 목록
  date: string;         // 작성 일자
  slug: string;         // 경로
  draft?: boolean;      // 작성 중 (true 이면 작성 중)
};

// 전체 게시물 타입
export type Post = PostMatter & {
  content: string;      // 본문 내용
  wordCount: number;    // 단어 수
};