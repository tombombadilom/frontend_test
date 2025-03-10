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
import type { Category } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { z } from 'zod';

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
  gameId: z.string().min(1, 'Le jeu est requis'),
  order: z.number().min(0, 'L\'ordre doit être un nombre positif'),
  isActive: z.boolean().default(true),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  editMode?: boolean;
}

export function CategoryFormPage({ editMode = false }: CategoryFormProps) {
  const navigate = useNavigate();
  const { id: urlId } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(editMode);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      gameId: '',
      order: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (editMode && urlId) {
        try {
          setIsLoading(true);
          const response = await import('@/data/categories.json');
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
              gameId: category.gameId,
              order: category.order,
              isActive: category.isActive,
            });
          } else {
            console.error('Category not found with ID:', categoryId);
            showToast.error('Catégorie non trouvée');
            navigate('/admin/categories');
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
      const categoryData: Category = {
        id: initialData?.id || Math.floor(Date.now() / 1000),
        name: data.name,
        description: data.description,
        gameId: data.gameId,
        order: data.order,
        isActive: data.isActive,
        subcategories: initialData?.subcategories || [],
      };

      console.log('Données de la catégorie à envoyer:', categoryData);

      showToast.success(
        editMode ? 'Catégorie mise à jour avec succès' : 'Catégorie créée avec succès'
      );
      navigate('/admin/categories');
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
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jeu</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ID du jeu"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      L'identifiant du jeu auquel appartient cette catégorie.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordre</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ordre d'affichage"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormDescription>
                      L'ordre d'affichage de la catégorie.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      Cette catégorie est-elle actuellement active ?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/categories')}
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