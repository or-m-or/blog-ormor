import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from '@/components/layouts/NavbarWrapper';
import Footer from '@/components/layouts/Footer';
import { Providers } from "@/components/layouts/Providers";

const moneygraphy = localFont({
  src: "./fonts/Moneygraphy-Rounded.woff2",
  display: "swap",
  variable: "--font-moneygraphy",
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const seoleim = localFont({
  src: "./fonts/SEOLEIMcool.otf",
  display: "swap",
  variable: "--font-seoleim",
})

export const metadata: Metadata = {
  title: "허태환의 블로그",
  description: "안녕하세요. 블로그에 방문해주셔서 감사합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${moneygraphy.variable} ${pretendard.variable} ${seoleim.variable}`}
    >
      <body>
        <Providers>
          <NavbarWrapper />
          <main className='min-h-screen pt-16' >{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
