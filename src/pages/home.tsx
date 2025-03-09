import { GameCard } from '@/components/games/game-card';
import { Button } from '@/components/ui/button';
import { useGames } from '@/hooks/use-games';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/use-categories';
import { 
  Swords, 
  Scroll, 
  Crown, 
  Trophy, 
  Cog, 
  Target, 
  Sparkles, 
  Map,
  LayoutGrid
} from 'lucide-react';

const iconMap = {
  Swords,
  Scroll,
  Crown,
  Trophy,
  Cog,
  Target,
  Sparkles,
  Map,
  LayoutGrid
};

export default function HomePage() {
  const { featuredGames, newReleases, isLoading } = useGames();
  const { categories } = useCategories('games');

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background/20 to-background pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-grid-white/10"
        />
        <div className="container relative space-y-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold sm:text-5xl md:text-6xl"
          >
            Découvrez notre{' '}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              collection de jeux
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Explorez notre vaste catalogue de jeux et trouvez votre prochain coup
            de cœur. Des classiques aux dernières sorties, il y en a pour tous les
            goûts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-game-primary text-white hover:bg-game-primary/90"
              >
                Explorer le catalogue
              </Button>
            </Link>
            <Link to="/promotions">
              <Button size="lg" variant="outline">
                Voir les promotions
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="game-section">
        <div className="game-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between"
          >
            <h2 className="text-2xl font-bold md:text-3xl">Jeux à la une</h2>
            <Link
              to="/featured"
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`featured-skeleton-${Date.now()}-${index}`}
                  className="h-[300px] animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="game-section">
        <div className="game-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-2xl font-bold md:text-3xl"
          >
            Catégories populaires
          </motion.h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || iconMap.LayoutGrid;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/catalog?category=${category.name.toLowerCase()}`}
                    className="group relative block overflow-hidden rounded-lg"
                  >
                    <div className="aspect-video">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 group-hover:bg-black/70"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex flex-col items-center gap-2 text-white">
                        <Icon className="h-6 w-6" />
                        <span className="text-lg font-bold">{category.name}</span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="game-section bg-muted/30">
        <div className="game-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between"
          >
            <h2 className="text-2xl font-bold md:text-3xl">Nouveautés</h2>
            <Link
              to="/new-releases"
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`new-releases-skeleton-${Date.now()}-${index}`}
                  className="h-[300px] animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {newReleases.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
