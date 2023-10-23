/** @type {import('vite').UserConfig} */
import glob from 'glob';
import {fileURLToPath} from 'node:url';
import {defineConfig} from "vite";
import * as path from "path";
import {resolve} from "path";
import typescript from "@rollup/plugin-typescript";

const pathResolve = (v: string) => path.resolve(__dirname, v)

export default defineConfig(({command, mode}) => {

	console.log("Command and mode", command, mode)
	console.log("DEV: ", path.join(__dirname, 'src/lib'))

	if (command === 'serve') {
		return {
			server: {
				open: './src/lib/index.html',
				port: 5000,
			},
		}
	}
	const entries = Object.fromEntries(
		glob.sync('src/lib/src/components/**/*.ts').map(file => {
			return [
				path.relative(
					'src/lib/src/components',
					file.slice(0, file.length - path.extname(file).length)
				),
				fileURLToPath(new URL(file, import.meta.url))
			]
		})
	);
	return {
		minify: mode === 'development' ? false : 'terser',
		build: {
			outDir: path.resolve(__dirname, 'resources/components'),
			emptyOutDir: true,
			manifest: true,
			minify: true,
			lib: {
				entry: entries,
				fileName: (format, entryName) => `${entryName}.js`,
				name: 'heed-components',
				formats: ["es"],
			}
		}
	}
})
