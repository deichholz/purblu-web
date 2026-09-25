import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import prettier from 'eslint-config-prettier';

const jsFiles = ['**/*.js', '**/*.mjs'];

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: jsFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@html-eslint': htmlPlugin,
    },
    rules: {
      '@html-eslint/require-closing-tags': 'error',
      '@html-eslint/require-meta-charset': 'off',
      '@html-eslint/no-duplicate-attrs': 'error',
      '@html-eslint/require-img-alt': 'error',
      '@html-eslint/attrs-newline': 'off',
      '@html-eslint/element-newline': 'off',
      '@html-eslint/indent': 'off',
      '@html-eslint/quotes': 'off',
    },
  },
  prettier,
];
