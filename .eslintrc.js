module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'eslint-config-airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    }
  },
  globals: {
    "__DEV__": true,
    "__NAV__": true
  },
  plugins: [
    'react', 'import'
  ],
  rules: {
    'comma-dangle': 0,
    'no-console': 0,
    'id-length': 0,
    'max-len': 'off',
    'prefer-template': 'off',
    'react/prop-types': 0,
    'prefer-const': 'warn',
    'semi': [2, 'always'],
    'no-param-reassign': [2, { 'props': false  }],
    'no-underscore-dangle': 0,
    'global-require': 0,
    'react/prefer-stateless-function': 0,
    'no-unused-vars': 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': [2, { ignore: ['\.(png || jpg || gif)$']  }]
  }
}
