import { v } from "veso";

const ERROR_MESSAGE = "Custom message!";

describe("Validates ipv4", () => {
  const ip = v.string().ip();
  const coerceIp = v.coerce.string().ip();

  it("Without coerce", () => {
    expect(ip.validate("127.0.0.1")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceIp.validate("127.0.0.1")).toBe(true);
  });
});

describe("Validates not ipv4", () => {
  const ip = v.string().ip("v4", ERROR_MESSAGE);
  const coerceIp = v.coerce.string().ip("v4", ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(ip.validate("127.0.0.01")).toBe(ERROR_MESSAGE);
    expect(ip.validate("notipv4")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceIp.validate("256.0.0.1")).toBe(ERROR_MESSAGE);
    expect(coerceIp.validate("notipv4")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates ipv6", () => {
  const ip = v.string().ip("v6");
  const coerceIp = v.coerce.string().ip("v6");

  it("Without coerce", () => {
    expect(ip.validate("2560:d0c2:9d26:eb77:f3d5:8ca3:2069:7783")).toBe(true);
    expect(ip.validate("5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceIp.validate("2560:d0c2:9d26:eb77:f3d5:8ca3:2069:7783")).toBe(
      true
    );
    expect(coerceIp.validate("5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b")).toBe(
      true
    );
  });
});

describe("Validates not ipv6", () => {
  const ip = v.string().ip("v6", ERROR_MESSAGE);
  const coerceIp = v.coerce.string().ip("v6", ERROR_MESSAGE);

  it("Without coerce", () => {
    expect(ip.validate("2560:d0c2:2069:7783")).toBe(ERROR_MESSAGE);
    expect(ip.validate("notipv6")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceIp.validate("2560:d0c2:2069:7783")).toBe(ERROR_MESSAGE);
    expect(coerceIp.validate("notipv6")).toBe(ERROR_MESSAGE);
  });
});
