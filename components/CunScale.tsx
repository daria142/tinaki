import { C } from '@/lib/content';
export default function CunScale() {
  return (
    <div className="mt-3"><p className="text-sm font-medium">{C.info.cunTitle}</p>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {C.more.cun.map(([f, cap]) => (<figure key={f} className="rounded-xl bg-white p-2 text-center"><img src={`/points/${f}.webp`} alt={cap} loading="lazy" className="mx-auto h-auto max-h-40 w-full object-contain" /><figcaption className="mt-1 text-xs text-slate-600">{cap}</figcaption></figure>))}
      </div></div>);
}
