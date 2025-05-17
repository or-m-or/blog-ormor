import {
  Book,
  User,
  Code,
  Cpu,
  GitBranch,
  Globe,
  FolderKanban,
  Brain,
  Eye,
  LayoutDashboard,
  Boxes,
  Layers,
  Lock,
  Shield,
  Link,
  Cloud,
  Package,
  Network,
  Repeat,
  Spline,
} from 'lucide-react';

export const CATEGORY_CONFIG = {
  ALL: {
    label: '전체',
    style: 'bg-muted text-muted-foreground',
    icon: Globe,
  },
  Stories: {
    label: 'Stories',
    style: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
    icon: User,
  },
  Notes: {
    label: 'Notes',
    style: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    icon: Book,
  },
  // Algorithms: {
  //   label: 'Algorithms',
  //   style: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  //   icon: Cpu,
  // },
  // Projects: {
  //   label: 'Projects',
  //   style: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  //   icon: FolderKanban,
  // },
} as const;

export const TAG_CONFIG = {
  // 언어
  Python: { style: 'bg-yellow-300 text-black', icon: Code },
  TypeScript: { style: 'bg-blue-300 text-blue-900', icon: Code },
  'C++': { style: 'bg-blue-700 text-white', icon: Code },

  // 웹 프레임워크
  'Next.js': { style: 'bg-gray-200 text-gray-900', icon: Cpu },
  
  // AI
  AI: { style: 'bg-pink-200 text-pink-900', icon: Brain },
  'Machine Learning': { style: 'bg-pink-300 text-pink-900', icon: Brain },
  LLM: { style: 'bg-fuchsia-200 text-fuchsia-900', icon: Brain },
  Vision: { style: 'bg-indigo-200 text-indigo-900', icon: Eye },
  RAG: { style: 'bg-purple-200 text-purple-900', icon: Layers },
  'LangChain': { style: 'bg-purple-300 text-purple-900', icon: Link },
  'LangGraph': { style: 'bg-purple-400 text-white', icon: Network },
  'Llama Index': { style: 'bg-purple-500 text-white', icon: Layers },
  
  // C++ 서버
  Socket: { style: 'bg-gray-300 text-gray-900', icon: Link },
  TCP: { style: 'bg-gray-400 text-white', icon: Network },
  IOCP: { style: 'bg-cyan-300 text-cyan-900', icon: Cpu },
  Packet: { style: 'bg-yellow-100 text-yellow-800', icon: Boxes },
  Protobuf: { style: 'bg-green-200 text-green-800', icon: Spline },
  JobQueue: { style: 'bg-teal-200 text-teal-900', icon: Repeat },
  'Multi Thread': { style: 'bg-emerald-200 text-emerald-900', icon: Cpu },
  DeadLock: { style: 'bg-red-200 text-red-900', icon: Lock },
  Lock: { style: 'bg-gray-200 text-gray-800', icon: Lock },
  TLS: { style: 'bg-indigo-300 text-indigo-900', icon: Shield },
  Allocator: { style: 'bg-orange-200 text-orange-900', icon: Package },

  // 데스크톱
  MFC: { style: 'bg-blue-200 text-blue-900', icon: LayoutDashboard },
  WinForm: { style: 'bg-blue-300 text-blue-900', icon: LayoutDashboard },

  Git: { style: 'bg-orange-200 text-orange-800', icon: GitBranch },
  Web: { style: 'bg-green-100 text-green-900', icon: Cloud },

  // ...필요한 만큼 계속 추가 가능
} as const;

// 자동 타입 유추
// 타입스크립트 타입 지정용
export type PostCategory = keyof typeof CATEGORY_CONFIG;
export type PostTag = keyof typeof TAG_CONFIG;

// UI에 렌더링에 사용할 실제 값 배열
export const POST_CATEGORIES = Object.keys(CATEGORY_CONFIG) as PostCategory[];
export const POST_TAGS = Object.keys(TAG_CONFIG) as PostTag[];