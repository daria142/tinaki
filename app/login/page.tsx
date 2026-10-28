'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import { C } from '@/lib/content';
export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg('');
    try {
      const sb = supabaseBrowser();
      if (mode === 'up') {
        const { data, error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) { setMsg(C.login.checkMail); return; }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.replace('/dashboard'); router.refresh();
    } catch { setMsg(C.login.error); } finally { setBusy(false); }
  }
  return (
    <div className="mx-auto mt-16 max-w-sm">
      <img src="/logo.png" alt="" className="mx-auto mb-4 h-20" />
      <h1 className="mb-1 text-center text-2xl font-bold">{C.brand}</h1>
      <form onSubmit={submit} className="card mt-4 space-y-3">
        <h2 className="font-semibold">{mode === 'in' ? C.login.title : C.login.signup}</h2>
        <input required type="email" placeholder={C.login.email} value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border p-2.5" />
        <input required minLength={6} type="password" placeholder={C.login.password} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border p-2.5" />
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <button className="btn w-full" disabled={busy}>{mode === 'in' ? C.login.submitIn : C.login.submitUp}</button>
        <button type="button" className="w-full text-sm text-blue-700" onClick={() => setMode(mode === 'in' ? 'up' : 'in')}>{mode === 'in' ? C.login.toUp : C.login.toIn}</button>
      </form>
    </div>);
}
