import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  color?: 'brand' | 'accent' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  size?: 'sm' | 'md';
};

const colorClasses: Record<NonNullable<ProgressBarProps['color']>, string> = {
  brand: 'from-brand-500 to-brand-600',
  accent: 'from-accent-500 to-accent-600',
  success: 'from-emerald-500 to-emerald-600',
  warning: 'from-amber-500 to-orange-500',
  error: 'from-rose-500 to-red-600',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'brand',
  showValue = true,
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="font-medium text-slate-600 dark:text-slate-300">{label}</span>}
          {showValue && <span className="font-semibold text-slate-700 dark:text-slate-200 tabular-nums">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10',
          size === 'sm' ? 'h-1.5' : 'h-2.5',
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', colorClasses[color])}
        />
      </div>
    </div>
  );
}
