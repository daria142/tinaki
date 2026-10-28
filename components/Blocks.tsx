import type { ReactNode } from 'react';
import type { B } from '@/lib/methodichka';
export default function Blocks({ blocks }: { blocks: B[] }) {
  const out: ReactNode[] = []; let li: string[] = [];
  const flush = (k: number) => { if (li.length) { const items = li; out.push(<ul key={'u' + k} className="mt-2 list-disc space-y-1 pl-5 text-sm">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>); li = []; } };
  blocks.forEach(([kind, text], i) => { if (kind === 'li') li.push(text); else { flush(i); out.push(<p key={i} className="mt-2 text-sm leading-relaxed">{text}</p>); } });
  flush(999);
  return <>{out}</>;
}
