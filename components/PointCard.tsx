import { C } from '@/lib/content';
import { POINT_AREA, AREA_LABEL } from '@/lib/data';
export default function PointCard({ p }: { p: { name: string; where: string; why: string } }) {
  const code = /\((.*?)\)/.exec(p.name)?.[1] ?? '';
  const area = POINT_AREA[code] ?? 'abdomen';
  return (
    <div className="mt-2 flex gap-3 rounded-xl bg-slate-50 p-3 text-sm">
      <img src={`/points/${area}.svg`} alt={`Схема тела (${AREA_LABEL[area]}): точка ${p.name}, ${p.where}`} className="h-28 w-14 shrink-0" />
      <div><b>{p.name}</b><p>{p.where}</p><p className="text-slate-600">{p.why}</p>
        <p className="mt-1 text-xs text-slate-500">{C.more.howTo}</p></div>
    </div>);
}
