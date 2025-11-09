// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  testTimeout: 20000,
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/test/helpers.js"],
  moduleNameMapper: {}, // keep empty unless you need path mapping
};
