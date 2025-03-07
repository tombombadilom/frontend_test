import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

interface PWAOptions {
  name: string;
  shortName: string;
  description: string;
  theme_color: string;
  background_color: string;
  display: 'standalone' | 'minimal-ui' | 'fullscreen' | 'browser';
}

export const withPWA = (
  config: UserConfig,
  options: PWAOptions
): UserConfig => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: options.name,
        short_name: options.shortName,
        description: options.description,
        theme_color: options.theme_color,
        background_color: options.background_color,
        display: options.display,
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
});
