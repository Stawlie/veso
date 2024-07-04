import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates not in array", () => {
  const notIn = v.string().notIn(["test1", "test2"]);
  const coerceNotIn = v.coerce.string().notIn(["test1", "test2"]);

  it("Without coerce", () => {
    expect(notIn.validate("test3")).toBe(true);
    expect(notIn.validate("432432")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("test3")).toBe(true);
    expect(coerceNotIn.validate("432432")).toBe(true);
  });
});

describe("Validates in array", () => {
  const notIn = v.string().notIn(["test1", "test2"], {
    message: ERROR_MESSAGE,
  });
  const coerceNotIn = v.coerce.string().notIn(["test1", "test2"], {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(notIn.validate("test1")).toBe(ERROR_MESSAGE);
    expect(notIn.validate("test2")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("test1")).toBe(ERROR_MESSAGE);
    expect(coerceNotIn.validate("test2")).toBe(ERROR_MESSAGE);
  });
});
