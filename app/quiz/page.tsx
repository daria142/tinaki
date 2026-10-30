'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import { BLOCKS, hintFor, BLOCK_IMG } from '@/lib/data';
import LoadingScreen from '@/components/LoadingScreen';
import { C } from '@/lib/content';
import { calculateResults } from '@/lib/scoring';
import { supabaseBrowser } from '@/lib/supabase/client';
export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [tip, setTip] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'saving' | 'error'>('idle');
  const block = BLOCKS[step], total = BLOCKS.length, last = step === total - 1;
  const key = (b: number, q: number) => `${b}-${q}`;
  const done = block.questions.every((_, q) => ans[key(block.id, q)] !== undefined);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);
  async function finish() {
    setState('saving');
    const yes = BLOCKS.flatMap(b => b.questions.filter((_, q) => ans[key(b.id, q)]).map(([, t]) => t));
    const r = calculateResults(yes);
    const sb = supabaseBrowser();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { router.replace('/login'); return; }
    const { data, error } = await sb.from('test_results').insert({ user_id: user.id, scores: r.scores, primary_type_id: r.primary, secondary_type_id: r.secondary }).select('id').single();
    if (error || !data) { setState('error'); return; }
    router.replace(`/results/${data.id}`);
  }
  return (
    <div className="space-y-4 pb-24">
      {state === 'saving' && <LoadingScreen overlay text={C.quiz.saving} />}
      <div><div className="flex justify-between text-sm font-medium"><span>{C.quiz.block(step + 1, total)}</span><span>{Math.round((step / total) * 100)}%</span></div>
        <div className="mt-1 h-2 rounded bg-slate-200"><div className="h-2 rounded bg-gradient-to-r from-blue-700 to-sky-400 transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} /></div>
        <p className="mt-1 text-xs text-slate-500">{C.quiz.period}</p></div>
      <h1 className="text-2xl font-bold">{block.title}</h1><p className="text-sm text-slate-600">{block.hint}</p>
      {BLOCK_IMG[block.id] && <details className="card"><summary className="cursor-pointer text-blue-700">{C.more.scheme}</summary><img src={`/schemes/${BLOCK_IMG[block.id].src}.webp`} alt={BLOCK_IMG[block.id].alt} loading="lazy" className="mt-3 h-auto w-full rounded-xl" /></details>}
      {block.questions.map(([text], q) => { const k = key(block.id, q); return (
        <div key={k} className="card fade-up space-y-3" style={{ animationDelay: `${Math.min(q, 10) * 35}ms` }}>
          <div className="flex items-start justify-between gap-2"><p>{text}</p>
            <button aria-label="?" onClick={() => setTip(tip === k ? null : k)}><HelpCircle className="h-5 w-5 text-blue-600" /></button></div>
          {tip === k && <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800"><p>{hintFor(block.id, text)}</p><p className="mt-1 text-xs opacity-80">{C.quiz.tipNeutral}</p></div>}
          <div className="grid grid-cols-2 gap-2">{[true, false].map(v => (
            <button key={String(v)} onClick={() => setAns({ ...ans, [k]: v })}
              className={`rounded-xl border p-2.5 transition active:scale-95 ${ans[k] === v ? 'border-blue-700 bg-blue-700 text-white' : 'bg-slate-50'}`}>{v ? C.quiz.yes : C.quiz.no}</button>))}</div>
        </div>); })}
      {state === 'error' && <p className="text-sm text-red-600">{C.quiz.saveError}</p>}
      <div className="fixed inset-x-0 bottom-0 border-t bg-white/90 p-3 backdrop-blur"><div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
        <button className="btn2" disabled={step === 0} onClick={() => setStep(step - 1)}>{C.quiz.back}</button>
        {!done && <span className="text-xs text-slate-500">{C.quiz.need}</span>}
        <button className="btn" disabled={!done || state === 'saving'} onClick={() => last ? finish() : setStep(step + 1)}>{state === 'saving' ? C.quiz.saving : last ? C.quiz.finish : C.quiz.next}</button></div></div>
    </div>);
}
