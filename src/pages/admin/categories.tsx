'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/category';
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
// import CategoryFormPage from './category-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Composant temporaire en attendant l'implémentation complète
const CategoryFormPage = ({ editMode }: { editMode?: boolean }) => (
  <div>
    <p>Formulaire de catégorie {editMode ? 'en mode édition' : 'en mode création'}</p>
    <p>Ce composant sera implémenté prochainement.</p>
  </div>
);

interface AdminCategoriesPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminCategoriesPage({ isNew, isEdit }: AdminCategoriesPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [filters, setFilters] = useState({
    sortBy: '',
    isActive: undefined as boolean | undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les données
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/categories.json');
        setCategories(response.default.categories || []);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Filtrer les catégories
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActive = filters.isActive === undefined || category.isActive === filters.isActive;

    return matchesSearch && matchesActive;
  });

  // Trier les catégories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'order-asc':
        return a.order - b.order;
      case 'order-desc':
        return b.order - a.order;
      default:
        return a.order - b.order;
    }
  });

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer une nouvelle catégorie</h1>
        <CategoryFormPage />
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier la catégorie</h1>
        <CategoryFormPage editMode />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <Link
          to="/admin/categories/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une catégorie
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
                <span>{selectedValue || 'Rechercher une catégorie...'}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command className="bg-command border-command-border">
                <CommandInput 
                  placeholder="Rechercher une catégorie..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="bg-command-input text-command-foreground"
                />
                <CommandList className="bg-command">
                  <CommandEmpty>Aucune catégorie trouvée</CommandEmpty>
                  <CommandGroup heading="Catégories" className="text-command-foreground">
                    {sortedCategories.slice(0, 10).map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => {
                          setSearchQuery(category.name);
                          setSelectedValue(category.name);
                          setOpen(false);
                        }}
                        className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <span>{category.name}</span>
                          <div className="ml-auto flex items-center gap-2">
                            <span className={`rounded-sm px-1.5 py-0.5 text-xs ${
                              category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {category.isActive ? 'Active' : 'Inactive'}
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
                <h4 className="font-medium leading-none">Statut</h4>
                <Select
                  value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                  onValueChange={(value) => setFilters(f => ({ 
                    ...f, 
                    isActive: value === '' ? undefined : value === 'true'
                  }))}
                >
                  <SelectTrigger className="bg-command border-command-border">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent className="bg-command border-command-border">
                    <SelectItem value="" className="bg-command-item hover:bg-command-item-hover">Tous les statuts</SelectItem>
                    <SelectItem value="true" className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground">
                      Active
                    </SelectItem>
                    <SelectItem value="false" className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground">
                      Inactive
                    </SelectItem>
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
                    <SelectItem value="">Par défaut (Ordre)</SelectItem>
                    <SelectItem value="order-asc">Ordre croissant</SelectItem>
                    <SelectItem value="order-desc">Ordre décroissant</SelectItem>
                    <SelectItem value="name-asc">Nom A-Z</SelectItem>
                    <SelectItem value="name-desc">Nom Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({
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
                  Nom
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Jeu</TableHead>
              <TableHead>Ordre</TableHead>
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
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucune catégorie trouvée
                </TableCell>
              </TableRow>
            ) : (
              sortedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <span className="font-medium">{category.name}</span>
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.gameId}</TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell>
                    <span className={`rounded-sm px-1.5 py-0.5 text-xs ${
                      category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/categories/edit/${category.id}`}>
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
          Affichage de {sortedCategories.length} catégories
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
