const globals = require("globals");
const js = require('@eslint/js')
const tseslint = require("typescript-eslint");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended.js");

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map(config => {
    if (config.name === 'typescript-eslint/recommended') {
      return {
        name: config.name,
        rules: {
          ...config.rules,
          // '@typescript-eslint/no-explicit-any': 0,
          // '@typescript-eslint/no-var-requires': 0,
          // '@typescript-eslint/no-unused-vars': 0,
        },
        ignores: [
          "**/*.config.js",
        ]
      }
    } else {
      return config
    }
  }),
  pluginReactConfig,
  {
    ignores: [
      "**/__tests__/",
      "**/__mocks__/",
      "coverage/",
      "**/build/",
      "**/dist/"
    ]
  }
];
