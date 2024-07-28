'use client';
import style from '@/app/layout.module.css';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import MainBackground from '@/app/components/MainBackground';

import { AntdRegistry } from '@ant-design/nextjs-registry';
// WARNING: nextjs & antd integration obstacles https://ant.design/docs/react/use-with-next#using-pages-router

import NavListContainer from '@/app/components/NavListContainer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={style.rootsite} lang="en">
      <body className={style.maincontent + ' ' + inter.className}>
        <MainBackground />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <NavListContainer />
          <br />
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </main>
      </body>
    </html>
  )
}
