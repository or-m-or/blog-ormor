import type { Config } from 'tailwindcss'
const { spacing } = require('tailwindcss/defaultTheme');

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  darkMode: 'class', // 다크모드 전환 시 사용
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#ededed',
          200: '#e5e5e5',
          250: '#dedede',
          300: '#d4d4d4',
          350: '#b5b5b5',
          400: '#a3a3a3',
          450: '#8a8a8a',
          470: '#808080',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          750: '#363636',
          800: '#262626',
          900: '#171717',
        },
      },
      dropShadow: {
        base: '0px 0px 10px rgba(234, 179, 8, 0.3)',
        'base-bold': '0px 0px 7px rgba(234, 179, 8, 0.7)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            //...
            // MDX 앵커 클릭 시 스크롤 설정
            'h1,h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
          }
        }
      })
    }
  },
} satisfies Config;