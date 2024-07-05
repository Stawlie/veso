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

describe("Does not validate when validateIf: false", () => {
  const uniqueBoolean = v.string().unique(3, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const uniqueFunction = v.string().unique(3, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceUniqueBoolean = v.coerce.string().unique(3, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceUniqueFunction = v.coerce.string().unique(3, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(uniqueBoolean.validate("ttttt")).toBe(true);
    expect(uniqueFunction.validate("ttttt")).toBe(true);
    expect(uniqueBoolean.validate("ntntntnt")).toBe(true);
    expect(uniqueFunction.validate("ntntntnt")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceUniqueBoolean.validate("ttttt")).toBe(true);
    expect(coerceUniqueFunction.validate("ttttt")).toBe(true);
    expect(coerceUniqueBoolean.validate("ntntntnt")).toBe(true);
    expect(coerceUniqueFunction.validate("ntntntnt")).toBe(true);
  });
});
