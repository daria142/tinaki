import Link from 'next/link';
import { notFound } from 'next/navigation';
import { C } from '@/lib/content';
import { typeById, TYPE_CHART, TYPE_YY } from '@/lib/data';
import { M } from '@/lib/methodichka';
import Accordion from '@/components/Accordion';
import Blocks from '@/components/Blocks';
import PointFull from '@/components/PointFull';
import CunScale from '@/components/CunScale';
const List = ({ title, items }: { title: string; items: string[] }) => items.length ? (
  <div className="card"><b>{title}</b><ul className="mt-1 list-disc pl-5 text-sm">{items.map(s => <li key={s}>{s}</li>)}</ul></div>) : null;
export default function TypePage({ params }: { params: { id: string } }) {
  const t = typeById(+params.id); if (!t) notFound();
  const m = M.types[String(t.id)];
  return (
    <div className="space-y-3">
      <Link href="/dashboard" className="text-sm text-blue-700">← {C.types.back}</Link>
      <div className="card bg-gradient-to-br from-blue-700 to-blue-500 text-white"><h1 className="text-2xl font-bold">{t.name}</h1><p className="opacity-90">{t.short}</p></div>
      <div className="card flex items-center gap-4"><img src={`/schemes/${TYPE_CHART[t.id]}.png`} alt={`График Инь и Ян при типе «${t.name}»`} className="h-28 w-auto shrink-0" /><p className="text-sm text-slate-600">{C.more.chartNote}</p></div>
      {!m && TYPE_YY[t.id] && <img src={`/schemes/${TYPE_YY[t.id]}.png`} alt={`Подробный график Инь и Ян: ${t.name}, с линией нормы`} loading="lazy" className="h-auto max-h-80 w-auto max-w-full rounded-xl bg-white" />}
      {m ? m.sections.map((s, i) => (
        <Accordion key={s.title} title={s.title} open={i < 2}>
          <Blocks blocks={s.blocks} />
          {s.title.startsWith('Что происходит') && TYPE_YY[t.id] && <img src={`/schemes/${TYPE_YY[t.id]}.png`} alt={`Подробный график Инь и Ян при типе «${t.name}» с линией нормы`} loading="lazy" className="mt-3 h-auto max-h-80 w-auto max-w-full rounded-xl bg-white" />}
          {s.points && <><CunScale />{s.points.map(p => <PointFull key={p.name} p={p} />)}</>}
        </Accordion>)) : (<>
        <div className="card"><b>{C.types.causes}</b><p className="text-sm">{t.causes}</p></div>
        <List title={C.types.signs} items={t.signs} /><List title={C.results.food} items={t.food} /><List title={C.more.avoid} items={t.avoid} />
        <div className="card"><b>{C.results.tea}</b><p className="text-sm">{t.tea}</p></div><List title={C.more.lifestyle} items={t.lifestyle} /></>)}
      <div className="rounded-xl bg-blue-50 p-3 text-sm"><b>{C.more.why}.</b> {t.why}</div>
      {t.caution && <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900"><b>{C.more.caution}.</b> {t.caution}</div>}
      <Link href="/info/glossary" className="text-sm text-blue-700">{C.info.titles.glossary} →</Link>
    </div>);
}
