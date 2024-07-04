import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates email", () => {
  const email = v.string().email();
  const coerceEmail = v.coerce.string().email();

  it("Without coerce", () => {
    expect(email.validate("admin@admin.com")).toBe(true);
    expect(email.validate("a@a.com")).toBe(true);
    expect(email.validate("test@test.com")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceEmail.validate("admin@admin.com")).toBe(true);
    expect(coerceEmail.validate("a@a.com")).toBe(true);
    expect(coerceEmail.validate("test@test.com")).toBe(true);
  });
});

describe("Validates not email", () => {
  const email = v.string().email({
    message: ERROR_MESSAGE,
  });
  const coerceEmail = v.coerce.string().email({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(email.validate("amianemail?")).toBe(ERROR_MESSAGE);
    expect(email.validate("notanemail")).toBe(ERROR_MESSAGE);
    expect(email.validate("fake@email.g")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceEmail.validate("amianemail?")).toBe(ERROR_MESSAGE);
    expect(coerceEmail.validate("notanemail")).toBe(ERROR_MESSAGE);
    expect(coerceEmail.validate("fake@email.g")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const emailBoolean = v.string().email({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const emailFunction = v.string().email({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceEmailBoolean = v.coerce.string().email({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceEmailFunction = v.coerce.string().email({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(emailBoolean.validate("notanemail")).toBe(true);
    expect(emailFunction.validate("notanemail")).toBe(true);
    expect(emailBoolean.validate("amianemail?")).toBe(true);
    expect(emailFunction.validate("amianemail?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceEmailBoolean.validate("notanemail")).toBe(true);
    expect(coerceEmailFunction.validate("notanemail")).toBe(true);
    expect(coerceEmailBoolean.validate("amianemail?")).toBe(true);
    expect(coerceEmailFunction.validate("amianemail?")).toBe(true);
  });
});
