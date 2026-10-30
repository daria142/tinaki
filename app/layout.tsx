import './globals.css';
import { Manrope } from 'next/font/google';
import { C } from '@/lib/content';
import Header from '@/components/Header';
const font = Manrope({ subsets: ['latin', 'cyrillic'], display: 'swap', weight: ['400', '500', '700'] });
export const metadata = { title: C.brand };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={font.className}><Header /><main className="mx-auto max-w-3xl p-4">{children}</main>
        <footer className="mx-auto max-w-3xl p-4 text-xs text-slate-500"><p>{C.author}</p><p>{C.disclaimer}</p></footer></body>
    </html>);
}
