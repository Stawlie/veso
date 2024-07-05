import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

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

describe("Does not validate when validateIf: false", () => {
  const hexBoolean = v.string().hex({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const hexFunction = v.string().hex({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceHexBoolean = v.coerce.string().hex({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceHexFunction = v.coerce.string().hex({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(hexBoolean.validate("notanhex")).toBe(true);
    expect(hexFunction.validate("notanhex")).toBe(true);
    expect(hexBoolean.validate("amianhex?")).toBe(true);
    expect(hexFunction.validate("amianhex?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceHexBoolean.validate("notanhex")).toBe(true);
    expect(coerceHexFunction.validate("notanhex")).toBe(true);
    expect(coerceHexBoolean.validate("amianhex?")).toBe(true);
    expect(coerceHexFunction.validate("amianhex?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().ip("v4").validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.ip, { ip: "v4" })
    );
    expect(v.string().ip("v6").validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.ip, { ip: "v6" })
    );
    expect(v.coerce.string().ip("v4").validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.ip, { ip: "v4" })
    );
    expect(v.coerce.string().ip("v6").validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.ip, { ip: "v6" })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        ip: "Hex!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().ip("v4").validate("текст")).toBe(MAP.STRING.ip);
    expect(v.string().ip("v6").validate("текст")).toBe(MAP.STRING.ip);
    expect(v.coerce.string().ip("v4").validate(534.3)).toBe(MAP.STRING.ip);
    expect(v.coerce.string().ip("v6").validate(534.3)).toBe(MAP.STRING.ip);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.ip") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().ip("v4").validate("текст")).toBe(
      TRANSLATE("VESO.STRING.ip")
    );
    expect(v.string().ip("v6").validate("текст")).toBe(
      TRANSLATE("VESO.STRING.ip")
    );
    expect(v.coerce.string().ip("v4").validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.ip")
    );
    expect(v.coerce.string().ip("v6").validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.ip")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
