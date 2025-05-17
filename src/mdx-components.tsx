import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// MDX에서 사용하는 HTML 태그에 대한 전역 스타일 설정
// MDX에서 사용하는 HTML 태그 중 커스텀 요소만 정의
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 이미지 컴포넌트
    img: (props) => (
      <Image
        sizes="100vw"
        className="my-0 mx-auto rounded-lg shadow-md"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),

    // 추후 Youtube 등 커스텀컴포넌트 스타일 추가

    ...components,
  }
}