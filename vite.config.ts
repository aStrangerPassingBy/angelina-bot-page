import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig((config) => {
  // const env = loadEnv(config.mode, process.cwd(), '');
  // console.log(config, env);

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
      open: true,
			proxy: {
				"/api": {
          target: "http://175.24.31.205:8087/",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		}
  }
})
