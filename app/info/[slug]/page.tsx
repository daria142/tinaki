import Link from 'next/link';
import { notFound } from 'next/navigation';
import { C } from '@/lib/content';
import { M, type Sec } from '@/lib/methodichka';
import Accordion from '@/components/Accordion';
import Blocks from '@/components/Blocks';
import PointFull from '@/components/PointFull';
import CunScale from '@/components/CunScale';
import InfoImgs from '@/components/InfoImgs';
export default function Info({ params }: { params: { slug: string } }) {
  const title = C.info.titles[params.slug]; if (!title) notFound();
  const secs: Sec[] = params.slug === 'about' ? [...M.intro, ...M.cards] : params.slug === 'glossary' ? M.glossary : params.slug === 'help' ? M.help : [];
  return (
    <div className="space-y-3">
      <Link href="/dashboard" className="text-sm text-blue-700">← {C.info.back}</Link>
      <h1 className="text-2xl font-bold">{title}</h1>
      {secs.map((s, i) => s.title ? (
        <Accordion key={s.title} title={s.title} open={i === 0}><Blocks blocks={s.blocks} />{s.title.startsWith('Цунь') && <CunScale />}<InfoImgs slug={params.slug} title={s.title} /></Accordion>
      ) : <div key={i} className="card"><Blocks blocks={s.blocks} /></div>)}
      {params.slug === 'points' && <><CunScale />{M.points.map(g => (
        <Accordion key={g.group} title={g.group}><Blocks blocks={g.blocks} />{g.points.map(p => <PointFull key={g.group + p.name} p={p} />)}</Accordion>))}</>}
    </div>);
}
