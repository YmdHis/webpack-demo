module.exports = {
  root: true,
  env: {
    node: true, // 启用node中的全局变量
    browser: true, //启用浏览器全局变量
  },
  extends: [
    // 'plugin:vue/essential',
    // '@vue/standard',
  ],
  // 全局变量
  globals: {
    __DEV__: true,
    __WECHAT__: true,
  },
  rules: {
    'vue/custom-event-name-casing': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-new-func': 'off',
    'standard/no-callback-literal': 'off',
    'no-eval': 'off',
    'no-throw-literal': 'off',
    'no-async-promise-executor': 'off',
    'no-misleading-character-class': 'off',
    'no-useless-catch': 'off',
    'no-return-await': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'never',
        functions: 'never'
      }
    ],
    // 使用单引号
    quotes: ['error', 'single'],
  },
  parserOptions: {
    ecmaVersion: 6, //es6
    sourceType: 'module', // es module
    parser: 'babel-eslint'
  }
};
