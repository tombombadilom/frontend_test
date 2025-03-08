'use client';

import { SortableList } from '@/components/shared/sortable-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/category';
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { showToast } from '@/lib/toast';
import type { SortableItem } from '@/components/shared/sortable-list';
import { useCategories } from '@/hooks/useCategories';

export default function CategoriesPage() {
  const { categories, isLoading, addCategory, updateCategory, deleteCategory, reorderCategories } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    if (categories.some((c) => c.name.toLowerCase() === newCategory.toLowerCase())) {
      showToast.error('This category already exists');
      return;
    }

    if (newCategory.length > 50) {
      showToast.error('Category name is too long (max 50 characters)');
      return;
    }

    try {
      await addCategory({
        name: newCategory,
        description: '',
        gameId: 'all',
        order: categories.length + 1,
        isActive: true,
        subcategories: []
      });
      setNewCategory('');
      showToast.success('Category added successfully');
    } catch (_error) {
      showToast.error('Failed to add category');
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    try {
      await updateCategory(category.id, category);
      setEditingCategory(null);
      showToast.success('Category updated successfully');
    } catch (_error) {
      showToast.error('Failed to update category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      showToast.success('Category deleted successfully');
    } catch (_error) {
      showToast.error('Failed to delete category');
    }
  };

  const handleReorderCategories = async (items: SortableItem<Category, number>[]) => {
    try {
      await reorderCategories(items.map(item => item.id));
      showToast.success('Categories reordered successfully');
    } catch (_error) {
      showToast.error('Failed to reorder categories');
    }
  };

  const sortableItems: SortableItem<Category, number>[] = categories.map((category) => ({
    id: category.id,
    data: category,
    content: (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingCategory(category)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </motion.div>
        </div>
      </div>
    ),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-2"
      >
        <Input
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="max-w-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCategory();
            }
          }}
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`category-skeleton-${Date.now()}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="mb-4 text-lg font-medium">
            Drag and drop to reorder
          </h2>
          <SortableList<Category, number>
            items={sortableItems}
            onReorder={handleReorderCategories}
            renderItem={(category) => (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {editingCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg"
            >
              <h2 className="mb-4 text-xl font-bold">Edit category</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="edit-name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="edit-description"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleUpdateCategory(editingCategory)}>
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
