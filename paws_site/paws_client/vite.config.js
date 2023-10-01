import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir:'home/brittany/PycharmProjects/Paws-react-vite/paws_site/paws-along-the-way-vite-client/dist',
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  
})


