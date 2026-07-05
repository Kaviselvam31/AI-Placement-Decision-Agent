import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type StepIndicatorProps = {
  steps: { id: string; label: string }[];
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={step.id} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    scale: active ? 1.08 : 1,
                    backgroundColor: done || active ? '#3366ff' : 'rgba(148,163,184,0.2)',
                    color: done || active ? '#ffffff' : '#64748b',
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-sm"
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </motion.div>
                <span
                  className={cn(
                    'hidden sm:block text-xs font-medium transition-colors',
                    active ? 'text-brand-700 dark:text-brand-300' : done ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-2 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: done ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
