import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates alphanumeric", () => {
  const alphaNum = v.string().alphaNum();
  const coerceAlphaNum = v.coerce.string().alphaNum();

  it("Without coerce", () => {
    expect(alphaNum.validate("test")).toBe(true);
    expect(alphaNum.validate("hehehehe")).toBe(true);
    expect(alphaNum.validate("111hehehehe111")).toBe(true);
    expect(alphaNum.validate("iambluedabudidabudai")).toBe(true);
    expect(alphaNum.validate("123321")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceAlphaNum.validate("test")).toBe(true);
    expect(coerceAlphaNum.validate("hehehehe")).toBe(true);
    expect(coerceAlphaNum.validate("111hehehehe111")).toBe(true);
    expect(coerceAlphaNum.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceAlphaNum.validate("123321")).toBe(true);
  });
});

describe("Validates not alphanumeric", () => {
  const alphaNum = v.string().alphaNum(ERROR_MESSAGE);
  const coerceAlphaNum = v.coerce.string().alphaNum(ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(alphaNum.validate("Какой-то текст")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("alphanumer1c?")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("-----")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceAlphaNum.validate("Какой-то текст")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("alphanumer1c?")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("-----")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
});
