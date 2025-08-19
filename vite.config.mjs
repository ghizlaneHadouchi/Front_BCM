import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

export default defineConfig(({ mode }) => {
  // Load .env
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    base: '/',
    build: {
      outDir: 'build',
      minify: true,
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer({}), // add options if needed
        ],
      },
    },
    define: {
      // vitejs does not support process.env so we have to redefine it
      'process.env': process.env,
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API,
          changeOrigin: true,
          secure: false,
        },
        // https://vitejs.dev/config/server-options.html
      },
      host: '0.0.0.0',
      port: process.env.PORT || 5173,
    },
    preview: {
      host: '0.0.0.0',
      port: process.env.PORT || 5173,
    },
  }
})
