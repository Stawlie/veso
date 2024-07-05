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
  const ip = v.string().ip("v4", {
    message: ERROR_MESSAGE,
  });
  const coerceIp = v.coerce.string().ip("v4", {
    message: ERROR_MESSAGE,
  });

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
  const ip = v.string().ip("v6", {
    message: ERROR_MESSAGE,
  });
  const coerceIp = v.coerce.string().ip("v6", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(ip.validate("2560:d0c2:2069:7783")).toBe(ERROR_MESSAGE);
    expect(ip.validate("notipv6")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceIp.validate("2560:d0c2:2069:7783")).toBe(ERROR_MESSAGE);
    expect(coerceIp.validate("notipv6")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const ipV4Boolean = v.string().ip("v4", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const ipV6Boolean = v.string().ip("v6", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const ipV4Function = v.string().ip("v4", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const ipV6Function = v.string().ip("v6", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceIpV4Boolean = v.coerce.string().ip("v4", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceIpV6Boolean = v.coerce.string().ip("v6", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceIpV4Function = v.coerce.string().ip("v4", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceIpV6Function = v.coerce.string().ip("v6", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(ipV4Boolean.validate("badstring")).toBe(true);
    expect(ipV6Boolean.validate("badstring")).toBe(true);
    expect(ipV4Function.validate("badstring")).toBe(true);
    expect(ipV6Function.validate("badstring")).toBe(true);
    expect(ipV4Boolean.validate("ip")).toBe(true);
    expect(ipV6Boolean.validate("ip")).toBe(true);
    expect(ipV4Function.validate("ip")).toBe(true);
    expect(ipV6Function.validate("ip")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceIpV4Boolean.validate("badstring")).toBe(true);
    expect(coerceIpV6Boolean.validate("badstring")).toBe(true);
    expect(coerceIpV4Function.validate("badstring")).toBe(true);
    expect(coerceIpV6Function.validate("badstring")).toBe(true);
    expect(coerceIpV4Boolean.validate("ip")).toBe(true);
    expect(coerceIpV6Boolean.validate("ip")).toBe(true);
    expect(coerceIpV4Function.validate("ip")).toBe(true);
    expect(coerceIpV6Function.validate("ip")).toBe(true);
  });
});
