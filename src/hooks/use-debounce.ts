'use client';

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Mettre à jour la valeur debounced après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Annuler le timeout si la valeur change (ou si le composant est démonté)
    // C'est ainsi que nous empêchons la mise à jour de debouncedValue si la valeur change
    // dans le délai spécifié
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
