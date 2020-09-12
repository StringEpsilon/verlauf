module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "window": true,
  },
  testEnvironment: "jsdom",
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/*.d.ts",
    "!src/*.test.ts",
  ],
  collectCoverage: true,
  coverageReporters: ["html"],
  globals: {
    'ts-jest': {
      tsConfig: {
        strict: false
      }
    }
  }
};
