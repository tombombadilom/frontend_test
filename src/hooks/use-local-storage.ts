'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // État pour stocker notre valeur
  // Passe la fonction d'initialisation à useState pour que la logique ne s'exécute qu'une fois
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      // Analyser le JSON stocké ou retourner initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur, retourner initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retourner une version enveloppée de la fonction useState's setter
  // pour persister la nouvelle valeur dans localStorage.
  const setValue = (value: T) => {
    try {
      // Permettre à la valeur d'être une fonction pour avoir la même API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Sauvegarder l'état
      setStoredValue(valueToStore);
      // Sauvegarder dans localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Écouter les changements dans d'autres onglets/fenêtres
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
