import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates enough unique symbols", () => {
  const unique = v.string().unique(5);
  const coerceUnique = v.coerce.string().unique(5);

  it("Without coerce", () => {
    expect(unique.validate("12345")).toBe(true);
    expect(unique.validate("123456")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceUnique.validate("12345")).toBe(true);
    expect(coerceUnique.validate("123456")).toBe(true);
  });
});

describe("Validates not enough unique symbols", () => {
  const unique = v.string().unique(5, {
    message: ERROR_MESSAGE,
  });
  const coerceUnique = v.coerce.string().unique(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(unique.validate("1234")).toBe(ERROR_MESSAGE);
    expect(unique.validate("123")).toBe(ERROR_MESSAGE);
    expect(unique.validate("11112222")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceUnique.validate("1234")).toBe(ERROR_MESSAGE);
    expect(coerceUnique.validate("123")).toBe(ERROR_MESSAGE);
    expect(coerceUnique.validate("11112222")).toBe(ERROR_MESSAGE);
  });
});
