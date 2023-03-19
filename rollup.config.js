// Rollup plugins
import clear from 'rollup-plugin-clear'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'index.ts',
    output: {
      file: 'dist/iife/barikoi-js.js',
      format: 'iife',
      name: 'barikoi'
    },
    plugins: [
      clear({ targets: [ 'dist' ] }),
      typescript({ module: 'esnext' }),
      terser()
    ]
  }
]