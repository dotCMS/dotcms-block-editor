/// <reference types="vitest" />
import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { join } from 'path';

export default defineConfig({ 
  cacheDir: '../../node_modules/.vite/custom-blocks',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    dts({
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      // Faster builds by skipping tests. Set this to false to enable type checking.
      skipDiagnostics: true,
    }),

    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'custom-blocks',
      fileName: 'custom-blocks',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },
});
