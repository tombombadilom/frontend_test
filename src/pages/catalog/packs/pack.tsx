'use client';

import { useParams } from 'react-router-dom';
import { useState } from "react"
import { motion } from "motion/react" // Importing Motion as requested
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Heart, Share2, Calendar, Clock, Package, Gift, AlertTriangle } from "lucide-react"
import type { Pack } from "@/types/pack" // Importing TypeScript type

// TypeScript interfaces for components
interface ContentItemProps {
  id: string
  name: string
  quantity: number
  index: number
}

interface BonusItemProps {
  id: string
  name: string
  description: string
  index: number
}

// Mock data with imported Pack type
const packData: Pack = {
  id: "1",
  name: "Ultimate Starter Pack",
  description: "Everything you need to start your adventure with premium items and bonuses.",
  price: 29.99,
  discount: 0.15,
  contents: [
    { id: "item1", name: "Legendary Sword", quantity: 1 },
    { id: "item2", name: "Epic Armor Set", quantity: 1 },
    { id: "item3", name: "Health Potions", quantity: 10 },
    { id: "item4", name: "Mana Potions", quantity: 10 },
    { id: "item5", name: "Gold Coins", quantity: 1000 },
    { id: "item6", name: "Experience Booster", quantity: 3 },
  ],
  images: [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ],
  releaseDate: "2023-01-15",
  expiryDate: "2024-12-31",
  isLimited: true,
  stock: 50,
  isAvailable: true,
  tags: ["Starter", "Value", "Limited"],
  category: "Starter Packs",
  rating: 4.5,
  bonusItems: [
    {
      id: "bonus1",
      name: "Exclusive Mount",
      description: "A rare mount only available in this pack.",
    },
    {
      id: "bonus2",
      name: "Unique Character Title",
      description: "Show off your status with this exclusive title.",
    },
  ],
  valuePercentage: 40,
}

// Component for pack items with animation
const ContentItem = ({ id, name, quantity, index }: ContentItemProps) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.03, backgroundColor: "rgba(var(--primary), 0.05)" }}
    transition={{
      duration: 0.2,
      delay: index * 0.05, // Sequential animation
      type: "spring",
      stiffness: 300,
    }}
    className="p-3 rounded-lg border"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
        <Package className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">Quantity: {quantity}</div>
      </div>
    </div>
  </motion.div>
)

// Component for bonus items with animation
const BonusItem = ({ id, name, description, index }: BonusItemProps) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
    transition={{
      duration: 0.3,
      delay: index * 0.1, // Sequential animation
      type: "spring",
    }}
    className="p-4 rounded-lg border"
  >
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center shrink-0">
        <Gift className="h-8 w-8 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
)

export default function PackPage() {
  // State with TypeScript typing
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const discountedPrice: number = packData.price * (1 - (packData.discount || 0))

  // Calculating remaining days if expiry date
  const daysRemaining: number | null = packData.expiryDate
    ? Math.max(0, Math.ceil((new Date(packData.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Main entry animation */}
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
          <span>Packs</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{packData.name}</span>
        </div>

        {/* Adaptive layout with Tailwind */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Images with animations */}
          <div className="space-y-4">
            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={packData.images[selectedImage]}
                alt={packData.name}
                className="w-full aspect-video object-cover"
                key={selectedImage} // To trigger animation on each change
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {packData.isLimited && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Badge className="bg-destructive text-destructive-foreground px-3 py-1">Limited Time Offer</Badge>
                  </motion.div>
                )}
                {packData.discount && packData.discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      -{Math.round(packData.discount * 100)}% OFF
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Thumbnails with animation */}
            <div className="grid grid-cols-3 gap-2">
              {packData.images.map((image, index) => (
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
                    alt={`${packData.name} image ${index + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column - Details with animations */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{packData.name}</h1>
                <Badge variant="outline" className="text-base px-3 py-1">
                  {packData.category}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Released: {new Date(packData.releaseDate).toLocaleDateString()}</span>
                </div>

                {packData.expiryDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {daysRemaining && daysRemaining > 0 ? `${daysRemaining} days remaining` : "Offer expired"}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description with animation */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{packData.description}</p>
            </motion.div>

            {/* Pack value with animation */}
            {packData.valuePercentage && (
              <motion.div
                className="bg-muted/50 rounded-lg p-4 border border-primary/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="font-semibold text-primary">Value Deal</h3>
                <p className="text-sm mt-1">Save {packData.valuePercentage}% compared to buying items separately!</p>
              </motion.div>
            )}

            {/* Price with animation */}
            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</div>
                {packData.discount && packData.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg line-through text-muted-foreground">${packData.price.toFixed(2)}</span>
                    <Badge variant="outline" className="text-primary">
                      Save ${(packData.price - discountedPrice).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Quantity selector */}
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

            {/* Action buttons with animation */}
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

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${packData.isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{packData.isAvailable ? "In Stock" : "Out of Stock"}</span>
              {packData.isAvailable && <span className="text-muted-foreground">({packData.stock} available)</span>}
            </div>

            {/* Offer end alert with animation */}
            {packData.isLimited && daysRemaining && daysRemaining <= 7 && (
              <motion.div
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Limited offer ends in {daysRemaining} days!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tabs for additional information */}
        <Tabs defaultValue="contents" className="mt-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="contents">Contents</TabsTrigger>
            <TabsTrigger value="bonus">Bonus Items</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="contents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Pack Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packData.contents.map((item, index) => (
                    <ContentItem key={item.id} id={item.id} name={item.name} quantity={item.quantity} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonus" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Exclusive Bonus Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {packData.bonusItems.map((item, index) => (
                    <BonusItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      index={index}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Pack Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Category:</span> {packData.category}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Release Date:</span>{" "}
                        {new Date(packData.releaseDate).toLocaleDateString()}
                      </li>
                      {packData.expiryDate && (
                        <li className="flex items-center gap-2">
                          <span className="font-medium">Available Until:</span>{" "}
                          {new Date(packData.expiryDate).toLocaleDateString()}
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Limited Offer:</span> {packData.isLimited ? "Yes" : "No"}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {packData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}