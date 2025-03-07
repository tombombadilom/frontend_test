import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
}

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simuler le chargement des commandes
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dans une application réelle, cela ferait une requête API
        // Pour l'instant, on utilise des données mockées
        const mockOrders: Order[] = [
          {
            id: 'ORD-2023-001',
            date: '2023-05-15T14:30:00Z',
            status: 'completed',
            total: 59.98,
            items: [
              {
                id: 'item-1',
                productId: 'game-1',
                productName: 'Cyberpunk 2077',
                price: 59.99,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ORD-2023-002',
            date: '2023-06-22T10:15:00Z',
            status: 'processing',
            total: 119.97,
            items: [
              {
                id: 'item-2',
                productId: 'game-2',
                productName: 'Elden Ring',
                price: 59.99,
                quantity: 1,
              },
              {
                id: 'item-3',
                productId: 'game-3',
                productName: "Baldur's Gate 3",
                price: 59.99,
                quantity: 1,
              },
            ],
          },
        ];

        setOrders(mockOrders);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'processing':
        return <Badge variant="secondary">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 text-white">Terminée</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Commandes</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              Vous n'avez pas encore passé de commande
            </p>
            <Button>Parcourir le catalogue</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Commande #{order.id}
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Total: {order.total.toFixed(2)} €</span>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell className="text-right">
                          {item.price.toFixed(2)} €
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {(item.price * item.quantity).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Facture
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
