import './globals.css';
import { C } from '@/lib/content';
export const metadata = { title: C.brand };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body><main className="mx-auto max-w-3xl p-4">{children}</main>
    <footer className="mx-auto max-w-3xl p-4 text-xs text-slate-500"><p>{C.author}</p><p>{C.disclaimer}</p></footer></body></html>;
}
