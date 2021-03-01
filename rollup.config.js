import path from 'path'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const external = [pkg.dependencies, pkg.peerDependencies]
  .filter(Boolean)
  .flatMap(dep => Object.keys(dep))
  .map(pkg => new RegExp(`^${pkg.replace(/\//g, '/')}`))

const pkgConfig = {
  input: path.join(__dirname, pkg.src),
  external,
  plugins: [babel({ exclude: 'node_modules/**', babelHelpers: 'runtime' })],
  output: [
    {
      file: path.join(__dirname, pkg.main),
      format: 'cjs',
      exports: 'default'
    },
    {
      file: path.join(__dirname, pkg.module),
      format: 'es'
    }
  ]
}

const iifeConfig = {
  input: path.join(__dirname, pkg.src),
  external,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      plugins: [['@babel/transform-runtime', false]]
    })
  ],
  output: {
    file: path.join(__dirname, pkg.iife),
    format: 'iife',
    name: 'Reaxios',
    globals: { axios: true },
    plugins: [terser()]
  }
}

export default [pkgConfig, iifeConfig]
