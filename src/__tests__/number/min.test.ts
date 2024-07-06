import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower min", () => {
  const min = v.number().min(5, {
    message: ERROR_MESSAGE,
  });
  const coerceMin = v.coerce.number().min(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(min.validate(3)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMin.validate("3")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact min", () => {
  const min = v.number().min(5);
  const coerceMin = v.coerce.number().min(5);

  it("Without coerce", () => {
    expect(min.validate(5)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMin.validate("5")).toBe(true);
  });
});

describe("Validates higher min", () => {
  const min = v.number().min(5);
  const coerceMin = v.coerce.number().min(5);

  it("Without coerce", () => {
    expect(min.validate(7)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMin.validate("7")).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const minBoolean = v.number().min(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const minFunction = v.number().min(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMinBoolean = v.coerce.number().min(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMinFunction = v.coerce.number().min(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(minBoolean.validate(3)).toBe(true);
    expect(minFunction.validate(3)).toBe(true);
    expect(minBoolean.validate(1)).toBe(true);
    expect(minFunction.validate(1)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinBoolean.validate("3")).toBe(true);
    expect(coerceMinFunction.validate("3")).toBe(true);
    expect(coerceMinBoolean.validate("1")).toBe(true);
    expect(coerceMinFunction.validate("1")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().min(3).validate(0)).toBe(
      insertParams(DEFAULT_MAP.NUMBER.min, { min: 3 })
    );
    expect(v.coerce.number().min(3).validate("0")).toBe(
      insertParams(DEFAULT_MAP.NUMBER.min, { min: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        min: "Min!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().min(3).validate(0)).toBe(MAP.NUMBER.min);
    expect(v.coerce.number().min(3).validate("0")).toBe(MAP.NUMBER.min);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.min") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().min(3).validate(0)).toBe(TRANSLATE("VESO.NUMBER.min"));
    expect(v.coerce.number().min(3).validate("0")).toBe(
      TRANSLATE("VESO.NUMBER.min")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
