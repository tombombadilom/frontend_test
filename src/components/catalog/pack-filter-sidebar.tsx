'use client';

import type React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { usePackFilterStore } from '@/store/filter-store';
import type { Price } from '@/types/game';

interface PackFilterSidebarProps {
  games: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  types: Array<{
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

export function PackFilterSidebar({ 
  games,
  types,
  platforms,
  maxPrice,
  discountedCount,
  newReleasesCount,
}: PackFilterSidebarProps) {
  const {
    games: selectedGames,
    types: selectedTypes,
    platforms: selectedPlatforms,
    priceRange,
    onlyDiscounted,
    onlyNewReleases,
    toggleGame,
    toggleType,
    togglePlatform,
    setPriceRange,
    toggleDiscounted,
    toggleNewReleases,
  } = usePackFilterStore();

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Prix</SidebarGroupLabel>
        <SidebarGroupContent>
          <Slider
            min={0}
            max={maxPrice.amount}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
          <div className="flex items-center justify-between mt-4">
            <Badge variant="outline" className="text-xs font-medium">
              {priceRange[0]} €
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              {priceRange[1]} €
            </Badge>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {games.filter(game => game.count > 0).length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Jeux</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {games
                .filter(game => game.count > 0)
                .map(game => (
                  <SidebarMenuItem key={game.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={game.id}
                          checked={selectedGames.includes(game.id)}
                          onCheckedChange={() => toggleGame(game.id)}
                        />
                        <label htmlFor={game.id}>
                          {game.name}
                        </label>
                      </div>
                      <Badge variant="secondary">
                        {game.count}
                      </Badge>
                    </div>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {types.filter(type => type.count > 0).length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {types
                .filter(type => type.count > 0)
                .map(type => (
                  <SidebarMenuItem key={type.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={() => toggleType(type.id)}
                        />
                        <label htmlFor={type.id}>
                          {type.name}
                        </label>
                      </div>
                      <Badge variant="secondary">
                        {type.count}
                      </Badge>
                    </div>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {platforms.filter(platform => platform.count > 0).length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Plateformes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms
                .filter(platform => platform.count > 0)
                .map(platform => (
                  <SidebarMenuItem key={platform.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={platform.id}
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => togglePlatform(platform.id)}
                        />
                        <label htmlFor={platform.id}>
                          {platform.name}
                        </label>
                      </div>
                      <Badge variant="secondary">
                        {platform.count}
                      </Badge>
                    </div>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {(discountedCount > 0 || newReleasesCount > 0) && (
        <SidebarGroup>
          <SidebarGroupLabel>Autres filtres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discountedCount > 0 && (
                <SidebarMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="discounted"
                        checked={onlyDiscounted}
                        onCheckedChange={toggleDiscounted}
                      />
                      <label htmlFor="discounted">
                        En promotion
                      </label>
                    </div>
                    <Badge variant="secondary">
                      {discountedCount}
                    </Badge>
                  </div>
                </SidebarMenuItem>
              )}
              {newReleasesCount > 0 && (
                <SidebarMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="newReleases"
                        checked={onlyNewReleases}
                        onCheckedChange={toggleNewReleases}
                      />
                      <label htmlFor="newReleases">
                        Nouveautés
                      </label>
                    </div>
                    <Badge variant="secondary">
                      {newReleasesCount}
                    </Badge>
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
} 