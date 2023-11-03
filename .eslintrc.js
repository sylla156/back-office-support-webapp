module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        "plugin:react/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/display-name': 'off',
        'react/no-unescaped-entities': 'off',
        'comma-dangle': 'off',
        'array-bracket-spacing': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        // 'no-trailing-spaces': 'warn',
        'no-multiple-empty-lines': 'warn',
        'no-multi-spaces': 'warn',
        'object-curly-newline': 'warn',
        'no-undef':'off',
        'padded-blocks': 'warn',
        'block-spacing': 'warn',
        'quotes': 'off',
        'space-before-function-paren': 'off',
        'eol-last': 'warn',
        'space-infix-ops': 'warn',
        'indent': 'warn',
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
            version: "detect"
        }
    }
}
