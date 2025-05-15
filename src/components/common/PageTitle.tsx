import { ReactNode } from 'react';

type TextAlign = 'left' | 'center' | 'right';

interface PageTitleProps {
  title: string;
  description: ReactNode;
  align?: TextAlign;
}

export const PageTitle = ({ title, description, align = 'left' }: PageTitleProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={`mb-12 ${alignClass}`}>
      <h1 className='mb-4 text-5xl font-bold text-white md:text-6xl'>{title}</h1>
      <div className='text-lg text-white/60'>{description}</div>
    </div>
  );
};
