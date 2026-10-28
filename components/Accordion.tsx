import type { ReactNode } from 'react';
export default function Accordion({ title, open = false, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (<details className="card" open={open}><summary className="cursor-pointer font-semibold">{title}</summary>{children}</details>);
}
