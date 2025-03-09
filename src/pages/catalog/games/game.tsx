'use client';

import { useParams } from 'react-router-dom';
import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Share2, Calendar } from "lucide-react"
import type { Game } from "@/types/game"
import gamesData from "@/data/games.json"

// Interface TypeScript pour les props des composants
interface ImageThumbnailProps {
  src: string
  alt: string
  isSelected: boolean
  onClick: () => void
}

// Composant pour les miniatures d'images avec animations
const ImageThumbnail = ({ src, alt, isSelected, onClick }: ImageThumbnailProps) => (
  <motion.div
    className={`cursor-pointer rounded-md overflow-hidden border-2 ${isSelected ? "border-primary" : "border-transparent"}`}
    whileHover={{ scale: 1.05, borderColor: "rgba(var(--primary), 0.5)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
  >
    <img src={src || "/placeholder.svg"} alt={alt} className="w-full aspect-video object-cover" />
  </motion.div>
)

export default function GamePage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  
  // Trouver le jeu correspondant à l'ID
  const gameData = gamesData.games.find(game => game.id === Number(id)) as Game
  
  if (!gameData) {
    return <div>Game not found</div>
  }

  const discountedPrice = gameData.price.amount * (1 - ((gameData.price.discount ?? 0) / 100))

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
          <span>Games</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{gameData.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Images */}
          <div className="space-y-4">
            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={selectedImage === 0 ? gameData.coverImage : gameData.screenshots[selectedImage - 1]}
                alt={gameData.title}
                className="w-full aspect-video object-cover"
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {(gameData.price.discount ?? 0) > 0 && (
                <Badge className="absolute top-4 right-4 text-lg px-3 py-1.5 bg-primary text-primary-foreground">
                  -{gameData.price.discount ?? 0}%
                </Badge>
              )}
            </motion.div>

            <div className="grid grid-cols-4 gap-2">
              <ImageThumbnail
                key="cover"
                src={gameData.coverImage}
                alt={`${gameData.title} cover`}
                isSelected={selectedImage === 0}
                onClick={() => setSelectedImage(0)}
              />
              {gameData.screenshots.map((screenshot, index) => (
                <ImageThumbnail
                  key={index}
                  src={screenshot}
                  alt={`${gameData.title} screenshot ${index + 1}`}
                  isSelected={selectedImage === index + 1}
                  onClick={() => setSelectedImage(index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Colonne droite - Détails */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{gameData.title}</h1>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(gameData.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{gameData.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {gameData.genres.map((genre, index) => (
                  <motion.div
                    key={genre}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Badge variant="secondary">{genre}</Badge>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(gameData.releaseDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium">Developer:</span> {gameData.developer}
                </div>
                <div>
                  <span className="font-medium">Publisher:</span> {gameData.publisher}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{gameData.description}</p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="font-medium">Platforms:</div>
              {gameData.platforms.map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                >
                  <Badge variant="outline">{platform}</Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">
                  {gameData.price.currency} {discountedPrice.toFixed(2)}
                </div>
                {(gameData.price.discount ?? 0) > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg line-through text-muted-foreground">
                      {gameData.price.currency} {gameData.price.amount.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="text-primary">
                      Save {gameData.price.currency} {(gameData.price.amount - discountedPrice).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

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

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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

            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${gameData.isNewRelease ? "bg-green-500" : "bg-yellow-500"}`}></div>
              <span>{gameData.isNewRelease ? "New Release" : "Available"}</span>
              {gameData.isFeatured && <Badge variant="secondary">Featured</Badge>}
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-12">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="requirements">System Requirements</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Game Features</h3>
                <ul className="space-y-2">
                  {gameData.genres.map((genre) => (
                    <li key={genre} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}



