import type { ReactNode } from 'react';

type FieldLabelProps = {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
};

export function FieldLabel({ htmlFor, required, children, hint }: FieldLabelProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {children}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {hint && <span className="text-xs text-slate-400 dark:text-slate-500">{hint}</span>}
    </div>
  );
}

type FieldErrorProps = {
  children?: ReactNode;
};

export function FieldError({ children }: FieldErrorProps) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-rose-500">{children}</p>;
}
