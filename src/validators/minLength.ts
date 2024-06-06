import { req, len, consoleWarn } from "./common";

export function minLength(value: unknown, length: number) {
  if (length < 0) {
    consoleWarn("Min length must be greater than or equal to 0!");
    return true;
  }

  if (length % 1 !== 0) {
    consoleWarn("Floating point numbers as length are not allowed!");
    return true;
  }

  if (typeof value === "boolean") {
    consoleWarn("Boolean values are not allowed!");
    return true;
  }

  if (value instanceof Date) {
    consoleWarn("Date values are not allowed!");
    return true;
  }

  return !req(value) || len(value) >= length;
}
