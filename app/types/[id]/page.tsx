import Link from 'next/link';
import { notFound } from 'next/navigation';
import { C } from '@/lib/content';
import { typeById, GLOSSARY, DETAILS } from '@/lib/data';
import PointCard from '@/components/PointCard';
const List = ({ title, items }: { title: string; items: string[] }) => items.length ? (
  <div className="card"><b>{title}</b><ul className="mt-1 list-disc pl-5 text-sm">{items.map(s => <li key={s}>{s}</li>)}</ul></div>) : null;
export default function TypePage({ params }: { params: { id: string } }) {
  const t = typeById(+params.id); if (!t) notFound();
  return (<div className="space-y-4"><Link href="/dashboard" className="text-sm text-blue-700">← {C.types.back}</Link>
    <div className="card bg-gradient-to-br from-blue-700 to-blue-500 text-white"><h1 className="text-2xl font-bold">{t.name}</h1><p className="opacity-90">{t.short}</p></div>
    <div className="card"><b>{C.types.causes}</b><p className="text-sm">{t.causes}</p></div>
    {DETAILS[t.id] && <><div className="card"><b>{C.more.body}</b><p className="text-sm">{DETAILS[t.id].body}</p></div><div className="card"><b>{C.more.balance}</b><p className="text-sm">{DETAILS[t.id].balance}</p></div><div className="card"><b>{C.more.watch}</b><p className="text-sm">{DETAILS[t.id].watch}</p></div></>}
    <List title={C.types.signs} items={t.signs} /><List title={C.more.mind} items={t.mind} /><List title={C.more.life} items={t.life} />
    <List title={C.results.food} items={t.food} /><List title={C.more.avoid} items={t.avoid} />
    <div className="card"><b>{C.results.tea}</b><p className="text-sm">{t.tea}</p></div>
    {t.points.length > 0 && <div className="card"><b>{C.results.points}</b>{t.points.map(p => <PointCard key={p.name} p={p} />)}</div>}
    <List title={C.more.qigong} items={t.qigong} /><List title={C.more.lifestyle} items={t.lifestyle} />
    <div className="rounded-xl bg-blue-50 p-3 text-sm"><b>{C.more.why}.</b> {t.why}</div>
    {t.caution && <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900"><b>{C.more.caution}.</b> {t.caution}</div>}
    <details className="card"><summary className="cursor-pointer font-semibold">{C.more.glossary}</summary>
      <dl className="mt-2 space-y-1 text-sm">{GLOSSARY.map(([k, v]) => <div key={k}><dt className="inline font-medium">{k}</dt> — <dd className="inline">{v}</dd></div>)}</dl></details></div>);
}
