// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import storybook from 'eslint-plugin-storybook';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        reactX.configs['recommended-typescript'],
        reactDom.configs.recommended,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          project: [
            './tsconfig.node.json',
            './tsconfig.app.json',
            './.storybook/tsconfig.json',
            './vitest.config.ts',
          ],
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      files: ['.storybook/**/*', 'vitest.shims.d.ts'],
      languageOptions: {
        parserOptions: {
          project: null,
        },
      },
    },
    eslintConfigPrettier,
  ],
  storybook.configs['flat/recommended']
);
