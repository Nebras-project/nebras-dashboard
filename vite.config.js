import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Ensure React is properly handled in production builds
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
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
    },
  },
  build: {
    // Target modern browsers for smaller bundle size
    target: 'es2015',

    // Output directory
    outDir: 'dist',

    // Generate source maps for production debugging (optional, can disable for smaller size)
    sourcemap: false,

    // Minification settings
    minify: 'esbuild', // Use esbuild for faster builds (alternative: 'terser')

    // CSS code splitting
    cssCodeSplit: true,

    // Asset handling
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb as base64

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for advanced optimizations
    rollupOptions: {
      // Ensure React is externalized correctly and available
      output: {
        // Use ES modules format for better tree-shaking and modern browser support
        format: 'es',

        // Manual chunk splitting for better caching and parallel loading
        manualChunks: (id) => {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            // CRITICAL: React core must be in its own chunk and load first
            // This ensures React APIs (Children, useLayoutEffect, etc.) are always available
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react/jsx-runtime')
            ) {
              return 'vendor-react-core';
            }

            // React-dependent libraries (must load after vendor-react-core)
            if (
              id.includes('react-error-boundary') ||
              id.includes('react-router') ||
              id.includes('react-redux') ||
              id.includes('react-i18next') ||
              id.includes('react-hook-form') ||
              id.includes('react-icons') ||
              id.includes('react-colorful') ||
              id.includes('@emotion/react') ||
              id.includes('@emotion/styled') ||
              id.includes('@mui/material') ||
              id.includes('@mui/x-data-grid')
            ) {
              return 'vendor-react';
            }

            // Other MUI packages (if any remain)
            if (id.includes('@mui')) {
              return 'vendor-mui';
            }

            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-react-query';
            }

            // Redux (excluding react-redux which is in vendor-react)
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'vendor-redux';
            }

            // i18n packages
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }

            // Other large dependencies
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }

            if (id.includes('dayjs')) {
              return 'vendor-utils';
            }

            // All other node_modules
            return 'vendor-other';
          }

          // Split large feature modules
          if (id.includes('/features/')) {
            const featureMatch = id.match(/\/features\/([^/]+)/);
            if (featureMatch) {
              return `feature-${featureMatch[1]}`;
            }
          }
        },

        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                .replace(/\.[^/.]+$/, '')
            : 'chunk';
          return `assets/js/${facadeModuleId}-[hash].js`;
        },

        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },

        // Entry file names
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-error-boundary',
        'react-router-dom',
        'react-redux',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/x-data-grid',
        '@reduxjs/toolkit',
        '@tanstack/react-query',
      ],
      exclude: ['@tanstack/react-query-devtools'],
    },
    // Ensure proper module resolution for React
    commonjsOptions: {
      include: [/react/, /react-dom/, /react-error-boundary/, /@emotion/, /@mui/, /node_modules/],
    },
  },

  // Performance optimizations
  esbuild: {
    // Drop console and debugger in production builds
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
