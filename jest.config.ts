import type { JestConfigWithTsJest } from "ts-jest";

module.exports = {
  rootDir: "src",
  preset: "ts-jest",
  testRegex: "src/.*\\.test\\.ts$",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    veso: "<rootDir>/index.ts",
  },
} as JestConfigWithTsJest;
