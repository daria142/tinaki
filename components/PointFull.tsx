import { C } from '@/lib/content';
import { POINT_IMG } from '@/lib/data';
import type { Pt } from '@/lib/methodichka';
export default function PointFull({ p }: { p: Pt }) {
  const img = POINT_IMG[p.code]; const F = p.fields ?? {};
  const rest = Object.entries(F).filter(([k]) => k !== 'Как найти' && k !== 'Как пользоваться');
  return (
    <div className="mt-3 rounded-2xl border border-blue-100 bg-slate-50 p-3 text-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        {img && <img src={`/points/${img}.png`} alt={`Схема расположения точки ${p.name}`} loading="lazy" className="h-auto max-h-56 w-full rounded-xl bg-white object-contain sm:w-48" />}
        <div className="flex-1">
          <b>{p.name}</b> <span className="text-xs text-slate-500">{p.code}{p.intl && ` (${p.intl})`}</span>
          {p.text && <p className="mt-1">{p.text}</p>}
          {F['Как найти'] && <p className="mt-1"><b>Как найти.</b> {F['Как найти']}</p>}
          {F['Как пользоваться'] && <p className="mt-1"><b>Как пользоваться.</b> {F['Как пользоваться']}</p>}
          {rest.length > 0 && <details className="mt-1"><summary className="cursor-pointer text-blue-700">{C.more.details}</summary>{rest.map(([k, v]) => <p key={k} className="mt-1"><b>{k}.</b> {v}</p>)}</details>}
        </div>
      </div>
    </div>);
}
