import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Eye, Filter, Search } from 'lucide-react';
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
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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
            total: 59.99,
            customerName: 'John Doe',
            customerEmail: 'john.doe@example.com',
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
            total: 119.98,
            customerName: 'Jane Smith',
            customerEmail: 'jane.smith@example.com',
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
          {
            id: 'ORD-2023-003',
            date: '2023-07-05T16:45:00Z',
            status: 'pending',
            total: 49.99,
            customerName: 'Robert Johnson',
            customerEmail: 'robert.johnson@example.com',
            items: [
              {
                id: 'item-4',
                productId: 'game-4',
                productName: 'Starfield',
                price: 49.99,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ORD-2023-004',
            date: '2023-07-10T09:20:00Z',
            status: 'cancelled',
            total: 29.99,
            customerName: 'Emily Davis',
            customerEmail: 'emily.davis@example.com',
            items: [
              {
                id: 'item-5',
                productId: 'game-5',
                productName: 'Stardew Valley',
                price: 29.99,
                quantity: 1,
              },
            ],
          },
          {
            id: 'ORD-2023-005',
            date: '2023-07-15T11:30:00Z',
            status: 'completed',
            total: 89.98,
            customerName: 'Michael Wilson',
            customerEmail: 'michael.wilson@example.com',
            items: [
              {
                id: 'item-6',
                productId: 'game-6',
                productName: 'Diablo IV',
                price: 59.99,
                quantity: 1,
              },
              {
                id: 'item-7',
                productId: 'game-7',
                productName: 'Minecraft',
                price: 29.99,
                quantity: 1,
              },
            ],
          },
        ];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
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

  useEffect(() => {
    // Filtrer les commandes en fonction de la recherche et du filtre de statut
    let result = orders;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter]);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des commandes</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, client ou email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter} disabled>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{order.total.toFixed(2)} €</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
