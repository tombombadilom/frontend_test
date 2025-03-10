import { 
  Home, 
  BookOpen, 
  Package, 
  Sparkles, 
  Tag, 
  User, 
  ShoppingBag, 
  Heart, 
  Settings,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FolderTree,
  Folder,
  Boxes,
  BoxesIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavigationItem = {
  path: string;
  labelFr: string;
  labelEn: string;
  icon: LucideIcon;
};

export type MenuConfig = {
  public: NavigationItem[];
  user: NavigationItem[];
  admin: NavigationItem[];
};

export const navigation: MenuConfig = {
  public: [
    { path: '/', labelFr: 'Accueil', labelEn: 'Home', icon: Home },
    { path: '/games', labelFr: 'Jeux', labelEn: 'Games', icon: BookOpen },
    { path: '/packs', labelFr: 'Packs', labelEn: 'Packs', icon: Package },
    { path: '/objects', labelFr: 'Objets', labelEn: 'Objects', icon: Sparkles },
  ],
  user: [
    { path: '/user', labelFr: 'Mon Profil', labelEn: 'My Profile', icon: User },
    { path: '/user/orders', labelFr: 'Mes Commandes', labelEn: 'My Orders', icon: ShoppingBag },
    { path: '/user/wishlist', labelFr: 'Liste de Souhaits', labelEn: 'Wishlist', icon: Heart },
    { path: '/user/settings', labelFr: 'Paramètres', labelEn: 'Settings', icon: Settings },
  ],
  admin: [
    { path: '/admin', labelFr: 'Tableau de Bord', labelEn: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/games', labelFr: 'Jeux', labelEn: 'Games', icon: BookOpen },
    { path: '/admin/packs', labelFr: 'Packs', labelEn: 'Packs', icon: Package },
    { path: '/admin/objects', labelFr: 'Objets', labelEn: 'Objects', icon: Sparkles },
    { path: '/admin/categories', labelFr: 'Catégories', labelEn: 'Categories', icon: FolderTree },
    { path: '/admin/game-categories', labelFr: 'Catégories de jeux', labelEn: 'Game Categories', icon: Folder },
    { path: '/admin/pack-categories', labelFr: 'Catégories de packs', labelEn: 'Pack Categories', icon: Boxes },
    { path: '/admin/object-categories', labelFr: 'Catégories d\'objets', labelEn: 'Object Categories', icon: BoxesIcon },
    { path: '/admin/orders', labelFr: 'Commandes', labelEn: 'Orders', icon: ShoppingCart },
    { path: '/admin/settings', labelFr: 'Paramètres', labelEn: 'Settings', icon: Settings },
  ],
}; 