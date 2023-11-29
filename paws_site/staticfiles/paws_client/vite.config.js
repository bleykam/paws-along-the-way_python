import { defineConfig } from 'vite'



// vite root: /home/brittany/PycharmProjects/pythonProject12/paws_site/paws_client
// https://vitejs.dev/config/

export default defineConfig({
 
  mode: 'development',
  plugins: [
    
  ],


  preview:{
    open:true
  },
  build: {
    minify: false,
    manifest :true,
    outDir: "paws_site/paws_client/dist"
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['/../../../..'],
    },

  },
 
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  
})

