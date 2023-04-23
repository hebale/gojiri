import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const date = new Date().getTime();

export default (({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(command, mode/*, env*/);
  
  return defineConfig({
    root: './',
    base: './',
    assetsInclude: ['./src/assets'],
    build: {
      outDir: './public',
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            let extType = assetInfo.name.split('.').at(1);

            if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) extType = 'images';
            if(/ttf|otf|woff|woff2|eot/i.test(extType)) extType = 'fonts';

            switch (extType) {
              case 'css':
                return `assets/${extType}/style.min[extname]`;
              default:
                return `assets/${extType}/[name][extname]`;
            }
          },
          chunkFileNames: `assets/js/script.min.js`,
          entryFileNames: `assets/js/script.min.js`,
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/assets', import.meta.url))
      }
    },
  });
});
