/** @type {import('vite').UserConfig} */
import {glob} from 'glob'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig(async ({ command, mode }) => {
  if (command === 'serve') {
    return {
      server: {
        host: 'localhost',
        index: './src/lib/index.html',
        open: path.join('src/lib/index.html'),
        port: 5050
      }
    }
  }

  const entries = await glob('src/lib/src/components/**/*.ts')
  const transformed = entries.map((entry) => {
        return [
          path.relative(
            'src/lib/src/components', entry.slice(0, entry.length - path.extname(entry).length)
          ),
          fileURLToPath(new URL(entry, import.meta.url))
        ]
  })

  return {
    minify: mode === 'development' ? false : 'terser',
    build: {
      outDir: path.resolve(__dirname, 'resources/components'),
      emptyOutDir: true,
      manifest: true,
      minify: true,
      lib: {
        entry: Object.fromEntries(transformed),
        fileName: (_format, entryName): string => `${entryName}.js`,
        name: 'heed-components',
        formats: ['es']
      }
    }
  }
})
