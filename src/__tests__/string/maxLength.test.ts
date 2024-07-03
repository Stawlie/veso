import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower maxLength", () => {
  const maxLength = v.string().maxLength(5);
  const coerceMaxLength = v.coerce.string().maxLength(5);

  it("Without coerce", () => {
    expect(maxLength.validate("1234")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceMaxLength.validate("1234")).toBe(true);
  });
});

describe("Validates exact maxLength", () => {
  const maxLength = v.string().maxLength(5);
  const coerceMaxLength = v.coerce.string().maxLength(5);

  it("Without coerce", () => {
    expect(maxLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMaxLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher maxLength", () => {
  const maxLength = v.string().maxLength(5, ERROR_MESSAGE);
  const coerceMaxLength = v.coerce.string().maxLength(5, ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(maxLength.validate("123456")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceMaxLength.validate("123456")).toBe(ERROR_MESSAGE);
  });
});
