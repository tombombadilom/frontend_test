'use client';

import { useParams } from 'react-router-dom';
import { useState } from "react"
import { motion } from "motion/react" // Import de Motion comme demandé
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Heart, Share2, Star, Zap, Shield, Sword, Tag, AlertTriangle } from "lucide-react"
import type { Item } from "@/types/item" // Import du type TypeScript

// Interface TypeScript pour les props des composants
interface EffectItemProps {
  effect: string
  index: number
}

// Map pour les couleurs de rareté
const rarityColors: Record<string, string> = {
  Common: "bg-slate-500",
  Uncommon: "bg-green-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-amber-500",
}

// Composant pour les effets avec animation
const EffectItem = ({ effect, index }: EffectItemProps) => (
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

// Mock data avec le type Item importé
const itemData: Item = {
  id: "1",
  name: "Legendary Sword of Power",
  description: "An ancient blade imbued with magical energy that increases attack power.",
  price: 19.99,
  discount: 0.1,
  rarity: "Legendary",
  category: "Weapon",
  type: "Sword",
  stats: {
    attack: 150,
    durability: 1000,
    level: 50,
    criticalChance: 15,
    criticalDamage: 200,
  },
  effects: [
    "Increases critical hit chance by 15%",
    "Deals 20% more damage to undead enemies",
    "Has a 5% chance to stun enemies for 2 seconds",
  ],
  images: [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ],
  isConsumable: false,
  usageLimit: null,
  cooldown: null,
  stock: 10,
  isAvailable: true,
  tags: ["Weapon", "Legendary", "Magic", "Sword", "Melee"],
  gameRequirement: "Level 50+",
  tradeable: true,
  rating: 4.9,
}

export default function ObjectPage() {
  // État avec typage TypeScript
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const discountedPrice: number = itemData.price * (1 - (itemData.discount || 0))
  const rarityColor: string = rarityColors[itemData.rarity] || "bg-slate-500"

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Animation d'entrée principale */}
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

        {/* Layout adaptatif avec Tailwind */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Images avec animations */}
          <div className="space-y-4">
            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={itemData.images[selectedImage]}
                alt={itemData.name}
                className="w-full aspect-video object-cover"
                key={selectedImage} // Pour déclencher l'animation à chaque changement
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
              {itemData.discount && itemData.discount > 0 && (
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    -{Math.round(itemData.discount * 100)}% OFF
                  </Badge>
                </motion.div>
              )}
            </motion.div>

            {/* Miniatures avec animation */}
            <div className="grid grid-cols-4 gap-2">
              {itemData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${itemData.name} image ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Colonne droite - Détails avec animations */}
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
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(itemData.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{itemData.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{itemData.category}</Badge>
                <Badge variant="outline">{itemData.type}</Badge>
                {itemData.isConsumable && <Badge variant="outline">Consumable</Badge>}
                {!itemData.tradeable && <Badge variant="destructive">Non-tradeable</Badge>}
              </div>
            </motion.div>

            {/* Description avec animation */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{itemData.description}</p>
            </motion.div>

            {/* Statistiques avec animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Key Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                    {Object.entries(itemData.stats).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 * index + 0.4 }}
                      >
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Effets avec animation */}
            {itemData.effects && itemData.effects.length > 0 && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-semibold">Effects</h3>
                <ul className="space-y-1">
                  {itemData.effects.map((effect, index) => (
                    <EffectItem key={index} effect={effect} index={index} />
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Prérequis avec animation */}
            {itemData.gameRequirement && (
              <motion.div
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Requires: {itemData.gameRequirement}</span>
              </motion.div>
            )}

            {/* Prix avec animation */}
            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</div>
                {itemData.discount && itemData.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg line-through text-muted-foreground">${itemData.price.toFixed(2)}</span>
                    <Badge variant="outline" className="text-primary">
                      Save ${(itemData.price - discountedPrice).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Sélecteur de quantité */}
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="flex items-center justify-center w-10">{quantity}</div>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Boutons d'action avec animation */}
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
              <div className={`w-3 h-3 rounded-full ${itemData.isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{itemData.isAvailable ? "In Stock" : "Out of Stock"}</span>
              {itemData.isAvailable && <span className="text-muted-foreground">({itemData.stock} available)</span>}
            </div>
          </div>
        </div>

        {/* Onglets pour informations supplémentaires */}
        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="related">Related Items</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{itemData.type}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rarity:</span>
                      <Badge className={`${rarityColor} text-white`}>{itemData.rarity}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Consumable:</span>
                      <span className="font-medium">{itemData.isConsumable ? "Yes" : "No"}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tradeable:</span>
                      <span className="font-medium">{itemData.tradeable ? "Yes" : "No"}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Requirements & Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {itemData.gameRequirement && (
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Game Requirement:</span>
                          <p className="text-muted-foreground">{itemData.gameRequirement}</p>
                        </div>
                      </li>
                    )}
                    <li className="mt-4">
                      <span className="font-medium">Usage Instructions:</span>
                      <p className="text-muted-foreground mt-1">
                        {itemData.isConsumable
                          ? "This item will be consumed upon use and cannot be recovered."
                          : "This item is permanent and will not be consumed upon use."}
                      </p>
                    </li>
                    <li className="mt-4">
                      <span className="font-medium">Trading Information:</span>
                      <p className="text-muted-foreground mt-1">
                        {itemData.tradeable
                          ? "This item can be traded with other players."
                          : "This item is bound to your account and cannot be traded."}
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="related" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Related Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt={`Related item ${i}`}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500 text-white">Rare</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">Related Item {i}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        A complementary item that works well with the {itemData.name}.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold">$9.99</span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                  {itemData.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Badge variant="secondary" className="px-3 py-1 text-base">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Tags help categorize items and make them easier to find in the shop. Click on a tag to see other items
                  with the same classification.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

