import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src'],
    format: ['cjs'],
    sourcemap: true,
    bundle: true,
    dts: false,
    clean: true,
    minify: true,
    outDir: 'build/cjs',
    outExtension: () => ({ js: '.js' }),
  },
  {
    entry: ['src'],
    format: ['esm'],
    sourcemap: true,
    bundle: true,
    dts: false,
    clean: true,
    minify: true,
    outDir: 'build/esm',
    outExtension: () => ({ js: '.js' }),
  },
]);
