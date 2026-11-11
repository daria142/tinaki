import SafeImg from '@/components/SafeImg';
import { INFO_IMG } from '@/lib/data';
export default function InfoImgs({ slug, title }: { slug: string; title: string }) {
  return (<>{INFO_IMG.filter(([s, t]) => s === slug && title.startsWith(t)).map(([, , f, alt]) => (
    <SafeImg key={f} src={`/schemes/${f}.png`} alt={alt} loading="lazy" className="mt-3 h-auto w-full max-w-xl rounded-xl bg-white" />))}</>);
}
