'use client';
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { C } from '@/lib/content';
type D = { id: number; name: string; score: number; short: string };
const LIMIT = 9, LEADER = '#1e3a8a', NORMAL = '#bfdbfe';
const COLORS: Record<number, string> = { 1:'#0ea5e9',2:'#f97316',3:'#a855f7',4:'#ec4899',5:'#eab308',6:'#14b8a6',7:'#ef4444',8:'#84cc16',9:'#78716c' };
const Sw = ({ c }: { c: string }) => <span className="mr-2 inline-block h-3 w-3 rounded-sm align-middle" style={{ background: c }} />;
export default function ScoreChart({ data, leaderId }: { data: D[]; leaderId: number | null }) {
  const max = Math.max(LIMIT + 3, ...data.map(d => d.score)) + 1;
  const ticks = Array.from({ length: Math.floor(max / 3) + 1 }, (_, i) => i * 3);
  const color = (d: D) => d.id === leaderId ? LEADER : d.score > LIMIT ? COLORS[d.id] : NORMAL;
  const leader = data.find(d => d.id === leaderId);
  const high = data.filter(d => d.score > LIMIT && d.id !== leaderId);
  const L = C.results.legend;
  return (
    <div>
      <div className="h-80 w-full"><ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 24 }}>
          <XAxis type="number" domain={[-0.6, max]} ticks={ticks} allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={115} tick={{ fontSize: 12 }} tickLine={false} />
          <Tooltip />
          <ReferenceLine x={LIMIT} stroke="#dc2626" strokeDasharray="6 4" label={{ value: L.norma, position: 'top', fill: '#dc2626', fontSize: 12 }} />
          <Bar dataKey="score" radius={4}>{data.map(d => <Cell key={d.id} fill={color(d)} />)}</Bar>
        </BarChart></ResponsiveContainer></div>
      <ul className="mt-3 space-y-1.5 text-sm">
        {leader && <li><Sw c={LEADER} /><b>{L.leader}: {leader.name}</b> ({leader.score}){leader.score > LIMIT ? `, ${L.over}` : ''}</li>}
        {high.map(d => <li key={d.id}><Sw c={COLORS[d.id]} /><b>{d.name}</b> ({d.score}), {L.over}: {d.short}</li>)}
        <li><Sw c={NORMAL} />{L.ok}</li>
        <li><span className="mr-2 inline-block w-4 border-t-2 border-dashed border-red-600 align-middle" />{L.line}</li>
      </ul>
    </div>);
}
