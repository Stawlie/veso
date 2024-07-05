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

describe("Does not validate when validateIf: false", () => {
  const includesBoolean = v.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const includesFunction = v.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceIncludesBoolean = v.coerce.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceIncludesFunction = v.coerce.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(includesBoolean.validate("badstring")).toBe(true);
    expect(includesFunction.validate("badstring")).toBe(true);
    expect(includesBoolean.validate("includes")).toBe(true);
    expect(includesFunction.validate("includes")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceIncludesBoolean.validate("badstring")).toBe(true);
    expect(coerceIncludesFunction.validate("badstring")).toBe(true);
    expect(coerceIncludesBoolean.validate("includes")).toBe(true);
    expect(coerceIncludesFunction.validate("includes")).toBe(true);
  });
});
