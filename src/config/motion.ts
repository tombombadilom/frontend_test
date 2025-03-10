// Configuration pour les animations et effets de motion-primitives
export const motionConfig = {
  // Configuration Tilt
  tilt: {
    rotationFactor: 15,
    scale: 1.02,
    springOptions: {
      stiffness: 300,
      damping: 30
    }
  },

  // Configuration Spotlight
  spotlight: {
    fill: "oklch(var(--game-primary))",
    position: {
      default: "-top-32 left-0",
      md: "md:-top-32 md:left-12"
    }
  },

  // Configuration des transitions de base
  transitions: {
    entry: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    hover: {
      scale: 1.05,
      duration: 0.3
    },
    tap: {
      scale: 0.95
    }
  },

  // Configuration des boutons
  buttons: {
    hover: {
      scale: 1.1,
      duration: 0.2
    },
    tap: {
      scale: 0.9
    }
  },

  // Configuration des sections
  sections: {
    header: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 }
    },
    grid: {
      item: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: (index: number) => ({ 
          duration: 0.5, 
          delay: index * 0.1 
        })
      }
    }
  },

  // Configuration des cartes
  cards: {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 30
      },
      hover: { y: -5 }
    },
    image: {
      hover: { scale: 1.05 },
      transition: { duration: 0.3 }
    }
  }
} as const; 