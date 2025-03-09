'use client';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Heart, Share2, Star, Zap, Shield, Sword, Tag, AlertTriangle } from "lucide-react"
import type { GameItem } from "@/types/item"
import type { FC } from "react"

// Types
interface EffectItemProps {
  effect: string;
  index: number;
}

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
const LOADING_SPINNER_SIZE = 32;
const MIN_QUANTITY = 1;

const rarityColors: Record<string, string> = {
  common: "bg-slate-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
} as const;

// Composants
const EffectItem: FC<EffectItemProps> = ({ effect, index }) => (
  <motion.li
    className="flex items-start gap-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
    <span>{effect}</span>
  </motion.li>
)

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

// Composant principal
const ObjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);
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

  const handleQuantityDecrease = () => setQuantity(prev => Math.max(MIN_QUANTITY, prev - 1));
  const handleQuantityIncrease = () => setQuantity(prev => prev + 1);
  const handleGoBack = () => window.history.back();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`animate-spin rounded-full h-${LOADING_SPINNER_SIZE} w-${LOADING_SPINNER_SIZE} border-b-2 border-primary`} />
      </div>
    );
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

  const metadata = itemData.metadata;
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
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${i}-${Math.floor(metadata.rating) > i ? 'filled' : 'empty'}`}
                      className={`h-5 w-5 ${i < Math.floor(metadata.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{metadata.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{itemData.category}</Badge>
                {itemData.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{itemData.description}</p>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Key Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                    {Object.entries(metadata.stats).map(([key, value]) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{String(value)}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Effets */}
            {metadata.effects && metadata.effects.length > 0 && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-semibold">Effects</h3>
                <ul className="space-y-1">
                  {metadata.effects.map((effect: string, index: number) => (
                    <EffectItem key={effect} effect={effect} index={index} />
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Prérequis */}
            {itemData.metadata.gameRequirement && (
              <motion.div
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Requires: {itemData.metadata.gameRequirement}</span>
              </motion.div>
            )}

            {/* Prix */}
            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">
                  {String(itemData.price.amount)} {itemData.price.currency}
                </div>
              </div>

              {/* Sélecteur de quantité */}
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= MIN_QUANTITY}
                  >
                    -
                  </Button>
                  <div className="flex items-center justify-center w-10">{quantity}</div>
                  <Button variant="ghost" size="icon" onClick={handleQuantityIncrease}>
                    +
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Disponibilité */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${metadata.isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{metadata.isAvailable ? "In Stock" : "Out of Stock"}</span>
              {metadata.isAvailable && (
                <span className="text-muted-foreground">({String(metadata.stock)} available)</span>
              )}
            </div>
          </div>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-5 w-5" />
                  Item Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{itemData.category}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rarity:</span>
                    <Badge className={`${rarityColor} text-white`}>{itemData.rarity}</Badge>
                  </li>
                  {itemData.metadata.gameRequirement && (
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Game Requirement:</span>
                        <p className="text-muted-foreground">{itemData.metadata.gameRequirement}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Item Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {itemData.tags.map((tag: string) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary" className="px-3 py-1 text-base">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Tags help categorize items and make them easier to find in the shop.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default ObjectPage

