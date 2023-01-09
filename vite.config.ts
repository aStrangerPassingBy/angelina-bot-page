import { rmSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import electron from 'vite-plugin-electron'

// 清空打包目录
rmSync('dist-electron', { recursive: true, force: true });

export default defineConfig(() => {

  return {
    base: './',
    plugins: [
      vue(), 
      vueJsx(),
      electron([
        {
          entry: 'electron/index.ts',
          onstart(options) {
            options.startup()
          },
          vite: {
            build: {
              outDir: 'dist-electron'
            }
          }
        },
        {
          entry: 'electron/preload.ts',
          onstart(options) {
            // console.log('options', options);
            options.reload()
          },
          vite: {
            build: {
              outDir: 'dist-electron',
            },
          },
        }
      ]),
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
    build: {
      minify: 'terser',
      terserOptions:{
        compress:{
          drop_console:true,
          drop_debugger: true,
        }
      },
    },
    server: {
      // open: true,
			proxy: {
				"/api": {
          target: "http://175.24.31.205:8087",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		}
  }
})
