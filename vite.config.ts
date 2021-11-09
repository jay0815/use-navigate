import { defineConfig } from 'vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    outDir: "lib",
    lib: {
      entry: './src/index.ts',
      name: 'useNavigate',
      fileName: (moduleType) => `index-${moduleType}.js`,
    },
    rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['react'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'React'
          }
        }
    }
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
});
