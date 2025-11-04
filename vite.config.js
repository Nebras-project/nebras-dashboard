import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path aliases
const pathAliases = {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@features': path.resolve(__dirname, './src/features'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@utils': path.resolve(__dirname, './src/utils'),
  '@store': path.resolve(__dirname, './src/store'),
  '@theme': path.resolve(__dirname, './src/theme'),
  '@i18n': path.resolve(__dirname, './src/i18n'),
  '@layout': path.resolve(__dirname, './src/layout'),
  '@config': path.resolve(__dirname, './src/config'),
  '@constants': path.resolve(__dirname, './src/constants'),
  '@services': path.resolve(__dirname, './src/services'),
  '@providers': path.resolve(__dirname, './src/providers'),
  '@data': path.resolve(__dirname, './src/data'),
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: pathAliases,
  },
});
