import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates mac", () => {
  const mac = v.string().mac();
  const coerceMac = v.coerce.string().mac();

  it("Without coerce", () => {
    expect(mac.validate("00:00:00:00:00:00")).toBe(true);
    expect(mac.validate("00-00-00-00-00-00")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceMac.validate("00:00:00:00:00:00")).toBe(true);
    expect(coerceMac.validate("00-00-00-00-00-00")).toBe(true);
  });
});

describe("Validates not mac", () => {
  const mac = v.string().mac({
    message: ERROR_MESSAGE,
  });
  const coerceMac = v.coerce.string().mac({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(mac.validate("00:00:00:01")).toBe(ERROR_MESSAGE);
    expect(mac.validate("00-00-00-00-00:01")).toBe(ERROR_MESSAGE);
    expect(mac.validate("any string")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMac.validate("00:00:00:01")).toBe(ERROR_MESSAGE);
    expect(coerceMac.validate("00-00-00-00-00:01")).toBe(ERROR_MESSAGE);
    expect(coerceMac.validate("any string")).toBe(ERROR_MESSAGE);
  });
});
