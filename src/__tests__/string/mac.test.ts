import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

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

describe("Does not validate when validateIf: false", () => {
  const macBoolean = v.string().mac({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const macFunction = v.string().mac({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMacBoolean = v.coerce.string().mac({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMacFunction = v.coerce.string().mac({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(macBoolean.validate("badstring")).toBe(true);
    expect(macFunction.validate("badstring")).toBe(true);
    expect(macBoolean.validate("mac")).toBe(true);
    expect(macFunction.validate("mac")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMacBoolean.validate("badstring")).toBe(true);
    expect(coerceMacFunction.validate("badstring")).toBe(true);
    expect(coerceMacBoolean.validate("mac")).toBe(true);
    expect(coerceMacFunction.validate("mac")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().mac().validate("текст")).toBe(DEFAULT_MAP.STRING.mac);
    expect(v.coerce.string().mac().validate(534.3)).toBe(
      DEFAULT_MAP.STRING.mac
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        mac: "Mac!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().mac().validate("текст")).toBe(MAP.STRING.mac);
    expect(v.coerce.string().mac().validate(534.3)).toBe(MAP.STRING.mac);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.mac") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().mac().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.mac")
    );
    expect(v.coerce.string().mac().validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.mac")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
