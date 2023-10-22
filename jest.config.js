module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/**/index.ts",
    "!**/*.d.ts",
    "!**/mocks/**/*",
    "!**/*-deprecated*",
    "!**/*-deprecated",
    "!**/*-deprecated/*",
    "!src/lib/observability/**/*",
  ],
  preset: "jest-expo",
  coverageDirectory: "coverage",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/src/main/config/jest-setup.ts",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/e2e/"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|@sentry/.*|native-base|react-native-svg)",
  ],
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
  globals: {},
};
