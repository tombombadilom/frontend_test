import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import type { UserConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const baseConfig: UserConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../../src'),
    },
  },
};
