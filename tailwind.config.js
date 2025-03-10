import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  safelist: ['border-custom', 'outline-custom'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: { DEFAULT: 'oklch(var(--border))' },
        input: { DEFAULT: 'oklch(var(--input))' },
        ring: { DEFAULT: 'oklch(var(--ring))' },
        background: { DEFAULT: 'oklch(var(--background))' },
        foreground: { DEFAULT: 'oklch(var(--foreground))' },
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
          border: 'oklch(var(--popover-border))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        dialog: {
          DEFAULT: 'oklch(var(--dialog-background))',
          foreground: 'oklch(var(--dialog-foreground))',
        },
        game: {
          primary: 'oklch(var(--game-primary))',
          secondary: 'oklch(var(--game-secondary))',
          accent: 'oklch(var(--game-accent))',
          text: 'oklch(var(--game-text))',
          'text-muted': 'oklch(var(--game-text-muted))',
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))',
        },
        command: {
          DEFAULT: 'oklch(var(--background))',
          foreground: 'oklch(var(--foreground))',
          border: 'oklch(var(--border))',
          input: 'oklch(var(--input))',
          item: {
            DEFAULT: 'oklch(var(--background))',
            selected: 'oklch(var(--accent))',
            'selected-foreground': 'oklch(var(--accent-foreground))',
            hover: 'oklch(var(--accent) / 0.1)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        "zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" }
        },
        "zoom-out": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" }
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" }
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" }
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" }
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-in-out",
        "fade-out": "fade-out 0.2s ease-in-out",
        "zoom-in": "zoom-in 0.2s ease-in-out",
        "zoom-out": "zoom-out 0.2s ease-in-out",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-in-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-in-out",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-in-out",
        "slide-in-from-right": "slide-in-from-right 0.2s ease-in-out"
      }
    },
  },
  plugins: [
    // Plugin pour définir les classes "border-custom" et "outline-custom"
    ({ addUtilities }) => {
      addUtilities({
        '.border-custom': {
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(var(--background), var(--background)), var(--border-gradient)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        },
      });
    },
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
