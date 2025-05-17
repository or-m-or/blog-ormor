'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '@/setting/navitems';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`font-pretendard fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-background/50 backdrop-blur-md' : 'bg-background'
      }`}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* 로고 */}
          <Link
            href='/'
            className='font-dunggeunmo flex flex-shrink-0 items-center space-x-2 text-2xl font-bold whitespace-nowrap text-neutral-900 dark:text-white'
          >
            <Image
              src='/icons/asterisk.png'
              alt='Logo'
              width={24}
              height={24}
              className='rounded-sm'
            />
            <span>ormor</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-4 '>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className='hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-base font-medium font-dunggeunmo'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='hover:bg-accent hover:text-accent-foreground rounded-md p-2'
            >
              <Menu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className='hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-base font-medium font-dunggeunmo'
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
