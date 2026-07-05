import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ScoreCircleProps = {
  score: number;
  size?: number;
  label?: string;
  status?: string;
};

export function ScoreCircle({ score, size = 220, label = 'Placement Readiness', status }: ScoreCircleProps) {
  const [displayed, setDisplayed] = useState(0);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * clamped));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const color = clamped >= 75 ? '#22c55e' : clamped >= 55 ? '#f59e0b' : '#ef4444';
  const gradientId = 'score-gradient';

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3366ff" />
              <stop offset="60%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="14"
            className="stroke-slate-200/80 dark:stroke-white/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold text-slate-900 dark:text-white tabular-nums">
            {displayed}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">out of 100</span>
          {status && (
            <span
              className={cn(
                'mt-2 rounded-full px-3 py-1 text-xs font-semibold',
                clamped >= 75
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                  : clamped >= 55
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
              )}
            >
              {status}
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
