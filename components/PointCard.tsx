import { C } from '@/lib/content';
import { POINT_AREA, AREA_LABEL, POINT_IMG } from '@/lib/data';
export default function PointCard({ p }: { p: { name: string; where: string; why: string } }) {
  const code = /\((.*?)\)/.exec(p.name)?.[1] ?? '';
  const real = POINT_IMG[code]; const area = POINT_AREA[code] ?? 'abdomen';
  const src = real ? `/points/${real}.webp` : `/points/${area}.svg`;
  return (
    <div className="mt-2 flex gap-3 rounded-xl bg-slate-50 p-3 text-sm">
      <img src={src} alt={`Схема: точка ${p.name}, ${p.where}`} loading="lazy" className={real ? 'h-28 w-36 shrink-0 rounded-lg bg-white object-contain' : 'h-28 w-14 shrink-0'} />
      <div><b>{p.name}</b><p>{p.where}</p><p className="text-slate-600">{p.why}</p><p className="mt-1 text-xs text-slate-500">{C.more.howTo}</p></div>
    </div>);
}
