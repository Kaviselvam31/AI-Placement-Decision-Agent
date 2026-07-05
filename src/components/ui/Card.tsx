import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'glass' | 'glass-strong';
  hover?: boolean;
};

export function Card({ variant = 'default', hover = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border transition-all duration-300',
        variant === 'default' &&
          'bg-white border-slate-200/80 shadow-card dark:bg-slate-900/70 dark:border-white/10',
        variant === 'glass' &&
          'glass shadow-card',
        variant === 'glass-strong' && 'glass-strong shadow-card',
        hover &&
          'hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-300/60 dark:hover:border-brand-500/40',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  accent?: 'brand' | 'accent' | 'success' | 'warning' | 'error';
  className?: string;
  children?: ReactNode;
};

const accentClasses: Record<NonNullable<CardHeaderProps['accent']>, string> = {
  brand: 'from-brand-500 to-brand-600 text-white',
  accent: 'from-accent-500 to-accent-600 text-white',
  success: 'from-emerald-500 to-emerald-600 text-white',
  warning: 'from-amber-500 to-orange-500 text-white',
  error: 'from-rose-500 to-red-600 text-white',
};

export function CardHeader({ icon, title, subtitle, accent = 'brand', className, children }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start gap-4 p-6', className)}>
      {icon && (
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-glow',
            accentClasses[accent],
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
