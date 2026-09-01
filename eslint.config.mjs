import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'coverage/**',
      '*.config.js',
      'jest.setup.js',
    ],
  },
];

export default eslintConfig;
