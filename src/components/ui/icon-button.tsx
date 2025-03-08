import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
}

export function IconButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg',
        'text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800',
        'focus-visible:ring-2 active:scale-[0.98]',
        'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        className
      )}
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
} 