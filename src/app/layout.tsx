'use client';
import style from '@/app/layout.module.css';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import MainBackground from '@/app/components/MainBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={style.rootsite} lang="en">
      <body className={style.maincontent + ' ' + inter.className}>
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <MainBackground />
      </body>
    </html>
  )
}
