const globals = require('globals');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
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
        name: config.name,
        rules: {
          ...config.rules,
          // Override any tslint rules after this line
          '@typescript-eslint/no-unused-vars': [
            'error',
            // Allow unused arguments when prefixed with underscore
            {
              argsIgnorePattern: '^_',
            },
          ],
        },
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
    plugins: pluginReactConfig.plugins,
    rules: {
      ...pluginReactConfig.rules,

      // React recommended rule overrides
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        // Must set manually - cannot auto-detect from /client/package.json
        version: '18.3.1',
      },
    },
  },
  // Jest Recommended Rules
  {
    name: 'eslint-plugin-jest:recommended',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs['flat/recommended'],
    plugins: jestPlugin.configs['flat/recommended'].plugins,
    languageOptions: jestPlugin.configs['flat/recommended'].languageOptions,
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      // Jest recommended rule OVERRIDES
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
