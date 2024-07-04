import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when starts with", () => {
  const startsWith = v.string().startsWith("test");
  const coerceStartsWith = v.coerce.string().startsWith("test");

  it("Without coerce", () => {
    expect(startsWith.validate("test123")).toBe(true);
    expect(startsWith.validate("testing")).toBe(true);
    expect(startsWith.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceStartsWith.validate("test123")).toBe(true);
    expect(coerceStartsWith.validate("testing")).toBe(true);
    expect(coerceStartsWith.validate("test")).toBe(true);
  });
});

describe("Validates when not starts with", () => {
  const startsWith = v.string().startsWith("test", {
    message: ERROR_MESSAGE,
  });
  const coerceStartsWith = v.coerce.string().startsWith("test", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(startsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(startsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(startsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceStartsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceStartsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceStartsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
});
