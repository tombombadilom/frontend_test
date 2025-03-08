'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [count, setCount] = useState(0);

  // Log pour voir quand le composant est monté
  useEffect(() => {
    console.log('HomePage monté');
    return () => console.log('HomePage démonté');
  }, []);

  // Log pour voir quand le composant est re-rendu
  console.log('HomePage rendu', { count });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Page de Test</h1>
      
      <div className="space-y-4">
        {/* Test de re-render basique */}
        <div className="p-4 border rounded">
          <p>Compteur: {count}</p>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded"
            onClick={() => setCount(c => c + 1)}
          >
            Incrémenter
          </button>
        </div>

        {/* Test de hover */}
        <div 
          className="p-4 border rounded hover:bg-accent/10 transition-colors"
          onMouseEnter={() => console.log('Hover start')}
          onMouseLeave={() => console.log('Hover end')}
        >
          Survolez-moi pour tester les effets de hover
        </div>

        {/* Test de transition de thème */}
        <div className="p-4 border rounded theme-transition">
          Cet élément a la transition de thème
        </div>

        {/* Test sans transition */}
        <div className="p-4 border rounded">
          Cet élément n'a pas de transition
        </div>
      </div>

      {/* Informations de débogage */}
      <div className="mt-8 p-4 bg-muted/10 rounded">
        <h2 className="font-semibold mb-2">Informations de débogage:</h2>
        <pre className="text-sm">
          {JSON.stringify({
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'N/A',
            timestamp: new Date().toISOString(),
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
} 