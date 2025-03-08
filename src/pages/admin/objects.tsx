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

interface AdminObjectsPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminObjectsPage({ isNew, isEdit }: AdminObjectsPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [objects, _setObjects] = useState<GameItem[]>([]);
  const [isLoading, _setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, _setSelectedValue] = useState('');
  const [language, _setLanguage] = useState('fr');

  const filteredObjects = objects.filter((object) =>
    object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.rarity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouvel objet</h1>
        {/* Formulaire de création */}
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier l'objet</h1>
        {/* Formulaire d'édition avec l'ID {id} */}
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
                <span>{selectedValue || (language === 'fr' ? 'Sélectionner...' : 'Select...')}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Rechercher un objet..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Aucun objet trouvé</CommandEmpty>
                  <CommandGroup heading="Objets">
                    {filteredObjects.map((object) => (
                      <CommandItem
                        key={object.id}
                        value={object.name}
                        onSelect={() => {
                          setSearchQuery(object.name);
                          setSelectedValue(object.name);
                          setOpen(false);
                        }}
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
                              {object.category}
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
                  Chargement...
                </TableCell>
              </TableRow>
            ) : filteredObjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun objet trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredObjects.map((object) => (
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
          Affichage de {filteredObjects.length} objets
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