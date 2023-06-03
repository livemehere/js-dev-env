module.exports = {
  plugins: ['eslint-plugin-simple-import-sort', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
