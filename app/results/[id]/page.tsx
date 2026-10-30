import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';
import { C } from '@/lib/content';
import { TYPES, NORMA, typeById, type TypeInfo } from '@/lib/data';
import VideoRecommendation from '@/components/VideoRecommendation';
import ScoreChart from '@/components/ScoreChartLazy';
import PointCard from '@/components/PointCard';
function Reco({ t }: { t: TypeInfo }) {
  return (<div className="card space-y-3"><h3 className="text-lg font-bold">{t.name}</h3>
    <div><b>{C.results.food}</b><ul className="list-disc pl-5 text-sm">{t.food.map(f => <li key={f}>{f}</li>)}</ul></div>
    <div><b>{C.results.tea}</b><p className="text-sm">{t.tea}</p></div>
    <div><b>{C.results.points}</b><p className="text-xs text-slate-500">{C.results.pointsHow}</p>
      {t.points.map(p => <PointCard key={p.name} p={p} />)}<p className="mt-1 text-xs text-slate-500">{C.more.imgNote}</p></div>
    <div><b>{C.more.qigong}</b><ul className="list-disc pl-5 text-sm">{t.qigong.map(f => <li key={f}>{f}</li>)}</ul></div>
    <VideoRecommendation typeId={t.id} />
    <div><b>{C.more.lifestyle}</b><ul className="list-disc pl-5 text-sm">{t.lifestyle.map(f => <li key={f}>{f}</li>)}</ul></div>
    <div className="rounded-xl bg-blue-50 p-3 text-sm"><b>{C.more.why}.</b> {t.why}</div>
    {t.caution && <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900"><b>{C.more.caution}.</b> {t.caution}</div>}
    <p className="text-xs text-slate-500">{C.more.herbs}</p></div>);
}
export default async function Results({ params }: { params: { id: string } }) {
  const { data } = await supabaseServer().from('test_results').select('*').eq('id', params.id).maybeSingle();
  if (!data) return <p className="mt-10">{C.results.notFound} <Link href="/dashboard" className="text-blue-700">←</Link></p>;
  const chart = TYPES.map(t => ({ id: t.id, name: t.name, score: (data.scores as Record<string, number>)[t.id] ?? 0, short: t.short }));
  const p = typeById(data.primary_type_id), s = typeById(data.secondary_type_id);
  return (<div className="space-y-5"><Link href="/dashboard" className="text-sm text-blue-700">← {C.brand}</Link>
    <h1 className="text-2xl font-bold">{C.results.title}</h1>
    <section className="card"><h2 className="mb-1 font-semibold">{C.results.chart}</h2><p className="mb-2 text-xs text-slate-500">{C.results.chartNote}</p><ScoreChart data={chart} leaderId={p?.id ?? null} /></section>
    {p ? <section className="card border-blue-300"><h2 className="text-xl font-bold">{p.name}</h2><p className="text-sm text-slate-600">{p.short}</p><p className="mt-2 text-sm">{p.causes}</p></section>
       : <section className="card"><h2 className="text-xl font-bold">{C.results.normalTitle}</h2><p className="text-sm">{C.results.normalText}</p></section>}
    {s && <section className="card"><h2 className="font-bold">{C.results.combo}: {p?.name} + {s.name}</h2><p className="text-sm">{C.results.comboText}</p></section>}
    {p ? <Reco t={p} /> : <Reco t={NORMA} />}{s && <Reco t={s} />}</div>);
}
