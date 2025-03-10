'use client';

import { useCartStore } from "@/store/cart-store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CartItemType {
  id: string;
  name: string;
  description?: string;
  price: {
    currency: string;
    amount: number;
  };
  image: string;
  type: 'game' | 'object' | 'pack';
  quantity: number;
}

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();

  const EmptyState = () => (
    <div className="text-center py-12">
      <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Votre panier est vide</h3>
      <p className="text-muted-foreground mb-4">Ajoutez des éléments à votre panier pour les retrouver ici</p>
      <Link to="/catalog">
        <Button>Explorer le catalogue</Button>
      </Link>
    </div>
  );

  const CartItem = ({ item }: { item: CartItemType }) => {
    const getItemImage = (item: CartItemType): string => {
      return item.image || '/placeholder.svg';
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group"
      >
        <Card className="border-none">
          <CardContent className="p-4">
            <div className="grid grid-cols-[60%_1fr_auto] gap-4">
              <Link to={`/${item.type}s/${item.id}`} className="relative aspect-[16/9]">
                <img
                  src={getItemImage(item)}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover rounded-md"
                />
              </Link>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/${item.type}s/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-primary">
                    {item.price.currency} {(item.price.amount * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (!items.length) {
    return <EmptyState />;
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Panier</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {items.length} éléments
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-none">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{items[0]?.price.currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>{items[0]?.price.currency} {(totalPrice * 0.2).toFixed(2)}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{items[0]?.price.currency} {(totalPrice * 1.2).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full" size="lg">
                Passer la commande
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 