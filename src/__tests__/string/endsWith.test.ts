import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when ends with", () => {
  const endsWith = v.string().endsWith("test");
  const coerceEndsWith = v.coerce.string().endsWith("test");

  it("Without coerce", () => {
    expect(endsWith.validate("123test")).toBe(true);
    expect(endsWith.validate("newtest")).toBe(true);
    expect(endsWith.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceEndsWith.validate("123test")).toBe(true);
    expect(coerceEndsWith.validate("newtest")).toBe(true);
    expect(coerceEndsWith.validate("test")).toBe(true);
  });
});

describe("Validates when not ends with", () => {
  const endsWith = v.string().endsWith("test", ERROR_MESSAGE);
  const coerceEndsWith = v.coerce.string().endsWith("test", ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(endsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(endsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(endsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceEndsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceEndsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceEndsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
});
