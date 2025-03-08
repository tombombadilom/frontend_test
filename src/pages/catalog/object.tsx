'use client';

import { useParams } from 'react-router-dom';

export default function ObjectPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Object Details {id}</h1>
      {/* TODO: Implement object details view */}
    </div>
  );
} 