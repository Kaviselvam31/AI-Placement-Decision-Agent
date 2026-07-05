import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'ghost' | 'outline' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const variantClasses: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-brand-600 to-accent-600 shadow-glow hover:shadow-glow-accent hover:scale-[1.02]',
  ghost:
    'text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur hover:bg-white dark:hover:bg-white/10 hover:border-brand-300 dark:hover:border-brand-500/40',
  outline:
    'text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-500/40 bg-brand-50/60 dark:bg-brand-500/10 hover:bg-brand-100/70 dark:hover:bg-brand-500/20',
  subtle:
    'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leftIcon, rightIcon, loading, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all',
        'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900',
        'active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span>{children}</span>
        </span>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});
