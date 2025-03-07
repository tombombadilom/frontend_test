import { type UserConfig, defineConfig } from 'vite';
import { baseConfig } from './base.config';
import { withTailwind } from './tailwind.config';

interface ProjectOptions {
  pwa?: boolean;
  pwaOptions?: {
    name: string;
    shortName: string;
    description: string;
    theme_color: string;
    background_color: string;
    display: 'standalone' | 'minimal-ui' | 'fullscreen' | 'browser';
  };
}

export const createViteConfig = async (
  options: ProjectOptions = {}
): Promise<UserConfig> => {
  let config = baseConfig;

  config = withTailwind(config);

  if (options.pwa && options.pwaOptions) {
    const { withPWA } = await import('./pwa.config');
    config = withPWA(config, options.pwaOptions);
  }

  return defineConfig(config);
};
