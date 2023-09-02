const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [path.resolve(__dirname, "./setupTests.ts")],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        /*ANY TS-JEST SPECIFIC CONFIG GOES HERE */
      },
    ],
  },
};
