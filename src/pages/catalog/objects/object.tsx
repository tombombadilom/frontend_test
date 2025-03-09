'use client';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { GameItem } from "@/types/item"
import type { FC } from "react"

// Types
interface ItemStats {
  attack: number;
  durability: number;
  level: number;
  criticalChance: number;
  criticalDamage: number;
}

interface ItemMetadata {
  damage: number;
  durability: string;
  isFeatured: boolean;
  effects: string[];
  stats: ItemStats;
  rating: number;
  stock: number;
  isAvailable: boolean;
  tradeable: boolean;
  gameRequirement: string;
}

// Constants
const rarityColors: Record<string, string> = {
  common: "bg-slate-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
} as const;

// Type Guards
function isItemStats(obj: unknown): obj is ItemStats {
  if (!obj || typeof obj !== 'object') return false;
  const stats = obj as Record<string, unknown>;
  return (
    typeof stats.attack === 'number' &&
    typeof stats.durability === 'number' &&
    typeof stats.level === 'number' &&
    typeof stats.criticalChance === 'number' &&
    typeof stats.criticalDamage === 'number'
  );
}

function isItemMetadata(obj: unknown): obj is ItemMetadata {
  if (!obj || typeof obj !== 'object') return false;
  const meta = obj as Record<string, unknown>;
  return (
    typeof meta.damage === 'number' &&
    typeof meta.durability === 'string' &&
    typeof meta.isFeatured === 'boolean' &&
    Array.isArray(meta.effects) &&
    meta.effects.every(effect => typeof effect === 'string') &&
    isItemStats(meta.stats) &&
    typeof meta.rating === 'number' &&
    typeof meta.stock === 'number' &&
    typeof meta.isAvailable === 'boolean' &&
    typeof meta.tradeable === 'boolean' &&
    typeof meta.gameRequirement === 'string'
  );
}

// Skeleton component for loading state
const ObjectSkeleton = () => (
  <div className="container mx-auto py-8 px-4">
    <div className="flex items-center text-sm text-muted-foreground mb-6">
      <Skeleton className="h-4 w-20" />
      <span className="mx-2">/</span>
      <Skeleton className="h-4 w-20" />
      <span className="mx-2">/</span>
      <Skeleton className="h-4 w-32" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left column - Image */}
      <div className="space-y-4">
        <Skeleton className="w-full aspect-video rounded-lg" />
      </div>

      {/* Right column - Details */}
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`skeleton-rating-star-${i + 1}`} className="h-5 w-5 rounded-full" />
            ))}
            <Skeleton className="h-5 w-8 ml-2" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={`skeleton-tag-item-${i + 1}`} className="h-6 w-20" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-stats-row-${i + 1}`} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`skeleton-effect-item-${i + 1}`} className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 shrink-0" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <Skeleton className="h-10 w-32" />
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-12" />
        </div>
      </div>
    </div>

    <div className="mt-12">
      <Skeleton className="h-10 w-full max-w-md mb-6" />
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`skeleton-detail-row-${i + 1}`} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Composant principal
const ObjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemData, setItemData] = useState<GameItem | null>(null);

  useEffect(() => {
    const fetchItem = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        if (!id) {
          throw new Error("ID de l'objet non spécifié");
        }

        // Simuler un délai de chargement pour voir le skeleton
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch('/src/data/objects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const item = data.find((item: GameItem) => item.id === Number.parseInt(id, 10));
        
        if (!item) {
          throw new Error("Objet non trouvé");
        }

        setItemData(item);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchItem();
  }, [id]);

  const handleGoBack = () => window.history.back();

  if (isLoading) {
    return <ObjectSkeleton />;
  }

  if (error || !itemData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-destructive text-xl mb-4">
          {error || "Données non disponibles"}
        </div>
        <Button onClick={handleGoBack}>Retour</Button>
      </div>
    );
  }

  if (!isItemMetadata(itemData.metadata)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-destructive text-xl mb-4">
          Erreur: Métadonnées de l'objet invalides
        </div>
        <Button onClick={handleGoBack}>Retour</Button>
      </div>
    );
  }

  const rarityColor = rarityColors[itemData.rarity] || rarityColors.common;

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Items</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{itemData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image principale */}
          <div className="space-y-4">
            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={itemData.preview.imageUrl}
                alt={itemData.name}
                className="w-full aspect-video object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Badge className={`${rarityColor} text-white px-3 py-1`}>{itemData.rarity}</Badge>
              </motion.div>
            </motion.div>
          </div>

          {/* Colonne droite - Détails */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{itemData.name}</h1>
              </div>
            </motion.div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>

            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`skeleton-stats-row-${i + 1}`} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`skeleton-effect-item-${i + 1}`} className="flex items-start gap-2">
                    <Skeleton className="h-5 w-5 shrink-0" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <Skeleton className="h-10 w-32" />
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Skeleton className="h-10 w-full max-w-md mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`skeleton-detail-row-${i + 1}`} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ObjectPage;