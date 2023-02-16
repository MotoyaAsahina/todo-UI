import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  // https://vitejs.dev/config/
  return defineConfig({
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_ADDR,
          changeOrigin: true,
          headers: {
            cookie: process.env.VITE_API_COOKIE
          }
        }
      }
    },
    plugins: [vue(), WindiCSS()]
  })
}
