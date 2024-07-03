import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates alpha", () => {
  const alpha = v.string().alpha();
  const coerceAlpha = v.coerce.string().alpha();

  it("Without coerce", () => {
    expect(alpha.validate("test")).toBe(true);
    expect(alpha.validate("hehehehe")).toBe(true);
    expect(alpha.validate("iambluedabudidabudai")).toBe(true);
    expect(alpha.validate("anynonemptystring")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceAlpha.validate("test")).toBe(true);
    expect(coerceAlpha.validate("hehehehe")).toBe(true);
    expect(coerceAlpha.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceAlpha.validate("anynonemptystring")).toBe(true);
  });
});

describe("Validates not alpha", () => {
  const alpha = v.string().alpha(ERROR_MESSAGE);
  const coerceAlpha = v.coerce.string().alpha(ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(alpha.validate("test123")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("Это текст на русском?")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("iambluedabudidabudai123")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("523454325")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceAlpha.validate("test123")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("Это текст на русском?")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("iambluedabudidabudai123")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("523454325")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
});
