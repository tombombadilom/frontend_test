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

interface AdminPacksPageProps {
  isNew?: boolean;
  isEdit?: boolean;
}

export default function AdminPacksPage({ isNew, isEdit }: AdminPacksPageProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [packs, _setPacks] = useState<Pack[]>([]);
  const [isLoading, _setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [language, _setLanguage] = useState('fr');

  const filteredPacks = packs.filter((pack) =>
    pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pack.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isNew) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau pack</h1>
        {/* Formulaire de création */}
      </div>
    );
  }

  if (isEdit && id) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Modifier le pack</h1>
        {/* Formulaire d'édition avec l'ID {id} */}
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
                <span>{selectedValue || (language === 'fr' ? 'Sélectionner...' : 'Select...')}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Rechercher un pack..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Aucun pack trouvé</CommandEmpty>
                  <CommandGroup heading="Packs">
                    {filteredPacks.map((pack) => (
                      <CommandItem
                        key={pack.id}
                        value={pack.name}
                        onSelect={() => {
                          setSearchQuery(pack.name);
                          setSelectedValue(pack.name);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={pack.preview?.imageUrl || '/placeholder.svg'}
                            alt={pack.name}
                            className="h-6 w-6 rounded object-cover"
                          />
                          <span>{pack.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {pack.type}
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
                  Chargement...
                </TableCell>
              </TableRow>
            ) : filteredPacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun pack trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredPacks.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={pack.preview?.imageUrl || '/placeholder.svg'}
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
          Affichage de {filteredPacks.length} packs
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