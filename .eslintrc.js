/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // ✅ No need for React import in Next.js
    'react/prop-types': 'off', // ✅ Disable prop-types for TypeScript
    '@typescript-eslint/no-explicit-any': 'off', // ❗️ Temporarily off for clean up
    '@typescript-eslint/no-var-requires': 'off', // ❗️ Allow require statements temporarily
    '@typescript-eslint/no-unused-vars': 'off', // ✅ Turn off unused vars temporarily
    'import/no-anonymous-default-export': 'off', // ✅ Suppress anonymous export warning
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        endOfLine: 'lf', // ✅ Ensure LF line endings
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // ✅ Automatically detect React version
    },
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '.next/'], // ✅ Ignore build files
};
