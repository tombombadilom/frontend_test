'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import type { Pack } from '@/types/pack';
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
import PackFormPage from './pack-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminPacksPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminPacksPage({ isNew, isEdit }: AdminPacksPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [_language, _setLanguage] = useState('fr');
  const [filters, setFilters] = useState({
    type: '' as '' | 'starter' | 'collector' | 'ultimate' | 'pack',
    priceRange: '',
    sortBy: '',
    isActive: undefined as boolean | undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les données
  useEffect(() => {
    const loadPacks = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/packs.json');
        const rawPacks = response.default.packs || [];
        const validatedPacks = rawPacks.map(pack => ({
          ...pack,
          type: (pack.type === 'starter' || pack.type === 'collector' || pack.type === 'ultimate' || pack.type === 'pack' 
            ? pack.type 
            : 'pack') as 'starter' | 'collector' | 'ultimate' | 'pack'
        })) as Pack[];
        setPacks(validatedPacks);
      } catch (error) {
        console.error('Erreur lors du chargement des packs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPacks();
  }, []);

  // Obtenir les options uniques pour les filtres
  const types = Array.from(new Set(packs.map(pack => pack.type)));
  const priceRanges = [
    { label: '0€ - 10€', min: 0, max: 10 },
    { label: '10€ - 30€', min: 10, max: 30 },
    { label: '30€ - 60€', min: 30, max: 60 },
    { label: '60€+', min: 60, max: Number.POSITIVE_INFINITY },
  ];

  // Filtrer les packs
  const filteredPacks = packs.filter((pack) => {
    const matchesSearch = 
      pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !filters.type || pack.type === filters.type;
    const matchesPriceRange = !filters.priceRange || priceRanges.find(_range => {
      const [min, max] = filters.priceRange.split('-').map(Number);
      return pack.price.amount >= min && pack.price.amount <= max;
    });
    const matchesActive = filters.isActive === undefined || pack.isActive === filters.isActive;

    return matchesSearch && matchesType && matchesPriceRange && matchesActive;
  });

  // Trier les packs
  const sortedPacks = [...filteredPacks].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price.amount - b.price.amount;
      case 'price-desc':
        return b.price.amount - a.price.amount;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau pack</h1>
        <PackFormPage />
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier le pack</h1>
        <PackFormPage editMode />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Packs</h1>
        <Link
          to="/admin/packs/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un pack
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
                <span>{selectedValue || 'Rechercher un pack...'}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command className="bg-command border-command-border">
                <CommandInput 
                  placeholder="Rechercher un pack..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="bg-command-input text-command-foreground"
                />
                <CommandList className="bg-command">
                  <CommandEmpty>Aucun pack trouvé</CommandEmpty>
                  <CommandGroup heading="Packs" className="text-command-foreground">
                    {sortedPacks.slice(0, 10).map((pack) => (
                      <CommandItem
                        key={pack.id}
                        value={pack.name}
                        onSelect={() => {
                          setSearchQuery(pack.name);
                          setSelectedValue(pack.name);
                          setOpen(false);
                        }}
                        className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={pack.coverImage || pack.preview?.imageUrl || '/placeholder.svg'}
                            alt={pack.name}
                            className="h-6 w-6 rounded object-cover"
                          />
                          <span>{pack.name}</span>
                          <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {pack.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatPrice(pack.price)}
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
                <h4 className="font-medium leading-none">Type</h4>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(f => ({ ...f, type: value as '' | 'starter' | 'collector' | 'ultimate' | 'pack' }))}
                >
                  <SelectTrigger className="bg-command border-command-border">
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent className="bg-command border-command-border">
                    <SelectItem value="" className="bg-command-item hover:bg-command-item-hover">Tous les types</SelectItem>
                    {types.map(type => (
                      <SelectItem 
                        key={type} 
                        value={type}
                        className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground"
                      >
                        {type}
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
                <h4 className="font-medium leading-none">Statut</h4>
                <Select
                  value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                  onValueChange={(value) => setFilters(f => ({ 
                    ...f, 
                    isActive: value === '' ? undefined : value === 'true'
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    <SelectItem value="true">Actif</SelectItem>
                    <SelectItem value="false">Inactif</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({
                    type: '',
                    priceRange: '',
                    sortBy: '',
                    isActive: undefined,
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
                  Pack
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
                  Type
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Statut
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
            ) : sortedPacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun pack trouvé
                </TableCell>
              </TableRow>
            ) : (
              sortedPacks.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={pack.coverImage || pack.preview?.imageUrl || '/placeholder.svg'}
                        alt={pack.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{pack.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(pack.price)}</TableCell>
                  <TableCell>
                    <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs">
                      {pack.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`rounded-sm px-1.5 py-0.5 text-xs ${
                      pack.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pack.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/packs/edit/${pack.id}`}>
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
          Affichage de {sortedPacks.length} packs
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