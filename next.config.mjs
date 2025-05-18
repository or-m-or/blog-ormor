import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm' // GFM(autolink literals, footnotes, strikethrough, tables, tasklists...) 문법들을 해석해주는 도구 
import remarkMath from 'remark-math' // 수학 수식
import remarkToc from 'remark-toc' // 자동 목차 TOC
import remarkBreaks from 'remark-breaks' // 줄바꿈 허용
import rehypeSlug from 'rehype-slug' // 제목에 id 및 앵커 링크 추가
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // 제목에 id 및 앵커 링크 추가
import rehypePrism from 'rehype-prism-plus' // 코드블럭 강조
import rehypeCodeTitles from 'rehype-code-titles' // 코드블럭 파일명(title)
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 필요한 경우 다른 Next.js 설정도 추가 가능
}
 
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // 마크다운 플러그인 추가 가능
  options: {
    remarkPlugins: [
      remarkToc,    // Table Of Content(목차) 생성
      remarkGfm,    // Github 스타일 Markdown 문법 지원
      remarkBreaks, // 줄바꿈 강제 적용
      remarkMath    // 수학 수식 지원
    ],
    rehypePlugins: [
      rehypeSlug,       // Heading에 ID 부여
      rehypeCodeTitles, // 코드블럭 타이틀 렌더링
      rehypePrism,      // 코드블럭 Syntax Highlight
      rehypeKatex,      // Katex 수식 렌더링
      [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }] // Heading에 앵커 링크 추가
    ],
    format: 'mdx',
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)