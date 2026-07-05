import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
