import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when satisfies regex", () => {
  const regex = v.string().regex(/^test$/);
  const coerceRegex = v.coerce.string().regex(/^test$/);

  it("Without coerce", () => {
    expect(regex.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRegex.validate("test")).toBe(true);
  });
});

describe("Validates when not satisfies regex", () => {
  const regex = v.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
  });
  const coerceRegex = v.coerce.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(regex.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(regex.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(regex.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRegex.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceRegex.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceRegex.validate("rest")).toBe(ERROR_MESSAGE);
  });
});
