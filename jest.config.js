module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
