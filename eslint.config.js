import { defineConfig } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import neostandard from 'neostandard'

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  ...neostandard({
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ts: true,
    noStyle: true,
  }),
  // Configuración específica para archivos .astro
  {
    files: ['**/*.astro'],
    rules: {
      'react/self-closing-comp': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
])
