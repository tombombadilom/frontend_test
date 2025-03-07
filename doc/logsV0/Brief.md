
# Brief v0 – Projet Frontend Test

Ce document décrit l’ensemble des directives pour la version v0 du projet, en respectant les spécifications fonctionnelles, techniques, de design et d’architecture. Il se base notamment sur le fichier [TechnicalSpecifications.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/TechnicalSpecifications.md).

---

## 1. Accès au Repository et Documentation

- **Repository Git :**  
  [https://github.com/tombombadilom/frontend_test.git](https://github.com/tombombadilom/frontend_test.git)

- **Documentation Complète :**  
  - Dossier général : [Documentation du projet](https://github.com/tombombadilom/frontend_test/tree/main/doc)  
  - **Spécifications :**  
    - Fonctionnelles : [FunctionalSpecifications.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/FunctionalSpecifications.md)  
    - Techniques : [TechnicalSpecifications.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/TechnicalSpecifications.md)  
  - **Design :**  
    - Brief design : [DesignBrief.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/DesignBrief.md)  
    - Recommandations design : [DesignRecommendations.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/2-Analysis/DesignRecommendations.md)  
  - **Wireframes :**  
    - [Wireframes.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/1-Design/Wireframes.md)  
  - **Analyse Globale :**  
    - [Analysis.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/Analysis.md)

---

## 2. Technologies, Outils et Versions de la Stack

### Technologies et Outils

- **Environnement de Développement :**
  - **Node.js :** Version 23
  - **pnpm :** Version supérieure à 10.4.1

- **Frameworks & Langages :**
  - **TypeScript** pour un typage fort.
  - **React** (créé avec Vite) pour le développement de l’interface.
  - **Vite** pour le bootstrapping et le bundling.

- **UI & Styling :**
  - **Shadcn Components** pour les composants UI.
  - **Tailwind CSS v4** configuré via des variables CSS.
    - Créer un fichier `index.css` en suivant le [guide theming de Shadcn](https://ui.shadcn.com/docs/theming) pour gérer les thèmes light/dark.
    - Configurer `tailwindcss.config.js` avec l’objet `extend` afin d’adapter les composants aux variables CSS et aux différents breakpoints.
  - Choix de polices modernes et dynamiques (libres) adaptées à l’univers du gaming.

- **Gestion d’État et Hooks :**
  - **Zustand** pour la gestion de la boutique (tri, panier, etc.).
  - **React Context** pour le thème (light/dark) avec persistance via localStorage.
  - Utilisation de hooks personnalisés pour l’API, le store et le switch de thème.

- **Accessibilité :**
  - Implémentation dès le départ des attributs ARIA pour améliorer l’accessibilité.

- **Formulaires et Validation :**
  - **react-hook-form** couplé à **zod** pour la gestion et la validation des formulaires.
  - S’appuyer sur le composant form de Shadcn ([Documentation Form](https://ui.shadcn.com/docs/components/form)).

- **Notifications et UI Additionnelle :**
  - Intégrer **sonner** pour des toast notifications modernes ([Documentation Sonner](https://ui.shadcn.com/docs/components/sonner)).
  - Utiliser les composants **sidebar**, **command**, **aspect-ratio** et **scroll-area** de Shadcn selon les besoins.
  - Intégrer le composant **Skeleton** pour les états de chargement.

- **Animations :**
  - Utiliser [Motion](https://github.com/Motion-Project/motion) en version **4.7.0** pour les animations (à la place de Framer Motion).
  - Employer [Motion Primitives](https://github.com/ibelick/motion-primitives) en version **0.1.0** pour animer les widgets, conformément aux recommandations de l’analyse.

- **Tests & Linter :**
  - **Vitest** pour les tests unitaires et d’intégration.
  - **React Testing Library** et **MSW** pour simuler les interactions avec l’API mockée.
  - **Biome** en version **1.9.4** pour le linting (remplaçant ESLint) avec les commandes appropriées dans le `package.json`.

### Versions des Librairies (selon le package.json et les spécifications techniques)

Voici un aperçu du fichier `package.json` (les versions exactes sont celles à utiliser) :

```json
{
  "name": "test",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "biome check",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.9",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.9",
    "tailwindcss-animate": "^1.0.7",
    "motion": "4.7.0",
    "motion-primitives": "0.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.9",
    "@testing-library/jest-dom": "6.4.2",
    "@testing-library/react": "15.0.6",
    "@testing-library/user-event": "14.5.2",
    "@types/node": "^22.13.9",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react-swc": "^3.8.0",
    "@vitest/coverage-v8": "1.6.0",
    "autoprefixer": "^10.4.20",
    "globals": "^15.15.0",
    "jsdom": "24.0.0",
    "typescript": "~5.7.2",
    "vite": "^6.2.0",
    "vitest": "1.6.0",
    "biome": "1.9.4"
  }
}
```

> **Remarque :** Les versions ci-dessus doivent être vérifiées par rapport aux dernières releases stables au moment de l’implémentation, en particulier pour les composants Shadcn et autres dépendances spécifiques.

---
#### Ecriture du code: 
De façon préferable utilise quand c'est possible les nouvelles fonctions de hooks disponibles depuis react 18 et 19 notamment: 

---

## Hooks de Gestion d'État
- **useState** (React 18)
- **useReducer** (React 18)
- **useOptimistic** (Nouveau React 19)
- **useActionState** (Nouveau React 19)

## Hooks de Cycle de Vie et Effets
- **useEffect** (React 18)
- **useLayoutEffect** (React 18)
- **useInsertionEffect** (React 18)

## Hooks de Contexte
- **useContext** (React 18)
- **useContextSelector** (Nouveau React 19)

## Hooks de Référence
- **useRef** (React 18)
- **useImperativeHandle** (React 18)

## Hooks de Mémoisation et d'Optimisation
- **useMemo** (React 18)
- **useCallback** (React 18)
- **useTransition** (React 18, amélioré dans React 19)
- **useDeferredValue** (React 18, amélioré dans React 19)
- **useSyncExternalStore** (React 18)
- **useEvent** (Nouveau React 19)

## Hooks de Formulaire
- **useFormStatus** (Nouveau React 19)
- **useFormState** (Nouveau React 19)

## Hooks Asynchrones
- **use** (Nouveau React 19)

## Hooks de Débogage
- **useDebugValue** (React 18)
- **useId** (React 18)
---

## 3. Organisation du Projet et Structure de Répertoire

Respecter la structure suivante :

```
src/
├── assets/          # Static assets (images, icônes)
├── components/      # Composants réutilisables
│   ├── ui/          # Composants UI de base
│   ├── shared/      # Composants custom qui utilsent et modifient des componsants shadcn ou totalement from scratch
│   ├── layout/      # Composants de layout
│   ├── display-modes/  # Composants pour modes d'affichage
│   ├── shop/        # Composants spécifiques à la boutique
│   ├── cart/        # Composants liés au panier
│   ├── user/        # Composants liés au profil utilisateur
│   │   ├── profile/     # Composants de profil utilisateur
│   │   ├── auth/        # Composants d'authentification
│   │   ├── orders/      # Composants d'historique des commandes
│   │   └── settings/    # Composants de paramètres utilisateur
│   └── admin/       # Composants d'administration
│       ├── dashboard/   # Tableaux de bord et statistiques
│       ├── products/    # Gestion des produits/jeux
│       ├── orders/      # Gestion des commandes
│       ├── users/       # Gestion des utilisateurs
│       └── settings/    # Paramètres de la boutique
├── context/         # Fournisseurs de React Context
│   ├── shop/        # Contextes liés à la boutique
│   ├── cart/        # Contextes liés au panier
│   ├── user/        # Contextes liés à l'utilisateur
│   └── admin/       # Contextes liés à l'administration
├── data/            # Fichiers JSON de données mock (tables distinctes)
│   ├── products/    # Données des produits/jeux
│   ├── users/       # Données des utilisateurs
│   ├── orders/      # Données des commandes
│   └── stats/       # Données statistiques
├── hooks/           # Hooks React personnalisés
│   ├── shop/        # Hooks liés à la boutique
│   ├── cart/        # Hooks liés au panier
│   ├── user/        # Hooks liés à l'utilisateur
│   └── admin/       # Hooks liés à l'administration
├── lib/             # Fonctions utilitaires
├── pages/           # Composants de pages
│   ├── shop/        # Pages de la boutique
│   ├── cart/        # Pages du panier
│   ├── user/        # Pages utilisateur
│   │   ├── profile/     # Page de profil
│   │   ├── orders/      # Page d'historique des commandes
│   │   ├── wishlist/    # Page de liste de souhaits
│   │   └── settings/    # Page de paramètres
│   └── admin/       # Pages d'administration
│       ├── dashboard/   # Page de tableau de bord
│       ├── products/    # Pages de gestion des produits
│       ├── orders/      # Pages de gestion des commandes
│       ├── users/       # Pages de gestion des utilisateurs
│       └── settings/    # Pages de paramètres
├── routes/          # Définition des routes (public vs authentifié)
│   ├── public/      # Routes publiques
│   ├── user/        # Routes utilisateur authentifié
│   └── admin/       # Routes administrateur
├── store/           # Définition des stores Zustand
│   ├── shop/        # Stores liés à la boutique
│   ├── cart/        # Stores liés au panier
│   ├── user/        # Stores liés à l'utilisateur
│   └── admin/       # Stores liés à l'administration
├── styles/          # Styles globaux et configuration Tailwind CSS
├── types/           # Définition des types TypeScript
│   ├── shop/        # Types liés à la boutique
│   ├── cart/        # Types liés au panier
│   ├── user/        # Types liés à l'utilisateur
│   └── admin/       # Types liés à l'administration
├── tests/           # Utilitaires et configuration pour tests
│   ├── shop/        # Tests de la boutique
│   ├── cart/        # Tests du panier
│   ├── user/        # Tests utilisateur
│   └── admin/       # Tests d'administration
├── services/        # Services d'API et logique métier
│   ├── api/         # Services d'API
│   ├── auth/        # Services d'authentification
│   ├── user/        # Services utilisateur
│   └── admin/       # Services d'administration
├── App.tsx          # Composant principal de l'application
└── main.tsx  
```

- **Lazy Loading :**  
  Utiliser `lazy` from React pour l’import dynamique des composants afin d’optimiser le chargement.

- **Tanstack-query** avec fetch pour le requêtage de l'API  
  Utiliser les fonctions de cache quand c'est nécessaire pour accélérer le chargement des pages.

---

## 4. Design et Thématisation

- **Index.css & Tailwind Config :**
  - Créer un fichier `index.css` en se basant sur le [guide theming de Shadcn](https://ui.shadcn.com/docs/theming) pour définir les variables CSS gérant les thèmes light et dark.
  - Configurer `tailwindcss.config.js` avec l’extension via `extend` pour adapter les composants aux variables CSS et aux breakpoints.

- **Typographie :**
  - Choisir et configurer des polices modernes, dynamiques et libres, en adéquation avec l’univers du gaming (store de jeux vidéo).

- **Inspirations Design :**
  S’inspirer des interfaces et design suivants, en respectant le plus fidèlement possible les préconisations de :  
  [Analysis.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/Analysis.md)
  - [Fortnite Item Shop](https://www.fortnite.com/item-shop?lang=fr)
  - [Genshin Impact Shop](https://genshin-impact.fandom.com/wiki/Shop)
  - [World of Warcraft Shop](https://us.shop.battle.net/fr-fr/family/world-of-warcraft)

- **Wireframes & Recommandations :**
  - Respecter les wireframes fournis ([Wireframes.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/1-Design/Wireframes.md)).
  - Suivre les recommandations d’analyse pour obtenir une interface moderne, intuitive et accessible.

---

## 5. Composants et Fonctionnalités UI

- **Formulaires :**
  - Utiliser **react-hook-form** et **zod** pour la gestion/validation des formulaires, en se basant sur le composant form de Shadcn ([Documentation Form](https://ui.shadcn.com/docs/components/form)).

- **Notifications :**
  - Intégrer **sonner** pour des toast notifications modernes ([Documentation Sonner](https://ui.shadcn.com/docs/components/sonner)).

- **Navigation & Sidebars :**
  - Employer les composants **sidebar** et **command** de Shadcn pour la navigation et la gestion des raccourcis clavier.
  - Utiliser **aspect-ratio** et **scroll-area** si nécessaire ([Aspect Ratio](https://ui.shadcn.com/docs/components/aspect-ratio) / [Scroll-Area](https://ui.shadcn.com/docs/components/scroll-area)).

- **Skeleton Loading :**
  - Mettre en place le composant **Skeleton** de Shadcn pour afficher des espaces réservés pendant le chargement des composants.

- **Animations :**
  - Utiliser **Motion** (v4.7.0) et **Motion Primitives** (v0.1.0) pour dynamiser l’interface conformément aux recommandations de l’analyse.

---

## 6. Linter, Tests et Configuration

- **Linter :**
  - Utiliser **Biome** (v1.9.4) pour le linting du code.  
  - Adapter le script de lint dans le `package.json` (exemple : `"lint": "biome check"`).

- **Tests :**
  - **Tests Unitaires :**
    - Vérifier chaque composant et fonction isolément (gestion du chargement, des erreurs, affichage des données, etc.).
  - **Tests d’Intégration :**
    - Simuler les interactions avec l’API mockée en utilisant React Testing Library et MSW ou des fonctions de Vitest, en couvrant les états « chargement », « succès » et « erreur ».
  - **Organisation :**
    - Placer les tests dans un répertoire `___tests___` à côté des fichiers testés.
  - **Vitest :**
    - Configurer Vitest avec son fichier de configuration dédié.

---

## 7. Routage

- Créer un fichier dédié `Routes.tsx` à la racine de `src` ou dans un répertoire `routes`.
- Organiser les routes en distinguant clairement :
  - Les routes **publiques**
  - Les routes **authentifiées**

---

## 8. Livrables et Checklist Finale

- **Structure du Projet :** Respecter scrupuleusement la structure de répertoire indiquée.
- **Composants Shadcn & Thématisation :** Configurer et utiliser correctement les composants Shadcn et Tailwind CSS 4 (gestion des thèmes light/dark via des variables CSS et des code couleurs oklch).
- **Mock Data :** Stocker les données dans des fichiers JSON dans `src/data`, simulant des tables distinctes.
- **Lazy Loading :** Utiliser `lazy` from React pour l’import dynamique des composants.
- **Tests & Linter :** Intégrer les tests unitaires et d’intégration et configurer Biome (v1.9.4) via les scripts du `package.json`.
- **Animations :** Mettre en place les animations via Motion (v4.7.0) et Motion Primitives (v0.1.0) selon les recommandations.
- **Documentation des Todos :** Se référer au [README des Todos](https://github.com/tombombadilom/frontend_test/blob/main/doc/4-Todo/README.md) pour la liste complète des fonctionnalités à livrer.

---

## 9. Rappel des Liens Citations

- **Repository Git :**  
  [https://github.com/tombombadilom/frontend_test.git](https://github.com/tombombadilom/frontend_test.git)
- **Documentation Générale :**  
  [https://github.com/tombombadilom/frontend_test/tree/main/doc](https://github.com/tombombadilom/frontend_test/tree/main/doc)
- **FunctionalSpecifications.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/FunctionalSpecifications.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/FunctionalSpecifications.md)
- **TechnicalSpecifications.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/TechnicalSpecifications.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/3-Specifications/TechnicalSpecifications.md)
- **DesignBrief.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/DesignBrief.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/DesignBrief.md)
- **DesignRecommendations.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/2-Analysis/DesignRecommendations.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/2-Analysis/DesignRecommendations.md)
- **Wireframes.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/1-Design/Wireframes.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/1-Design/Wireframes.md)
- **Analysis.md :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/Analysis.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/Analysis.md)
- **README des Todos :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/4-Todo/README.md](https://github.com/tombombadilom/frontend_test/blob/main/doc/4-Todo/README.md)
- **Guide Theming Shadcn :**  
  [https://ui.shadcn.com/docs/theming](https://ui.shadcn.com/docs/theming)
- **Documentation Form Shadcn :**  
  [https://ui.shadcn.com/docs/components/form](https://ui.shadcn.com/docs/components/form)
- **Documentation Sonner :**  
  [https://ui.shadcn.com/docs/components/sonner](https://ui.shadcn.com/docs/components/sonner)
- **Documentation Sidebar Shadcn :**  
  [https://ui.shadcn.com/docs/components/sidebar](https://ui.shadcn.com/docs/components/sidebar)
- **Documentation Aspect Ratio Shadcn :**  
  [https://ui.shadcn.com/docs/components/aspect-ratio](https://ui.shadcn.com/docs/components/aspect-ratio)
- **Documentation Command Shadcn :**  
  [https://ui.shadcn.com/docs/components/command](https://ui.shadcn.com/docs/components/command)
- **Documentation Scroll-Area Shadcn :**  
  [https://ui.shadcn.com/docs/components/scroll-area](https://ui.shadcn.com/docs/components/scroll-area)
- **Motion (Animations) :**  
  [https://github.com/Motion-Project/motion](https://github.com/Motion-Project/motion)
- **Motion Primitives :**  
  [https://github.com/ibelick/motion-primitives](https://github.com/ibelick/motion-primitives)
- **Analyse Animation & Navigation :**  
  [https://github.com/tombombadilom/frontend_test/blob/main/doc/2-Analysis/AnimationAndNavigationAnalysis.md#recommendations-for-our-interface](https://github.com/tombombadilom/frontend_test/blob/main/doc/2-Analysis/AnimationAndNavigationAnalysis.md#recommendations-for-our-interface)
- **Exemples d'interfaces inspirantes :**
  - [Fortnite Item Shop](https://www.fortnite.com/item-shop?lang=fr)
  - [Genshin Impact Shop](https://genshin-impact.fandom.com/wiki/Shop)
  - [World of Warcraft Shop](https://us.shop.battle.net/fr-fr/family/world-of-warcraft)

---

## 10 - Interface d'administration de la boutique et partie myUser

### Admin boutique

- Rajoute une partie admin avec **seulement les interfaces et les formulaires** pour faire la saisie du catalog, des catégories et de tous les champs nécessaires à l'administration de la boutique.
- On doit pouvoir décider du placement des produits dans les listes par **drag and drop**.
- Même chose pour les catégories ou liste de jeux.
- Ajoute un menu d'admin séparé du reste.
- Place cela dans un répertoire dédié.
- Utilise un routage sécurisé (qui requiert authentification) partout où c'est nécessaire.

### MyUser

- Ajoute les tests comme pour les autres interfaces.
- Intègre les formulaires d'inscription des clients : **Login, Register, Logout, ForgotPassword**, etc.
- Crée la page de préférence client.
- Crée la page du profil : **settings, avatar, adresse, mode de paiement, historique des paiements et des factures**, ainsi que **promotions, avantages clients**.
- Identifie bien les mockups en lisant la page de Brief et la page distante qui définit les interfaces d'admin en mockup.
- Recrée les interfaces avec les libs mentionnées dans le Brief en faisant bien attention à la sécurité et aux schémas de zod.

### A la fin de ton travail

- Vérifie les versions des paquets dans **package.json** :  
  Tu dois avoir exactement les versions spécifiées (react 19, tailwindcss 4, react-router-dom 6.2, vite 6.2, …).
- Vérifie que **tous les fichiers de config** (Biome, tailwindcss, postcss, vite.config, tsconfig.*) existent et sont corrects.
- Vérifie que toutes les pages et composants nécessaires, demandés ou mentionnés dans le Brief et les Mockup, ont été créés et proprement implémentés dans le routage et les menus.
- Vérifie que les feuilles de style, **index.css** et **tailwindcss.config.js**, utilisent **oklch** et des variables CSS.
- Vérifie que les animations ont été ajoutées dans toutes les pages et composants tels que définis dans le Brief avec les librairies demandées.
- Vérifie que le layout d'admin existe :  
  --- Que tous les formulaires existent  
  --- Que les interfaces suivent les instructions de la page Wireframe mentionnée dans le Brief.
- Vérifie que les tests existent :
  -- Pour tous les composants et pages.
  -- Qu'ils correspondent à ce qui a été spécifié.
  -- Qu'ils ont bien été stockés dans des répertoires `___tests___` à côté des fichiers testés et qu'ils suivent les règles de nommage en usage.

---

Voici une todo list prioritaire pour la version v0, organisée étape par étape :

1. **Configuration Initiale**  
   - Mettre à jour et vérifier tous les fichiers de configuration :  
     - `package.json` (assurer les versions exactes : React 19, Tailwind CSS 4, Vite 6.2, etc.)
     - Fichiers de config pour Biome, Vitest, Tailwind CSS, PostCSS, tsconfig, et `vite.config.js`
   - Valider la présence et la conformité des fichiers de configuration (Biome, tailwind.config.js, postcss.config.js, tsconfig.*, etc.)

2. **Mise en Place des Thèmes et du Style Global**  
   - Créer le fichier `index.css` en suivant le guide theming de Shadcn pour définir les variables CSS (thèmes light/dark)  
   - Configurer `tailwindcss.config.js` avec l’objet `extend` et s’assurer de l’utilisation d’oklch et des variables CSS

3. **Architecture du Projet et Organisation des Répertoires**  
   - Organiser l’arborescence du dossier `src/` selon les directives (assets, components, context, data, hooks, lib, pages, routes, store, styles, types, tests)  
   - Mettre en place le lazy loading (React.lazy) pour l’import dynamique des composants

4. **Création des Layouts**  
   - **Layout Grand Public**  
     - Développer le layout pour la partie publique du site  
   - **Layouts Sécurisés (Authentification Requise)**  
     - Créer le layout pour l’**Admin de la Boutique**  
       - Intégrer un menu d’admin distinct et prévoir l’interface de saisie (catalogue, catégories, drag and drop pour le placement des produits)
     - Créer le layout pour **MyUser**  
       - Prévoir les pages : inscription, login, logout, forgot password, profil, préférences, gestion du mode de paiement, historique, promotions, etc.

5. **Mise en Place du Routage**  
   - Créer le fichier `Routes.tsx` (ou un répertoire `routes`)  
   - Organiser les routes en distinguant :  
     - Les routes publiques  
     - Les routes nécessitant une authentification (Admin et MyUser)

6. **Développement des Interfaces et Composants**  
   - **Partie Publique**  
     - Créer les composants et interfaces pour la partie publique (pages principales, navigation, etc.)
   - **Partie Sécurisée**  
     - Développer les interfaces et formulaires pour l’admin de la boutique et la partie MyUser  
     - Intégrer les fonctionnalités de drag and drop pour le classement des produits et catégories

7. **Gestion de l’État et Intégration d’API**  
   - Mettre en place Zustand pour le store (panier, tri, etc.)  
   - Implémenter React Context pour la gestion du thème (avec persistance dans localStorage)  
   - Intégrer Tanstack-query pour le requêtage de l’API et l’utilisation de fonctions de cache

8. **Implémentation des Animations et Interactions**  
   - Intégrer Motion (v4.7.0) et Motion Primitives (v0.1.0) pour animer les composants et widgets conformément aux recommandations

9. **Ajout des Tests**  
   - Rédiger des tests unitaires et d’intégration avec Vitest et React Testing Library  
   - Simuler les interactions avec l’API mockée via MSW  
   - Organiser les tests dans des répertoires `___tests___` placés à côté des fichiers testés et respecter les règles de nommage

10. **Vérification Finale et Conformité**  
    - Repasser en revue l’ensemble du projet pour vérifier que :  
      - Toutes les versions des paquets (dans package.json) sont conformes  
      - Tous les fichiers de configuration existent et sont corrects  
      - Les layouts, le routage et les composants (publics et sécurisés) sont implémentés selon le brief et les wireframes  
      - Les animations, le theming et la gestion des états fonctionnent comme prévu  
      - Les tests couvrent tous les composants et interfaces

Cette todo list vous permettra d’aborder le projet par étapes, en priorisant d’abord l’infrastructure de base puis les interfaces et la vérification finale.

## Conclusion

Ce brief synthétise l’ensemble des directives pour réaliser la version v0 du projet. Il est impératif de suivre précisément les indications concernant la configuration, le design, le routage, le linting (avec Biome), les tests et l’architecture afin d’assurer une implémentation moderne, cohérente et évolutive pour le store de jeux vidéo.

> **Note :** Vérifiez toujours que les versions utilisées correspondent aux dernières releases et aux spécifications du projet.

---

```
*N’hésitez pas à consulter chacun des liens ci-dessus pour plus de détails et à vous assurer que toutes les recommandations sont respectées lors du développement.*
```