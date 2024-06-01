const globals = require('globals');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const pluginReactConfig = require('eslint-plugin-react/configs/recommended.js');
const jestPlugin = require('eslint-plugin-jest');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    languageOptions: {
      // Global identifiers from different JavaScript environments
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Files/Directories to be ignored by ESLint
  {
    ignores: ['**/node_modules/', 'coverage/', '**/build/', '**/dist/'],
  },
  // ESLint Recommended Configuration
  {
    name: '@eslint/js:recommended',
    ...js.configs.recommended,
  },
  // TypeScript Recommended Configurations
  ...tseslint.configs.recommended.map((config) => {
    if (config.name === 'typescript-eslint/recommended') {
      return {
        ...config,
        // Have this configuration ignore these files
        ignores: ['**/*.config.js'],
      };
    } else {
      return config;
    }
  }),
  // React Recommended Rules
  {
    name: 'eslint-plugin-react:recommended',
    ...pluginReactConfig,
  },
  // React Additional Rules
  // {
  //   name: 'eslint-plugin-react:additional',
  //   files: ['**/*.{js,jsx,ts,tsx}'],
  //   plugins: {
  //     reactPlugin,
  //   },
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //       },
  //     },
  //     globals: {
  //       ...globals.browser,
  //     },
  //   },
  //   rules: {
  //     'react/jsx-uses-react': 'error',
  //     'react/jsx-uses-vars': 'error',
  //   },
  //   settings: {
  //     react: {
  //       // Must set manually - cannot auto-detect from /client/package.json
  //       version: '18.3.1',
  //     },
  //   },
  // },
  // Jest Recommended Rules
  {
    name: 'eslint-plugin-jest:recommended',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs['flat/recommended'],
  },
  // Jest Recommended Rule Overrides
  {
    name: 'eslint-plugin-jest:overrides',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      // TODO - do we want these rules?
      'jest/no-disabled-tests': 'warn',
      'jest/no-test-prefixes': 'off',
      'jest/no-done-callback': 'off',
    },
  },
  // Turns of Rules to Allow prettier to format
  {
    name: 'eslint-config-prettier',
    ...eslintConfigPrettier,
  },
];
