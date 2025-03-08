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
import type { Game } from '@/types/game';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import * as z from 'zod';

const gameSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  price: z.object({
    amount: z.coerce
      .number()
      .min(0.01, 'Price must be greater than 0')
      .max(999.99, 'Price cannot exceed 999.99'),
    currency: z
      .string()
      .min(1, 'Currency is required')
      .max(10, 'Currency cannot exceed 10 characters'),
    discount: z.coerce
      .number()
      .min(0, 'Discount cannot be negative')
      .max(100, 'Discount cannot exceed 100%')
      .optional(),
  }),
  releaseDate: z.string().min(1, 'Release date is required'),
  developer: z
    .string()
    .min(1, 'Developer is required')
    .max(100, 'Developer cannot exceed 100 characters'),
  publisher: z
    .string()
    .min(1, 'Publisher is required')
    .max(100, 'Publisher cannot exceed 100 characters'),
  genres: z.array(z.string()).min(1, 'At least one genre is required'),
  platforms: z.array(z.string()).min(1, 'At least one platform is required'),
  coverImage: z.string().min(1, 'Cover image is required'),
  screenshots: z.array(z.string()).min(1, 'At least one screenshot is required'),
  rating: z.coerce
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5'),
  isFeatured: z.boolean().optional(),
  isNewRelease: z.boolean().optional(),
});

type GameFormValues = z.infer<typeof gameSchema>;

interface GameFormProps {
  editMode?: boolean;
}

export default function GameFormPage({ editMode = false }: GameFormProps) {
  const navigate = useNavigate();
  const { id: urlId } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(editMode);
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState('');
  const [newPlatform, setNewPlatform] = useState('');

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: {
        amount: initialData?.price.amount || 0,
        currency: initialData?.price.currency || 'EUR',
        discount: initialData?.price.discount || 0,
      },
      releaseDate: initialData?.releaseDate || '',
      developer: initialData?.developer || '',
      publisher: initialData?.publisher || '',
      genres: initialData?.genres || [],
      platforms: initialData?.platforms || [],
      coverImage: initialData?.coverImage || '',
      screenshots: initialData?.screenshots || [],
      rating: initialData?.rating || 0,
      isFeatured: initialData?.isFeatured || false,
      isNewRelease: initialData?.isNewRelease || false,
    },
  });

  useEffect(() => {
    const fetchGame = async () => {
      if (!editMode || !urlId) return;

      try {
        setIsLoading(true);
        const response = await import('@/data/games.json');
        const game = response.default.find(
          (g: Game) => g.id.toString() === urlId
        );

        if (game) {
          setInitialData(game);
          setGenres(game.genres);
          setPlatforms(game.platforms);
          form.reset({
            title: game.title,
            description: game.description,
            price: game.price,
            releaseDate: game.releaseDate,
            developer: game.developer,
            publisher: game.publisher,
            genres: game.genres,
            platforms: game.platforms,
            coverImage: game.coverImage,
            screenshots: game.screenshots,
            rating: game.rating,
            isFeatured: game.isFeatured,
            isNewRelease: game.isNewRelease,
          });
        }
      } catch (err) {
        console.error('Failed to fetch game:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [editMode, urlId, form]);

  const addGenre = () => {
    // Validation du genre
    if (!newGenre.trim()) return;

    // Check if the genre already exists (case insensitive)
    if (genres.some((g) => g.toLowerCase() === newGenre.toLowerCase())) {
      showToast.error('This genre already exists');
      return;
    }

    // Limit genre length
    if (newGenre.length > 50) {
      showToast.error('Genre name is too long (max 50 characters)');
      return;
    }

    setGenres([...genres, newGenre]);
    setNewGenre('');
  };

  const removeGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  const addPlatform = () => {
    // Validation de la plateforme
    if (!newPlatform.trim()) return;

    // Check if the platform already exists (case insensitive)
    if (platforms.some((p) => p.toLowerCase() === newPlatform.toLowerCase())) {
      showToast.error('This platform already exists');
      return;
    }

    // Limit platform length
    if (newPlatform.length > 20) {
      showToast.error('Platform name is too long (max 20 characters)');
      return;
    }

    setPlatforms([...platforms, newPlatform]);
    setNewPlatform('');
  };

  const removePlatform = (platform: string) => {
    setPlatforms(platforms.filter((p) => p !== platform));
  };

  const onSubmit = async (data: GameFormValues) => {
    try {
      // Check that genres and platforms have been added
      if (genres.length === 0) {
        showToast.error('Please add at least one genre');
        return;
      }

      if (platforms.length === 0) {
        showToast.error('Please add at least one platform');
        return;
      }

      // Build the complete game object
      const gameData: Game = {
        id: initialData?.id || Math.floor(Date.now() / 1000),
        gameId: initialData?.gameId || Math.floor(Date.now() / 1000),
        ...data,
        genres,
        platforms,
        coverImage: data.coverImage || getImageUrl(''),
        screenshots: initialData?.screenshots || [],
        rating: initialData?.rating || 0,
      };

      // In a real application, this would make an API request
      console.log('Submitting game data:', gameData);

      showToast.success(
        editMode ? 'Produit mis à jour avec succès' : 'Produit créé avec succès'
      );
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save game:', err);
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
          {editMode ? 'Modifier le Jeu' : 'Ajouter un Jeu'}
        </h1>
        <p className="text-muted-foreground">
          {editMode
            ? 'Modifiez les informations du Jeu'
            : 'Ajoutez un nouveau Jeu au catalogue'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">General information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of the game as it appears in the store.
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
                      placeholder="Enter game description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of the game.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price.amount"
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
                      The base price of the game.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price.currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="EUR" {...field} />
                    </FormControl>
                    <FormDescription>
                      The currency of the game price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price.discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The discount percentage (0-100).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    The release date of the game.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="developer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Developer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter developer name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The developer of the game.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter publisher name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The publisher of the game.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    <span>{genre}</span>
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {genre}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a genre"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addGenre();
                    }
                  }}
                />
                <Button type="button" onClick={addGenre}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add genre</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    <span>{platform}</span>
                    <button
                      type="button"
                      onClick={() => removePlatform(platform)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {platform}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a platform"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addPlatform();
                    }
                  }}
                />
                <Button type="button" onClick={addPlatform}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add platform</span>
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
                          Show this game in the featured section.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isNewRelease"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>New Release</FormLabel>
                        <FormDescription>
                          Show this game in the new releases section.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? editMode
                  ? 'Updating...'
                  : 'Creating...'
                : editMode
                ? 'Update Jeu'
                : 'Create Jeu'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
