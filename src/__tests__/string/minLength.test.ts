import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower minLength", () => {
  const minLength = v.string().minLength(5, ERROR_MESSAGE);
  const coerceMinLength = v.coerce.string().minLength(5, ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(minLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMinLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact minLength", () => {
  const minLength = v.string().minLength(5);
  const coerceMinLength = v.coerce.string().minLength(5);

  it("Without coerce", () => {
    expect(minLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher minLength", () => {
  const minLength = v.string().minLength(5);
  const coerceMinLength = v.coerce.string().minLength(5);

  it("Without coerce", () => {
    expect(minLength.validate("123456")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinLength.validate("123456")).toBe(true);
  });
});
