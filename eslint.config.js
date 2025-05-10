import { defineConfig } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import neostandard from 'neostandard'

export default defineConfig([
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...neostandard({
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ts: true,
  }),
  {
    files: ['**/*.astro'],
    rules: {
      ...eslintPluginAstro.rules,
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
])
