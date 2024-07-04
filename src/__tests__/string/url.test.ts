import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates url", () => {
  const url = v.string().url();
  const coerceUrl = v.coerce.string().url();

  it("Without coerce", () => {
    expect(url.validate("https://google.com")).toBe(true);
    expect(url.validate("http://google.com")).toBe(true);
    expect(url.validate("ftp://google.com")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceUrl.validate("https://google.com")).toBe(true);
    expect(coerceUrl.validate("http://google.com")).toBe(true);
    expect(coerceUrl.validate("ftp://google.com")).toBe(true);
  });
});

describe("Validates not url", () => {
  const url = v.string().url({
    message: ERROR_MESSAGE,
  });
  const coerceUrl = v.coerce.string().url({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(url.validate("noturl")).toBe(ERROR_MESSAGE);
    expect(url.validate("http:/test.com")).toBe(ERROR_MESSAGE);
    expect(url.validate("http://test.")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceUrl.validate("noturl")).toBe(ERROR_MESSAGE);
    expect(coerceUrl.validate("http:/test.com")).toBe(ERROR_MESSAGE);
    expect(coerceUrl.validate("http://test.")).toBe(ERROR_MESSAGE);
  });
});
