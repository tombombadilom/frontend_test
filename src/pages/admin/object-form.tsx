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
import { getImageUrl } from '@/lib/utils';
import type { GameItem } from '@/types/item';
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
const objectSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  description: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères'),
  category: z.coerce.number().min(1, 'La catégorie est requise'),
  rarity: z.string().min(1, 'La rareté est requise'),
  amount: z.coerce
    .number()
    .min(0.01, 'Le prix doit être supérieur à 0')
    .max(999999.99, 'Le prix ne peut pas dépasser 999,999.99'),
  currency: z
    .string()
    .min(1, 'La devise est requise')
    .max(10, 'La devise ne peut pas dépasser 10 caractères'),
  gameId: z.coerce.number().min(1, 'L\'ID du jeu est requis'),
  isLimited: z.boolean().default(false),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  imageUrl: z.string().min(1, 'L\'image est requise'),
  videoUrl: z.string().optional(),
  modelUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

type ObjectFormValues = z.infer<typeof objectSchema>;

interface ObjectFormProps {
  editMode?: boolean;
}

export default function ObjectFormPage({ editMode = false }: ObjectFormProps) {
  const navigate = useNavigate();
  const { id: urlId } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<GameItem | null>(null);
  const [isLoading, setIsLoading] = useState(editMode);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const form = useForm<ObjectFormValues>({
    resolver: zodResolver(objectSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 0,
      rarity: '',
      amount: 0,
      currency: 'EUR',
      gameId: 0,
      isLimited: false,
      startDate: '',
      endDate: '',
      imageUrl: '',
      videoUrl: '',
      modelUrl: '',
      isFeatured: false,
    },
  });

  useEffect(() => {
    const loadObject = async () => {
      if (editMode && urlId) {
        try {
          setIsLoading(true);
          const response = await import('@/data/objects.json');
          console.log('Loading object with ID:', urlId);
          const objectId = Number.parseInt(urlId, 10);
          console.log('Parsed object ID:', objectId);
          const object = response.default.items.find(o => o.id === objectId);
          console.log('Found object:', object);
          
          if (object) {
            const validObject: GameItem = {
              ...object,
              availability: {
                isLimited: object.availability?.isLimited ?? false,
                startDate: object.availability?.startDate,
                endDate: object.availability?.endDate,
              },
              preview: {
                imageUrl: object.preview?.imageUrl || '',
                videoUrl: object.preview?.videoUrl,
                modelUrl: object.preview?.modelUrl,
              },
              metadata: object.metadata || {},
              isFeatured: object.isFeatured || false,
              isNewRelease: object.isNewRelease || false,
            };
            
            setInitialData(validObject);
            setTags(validObject.tags);
            
            form.reset({
              name: validObject.name,
              description: validObject.description,
              category: validObject.category,
              rarity: validObject.rarity,
              amount: validObject.price.amount,
              currency: validObject.price.currency,
              gameId: validObject.gameId,
              isLimited: validObject.availability.isLimited,
              startDate: validObject.availability.startDate || '',
              endDate: validObject.availability.endDate || '',
              imageUrl: validObject.preview.imageUrl,
              videoUrl: validObject.preview.videoUrl || '',
              modelUrl: validObject.preview.modelUrl || '',
              isFeatured: validObject.isFeatured,
            });
          } else {
            console.error('Object not found with ID:', objectId);
            showToast.error('Objet non trouvé');
            navigate('/admin/objects');
          }
        } catch (error) {
          console.error('Erreur lors du chargement de l\'objet:', error);
          showToast.error('Erreur lors du chargement de l\'objet');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadObject();
  }, [editMode, urlId, form, navigate]);

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

  const onSubmit = async (data: ObjectFormValues) => {
    try {
      const objectData: GameItem = {
        id: initialData?.id || Math.floor(Date.now() / 1000),
        name: data.name,
        description: data.description,
        category: data.category,
        rarity: data.rarity,
        price: {
          amount: data.amount,
          currency: data.currency,
        },
        availability: {
          isLimited: data.isLimited,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        preview: {
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          modelUrl: data.modelUrl,
        },
        gameId: data.gameId,
        tags,
        metadata: {},
        isFeatured: data.isFeatured,
      };

      console.log('Données de l\'objet à envoyer:', objectData);

      showToast.success(
        editMode ? 'Objet mis à jour avec succès' : 'Objet créé avec succès'
      );
      navigate('/admin/objects');
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
          {editMode ? 'Modifier l\'objet' : 'Ajouter un objet'}
        </h1>
        <p className="text-muted-foreground">
          {editMode
            ? 'Modifiez les informations de l\'objet'
            : 'Ajoutez un nouvel objet au catalogue'}
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
                    <Input placeholder="Enter object name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the object as it appears in the store.
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
                      placeholder="Enter object description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of the object.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      The base price of the object in USD.
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
                      The currency of the object price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter category"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The category of the object.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rarity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter rarity" {...field} />
                    </FormControl>
                    <FormDescription>
                      The rarity of the object.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <h3 className="text-lg font-semibold">Visibility</h3>
              <div className="space-y-2">
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
                          Show this object in the featured section.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="isLimited"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Limited Time</FormLabel>
                        <FormDescription>
                          Is this object only available for a limited time?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormDescription>
                          When the object becomes available.
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
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormDescription>
                          When the object becomes unavailable.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Media</h3>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL of the object's image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL of the object's preview video.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="modelUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3D Model URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 3D model URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL of the object's 3D model.
                      </FormDescription>
                      <FormMessage />
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
              onClick={() => navigate('/admin/objects')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? editMode
                  ? 'Updating...'
                  : 'Creating...'
                : editMode
                ? 'Update Object'
                : 'Create Object'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
} 