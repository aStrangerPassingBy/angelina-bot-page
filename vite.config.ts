import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from 'vite-plugin-electron'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(), 
//     vueJsx(),
//     electron({
//       entry: 'electron/index.ts',
//       vite: {
//         build: {
//           rollupOptions: {
//             external: [
//               'serialport',
//               'sqlite3',
//             ],
//           },
//         },
//       },
//     })
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig((config) => {
  // const env = loadEnv(config.mode, process.cwd(), '');
  // console.log(config, env);

  switch(config.mode) {
    case 'electron':
      return {
        plugins: [
          vue(), 
          vueJsx(),
          electron({
            entry: 'electron/index.ts',
            vite: {
              build: {
                rollupOptions: {
                  external: [
                    'serialport',
                    'sqlite3',
                  ],
                },
              },
            },
          }),
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ],
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          }
        },
      }
    case 'browser':
    default: 
      return {
        plugins: [
          vue(), 
          vueJsx(),
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ],
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          }
        },
        server: {
          open: true
        }
      }
  }
})
