import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve();

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      preprocess: preprocess(),
      compilerOptions: {
        dev: !production,
      },
      emitCss: true,
    }),
    css({ output: 'bundle.css' }),

    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    !production && serve({
      contentBase: 'public',
      historyApiFallback: true,
      port: 5000,
    }),
    alias({
      entries: [
        { find: /^src\/(.*)$/, replacement: path.resolve(projectRootDir, 'src/$1') }
      ]
    }),

    !production && livereload('public'),

    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
