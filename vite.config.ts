import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages project sites, build with BASE_PATH=/TalkQuest/
  base: process.env.BASE_PATH || '/',
  build: {
    sourcemap: 'hidden',
  },
  plugins: [react({
    babel: {
      plugins: [
        'react-dev-locator',
      ],
    },
  }), tsconfigPaths(), cloudflare()],
})