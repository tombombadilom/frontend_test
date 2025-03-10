import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameDisplay } from '@/components/catalog/games/game-display';
import { PackDisplay } from '@/components/catalog/packs/pack-display';
import { ObjectDisplay } from '@/components/catalog/objects/object-display';
import { DisplayModeSwitcher } from '@/components/catalog/display-mode-switcher';

export default function CatalogPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Catalog</h1>
        <DisplayModeSwitcher />
      </div>
      
      {/* Games Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Games</h2>
          <Button variant="ghost" asChild>
            <Link to="/games" className="flex items-center gap-2">
              View All Games
              <span className="text-xl">→</span>
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <GameDisplay />
          </CardContent>
        </Card>
      </section>

      {/* Packs Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Packs</h2>
          <Button variant="ghost" asChild>
            <Link to="/packs" className="flex items-center gap-2">
              View All Packs
              <span className="text-xl">→</span>
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <PackDisplay />
          </CardContent>
        </Card>
      </section>

      {/* Objects Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Objects</h2>
          <Button variant="ghost" asChild>
            <Link to="/objects" className="flex items-center gap-2">
              View All Objects
              <span className="text-xl">→</span>
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <ObjectDisplay />
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 