import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default (({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(command, mode, env);
  
  return defineConfig({    
    // root: 'src/',
    // base: './',
    // assetsInclude: ['./assets'],
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  });
});





