import { defineConfig } from 'vite'



// vite root: /home/brittany/PycharmProjects/pythonProject12/paws_site/paws_client
// https://vitejs.dev/config/

export default defineConfig({
 
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  
})

