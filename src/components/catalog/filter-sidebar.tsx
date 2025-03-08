'use client';

import type React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFilterStore } from '@/store/filter-store';
import type { Price } from '@/types/game';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  platforms: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  maxPrice: Price;
  discountedCount: number;
  newReleasesCount: number;
}

export function FilterSidebar({ 
  categories,
  platforms,
  maxPrice,
  discountedCount,
  newReleasesCount,
  ...props 
}: FilterSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const {
    categories: selectedCategories,
    platforms: selectedPlatforms,
    priceRange,
    onlyDiscounted,
    onlyNewReleases,
    toggleCategory,
    togglePlatform,
    setPriceRange,
    toggleDiscounted,
    toggleNewReleases,
    resetFilters,
  } = useFilterStore();

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <div className="space-y-6 px-4 pt-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Prix</h3>
            <div className="space-y-3">
              <Slider
                min={0}
                max={maxPrice.amount}
                step={1}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-medium">
                  {priceRange[0]} €
                </Badge>
                <Badge variant="outline" className="text-xs font-medium">
                  {priceRange[1]} €
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {categories.filter(category => category.count > 0).length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium">Catégories</h3>
              <div className="space-y-2">
                {categories
                  .filter(category => category.count > 0)
                  .map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name} ({category.count})
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {platforms.filter(platform => platform.count > 0).length > 0 && (
            <>
              <div>
                <h3 className="mb-3 text-sm font-medium">Plateformes</h3>
                <div className="space-y-2">
                  {platforms
                    .filter(platform => platform.count > 0)
                    .map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between group hover:bg-muted/50 rounded-lg p-2 transition-colors">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={platform.id}
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={() => togglePlatform(platform.id)}
                          />
                          <label
                            htmlFor={platform.id}
                            className={cn(
                              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                              selectedPlatforms.includes(platform.id) && "text-primary"
                            )}
                          >
                            {platform.name}
                          </label>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="opacity-60 group-hover:opacity-100"
                        >
                          {platform.count}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>

              <Separator className="my-4" />
            </>
          )}

          {(discountedCount > 0 || newReleasesCount > 0) && (
            <>
              <div>
                <h3 className="mb-3 text-sm font-medium">Autres filtres</h3>
                <div className="space-y-2">
                  {discountedCount > 0 && (
                    <div className="flex items-center justify-between group hover:bg-muted/50 rounded-lg p-2 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="discounted"
                          checked={onlyDiscounted}
                          onCheckedChange={toggleDiscounted}
                        />
                        <label
                          htmlFor="discounted"
                          className={cn(
                            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                            onlyDiscounted && "text-primary"
                          )}
                        >
                          En promotion
                        </label>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="opacity-60 group-hover:opacity-100"
                      >
                        {discountedCount}
                      </Badge>
                    </div>
                  )}
                  {newReleasesCount > 0 && (
                    <div className="flex items-center justify-between group hover:bg-muted/50 rounded-lg p-2 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newReleases"
                          checked={onlyNewReleases}
                          onCheckedChange={toggleNewReleases}
                        />
                        <label
                          htmlFor="newReleases"
                          className={cn(
                            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                            onlyNewReleases && "text-primary"
                          )}
                        >
                          Nouveautés
                        </label>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="opacity-60 group-hover:opacity-100"
                      >
                        {newReleasesCount}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />
            </>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
