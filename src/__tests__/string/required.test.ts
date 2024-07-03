import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates empty string (without required)", () => {
  const required = v.string();
  const coerceRequired = v.coerce.string();

  it("Without coerce", () => {
    expect(required.validate("")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(true);
  });
});

describe("Validates null (without required)", () => {
  const required = v.string();
  const coerceRequired = v.coerce.string();

  it("Without coerce", () => {
    expect(required.validate(null)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(null)).toBe(true);
  });
});

describe("Validates undefined (without required)", () => {
  const required = v.string();
  const coerceRequired = v.coerce.string();

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(true);
  });
});

describe("Validates empty string", () => {
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate("")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates null", () => {
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(null)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(null)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates undefined", () => {
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates any non-empty string", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate("test")).toBe(true);
    expect(required.validate("hehehehe")).toBe(true);
    expect(required.validate("iambluedabudidabudai")).toBe(true);
    expect(required.validate("anynonemptystring")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("test")).toBe(true);
    expect(coerceRequired.validate("hehehehe")).toBe(true);
    expect(coerceRequired.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceRequired.validate("anynonemptystring")).toBe(true);
  });
});
