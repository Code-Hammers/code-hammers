import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      // Global identifiers from different JavaScript environments
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
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
  // TypeScript Recommended Configurationm Overrides & Additional Rules
  {
    name: 'typescript-eslint overrides',
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-var-requires': 0,
    },
  },
  // React Recommended Rules
  {
    name: 'eslint-plugin-react:recommended',
    ...pluginReactConfig,
  },
  // React Additional Rules
  {
    name: 'eslint-plugin-react:additional',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        // Must set manually - cannot auto-detect from /client/package.json
        version: '18.3.1',
      },
    },
  },
  // Turns of Rules to Allow prettier to format
  {
    name: 'eslint-config-prettier',
    ...eslintConfigPrettier,
  },
];
