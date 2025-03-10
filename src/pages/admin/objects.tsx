'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import type { GameItem } from '@/types/item';
import {
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  ChevronDown,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ObjectFormPage from './object-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminObjectsPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminObjectsPage({ isNew, isEdit }: AdminObjectsPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [objects, setObjects] = useState<GameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [_language, _setLanguage] = useState('fr');
  const [filters, setFilters] = useState({
    category: '',
    rarity: '',
    priceRange: '',
    sortBy: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les données
  useEffect(() => {
    const loadObjects = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/objects.json');
        const items = response.default.items || [];
        // S'assurer que tous les objets ont la propriété isLimited
        const validItems = items.map(item => ({
          ...item,
          availability: {
            ...item.availability,
            isLimited: item.availability?.isLimited ?? false
          }
        })) as GameItem[];
        setObjects(validItems);
      } catch (error) {
        console.error('Erreur lors du chargement des objets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadObjects();
  }, []);

  // Obtenir les options uniques pour les filtres
  const categories = Array.from(new Set(objects.map(obj => obj.category)));
  const rarities = Array.from(new Set(objects.map(obj => obj.rarity)));
  const priceRanges = [
    { label: '0€ - 10€', min: 0, max: 10 },
    { label: '10€ - 30€', min: 10, max: 30 },
    { label: '30€ - 60€', min: 30, max: 60 },
    { label: '60€+', min: 60, max: Number.POSITIVE_INFINITY },
  ];

  // Filtrer les objets
  const filteredObjects = objects.filter((object) => {
    const matchesSearch = 
      object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      object.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      object.rarity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(object.category).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !filters.category || String(object.category) === filters.category;
    const matchesRarity = !filters.rarity || object.rarity === filters.rarity;
    const matchesPriceRange = !filters.priceRange || priceRanges.find(_range => {
      const [min, max] = filters.priceRange.split('-').map(Number);
      return object.price.amount >= min && object.price.amount <= max;
    });

    return matchesSearch && matchesCategory && matchesRarity && matchesPriceRange;
  });

  // Trier les objets
  const sortedObjects = [...filteredObjects].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price.amount - b.price.amount;
      case 'price-desc':
        return b.price.amount - a.price.amount;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'rarity-asc':
        return a.rarity.localeCompare(b.rarity);
      case 'rarity-desc':
        return b.rarity.localeCompare(a.rarity);
      default:
        return 0;
    }
  });

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouvel objet</h1>
        <ObjectFormPage />
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier l'objet</h1>
        <ObjectFormPage editMode />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Objets</h1>
        <Link
          to="/admin/objects/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un objet
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setOpen(!open)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>{selectedValue || 'Rechercher un objet...'}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command className="bg-popover border-popover-border">
                <CommandInput 
                  placeholder="Rechercher un objet..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="bg-popover text-popover-foreground"
                />
                <CommandList className="bg-popover">
                  <CommandEmpty>Aucun objet trouvé</CommandEmpty>
                  <CommandGroup heading="Objets" className="text-popover-foreground">
                    {sortedObjects.slice(0, 10).map((object) => (
                      <CommandItem
                        key={object.id}
                        value={object.name}
                        onSelect={() => {
                          setSearchQuery(object.name);
                          setSelectedValue(object.name);
                          setOpen(false);
                        }}
                        className="bg-popover hover:bg-accent/10 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={object.preview?.imageUrl || '/placeholder.svg'}
                            alt={object.name}
                            className="h-6 w-6 rounded object-cover"
                          />
                          <span>{object.name}</span>
                          <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {object.rarity}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatPrice(object.price)}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto" disabled>
              <Filter className="mr-2 h-4 w-4" />
              Filtres
              {Object.values(filters).some(v => v !== '') && (
                <span className="ml-2 rounded-full bg-primary w-2 h-2" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Catégorie</h4>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters(f => ({ ...f, category: value }))}
                >
                  <SelectTrigger className="bg-popover border-popover-border">
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-popover-border">
                    <SelectItem value="" className="bg-popover hover:bg-accent/10">Toutes les catégories</SelectItem>
                    {categories.map(category => (
                      <SelectItem 
                        key={category} 
                        value={String(category)}
                        className="bg-popover hover:bg-accent/10 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium leading-none">Rareté</h4>
                <Select
                  value={filters.rarity}
                  onValueChange={(value) => setFilters(f => ({ ...f, rarity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les raretés" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les raretés</SelectItem>
                    {rarities.map(rarity => (
                      <SelectItem key={rarity} value={rarity}>
                        {rarity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium leading-none">Prix</h4>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(f => ({ ...f, priceRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les prix</SelectItem>
                    {priceRanges.map(range => (
                      <SelectItem key={range.label} value={`${range.min}-${range.max}`}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium leading-none">Trier par</h4>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(f => ({ ...f, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Par défaut</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name-asc">Nom A-Z</SelectItem>
                    <SelectItem value="name-desc">Nom Z-A</SelectItem>
                    <SelectItem value="rarity-asc">Rareté croissante</SelectItem>
                    <SelectItem value="rarity-desc">Rareté décroissante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({
                    category: '',
                    rarity: '',
                    priceRange: '',
                    sortBy: '',
                  });
                  setShowFilters(false);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1">
                  Objet
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Prix
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Rareté
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Catégorie
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedObjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun objet trouvé
                </TableCell>
              </TableRow>
            ) : (
              sortedObjects.map((object) => (
                <TableRow key={object.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={object.preview?.imageUrl || '/placeholder.svg'}
                        alt={object.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{object.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(object.price)}</TableCell>
                  <TableCell>
                    <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs">
                      {object.rarity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs">
                      {object.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/objects/edit/${object.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Plus</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Affichage de {sortedObjects.length} objets
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
} 