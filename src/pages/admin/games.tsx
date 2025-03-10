'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import type { Game } from '@/types/game';
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
import GameFormPage from './game-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminGamesPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminGamesPage({ isNew, isEdit }: AdminGamesPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [_language, _setLanguage] = useState('fr');
  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    priceRange: '',
    sortBy: '',
    isActive: undefined as boolean | undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les données
  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/games.json');
        setGames(response.default.games || []);
      } catch (error) {
        console.error('Erreur lors du chargement des jeux:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  // Obtenir les options uniques pour les filtres
  const platforms = Array.from(new Set(games.flatMap(game => game.platforms)));
  const genres = Array.from(new Set(games.flatMap(game => game.genres)));
  const priceRanges = [
    { label: '0€ - 10€', min: 0, max: 10 },
    { label: '10€ - 30€', min: 10, max: 30 },
    { label: '30€ - 60€', min: 30, max: 60 },
    { label: '60€+', min: 60, max: Number.POSITIVE_INFINITY },
  ];

  // Filtrer les jeux
  const filteredGames = games.filter((game) => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genres.some(genre => 
        genre.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      game.platforms.some(platform => 
        platform.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPlatform = !filters.platform || game.platforms.includes(filters.platform);
    const matchesGenre = !filters.genre || game.genres.includes(filters.genre);
    const matchesPriceRange = !filters.priceRange || priceRanges.find(_range => {
      const [min, max] = filters.priceRange.split('-').map(Number);
      return game.price.amount >= min && game.price.amount <= max;
    });

    return matchesSearch && matchesPlatform && matchesGenre && matchesPriceRange;
  });

  // Trier les jeux
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price.amount - b.price.amount;
      case 'price-desc':
        return b.price.amount - a.price.amount;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau jeu</h1>
        <GameFormPage />
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier le jeu</h1>
        <GameFormPage editMode />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jeux</h1>
        <Link
          to="/admin/games/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un jeu
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
                <span>{selectedValue || 'Rechercher un jeu...'}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command className="bg-command border-command-border">
                <CommandInput 
                  placeholder="Rechercher un jeu..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="bg-command-input text-command-foreground"
                />
                <CommandList className="bg-command">
                  <CommandEmpty>Aucun jeu trouvé</CommandEmpty>
                  <CommandGroup heading="Jeux" className="text-command-foreground">
                    {sortedGames.slice(0, 10).map((game) => (
                      <CommandItem
                        key={game.id}
                        value={game.title}
                        onSelect={() => {
                          setSearchQuery(game.title);
                          setSelectedValue(game.title);
                          setOpen(false);
                        }}
                        className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={game.coverImage || '/placeholder.svg'}
                            alt={game.title}
                            className="h-6 w-6 rounded object-cover"
                          />
                          <span>{game.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {formatPrice(game.price)}
                          </span>
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
                <h4 className="font-medium leading-none">Plateformes</h4>
                <Select
                  value={filters.platform}
                  onValueChange={(value) => setFilters(f => ({ ...f, platform: value }))}
                >
                  <SelectTrigger className="bg-command border-command-border">
                    <SelectValue placeholder="Toutes les plateformes" />
                  </SelectTrigger>
                  <SelectContent className="bg-command border-command-border">
                    <SelectItem value="" className="bg-command-item hover:bg-command-item-hover">Toutes les plateformes</SelectItem>
                    {platforms.map(platform => (
                      <SelectItem 
                        key={platform} 
                        value={platform}
                        className="bg-command-item hover:bg-command-item-hover data-[selected=true]:bg-command-item-selected data-[selected=true]:text-command-item-selected-foreground"
                      >
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium leading-none">Genres</h4>
                <Select
                  value={filters.genre}
                  onValueChange={(value) => setFilters(f => ({ ...f, genre: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les genres</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
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
                    <SelectItem value="title-asc">Titre A-Z</SelectItem>
                    <SelectItem value="title-desc">Titre Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({
                    platform: '',
                    genre: '',
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
                  Jeu
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
                  Catégories
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Plateformes
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
            ) : sortedGames.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun jeu trouvé
                </TableCell>
              </TableRow>
            ) : (
              sortedGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={game.coverImage || '/placeholder.svg'}
                        alt={game.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{game.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(game.price)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {game.genres.map((genre) => (
                        <span
                          key={genre}
                          className="rounded-sm bg-muted px-1.5 py-0.5 text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="rounded-sm bg-muted px-1.5 py-0.5 text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/games/edit/${game.id}`}>
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
          Affichage de {sortedGames.length} jeux
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