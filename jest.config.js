module.exports = {
  testMatch: ["**/tests/*.test.[jt]s?(x)"],
  // The test environment that will be used for testing, jsdom for browser environment
  testEnvironment: "jsdom",

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Important: order matters, specific rules should be defined first
  // See : https://jestjs.io/fr/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // To resolve typescript path aliases
  },
};