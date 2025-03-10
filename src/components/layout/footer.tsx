import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { navigation } from '@/config/navigation';
import { useAuth } from '@/hooks/use-auth';

const socialLinks = [
  { id: 'twitter', icon: <Twitter />, href: '#' },
  { id: 'facebook', icon: <Facebook />, href: '#' },
  { id: 'instagram', icon: <Instagram />, href: '#' },
  { id: 'youtube', icon: <Youtube />, href: '#' },
] as const;

export function Footer() {
  const { user } = useAuth();

  const publicLinks = navigation.public.map(item => ({
    path: item.path,
    label: item.labelFr
  }));

  const userLinks = user ? navigation.user.map(item => ({
    path: item.path,
    label: item.labelFr
  })) : [];

  const supportLinks = [
    { path: '/contact', label: 'Contact' },
    { path: '/terms', label: "Conditions d'utilisation" },
    { path: '/privacy', label: "Politique de confidentialité" },
  ];

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
            <h3 className="mb-4 text-lg font-bold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {publicLinks.map((link, index) => (
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
            <h3 className="mb-4 text-lg font-bold">Mon Compte</h3>
            <ul className="space-y-2 text-sm">
              {userLinks.map((link, index) => (
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
              {!user && (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <RouterLink
                    to="/login"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Se connecter
                  </RouterLink>
                </motion.li>
              )}
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
              {supportLinks.map((link, index) => (
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
