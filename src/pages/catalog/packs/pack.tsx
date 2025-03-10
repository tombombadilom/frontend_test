'use client';

import { useParams } from 'react-router-dom';
import { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Share2, Calendar, Clock, Package } from "lucide-react"
import type { Pack } from "@/types/pack"
import { createUniqueId } from "@/types/pack"
import packsData from "@/data/packs.json"

export default function PackPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1)
  
  // Convertir l'ID de l'URL en UniqueId
  const packId = id ? createUniqueId(Number.parseInt(id, 10)) : createUniqueId(0);
  const packData = packsData.packs.find(pack => pack.id === packId) as Pack | undefined;
  
  if (!packData) {
    return <div>Pack not found</div>
  }

  // Calculating remaining days if expiry date exists
  const daysRemaining: number | null = packData.availability.endDate
    ? Math.max(0, Math.ceil((new Date(packData.availability.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null

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
          <span>Packs</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">{packData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Image and Description */}
          <div className="space-y-4">
            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={packData.coverImage}
                alt={packData.name}
                className="w-full aspect-video object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {(packData.price.discount ?? 0) > 0 && (
                <Badge className="absolute top-4 right-4 text-lg px-3 py-1.5 bg-primary text-primary-foreground">
                  -{packData.price.discount ?? 0}%
                </Badge>
              )}
            </motion.div>

            <motion.div
              className="relative rounded-lg overflow-hidden bg-muted p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{packData.description}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Contenu du pack</h3>
                <ul className="space-y-2">
                  {packData.items.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Package className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
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
                  {packData.type}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Disponible depuis: {new Date(packData.availability.startDate).toLocaleDateString()}</span>
                </div>

                {packData.availability.endDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {daysRemaining && daysRemaining > 0 ? `${daysRemaining} jours restants` : "Offre expirée"}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Price with animation */}
            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">
                  {packData.price.currency} {packData.price.amount.toFixed(2)}
                </div>
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
                  Ajouter au panier
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="mr-2 h-5 w-5" />
                  Liste de souhaits
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
              <div className={`w-3 h-3 rounded-full ${packData.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{packData.isActive ? "Disponible" : "Indisponible"}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {packData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}