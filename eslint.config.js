import { defineConfig } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import neostandard from 'neostandard'

export default defineConfig([
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...neostandard({
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ts: true,
    noStyle: true,
  }),
])
