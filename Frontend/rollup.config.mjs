import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
      // Correctly placed outside `compilerOptions`
      emitCss: true, // ensure you're emitting CSS as an asset for rollup-plugin-css-only to process
    }),
    // Handle CSS extraction separately
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

    !production && livereload('public'),

    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
