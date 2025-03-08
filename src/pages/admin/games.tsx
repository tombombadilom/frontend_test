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
import { useState } from 'react';
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

interface AdminGamesPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminGamesPage({ isNew, isEdit }: AdminGamesPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [games, _setGames] = useState<Game[]>([]);
  const [isLoading, _setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, _setSelectedValue] = useState('');
  const [language, _setLanguage] = useState('fr');

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genres.some((genre) => 
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    game.platforms.some((platform) => 
      platform.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau jeu</h1>
        {/* Formulaire de création */}
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier le jeu</h1>
        {/* Formulaire d'édition avec l'ID {id} */}
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
                <span>{selectedValue || (language === 'fr' ? 'Sélectionner...' : 'Select...')}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Rechercher un jeu..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Aucun jeu trouvé</CommandEmpty>
                  <CommandGroup heading="Jeux">
                    {filteredGames.map((game) => (
                      <CommandItem
                        key={game.id}
                        value={game.title}
                        onSelect={() => {
                          setSearchQuery(game.title);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={game.coverImage || '/placeholder.svg'}
                            alt={game.title}
                            className="h-6 w-6 rounded object-cover"
                          />
                          <span>{game.title}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
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
                  Chargement...
                </TableCell>
              </TableRow>
            ) : filteredGames.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun jeu trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredGames.map((game) => (
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
          Affichage de {filteredGames.length} jeux
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