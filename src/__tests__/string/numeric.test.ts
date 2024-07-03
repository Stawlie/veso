import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates numeric values", () => {
  const numeric = v.string().numeric();
  const coerceNumeric = v.coerce.string().numeric();

  it("Without coerce", () => {
    expect(numeric.validate("1234")).toBe(true);
    expect(numeric.validate("1234.54")).toBe(true);
    expect(numeric.validate("-1234.54")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNumeric.validate("1234")).toBe(true);
    expect(coerceNumeric.validate("1234.54")).toBe(true);
    expect(coerceNumeric.validate("-1234.54")).toBe(true);
  });
});

describe("Validates not numeric values", () => {
  const numeric = v.string().numeric(ERROR_MESSAGE);
  const coerceNumeric = v.coerce.string().numeric(ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(numeric.validate("grehre")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("testtest")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("123test")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("--321")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("+321")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceNumeric.validate("grehre")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("testtest")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("123test")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("--321")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("+321")).toBe(ERROR_MESSAGE);
  });
});
