export type Scores = Record<number, number>;
export type Ranked = { id: number; score: number };
export type Result = { scores: Scores; ranked: Ranked[]; primary: number | null; secondary: number | null; isNormal: boolean; isCombined: boolean };
export const NORMAL_MAX = 9, COMBO_DIFF = 3;

/** yes: для каждого ответа «да» — список типов вопроса. */
export function calculateResults(yes: number[][]): Result {
  const scores: Scores = {}; for (let i = 1; i <= 9; i++) scores[i] = 0;
  for (const types of yes) for (const t of types) if (scores[t] !== undefined) scores[t]++;
  const ranked = Object.entries(scores).map(([id, score]) => ({ id: +id, score })).sort((a, b) => b.score - a.score || a.id - b.id);
  const [top, second] = ranked;
  const isNormal = top.score <= NORMAL_MAX;
  const isCombined = !isNormal && second.score > 0 && top.score - second.score <= COMBO_DIFF;
  return { scores, ranked, primary: isNormal ? null : top.id, secondary: isCombined ? second.id : null, isNormal, isCombined };
}
