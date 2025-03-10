'use client';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { GameItem, ItemAvailability } from "@/types/item"
import type { FC } from "react"
import objectsData from "@/data/objects.json"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Calendar, Package, Gamepad } from "lucide-react"
import { Link } from "react-router-dom"
import gamesData from "@/data/games.json"
import packsData from "@/data/packs.json"
import type { Game } from '@/types/game';
import type { Pack } from '@/types/pack';

// Types
interface ItemStats {
  attack?: number;
  durability?: number;
  level?: number;
  criticalChance?: number;
  criticalDamage?: number;
  defense?: number;
  armorClass?: number;
}

interface ItemMetadata {
  damage?: number | string;
  durability?: number | string;
  isFeatured: boolean;
  effects?: string[];
  stats?: ItemStats;
  rating?: number;
  stock?: number;
  isAvailable?: boolean;
  tradeable?: boolean;
  gameRequirement?: string;
  element?: string;
  type?: string;
  setBonus?: string;
  criticalRange?: string;
  stealthDisadvantage?: boolean;
  bleed?: number;
  duration?: string;
  cooldown?: string;
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
function isItemMetadata(obj: unknown): obj is ItemMetadata {
  if (!obj || typeof obj !== 'object') return false;
  const meta = obj as Record<string, unknown>;
  
  // Seul isFeatured est requis
  if (typeof meta.isFeatured !== 'boolean') return false;

  // Vérification des champs optionnels s'ils sont présents
  if (meta.damage !== undefined && typeof meta.damage !== 'number' && typeof meta.damage !== 'string') return false;
  if (meta.durability !== undefined && typeof meta.durability !== 'number' && typeof meta.durability !== 'string') return false;
  if (meta.effects !== undefined && (!Array.isArray(meta.effects) || !meta.effects.every(effect => typeof effect === 'string'))) return false;
  if (meta.rating !== undefined && typeof meta.rating !== 'number') return false;
  if (meta.stock !== undefined && typeof meta.stock !== 'number') return false;
  if (meta.isAvailable !== undefined && typeof meta.isAvailable !== 'boolean') return false;
  if (meta.tradeable !== undefined && typeof meta.tradeable !== 'boolean') return false;
  if (meta.gameRequirement !== undefined && typeof meta.gameRequirement !== 'string') return false;
  if (meta.element !== undefined && typeof meta.element !== 'string') return false;
  if (meta.type !== undefined && typeof meta.type !== 'string') return false;
  if (meta.setBonus !== undefined && typeof meta.setBonus !== 'string') return false;
  if (meta.criticalRange !== undefined && typeof meta.criticalRange !== 'string') return false;
  if (meta.stealthDisadvantage !== undefined && typeof meta.stealthDisadvantage !== 'boolean') return false;
  if (meta.bleed !== undefined && typeof meta.bleed !== 'number') return false;
  if (meta.duration !== undefined && typeof meta.duration !== 'string') return false;
  if (meta.cooldown !== undefined && typeof meta.cooldown !== 'string') return false;

  return true;
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

// Ajouter une fonction utilitaire pour le formatage des dates
const formatDate = (date: string | undefined): string => {
  if (!date) return "Non spécifiée";
  return new Date(date).toLocaleDateString();
};

// Composant principal
const ObjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemData, setItemData] = useState<GameItem | null>(null);
  const [relatedGame, setRelatedGame] = useState<Game | null>(null);
  const [relatedPacks, setRelatedPacks] = useState<Pack[]>([]);

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
        
        const rawItem = objectsData.items.find(item => item.id === Number.parseInt(id, 10));
        
        if (!rawItem) {
          throw new Error("Objet non trouvé");
        }

        // Transformer les données pour s'assurer que isLimited est défini
        const item: GameItem = {
          ...rawItem,
          availability: {
            ...rawItem.availability,
            isLimited: rawItem.availability.isLimited ?? false
          }
        };

        // Trouver le jeu associé
        const game = gamesData.games.find(g => g.id === item.gameId);
        if (game) {
          setRelatedGame(game as Game);
        }

        // Trouver les packs qui contiennent cet objet
        const packs = packsData.packs
          .filter(pack => pack.items.some(packItem => packItem === item.id.toString()))
          .map(pack => ({
            ...pack,
            type: pack.type as 'starter' | 'collector' | 'ultimate' | 'pack',
            availability: {
              inStock: true, // Valeur par défaut
              quantity: undefined
            }
          } as Pack));
        setRelatedPacks(packs);

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
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{itemData.name}</h1>
                <div className="text-2xl font-bold text-primary">
                  {itemData.price.currency} {itemData.price.amount.toFixed(2)}
                </div>
              </div>

              {/* Jeu associé */}
              {relatedGame && (
                <Link 
                  to={`/games/${relatedGame.id}`}
                  className="flex items-center gap-2 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors mb-6"
                >
                  <Gamepad className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Jeu associé</div>
                    <div className="font-medium">{relatedGame.title}</div>
                  </div>
                </Link>
              )}

              <Tabs defaultValue="details" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="stats">Statistiques</TabsTrigger>
                  <TabsTrigger value="packs">Packs ({relatedPacks.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-6">{itemData.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Catégorie:</span>
                          <span className="font-medium">{itemData.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rareté:</span>
                          <Badge className={rarityColor}>{itemData.rarity}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Disponibilité:</span>
                          <span className="font-medium">
                            {formatDate(itemData.availability.startDate)} - {
                              itemData.availability.endDate ? 
                                formatDate(itemData.availability.endDate) : 
                                "Illimitée"
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats">
                  <Card>
                    <CardContent className="pt-6 grid grid-cols-2 gap-4">
                      {itemData.metadata.damage && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dégâts:</span>
                          <span className="font-medium">{itemData.metadata.damage}</span>
                        </div>
                      )}
                      {itemData.metadata.durability && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durabilité:</span>
                          <span className="font-medium">{itemData.metadata.durability}</span>
                        </div>
                      )}
                      {itemData.metadata.element && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Élément:</span>
                          <span className="font-medium">{itemData.metadata.element}</span>
                        </div>
                      )}
                      {itemData.metadata.criticalRange && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Critique:</span>
                          <span className="font-medium">{itemData.metadata.criticalRange}</span>
                        </div>
                      )}
                      {itemData.metadata.bleed && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saignement:</span>
                          <span className="font-medium">{itemData.metadata.bleed}</span>
                        </div>
                      )}
                      {itemData.metadata.duration && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durée:</span>
                          <span className="font-medium">{itemData.metadata.duration}</span>
                        </div>
                      )}
                      {itemData.metadata.cooldown && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recharge:</span>
                          <span className="font-medium">{itemData.metadata.cooldown}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="packs">
                  <Card>
                    <CardContent className="pt-6">
                      {relatedPacks.length > 0 ? (
                        <div className="space-y-4">
                          {relatedPacks.map(pack => (
                            <Link 
                              key={pack.id}
                              to={`/packs/${pack.id}`}
                              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Package className="h-5 w-5 text-primary" />
                              <div className="flex-1">
                                <div className="font-medium">{pack.name}</div>
                                <div className="text-sm text-muted-foreground">{pack.description}</div>
                              </div>
                              <div className="font-bold text-primary">
                                {pack.price.currency} {pack.price.amount.toFixed(2)}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-8">
                          Cet objet n'est disponible dans aucun pack
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Effets spéciaux */}
              {itemData.metadata.effects && itemData.metadata.effects.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Effets</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {itemData.metadata.effects.map((effect) => (
                        <li key={`effect-${effect}`} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {itemData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Liste de souhaits
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Disponibilité */}
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${itemData.metadata.isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm">{itemData.metadata.isAvailable ? "En stock" : "Rupture de stock"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ObjectPage;