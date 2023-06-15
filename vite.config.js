import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default (({command, mode}) => {
  // const env = loadEnv(mode, process.cwd(), '');
  console.log(command, mode, fileURLToPath(new URL('./src/', import.meta.url)));

  return defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
      extensions: ['.vue', '.ts'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    assetsInclude: ['./src/assets'],
    server: {
      port: 8080,
    },
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
  });
});
