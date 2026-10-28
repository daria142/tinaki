import raw from './methodichka.json';
export type B = ['p' | 'li', string];
export type Pt = { name: string; code: string; intl: string; fields?: Record<string, string>; text?: string };
export type Sec = { title: string; blocks: B[]; points?: Pt[] };
export const M = raw as unknown as { intro: Sec[]; cards: Sec[]; types: Record<string, { name: string; sections: Sec[] }>; glossary: Sec[]; help: Sec[]; points: { group: string; blocks: B[]; points: Pt[] }[] };
