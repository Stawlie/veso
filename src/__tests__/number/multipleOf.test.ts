import { setMap, setTranslate, v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates multipleOf", () => {
  const multipleOf = v.number().multipleOf(3);
  const coerceMultipleOf = v.coerce.number().multipleOf(3);

  it("Without coerce", () => {
    expect(multipleOf.validate(3)).toBe(true);
    expect(multipleOf.validate(6)).toBe(true);
    expect(multipleOf.validate(63)).toBe(true);
    expect(multipleOf.validate(69)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceMultipleOf.validate("3")).toBe(true);
    expect(coerceMultipleOf.validate("6")).toBe(true);
    expect(coerceMultipleOf.validate("63")).toBe(true);
    expect(coerceMultipleOf.validate("69")).toBe(true);
  });
});

describe("Validates not multipleOf", () => {
  const multipleOf = v.number().multipleOf(3, {
    message: ERROR_MESSAGE,
  });
  const coerceMultipleOf = v.coerce.number().multipleOf(3, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(multipleOf.validate(-1)).toBe(ERROR_MESSAGE);
    expect(multipleOf.validate(-10)).toBe(ERROR_MESSAGE);
    expect(multipleOf.validate(-100)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMultipleOf.validate("-1")).toBe(ERROR_MESSAGE);
    expect(coerceMultipleOf.validate("-10")).toBe(ERROR_MESSAGE);
    expect(coerceMultipleOf.validate("-100")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const multipleOfBoolean = v.number().multipleOf(3, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const multipleOfFunction = v.number().multipleOf(3, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMultipleOfBoolean = v.coerce.number().multipleOf(3, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMultipleOfFunction = v.coerce.number().multipleOf(3, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(multipleOfBoolean.validate(-1)).toBe(true);
    expect(multipleOfFunction.validate(-1)).toBe(true);
    expect(multipleOfBoolean.validate(-100)).toBe(true);
    expect(multipleOfFunction.validate(-100)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMultipleOfBoolean.validate("-1")).toBe(true);
    expect(coerceMultipleOfFunction.validate("-1")).toBe(true);
    expect(coerceMultipleOfBoolean.validate("-100")).toBe(true);
    expect(coerceMultipleOfFunction.validate("-100")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().multipleOf(3).validate(-5)).toBe(
      insertParams(DEFAULT_MAP.NUMBER.multipleOf, { multipleOf: 3 })
    );
    expect(v.coerce.number().multipleOf(3).validate("-5")).toBe(
      insertParams(DEFAULT_MAP.NUMBER.multipleOf, { multipleOf: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        multipleOf: "MultipleOf!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().multipleOf(3).validate(-5)).toBe(MAP.NUMBER.multipleOf);
    expect(v.coerce.number().multipleOf(3).validate("-5")).toBe(
      MAP.NUMBER.multipleOf
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.multipleOf") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().multipleOf(3).validate(-5)).toBe(
      TRANSLATE("VESO.NUMBER.multipleOf")
    );
    expect(v.coerce.number().multipleOf(3).validate("-5")).toBe(
      TRANSLATE("VESO.NUMBER.multipleOf")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
