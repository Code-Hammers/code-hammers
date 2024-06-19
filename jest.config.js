// module.exports = {
//   roots: ['<rootDir>/server'],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   setupFilesAfterEnv: ['<rootDir>/server/test/setup.ts'],
//   // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
//   testRegex: '.test.ts?x$',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/server/test/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/coverage',
    '<rootDir>/client/node_modules',
    '<rootDir>/client/build',
    '<rootDir>/client/coverage',
  ],
};
