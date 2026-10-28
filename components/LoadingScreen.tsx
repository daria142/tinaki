import { C } from '@/lib/content';
export default function LoadingScreen({ overlay = false, text }: { overlay?: boolean; text?: string }) {
  return (
    <div className={`boot ${overlay ? 'fixed-full' : ''}`} role="status" aria-live="polite">
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-core">
        <img className="boot-logo" src="/logo.png" alt="" />
        <h1 className="boot-status">{text ?? C.loading.status}</h1>
        <div className="nodes" aria-hidden="true">
          {C.loading.nodes.map(n => (<div className="node" key={n}><div className="dot-slot"><span className="dot" /></div><span className="node-label">{n}</span></div>))}
        </div>
        <div className="track" aria-hidden="true"><span className="fill" /></div>
      </div>
    </div>);
}
