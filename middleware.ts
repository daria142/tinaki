import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
type CookieToSet = { name: string; value: string; options: CookieOptions };
const STATIC = /\.(?:png|jpe?g|webp|svg|ico|gif|mp4|webm|woff2?)$/i;
// Относительный Location: за прокси Render req.url указывает на внутренний localhost:10000, поэтому абсолютные адреса нельзя.
const go = (path: string, status = 307) => new NextResponse(null, { status, headers: { Location: path } });
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (STATIC.test(path)) return NextResponse.next(); // картинки и видео доступны всегда
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list: CookieToSet[]) => {
        list.forEach(c => req.cookies.set(c.name, c.value));
        res = NextResponse.next({ request: req });
        list.forEach(c => res.cookies.set(c.name, c.value, c.options));
      },
    },
  });
  const { data: { user } } = await sb.auth.getUser();
  const onLogin = path.startsWith('/login');
  if (!user && !onLogin) return go('/login');
  if (user && (onLogin || path === '/')) return go('/dashboard');
  return res;
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
