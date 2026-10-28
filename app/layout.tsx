import './globals.css';
import { C } from '@/lib/content';
import Header from '@/components/Header';
export const metadata = { title: C.brand };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body><Header /><main className="mx-auto max-w-3xl p-4">{children}</main>
        <footer className="mx-auto max-w-3xl p-4 text-xs text-slate-500"><p>{C.author}</p><p>{C.disclaimer}</p></footer></body>
    </html>);
}
