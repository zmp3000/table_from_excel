import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths(), viteCompression(), viteCompression()],
  resolve: {
    alias: [
      {find: '@app/', replacement: path.resolve(__dirname, 'src/app')},
      {find: '@widgets/', replacement: path.resolve(__dirname, 'src/widgets')},
      {find: '@shared', replacement: path.resolve(__dirname, 'src/shared')},
      {find: '@features', replacement: path.resolve(__dirname, 'src/features')},
    ]
  },
}));
