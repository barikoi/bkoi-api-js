// Rollup plugins
import clear from 'rollup-plugin-clear'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'index.ts',
    output: {
      file: 'dist/iife/bkoi-api.js',
      format: 'iife',
      name: 'bkoiapi'
    },
    plugins: [
      clear({ targets: [ 'dist' ] }),
      typescript({ module: 'esnext' }),
      terser()
    ]
  }
]