'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useFilterStore } from '@/store/filter-store';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface FilterSidebarProps {
  categories: string[];
  platforms: string[];
  maxPrice: number;
}

export function FilterSidebar({
  categories,
  platforms,
  maxPrice,
}: FilterSidebarProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filters = useFilterStore();

  const handlePriceChange = (value: number[]) => {
    filters.setPriceRange([0, value[0]]);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="mb-4 flex md:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Desktop sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sticky top-20 hidden w-64 space-y-6 md:block"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres</h3>
            <Button variant="ghost" size="sm" onClick={filters.resetFilters}>
              Réinitialiser
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Prix</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[maxPrice]}
                  max={maxPrice}
                  step={1}
                  value={[filters.priceRange[1]]}
                  onValueChange={handlePriceChange}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>0 €</span>
                  <span>{filters.priceRange[1]} €</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Catégories</h4>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(
                        category.toLowerCase()
                      )}
                      onCheckedChange={() =>
                        filters.toggleCategory(category.toLowerCase())
                      }
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Plateformes</h4>
              <div className="space-y-1">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform}`}
                      checked={filters.platforms.includes(
                        platform.toLowerCase()
                      )}
                      onCheckedChange={() =>
                        filters.togglePlatform(platform.toLowerCase())
                      }
                    />
                    <label
                      htmlFor={`platform-${platform}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Options</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="discounted"
                    checked={filters.onlyDiscounted}
                    onCheckedChange={() => filters.toggleDiscounted()}
                  />
                  <label
                    htmlFor="discounted"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    En promotion
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new-releases"
                    checked={filters.onlyNewReleases}
                    onCheckedChange={() => filters.toggleNewReleases()}
                  />
                  <label
                    htmlFor="new-releases"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nouveautés
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile filter sidebar */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 md:hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="h-[85vh] w-full rounded-t-lg bg-background p-4"
          >
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <h3 className="text-lg font-medium">Filtres</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={filters.resetFilters}
                >
                  Réinitialiser
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="h-[calc(85vh-4rem)] overflow-y-auto pb-20">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Prix</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[maxPrice]}
                      max={maxPrice}
                      step={1}
                      value={[filters.priceRange[1]]}
                      onValueChange={handlePriceChange}
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>0 €</span>
                      <span>{filters.priceRange[1]} €</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Catégories</h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`mobile-category-${category}`}
                          checked={filters.categories.includes(
                            category.toLowerCase()
                          )}
                          onCheckedChange={() =>
                            filters.toggleCategory(category.toLowerCase())
                          }
                        />
                        <label
                          htmlFor={`mobile-category-${category}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Plateformes</h4>
                  <div className="space-y-1">
                    {platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`mobile-platform-${platform}`}
                          checked={filters.platforms.includes(
                            platform.toLowerCase()
                          )}
                          onCheckedChange={() =>
                            filters.togglePlatform(platform.toLowerCase())
                          }
                        />
                        <label
                          htmlFor={`mobile-platform-${platform}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Options</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-discounted"
                        checked={filters.onlyDiscounted}
                        onCheckedChange={() => filters.toggleDiscounted()}
                      />
                      <label
                        htmlFor="mobile-discounted"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        En promotion
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-new-releases"
                        checked={filters.onlyNewReleases}
                        onCheckedChange={() => filters.toggleNewReleases()}
                      />
                      <label
                        htmlFor="mobile-new-releases"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nouveautés
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
              <Button
                className="w-full"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Appliquer les filtres
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
