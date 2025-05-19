export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 마크다운 본문에서 #, ##, ### 헤더를 파싱하여 TOC 항목을 반환
export function parseToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.*)/); // # ~ ### 지원
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w가-힣\s-]/g, '')
        .replace(/\s+/g, '-');

      toc.push({ id, text, level });
    }
  }

  return toc;
}