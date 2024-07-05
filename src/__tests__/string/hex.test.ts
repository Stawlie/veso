import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates hex", () => {
  const hex = v.string().hex();
  const coerceHex = v.coerce.string().hex();

  it("Without coerce", () => {
    expect(hex.validate("0")).toBe(true);
    expect(hex.validate("ffffff")).toBe(true);
    expect(hex.validate("abcdef")).toBe(true);
    expect(hex.validate("0123456789abcdef")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceHex.validate("0")).toBe(true);
    expect(coerceHex.validate("ffffff")).toBe(true);
    expect(coerceHex.validate("abcdef")).toBe(true);
    expect(coerceHex.validate("0123456789abcdef")).toBe(true);
  });
});

describe("Validates not hex", () => {
  const hex = v.string().hex({
    message: ERROR_MESSAGE,
  });
  const coerceHex = v.coerce.string().hex({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(hex.validate("abcdefg")).toBe(ERROR_MESSAGE);
    expect(hex.validate("abcdefgh")).toBe(ERROR_MESSAGE);
    expect(hex.validate("gggg")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceHex.validate("abcdefg")).toBe(ERROR_MESSAGE);
    expect(coerceHex.validate("abcdefgh")).toBe(ERROR_MESSAGE);
    expect(coerceHex.validate("gggg")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const hexBoolean = v.string().hex({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const hexFunction = v.string().hex({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceHexBoolean = v.coerce.string().hex({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceHexFunction = v.coerce.string().hex({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(hexBoolean.validate("notanhex")).toBe(true);
    expect(hexFunction.validate("notanhex")).toBe(true);
    expect(hexBoolean.validate("amianhex?")).toBe(true);
    expect(hexFunction.validate("amianhex?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceHexBoolean.validate("notanhex")).toBe(true);
    expect(coerceHexFunction.validate("notanhex")).toBe(true);
    expect(coerceHexBoolean.validate("amianhex?")).toBe(true);
    expect(coerceHexFunction.validate("amianhex?")).toBe(true);
  });
});
