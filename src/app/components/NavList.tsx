'use client'

import Link from 'next/link';
import styles from './NavList.module.css';
import { usePathname } from 'next/navigation';

type NavListProps = {
    data: Array<{ url: string, text: string }>
}

export default function NavList({ data }: NavListProps) {
    const pathname = usePathname();

    const isCurrentPath = (url: string) => pathname === url;

    return (
        <ul className={styles['nav-list']}>
            {data.map(item => {
                return (
                    <li key={item.url} className={[styles['nav-list-item'], isCurrentPath(item.url) ? styles['active'] : ''].join(' ')}>
                        <Link style={{ textDecoration: 'none' }} className={isCurrentPath(item.url) ? 'active' : ''} href={item.url}>{item.text}</Link>
                    </li>
                )
            })}
        </ul>
    )
}
