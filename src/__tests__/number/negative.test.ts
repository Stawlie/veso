import { setMap, setTranslate, v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates negative", () => {
  const negative = v.number().negative();
  const coerceNegative = v.coerce.number().negative();

  it("Without coerce", () => {
    expect(negative.validate(-1)).toBe(true);
    expect(negative.validate(-10)).toBe(true);
    expect(negative.validate(-100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNegative.validate("-1")).toBe(true);
    expect(coerceNegative.validate("-10")).toBe(true);
    expect(coerceNegative.validate("-100")).toBe(true);
  });
});

describe("Validates not negative", () => {
  const negative = v.number().negative({
    message: ERROR_MESSAGE,
  });
  const coerceNegative = v.coerce.number().negative({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(negative.validate(0)).toBe(ERROR_MESSAGE);
    expect(negative.validate(1)).toBe(ERROR_MESSAGE);
    expect(negative.validate(10)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNegative.validate("0")).toBe(ERROR_MESSAGE);
    expect(coerceNegative.validate("1")).toBe(ERROR_MESSAGE);
    expect(coerceNegative.validate("10")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const negativeBoolean = v.number().negative({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const negativeFunction = v.number().negative({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNegativeBoolean = v.coerce.number().negative({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNegativeFunction = v.coerce.number().negative({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(negativeBoolean.validate(0)).toBe(true);
    expect(negativeFunction.validate(0)).toBe(true);
    expect(negativeBoolean.validate(100)).toBe(true);
    expect(negativeFunction.validate(100)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNegativeBoolean.validate("0")).toBe(true);
    expect(coerceNegativeFunction.validate("0")).toBe(true);
    expect(coerceNegativeBoolean.validate("100")).toBe(true);
    expect(coerceNegativeFunction.validate("100")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().negative().validate(5)).toBe(DEFAULT_MAP.NUMBER.negative);
    expect(v.coerce.number().negative().validate("5")).toBe(
      DEFAULT_MAP.NUMBER.negative
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        negative: "Negative!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().negative().validate(5)).toBe(MAP.NUMBER.negative);
    expect(v.coerce.number().negative().validate("5")).toBe(
      MAP.NUMBER.negative
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.negative") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().negative().validate(5)).toBe(
      TRANSLATE("VESO.NUMBER.negative")
    );
    expect(v.coerce.number().negative().validate("5")).toBe(
      TRANSLATE("VESO.NUMBER.negative")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
