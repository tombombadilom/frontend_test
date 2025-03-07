import tailwindcss from '@tailwindcss/vite';
import type { UserConfig } from 'vite';

export const withTailwind = (config: UserConfig): UserConfig => ({
  ...config,
  plugins: [...(config.plugins || []), tailwindcss()],
});
