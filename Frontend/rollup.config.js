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
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into a separate file - better for performance
      css: css => {
        css.write('public/build/bundle.css');
      },
    }),
    // we'll need to convert our .css files to be usable in JavaScript
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from npm, you'll most likely need these plugins. In some cases you'll need additional configuration - 
    // Consult the documentation for details: https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    // In dev mode, call `npm run start` once the bundle has been generated
    !production && serve({
      contentBase: 'public',
      historyApiFallback: true,
      port: 5000,
    }),

    // Watch the `public` directory and refresh the browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
