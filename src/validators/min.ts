import { consoleWarn, req } from "./common";

export function min(value: unknown, min: number) {
  if (typeof value === "boolean") {
    consoleWarn("Boolean values are not allowed");
    return true;
  }

  if (typeof value === "string" && isNaN(Number(value))) {
    return true;
  }

  if (Array.isArray(value)) {
    consoleWarn("Array values are not allowed");
    return true;
  }

  if (typeof value === "object" && value !== null) {
    consoleWarn("Object values are not allowed");
    return true;
  }

  return !req(value) || Number(value) >= min;
}
