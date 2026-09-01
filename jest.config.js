const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Mesma resolucao de alias do tsconfig.json (@/shared/* antes de @/*).
  moduleNameMapper: {
    '^@/shared/(.*)$': '<rootDir>/node_modules/@mpms/shared-ui/src/shared/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/hooks/**/*.{ts,tsx}',
    'src/service/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};

module.exports = createJestConfig(config);
