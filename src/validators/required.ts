import { req } from "./common";

export function required(value: unknown) {
  if (typeof value === "string") {
    value = value.trim();
  }

  return req(value);
}
