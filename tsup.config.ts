import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/kjua.ts'],
	dts: true,
	sourcemap: true,
	format: ['cjs', 'esm'],
	keepNames: true,
	bundle: true,
	clean: true,
});
