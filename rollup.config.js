import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

module.exports = [
  {
    input: 'dist/lib/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      interop: true
    },
    plugins: [commonjs(), resolve()]
  }
];
