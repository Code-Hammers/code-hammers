module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/client/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/__mocks__/fileMock.js',
  },
  coveragePathIgnorePatterns: [],
  testPathIgnorePatterns: [
    '<rootDir>/scripts',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/coverage',
    '<rootDir>/client/node_modules',
    '<rootDir>/client/build',
    '<rootDir>/client/coverage',
    '<rootDir>/client/src/assets',
  ],
};
