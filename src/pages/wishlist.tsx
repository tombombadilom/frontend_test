'use client';

import { useWishlistStore } from "@/store/wishlist-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Game } from "@/types/game";
import type { GameItem } from "@/types/item";
import type { Pack } from "@/types/pack";
import { useCartStore } from "@/store/cart-store";

const isGame = (item: Game | GameItem | Pack): item is Game => {
  return 'title' in item && 'genres' in item;
};

const isGameItem = (item: Game | GameItem | Pack): item is GameItem => {
  return 'category' in item && 'rarity' in item;
};

const isPack = (item: Game | GameItem | Pack): item is Pack => {
  return 'items' in item && 'isActive' in item;
};

export default function WishlistPage() {
  const { games, objects, packs, removeFromWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Heart className="h-16 w-16 text-muted-foreground/50" />
      <h2 className="mt-4 text-lg font-semibold">Your wishlist is empty</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Browse our store to find something you like!
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        Continue Shopping
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );

  const getItemImage = (item: Game | GameItem | Pack): string => {
    if (isGame(item)) {
      return item.coverImage;
    }
    if (isGameItem(item)) {
      return item.preview?.imageUrl || '/placeholder.svg';
    }
    if (isPack(item)) {
      return item.coverImage;
    }
    return '/placeholder.svg';
  };

  const getItemName = (item: Game | GameItem | Pack): string => {
    if (isGame(item)) {
      return item.title;
    }
    return item.name;
  };

  const getItemTags = (item: Game | GameItem | Pack): string[] => {
    if (isGame(item)) {
      return item.genres || [];
    }
    return item.tags || [];
  };

  const getItemCategory = (item: Game | GameItem | Pack): string => {
    if (isGame(item)) {
      return item.genres?.[0] || 'Game';
    }
    if (isGameItem(item)) {
      return item.category.toString();
    }
    if (isPack(item)) {
      return item.type;
    }
    return '';
  };

  const handleAddToCart = (item: Game | GameItem | Pack, type: 'game' | 'object' | 'pack') => {
    addToCart({
      id: item.id.toString(),
      name: getItemName(item),
      price: item.price,
      image: getItemImage(item),
      type,
    });
  };

  const WishlistItem = ({ item, type }: { item: Game | GameItem | Pack; type: 'game' | 'object' | 'pack' }) => {
    const itemName = getItemName(item);
    const itemImage = getItemImage(item);
    const itemTags = getItemTags(item);
    const itemCategory = getItemCategory(item);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group"
      >
        <Card className="overflow-hidden border-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-[60%_1fr] gap-4">
              <Link to={`/${type}s/${item.id}`} className="relative aspect-[16/9]">
                <img
                  src={itemImage}
                  alt={itemName}
                  className="absolute inset-0 h-full w-full object-cover rounded-md"
                />
              </Link>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/${type}s/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {itemName}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary">
                    {itemCategory}
                  </Badge>
                  {itemTags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFromWishlist(item.id.toString(), type)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-primary">
                    {item.price.currency} {item.price.amount.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item, type)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (games.length === 0 && objects.length === 0 && packs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {games.length + objects.length + packs.length} items
        </Badge>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
          <TabsTrigger value="all">
            All ({games.length + objects.length + packs.length})
          </TabsTrigger>
          <TabsTrigger value="games">
            Games ({games.length})
          </TabsTrigger>
          <TabsTrigger value="objects">
            Objects ({objects.length})
          </TabsTrigger>
          <TabsTrigger value="packs">
            Packs ({packs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {[...games, ...objects, ...packs].map((item) => {
            const type = games.includes(item as Game) ? 'game' :
                        objects.includes(item as GameItem) ? 'object' : 'pack';
            return (
              <WishlistItem
                key={item.id}
                item={item}
                type={type}
              />
            );
          })}
        </TabsContent>

        <TabsContent value="games" className="space-y-4">
          {games.map((game) => (
            <WishlistItem key={game.id} item={game} type="game" />
          ))}
        </TabsContent>

        <TabsContent value="objects" className="space-y-4">
          {objects.map((object) => (
            <WishlistItem key={object.id} item={object} type="object" />
          ))}
        </TabsContent>

        <TabsContent value="packs" className="space-y-4">
          {packs.map((pack) => (
            <WishlistItem key={pack.id} item={pack} type="pack" />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}