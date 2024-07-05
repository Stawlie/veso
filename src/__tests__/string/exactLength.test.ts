import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower exactLength", () => {
  const exactLength = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceExactLength = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(exactLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceExactLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact exactLength", () => {
  const exactLength = v.string().exactLength(5);
  const coerceExactLength = v.coerce.string().exactLength(5);

  it("Without coerce", () => {
    expect(exactLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceExactLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher exactLength", () => {
  const exactLength = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceExactLength = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(exactLength.validate("123456")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceExactLength.validate("123456")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const exactLengthBoolean = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const exactLengthFunction = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceExactLengthBoolean = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceExactLengthFunction = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(exactLengthBoolean.validate("notanexactLength")).toBe(true);
    expect(exactLengthFunction.validate("notanexactLength")).toBe(true);
    expect(exactLengthBoolean.validate("amianexactLength?")).toBe(true);
    expect(exactLengthFunction.validate("amianexactLength?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceExactLengthBoolean.validate("notanexactLength")).toBe(true);
    expect(coerceExactLengthFunction.validate("notanexactLength")).toBe(true);
    expect(coerceExactLengthBoolean.validate("amianexactLength?")).toBe(true);
    expect(coerceExactLengthFunction.validate("amianexactLength?")).toBe(true);
  });
});
