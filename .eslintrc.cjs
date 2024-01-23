module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
    'import/no-unresolved': 'off',
    'linebreak-style': ['error', 'windows'],
    'object-curly-spacing': ['error', 'never'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'eol-last': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off'
  },
}
