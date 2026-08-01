import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built app works from any path, including file://
  // previews and project sub-directories on static hosts.
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    // The seed world is one large data chunk by design. It is code-split out
    // of the entry bundle and only fetched on a first visit, so its size is
    // not a startup cost for returning readers.
    chunkSizeWarningLimit: 2600,
  },
})
