import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';
import { C } from '@/lib/content';
export default async function Header() {
  // getSession читает cookie без запроса к серверу: шапка не тормозит страницу (доступ защищает middleware)
  const { data: { session } } = await supabaseServer().auth.getSession();
  if (!session) return null;
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between p-4">
      <Link href="/dashboard" className="flex items-center gap-2 font-bold"><img src="/logo.png" alt="" className="h-8" />{C.brand}</Link>
      <form action="/auth/signout" method="post"><button className="btn2 !px-4 !py-1.5 text-sm">{C.dash.logout}</button></form>
    </header>);
}
