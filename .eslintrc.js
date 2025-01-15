module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false, // Không sử dụng dấu chấm phẩy
      },
    ],
    semi: ['error', 'never'], // Tắt bắt buộc dấu chấm phẩy
    '@typescript-eslint/no-unused-vars': 'off', // Tắt quy tắc no-unused-vars
    'no-unused-vars': 'off', // Tắt cảnh báo no-unused-vars từ ESLint mặc định
  },
}
