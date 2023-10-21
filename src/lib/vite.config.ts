import glob from 'glob';
import { fileURLToPath } from 'node:url';
import { defineConfig} from "vite";
import * as path from "path";
export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('src/components/**/*.ts').map(file => {
          return [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js

            fileURLToPath(new URL(file, import.meta.url))
          ]
        })
      ),
      output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: '[name]-component.js'
      }
    }
  }
})
