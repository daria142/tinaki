'use client';
import dynamic from 'next/dynamic';
const ScoreChart = dynamic(() => import('./ScoreChart'), { ssr: false, loading: () => <div className="h-80 animate-pulse rounded-2xl bg-blue-50" /> });
export default ScoreChart;
