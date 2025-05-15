import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

const dunggeunmo = localFont({
  src: "./fonts/DungGeunMo.woff2",
  display: "swap",
  variable: "--font-dunggeunmo",
});

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
      className={`${moneygraphy.variable} ${pretendard.variable} ${dunggeunmo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
