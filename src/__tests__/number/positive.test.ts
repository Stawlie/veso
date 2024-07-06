import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates positive", () => {
  const positive = v.number().positive();
  const coercePositive = v.coerce.number().positive();

  it("Without coerce", () => {
    expect(positive.validate(1)).toBe(true);
    expect(positive.validate(10)).toBe(true);
    expect(positive.validate(100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coercePositive.validate("1")).toBe(true);
    expect(coercePositive.validate("10")).toBe(true);
    expect(coercePositive.validate("100")).toBe(true);
  });
});

describe("Validates not positive", () => {
  const positive = v.number().positive({
    message: ERROR_MESSAGE,
  });
  const coercePositive = v.coerce.number().positive({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(positive.validate(0)).toBe(ERROR_MESSAGE);
    expect(positive.validate(-1)).toBe(ERROR_MESSAGE);
    expect(positive.validate(-10)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coercePositive.validate("0")).toBe(ERROR_MESSAGE);
    expect(coercePositive.validate("-1")).toBe(ERROR_MESSAGE);
    expect(coercePositive.validate("-10")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const positiveBoolean = v.number().positive({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const positiveFunction = v.number().positive({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coercePositiveBoolean = v.coerce.number().positive({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coercePositiveFunction = v.coerce.number().positive({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(positiveBoolean.validate(0)).toBe(true);
    expect(positiveFunction.validate(0)).toBe(true);
    expect(positiveBoolean.validate(-100)).toBe(true);
    expect(positiveFunction.validate(-100)).toBe(true);
  });

  it("With coerce", () => {
    expect(coercePositiveBoolean.validate("0")).toBe(true);
    expect(coercePositiveFunction.validate("0")).toBe(true);
    expect(coercePositiveBoolean.validate("-100")).toBe(true);
    expect(coercePositiveFunction.validate("-100")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().positive().validate(-5)).toBe(
      DEFAULT_MAP.NUMBER.positive
    );
    expect(v.coerce.number().positive().validate("-5")).toBe(
      DEFAULT_MAP.NUMBER.positive
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        positive: "Positive!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().positive().validate(-5)).toBe(MAP.NUMBER.positive);
    expect(v.coerce.number().positive().validate("-5")).toBe(
      MAP.NUMBER.positive
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.positive") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().positive().validate(-5)).toBe(
      TRANSLATE("VESO.NUMBER.positive")
    );
    expect(v.coerce.number().positive().validate("-5")).toBe(
      TRANSLATE("VESO.NUMBER.positive")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
