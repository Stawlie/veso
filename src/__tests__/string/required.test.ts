import { v } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

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
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate("")).toBe(DEFAULT_MAP.STRING.required);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(DEFAULT_MAP.STRING.required);
  });
});

describe("Validates null", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate(null)).toBe(DEFAULT_MAP.STRING.required);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(null)).toBe(DEFAULT_MAP.STRING.required);
  });
});

describe("Validates undefined", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(DEFAULT_MAP.STRING.required);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(
      DEFAULT_MAP.STRING.required
    );
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
