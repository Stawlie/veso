import { setMap, setTranslate, v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates nonpositive", () => {
  const nonpositive = v.number().nonpositive();
  const coerceNonpositive = v.coerce.number().nonpositive();

  it("Without coerce", () => {
    expect(nonpositive.validate(0)).toBe(true);
    expect(nonpositive.validate(-1)).toBe(true);
    expect(nonpositive.validate(-10)).toBe(true);
    expect(nonpositive.validate(-100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNonpositive.validate("0")).toBe(true);
    expect(coerceNonpositive.validate("-1")).toBe(true);
    expect(coerceNonpositive.validate("-10")).toBe(true);
    expect(coerceNonpositive.validate("-100")).toBe(true);
  });
});

describe("Validates not nonpositive", () => {
  const nonpositive = v.number().nonpositive({
    message: ERROR_MESSAGE,
  });
  const coerceNonpositive = v.coerce.number().nonpositive({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(nonpositive.validate(1)).toBe(ERROR_MESSAGE);
    expect(nonpositive.validate(10)).toBe(ERROR_MESSAGE);
    expect(nonpositive.validate(100)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNonpositive.validate("1")).toBe(ERROR_MESSAGE);
    expect(coerceNonpositive.validate("10")).toBe(ERROR_MESSAGE);
    expect(coerceNonpositive.validate("100")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const nonpositiveBoolean = v.number().nonpositive({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const nonpositiveFunction = v.number().nonpositive({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNonpositiveBoolean = v.coerce.number().nonpositive({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNonpositiveFunction = v.coerce.number().nonpositive({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(nonpositiveBoolean.validate(1)).toBe(true);
    expect(nonpositiveFunction.validate(1)).toBe(true);
    expect(nonpositiveBoolean.validate(100)).toBe(true);
    expect(nonpositiveFunction.validate(100)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNonpositiveBoolean.validate("1")).toBe(true);
    expect(coerceNonpositiveFunction.validate("1")).toBe(true);
    expect(coerceNonpositiveBoolean.validate("100")).toBe(true);
    expect(coerceNonpositiveFunction.validate("100")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().nonpositive().validate(5)).toBe(
      DEFAULT_MAP.NUMBER.nonpositive
    );
    expect(v.coerce.number().nonpositive().validate("5")).toBe(
      DEFAULT_MAP.NUMBER.nonpositive
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        nonpositive: "Non-positive!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().nonpositive().validate(5)).toBe(MAP.NUMBER.nonpositive);
    expect(v.coerce.number().nonpositive().validate("5")).toBe(
      MAP.NUMBER.nonpositive
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.nonpositive") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().nonpositive().validate(5)).toBe(
      TRANSLATE("VESO.NUMBER.nonpositive")
    );
    expect(v.coerce.number().nonpositive().validate("5")).toBe(
      TRANSLATE("VESO.NUMBER.nonpositive")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
