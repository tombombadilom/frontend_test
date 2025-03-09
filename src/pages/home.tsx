import { GameCard } from '@/components/games/game-card';
import { Button } from '@/components/ui/button';
import { useGames } from '@/hooks/use-games';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { featuredGames, newReleases, isLoading } = useGames();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative z-[1] flex min-h-[500px] items-center justify-center overflow-hidden bg-gradient-to-r from-game-primary/20 to-game-secondary/20">
        <div className="absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container relative z-[1] mx-auto px-4 py-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Découvrez l'univers du gaming
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
          >
            Explorez notre vaste collection de jeux vidéo pour toutes les
            plateformes et plongez dans des aventures extraordinaires.
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
        </motion.div>
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
              to="/catalog"
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
            {[
              'Action',
              'Aventure',
              'RPG',
              'Stratégie',
              'Sport',
              'Simulation',
              'FPS',
              'Indie',
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={`/catalog?category=${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-video bg-muted" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 group-hover:bg-black/70"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg font-bold text-white">
                      {category}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="game-section bg-gradient-to-r from-game-primary/20 to-game-secondary/20">
        <div className="game-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Restez informé
            </h2>
            <p className="mb-6 text-muted-foreground">
              Inscrivez-vous à notre newsletter pour recevoir les dernières
              actualités et offres exclusives.
            </p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 rounded-md border border-input bg-background px-4 py-2"
                required
              />
              <Button
                type="submit"
                className="bg-game-primary text-white hover:bg-game-primary/90"
              >
                S'inscrire
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
