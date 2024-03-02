import { defineConfig } from 'vite';
import pkg from '../package.json';
import pug from 'vite-plugin-pug';

export default defineConfig({
	plugins: [pug({}, { pkg })],
});
