'use strict';
const rules = {
  'no-undef': 'error',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  eqeqeq: ['error', 'always'],
  'no-var': 'error',
  'prefer-const': 'error',
};

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['server.js', 'scripts/**/*.js', 'eslint.config.js', 'playwright.config.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'script',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        performance: 'readonly',
      },
    },
    rules,
  },
  {
    files: ['public/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'script',
      globals: {
        StudyUtils: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        performance: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        FileReader: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        module: 'readonly',
        globalThis: 'readonly',
        self: 'readonly',
        caches: 'readonly',
      },
    },
    rules,
  },
  {
    files: ['tests/**/*.js', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        require: 'readonly',
        process: 'readonly',
      },
    },
    rules,
  },
];
