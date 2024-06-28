module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jsx-control-statements'
  ],
  rules: {
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-undef': [1, { allowGlobals: true }],
    'jsx-control-statements/jsx-for-require-body': 'off',
    'comma-dangle': 'off',
    'array-bracket-spacing': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-multi-spaces': 'warn',
    'object-curly-newline': 'warn',
    'no-undef': 'off',
    'padded-blocks': 'off',
    'block-spacing': 'warn',
    'quotes': 'off',
    'space-before-function-paren': 'off',
    'eol-last': 'warn',
    'space-infix-ops': 'warn',
    'indent': ['warn', 2],
    'brace-style': 'warn',
    'object-curly-spacing': 'off',
    'comma-spacing': 'off',
    'spaced-comment': 'warn',
    'semi': 'off',
    'no-empty': 'warn',
    'camelcase': 'off',
    'react/jsx-key': 'off',
    'no-extra-semi': 'off',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
