import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {},
  },
]);
