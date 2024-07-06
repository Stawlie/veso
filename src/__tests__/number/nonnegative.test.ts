import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates nonnegative", () => {
  const nonnegative = v.number().nonnegative();
  const coerceNonnegative = v.coerce.number().nonnegative();

  it("Without coerce", () => {
    expect(nonnegative.validate(0)).toBe(true);
    expect(nonnegative.validate(1)).toBe(true);
    expect(nonnegative.validate(10)).toBe(true);
    expect(nonnegative.validate(100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNonnegative.validate("0")).toBe(true);
    expect(coerceNonnegative.validate("1")).toBe(true);
    expect(coerceNonnegative.validate("10")).toBe(true);
    expect(coerceNonnegative.validate("100")).toBe(true);
  });
});

describe("Validates not nonnegative", () => {
  const nonnegative = v.number().nonnegative({
    message: ERROR_MESSAGE,
  });
  const coerceNonnegative = v.coerce.number().nonnegative({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(nonnegative.validate(-1)).toBe(ERROR_MESSAGE);
    expect(nonnegative.validate(-10)).toBe(ERROR_MESSAGE);
    expect(nonnegative.validate(-100)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNonnegative.validate("-1")).toBe(ERROR_MESSAGE);
    expect(coerceNonnegative.validate("-10")).toBe(ERROR_MESSAGE);
    expect(coerceNonnegative.validate("-100")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const nonnegativeBoolean = v.number().nonnegative({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const nonnegativeFunction = v.number().nonnegative({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNonnegativeBoolean = v.coerce.number().nonnegative({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNonnegativeFunction = v.coerce.number().nonnegative({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(nonnegativeBoolean.validate(-1)).toBe(true);
    expect(nonnegativeFunction.validate(-1)).toBe(true);
    expect(nonnegativeBoolean.validate(-100)).toBe(true);
    expect(nonnegativeFunction.validate(-100)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNonnegativeBoolean.validate("-1")).toBe(true);
    expect(coerceNonnegativeFunction.validate("-1")).toBe(true);
    expect(coerceNonnegativeBoolean.validate("-100")).toBe(true);
    expect(coerceNonnegativeFunction.validate("-100")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().nonnegative().validate(-5)).toBe(
      DEFAULT_MAP.NUMBER.nonnegative
    );
    expect(v.coerce.number().nonnegative().validate("-5")).toBe(
      DEFAULT_MAP.NUMBER.nonnegative
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        nonnegative: "Nonnegative!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().nonnegative().validate(-5)).toBe(MAP.NUMBER.nonnegative);
    expect(v.coerce.number().nonnegative().validate("-5")).toBe(
      MAP.NUMBER.nonnegative
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.nonnegative") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().nonnegative().validate(-5)).toBe(
      TRANSLATE("VESO.NUMBER.nonnegative")
    );
    expect(v.coerce.number().nonnegative().validate("-5")).toBe(
      TRANSLATE("VESO.NUMBER.nonnegative")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
