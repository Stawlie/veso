import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates integer", () => {
  const integer = v.number().integer();
  const coerceInteger = v.coerce.number().integer();

  it("Without coerce", () => {
    expect(integer.validate(1)).toBe(true);
    expect(integer.validate(10)).toBe(true);
    expect(integer.validate(100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceInteger.validate("1")).toBe(true);
    expect(coerceInteger.validate("10")).toBe(true);
    expect(coerceInteger.validate("100")).toBe(true);
  });
});

describe("Validates not integer", () => {
  const integer = v.number().integer({
    message: ERROR_MESSAGE,
  });
  const coerceInteger = v.coerce.number().integer({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(integer.validate(0.1)).toBe(ERROR_MESSAGE);
    expect(integer.validate(-1.1)).toBe(ERROR_MESSAGE);
    expect(integer.validate(-10.1)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceInteger.validate("0.1")).toBe(ERROR_MESSAGE);
    expect(coerceInteger.validate("-1.1")).toBe(ERROR_MESSAGE);
    expect(coerceInteger.validate("-10.1")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const integerBoolean = v.number().integer({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const integerFunction = v.number().integer({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceIntegerBoolean = v.coerce.number().integer({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceIntegerFunction = v.coerce.number().integer({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(integerBoolean.validate(0.1)).toBe(true);
    expect(integerFunction.validate(0.1)).toBe(true);
    expect(integerBoolean.validate(-100.1)).toBe(true);
    expect(integerFunction.validate(-100.1)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceIntegerBoolean.validate("0.1")).toBe(true);
    expect(coerceIntegerFunction.validate("0.1")).toBe(true);
    expect(coerceIntegerBoolean.validate("-100.1")).toBe(true);
    expect(coerceIntegerFunction.validate("-100.1")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().integer().validate(-5.1)).toBe(
      DEFAULT_MAP.NUMBER.integer
    );
    expect(v.coerce.number().integer().validate("-5.1")).toBe(
      DEFAULT_MAP.NUMBER.integer
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        integer: "Integer!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().integer().validate(-5.1)).toBe(MAP.NUMBER.integer);
    expect(v.coerce.number().integer().validate("-5.1")).toBe(
      MAP.NUMBER.integer
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.integer") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().integer().validate(-5.1)).toBe(
      TRANSLATE("VESO.NUMBER.integer")
    );
    expect(v.coerce.number().integer().validate("-5.1")).toBe(
      TRANSLATE("VESO.NUMBER.integer")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
