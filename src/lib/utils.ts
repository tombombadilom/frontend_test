import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Price } from '@/types/game';

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: Price): string {
  const finalPrice = price.amount * (1 - (price.discount || 0) / 100);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: price.currency || 'EUR',
  }).format(finalPrice);
}

// export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
//   let timeout: ReturnType<typeof setTimeout> | null = null

//   return (...args: Parameters<T>) => {
//     const later = () => {
//       timeout = null
//       func(...args)
//     }

//     if (timeout !== null) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(later, wait)
//   }
// }

export function getImageUrl(path: string): string {
  if (!path || path.startsWith('http')) {
    return (
      path || import.meta.env.VITE_PLACEHOLDER_IMAGE_URL || '/placeholder.svg'
    );
  }
  return new URL(`../assets/images/${path}`, import.meta.url).href;
}
/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
