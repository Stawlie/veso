import { consoleWarn, regex, req } from "./common";

export function between(
  value: unknown,
  min: number | Date,
  max: number | Date
) {
  if (min > max) {
    consoleWarn(`Min ${min} must be less than max ${max}`);
    return true;
  }

  if (typeof value === "boolean") {
    consoleWarn("Boolean values are not allowed");
    return true;
  }

  return (
    !req(value) ||
    ((!regex(/\s/)(value) || value instanceof Date) &&
      Number(value) >= Number(min) &&
      Number(value) <= Number(max))
  );
}
