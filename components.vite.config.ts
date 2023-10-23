/** @type {import('vite').UserConfig} */
import glob from 'glob'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig(({ command, mode }) => {
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
  const entries = Object.fromEntries(
    glob.sync('src/lib/src/components/**/*.ts').map((file: string) => {
      return [
        path.relative(
          'src/lib/src/components',
          file.slice(0, file.length - path.extname(file).length)
        ),
        // @ts-ignore Not necessary for the import meta.
        fileURLToPath(new URL(file, import.meta.url))
      ]
    })
  )
  return {
    minify: mode === 'development' ? false : 'terser',
    build: {
      outDir: path.resolve(__dirname, 'resources/components'),
      emptyOutDir: true,
      manifest: true,
      minify: true,
      lib: {
        entry: entries,
        fileName: (format, entryName): string => `${entryName}.js`,
        name: 'heed-components',
        formats: ['es']
      }
    }
  }
})
