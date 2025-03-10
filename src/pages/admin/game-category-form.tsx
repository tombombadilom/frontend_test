'use client';

import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { z } from 'zod';

interface GameCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  subcategories: {
    id: number;
    name: string;
    description: string;
    icon: string;
  }[];
}

// Validation schema with Zod
const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  description: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères'),
  icon: z
    .string()
    .min(1, 'L\'icône est requise'),
  image: z
    .string()
    .min(1, 'L\'image est requise'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface GameCategoryFormProps {
  editMode?: boolean;
}

export function GameCategoryForm({ editMode = false }: GameCategoryFormProps) {
  const navigate = useNavigate();
  const { id: urlId } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<GameCategory | null>(null);
  const [isLoading, setIsLoading] = useState(editMode);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      image: '',
    },
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (editMode && urlId) {
        try {
          setIsLoading(true);
          const response = await import('@/data/games-categories.json');
          console.log('Loading category with ID:', urlId);
          const categoryId = Number.parseInt(urlId, 10);
          console.log('Parsed category ID:', categoryId);
          const category = response.default.categories.find(c => c.id === categoryId);
          console.log('Found category:', category);
          
          if (category) {
            setInitialData(category);
            
            form.reset({
              name: category.name,
              description: category.description,
              icon: category.icon,
              image: category.image,
            });
          } else {
            console.error('Category not found with ID:', categoryId);
            showToast.error('Catégorie non trouvée');
            navigate('/admin/game-categories');
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la catégorie:', error);
          showToast.error('Erreur lors du chargement de la catégorie');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCategory();
  }, [editMode, urlId, form, navigate]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const categoryData: GameCategory = {
        id: initialData?.id || Math.floor(Date.now() / 1000),
        name: data.name,
        description: data.description,
        icon: data.icon,
        image: data.image,
        subcategories: initialData?.subcategories || [],
      };

      console.log('Données de la catégorie à envoyer:', categoryData);

      showToast.success(
        editMode ? 'Catégorie mise à jour avec succès' : 'Catégorie créée avec succès'
      );
      navigate('/admin/game-categories');
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
          {editMode ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
        </h1>
        <p className="text-muted-foreground">
          {editMode
            ? 'Modifiez les informations de la catégorie'
            : 'Ajoutez une nouvelle catégorie'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le nom de la catégorie" {...field} />
                  </FormControl>
                  <FormDescription>
                    Le nom de la catégorie tel qu'il apparaîtra dans le catalogue.
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
                      placeholder="Entrez la description de la catégorie"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Une description détaillée de la catégorie.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icône</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'icône Lucide" {...field} />
                    </FormControl>
                    <FormDescription>
                      Le nom de l'icône Lucide à utiliser (ex: Sword, Target, etc.).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="URL de l'image" {...field} />
                    </FormControl>
                    <FormDescription>
                      L'URL de l'image d'illustration de la catégorie.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/game-categories')}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? editMode
                  ? 'Mise à jour...'
                  : 'Création...'
                : editMode
                ? 'Mettre à jour'
                : 'Créer'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
} 