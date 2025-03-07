import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';

const socialLinks = [
  { id: 'twitter', icon: <Twitter />, href: '#' },
  { id: 'facebook', icon: <Facebook />, href: '#' },
  { id: 'instagram', icon: <Instagram />, href: '#' },
  { id: 'youtube', icon: <Youtube />, href: '#' },
] as const;

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-lg font-bold">GameShop</h3>
            <p className="text-sm text-muted-foreground">
              Votre destination pour les meilleurs jeux vidéo aux meilleurs
              prix.
            </p>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <RouterLink
                  key={social.id}
                  to={social.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {social.icon}
                </RouterLink>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-bold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              {[
                { path: '/', label: 'Accueil' },
                { path: '/catalog', label: 'Catalogue' },
                { path: '/new-releases', label: 'Nouveautés' },
                { path: '/promotions', label: 'Promotions' },
                { path: '/about', label: 'À propos' },
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <RouterLink
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </RouterLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-bold">Support</h3>
            <ul className="space-y-2 text-sm">
              {[
                { path: '/faq', label: 'FAQ' },
                { path: '/contact', label: 'Contact' },
                { path: '/shipping', label: 'Livraison' },
                { path: '/returns', label: 'Retours' },
                { path: '/terms', label: "Conditions d'utilisation" },
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <RouterLink
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </RouterLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Inscrivez-vous pour recevoir les dernières nouvelles et offres
              spéciales.
            </p>
            <motion.form
              className="flex flex-col space-y-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              />
              <motion.button
                type="submit"
                className="rounded-md bg-game-primary px-3 py-2 text-sm font-medium text-white hover:bg-game-primary/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                S'inscrire
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            &copy; {new Date().getFullYear()} GameShop. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
