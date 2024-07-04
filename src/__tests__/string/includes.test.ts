import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when includes", () => {
  const includes = v.string().includes("test");
  const coerceIncludes = v.coerce.string().includes("test");

  it("Without coerce", () => {
    expect(includes.validate("123test")).toBe(true);
    expect(includes.validate("newtest")).toBe(true);
    expect(includes.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceIncludes.validate("123test")).toBe(true);
    expect(coerceIncludes.validate("newtest")).toBe(true);
    expect(coerceIncludes.validate("test")).toBe(true);
  });
});

describe("Validates when not includes", () => {
  const includes = v.string().includes("test321", {
    message: ERROR_MESSAGE,
  });
  const coerceIncludes = v.coerce.string().includes("test321", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(includes.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(includes.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(includes.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceIncludes.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceIncludes.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceIncludes.validate("rest")).toBe(ERROR_MESSAGE);
  });
});
