import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';
import { C } from '@/lib/content';
import { TYPES, NORMA, typeById } from '@/lib/data';
export default async function Dashboard() {
  const sb = supabaseServer();
  const { data: last } = await sb.from('test_results').select('id, created_at, primary_type_id').order('created_at', { ascending: false }).limit(1).maybeSingle();
  return (
    <div className="space-y-6">
      <section className="card hero-anim fade-up flex items-center gap-4 text-white">
        <img src="/logo.png" className="h-16 rounded-xl bg-white/90 p-2" alt="" />
        <div className="flex-1"><h1 className="text-xl font-bold">{C.brand}</h1><p className="text-sm opacity-90">{C.more.hero}</p></div>
      </section>
      <nav className="flex flex-wrap gap-2">{Object.entries(C.info.titles).map(([k, v]) => <Link key={k} href={`/info/${k}`} className="btn2 !px-3 !py-1.5 text-sm">{v}</Link>)}</nav>
      {last ? (
        <section className="card space-y-3">
          <p className="text-sm text-slate-500">{C.dash.last} · {new Date(last.created_at).toLocaleDateString('ru-RU')}</p>
          <h2 className="text-2xl font-bold">{typeById(last.primary_type_id)?.name ?? C.dash.normal}</h2>
          <div className="flex flex-wrap gap-2"><Link className="btn" href={`/results/${last.id}`}>{C.dash.viewReco}</Link><Link className="btn2" href="/quiz">{C.dash.retake}</Link></div>
        </section>) : (
        <section className="card space-y-3"><p>{C.dash.intro}</p><Link className="btn inline-block" href="/quiz">{C.dash.start}</Link></section>)}
      <section><h2 className="mb-3 text-xl font-bold">{C.dash.encyclopedia}</h2>
        <div className="grid gap-3 sm:grid-cols-2">{[...TYPES, NORMA].map((t, i) => (
          <Link key={t.id} href={`/types/${t.id}`} className="card fade-up hover:border-blue-400" style={{ animationDelay: `${i * 45}ms` }}><b>{t.id ? `${t.id}. ` : ''}{t.name}</b><p className="text-sm text-slate-600">{t.short}</p></Link>))}</div></section>
    </div>);
}
