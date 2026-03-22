/**
 * Jest Configuration
 */

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: [
    '**/test/**/*.test.js',
    '**/test/**/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testTimeout: 30000,
};