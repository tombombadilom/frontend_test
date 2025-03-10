'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Pack } from '@/types/pack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { z } from 'zod';

// Validation schema with Zod
const packSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(
      /^[a-zA-Z0-9\s\-':,.!?]+$/,
      'Le nom contient des caractères invalides'
    ),
  description: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères'),
  amount: z.coerce
    .number()
    .min(0.01, 'Le prix doit être supérieur à 0')
    .max(999999.99, 'Le prix ne peut pas dépasser 999,999.99'),
  currency: z
    .string()
    .min(1, 'La devise est requise')
    .max(10, 'La devise ne peut pas dépasser 10 caractères'),
  type: z.enum(['starter', 'collector', 'ultimate', 'pack'], {
    required_error: 'Le type est requis',
  }),
  gameId: z.coerce.number().min(1, 'L\'ID du jeu est requis'),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
});

type PackFormValues = z.infer<typeof packSchema>;

interface PackFormProps {
  editMode?: boolean;
}

export default function PackFormPage({ editMode = false }: PackFormProps) {
  const navigate = useNavigate();
  const { id: urlId } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<Pack | null>(null);
  const [isLoading, setIsLoading] = useState(editMode);
  const [items, setItems] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newTag, setNewTag] = useState('');

  const form = useForm<PackFormValues>({
    resolver: zodResolver(packSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      amount: initialData?.price.amount || 0,
      currency: initialData?.price.currency || 'USD',
      type: initialData?.type || 'starter',
      gameId: initialData?.gameId || 0,
      isActive: initialData?.isActive || true,
      isFeatured: initialData?.isFeatured || false,
      startDate: initialData?.availability.startDate || '',
      endDate: initialData?.availability.endDate || '',
    },
  });

  // Charger les données du pack si en mode édition
  useEffect(() => {
    const loadPack = async () => {
      if (editMode && urlId) {
        try {
          setIsLoading(true);
          const response = await import('@/data/packs.json');
          console.log('Loading pack with ID:', urlId);
          const packId = Number.parseInt(urlId, 10);
          console.log('Parsed pack ID:', packId);
          const pack = response.default.packs.find(p => p.id === packId);
          console.log('Found pack:', pack);
          
          if (pack && (pack.type === 'starter' || pack.type === 'collector' || pack.type === 'ultimate' || pack.type === 'pack')) {
            const validPack: Pack = {
              ...pack,
              type: pack.type,
              availability: {
                startDate: pack.availability?.startDate,
                endDate: pack.availability?.endDate,
              },
            };
            
            setInitialData(validPack);
            setItems(validPack.items);
            setTags(validPack.tags);
            
            form.reset({
              name: validPack.name,
              description: validPack.description,
              amount: validPack.price.amount,
              currency: validPack.price.currency,
              type: validPack.type,
              gameId: validPack.gameId,
              isActive: validPack.isActive,
              isFeatured: validPack.isFeatured,
              startDate: validPack.availability?.startDate,
              endDate: validPack.availability?.endDate,
            });
          } else {
            console.error('Pack not found with ID:', packId);
            showToast.error('Pack non trouvé');
            navigate('/admin/packs');
          }
        } catch (error) {
          console.error('Erreur lors du chargement du pack:', error);
          showToast.error('Erreur lors du chargement du pack');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPack();
  }, [editMode, urlId, form, navigate]);

  const addItem = () => {
    if (!newItem.trim()) return;

    const itemId = Number.parseInt(newItem, 10);
    if (Number.isNaN(itemId)) {
      showToast.error('Invalid item ID');
      return;
    }

    if (items.includes(itemId.toString())) {
      showToast.error('This item is already in the pack');
      return;
    }

    setItems([...items, itemId.toString()]);
    setNewItem('');
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter((id) => id !== itemId));
  };

  const addTag = () => {
    if (!newTag.trim()) return;

    if (tags.includes(newTag.trim())) {
      showToast.error('This tag already exists');
      return;
    }

    if (newTag.length > 20) {
      showToast.error('Tag name is too long (max 20 characters)');
      return;
    }

    setTags([...tags, newTag.trim()]);
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onSubmit = async (data: PackFormValues) => {
    try {
      if (items.length === 0) {
        showToast.error('Veuillez ajouter au moins un item au pack');
        return;
      }

      const packData: Pack = {
        id: initialData?.id || Math.floor(Date.now() / 1000),
        name: data.name,
        description: data.description,
        items,
        price: {
          amount: data.amount,
          currency: data.currency,
        },
        coverImage: initialData?.coverImage || '',
        type: data.type,
        gameId: data.gameId,
        tags,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        availability: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
        preview: initialData?.preview,
      };

      console.log('Données du pack à envoyer:', packData);

      showToast.success(
        editMode ? 'Pack mis à jour avec succès' : 'Pack créé avec succès'
      );
      navigate('/admin/packs');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      showToast.error('Une erreur est survenue');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">
          {editMode ? 'Modifier le pack' : 'Ajouter un pack'}
        </h1>
        <p className="text-muted-foreground">
          {editMode
            ? 'Modifiez les informations du pack'
            : 'Ajoutez un nouveau pack au catalogue'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">General information</h2>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pack name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the pack as it appears in the store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter pack description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of the pack.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The base price of the pack.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter currency" {...field} />
                    </FormControl>
                    <FormDescription>
                      The currency of the pack price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pack type" {...field} />
                    </FormControl>
                    <FormDescription>
                      The type of the pack (e.g., Bundle, Season Pass).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter game ID"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The ID of the game this pack belongs to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Included Items</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((itemId) => (
                  <div
                    key={itemId}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    <span>Item #{itemId}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(itemId)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Item #{itemId}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an item ID"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem();
                    }
                  }}
                />
                <Button type="button" onClick={addItem}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add item</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add tag</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        When the pack becomes available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        When the pack becomes unavailable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Status</h3>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Is this pack currently active and purchasable?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          Show this pack in the featured section.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/packs')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? editMode
                  ? 'Updating...'
                  : 'Creating...'
                : editMode
                ? 'Update Pack'
                : 'Create Pack'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
} 