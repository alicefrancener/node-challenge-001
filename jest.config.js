module.exports = {
  globalSetup: './src/setupTests.js',
  globalTeardown: './src/teardownTests.js',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/database/migrations/**',
    '!**/database/seeds/**',
  ]
};
