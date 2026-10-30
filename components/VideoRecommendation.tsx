import { C } from '@/lib/content';
import { typeById } from '@/lib/data';
import { videoFor } from '@/lib/videosData';

// Пропускаем только безопасные источники: YouTube/Vimeo embed по https или свой mp4/webm.
function kindOf(url: string): 'embed' | 'file' | null {
  if (!url) return null;
  if (/^\/[\w\-./]+\.(mp4|webm)$/i.test(url)) return 'file';
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return null;
    const yt = (u.hostname === 'www.youtube.com' || u.hostname === 'www.youtube-nocookie.com') && u.pathname.startsWith('/embed/');
    const vm = u.hostname === 'player.vimeo.com' && u.pathname.startsWith('/video/');
    return yt || vm ? 'embed' : null;
  } catch { return null; }
}

export default function VideoRecommendation({ typeId }: { typeId: number }) {
  const v = videoFor(typeId);
  const name = typeById(typeId)?.name ?? C.dash.normal;
  const kind = kindOf(v.url);
  return (
    <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4">
      <h4 className="font-bold">{C.video.heading(name)}</h4>
      <p className="text-sm text-slate-500">{v.title}</p>
      <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
        {kind === 'embed' && (
          <iframe src={v.url} title={v.title} className="h-full w-full" loading="lazy" frameBorder="0" allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" />)}
        {kind === 'file' && (
          <video className="h-full w-full" controls preload="metadata" playsInline><source src={v.url} />{C.video.noSupport}</video>)}
        {!kind && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-700 to-sky-500 text-white">
            <span className="text-4xl" aria-hidden="true">▶</span><span className="text-sm">{C.video.soon}</span></div>)}
      </div>
      <p className="mt-3 text-sm"><b>{C.video.why}.</b> {v.description}</p>
      <p className="mt-2 text-xs text-slate-500">{C.video.note}</p>
    </section>);
}
