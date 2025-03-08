'use client';

import { useParams } from 'react-router-dom';

export default function PackPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Pack Details {id}</h1>
      {/* TODO: Implement pack details view */}
    </div>
  );
} 