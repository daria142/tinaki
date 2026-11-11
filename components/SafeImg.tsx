'use client';
import type { ImgHTMLAttributes } from 'react';
// Картинка с запасным вариантом: если .png не найден, пробуем одноимённый .webp (и наоборот)
export default function SafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img decoding="async" {...props} onError={e => {
      const t = e.currentTarget;
      if (t.dataset.fb) return;
      if (/\.png$/.test(t.src)) { t.dataset.fb = '1'; t.src = t.src.replace(/\.png$/, '.webp'); }
      else if (/\.webp$/.test(t.src)) { t.dataset.fb = '1'; t.src = t.src.replace(/\.webp$/, '.png'); }
    }} />
  );
}
