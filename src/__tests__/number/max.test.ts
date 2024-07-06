import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower max", () => {
  const max = v.number().max(5);
  const coerceMax = v.coerce.number().max(5);

  it("Without coerce", () => {
    expect(max.validate(3)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceMax.validate("3")).toBe(true);
  });
});

describe("Validates exact max", () => {
  const max = v.number().max(5);
  const coerceMax = v.coerce.number().max(5);

  it("Without coerce", () => {
    expect(max.validate(5)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMax.validate("5")).toBe(true);
  });
});

describe("Validates higher max", () => {
  const max = v.number().max(5, {
    message: ERROR_MESSAGE,
  });
  const coerceMax = v.coerce.number().max(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(max.validate(7)).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceMax.validate("7")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const maxBoolean = v.number().max(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const maxFunction = v.number().max(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMaxBoolean = v.coerce.number().max(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMaxFunction = v.coerce.number().max(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(maxBoolean.validate(7)).toBe(true);
    expect(maxFunction.validate(7)).toBe(true);
    expect(maxBoolean.validate(9)).toBe(true);
    expect(maxFunction.validate(9)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMaxBoolean.validate("7")).toBe(true);
    expect(coerceMaxFunction.validate("7")).toBe(true);
    expect(coerceMaxBoolean.validate("9")).toBe(true);
    expect(coerceMaxFunction.validate("9")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().max(3).validate(5)).toBe(
      insertParams(DEFAULT_MAP.NUMBER.max, { max: 3 })
    );
    expect(v.coerce.number().max(3).validate("5")).toBe(
      insertParams(DEFAULT_MAP.NUMBER.max, { max: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        max: "Max!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().max(3).validate(5)).toBe(MAP.NUMBER.max);
    expect(v.coerce.number().max(3).validate("5")).toBe(MAP.NUMBER.max);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.max") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().max(3).validate(5)).toBe(TRANSLATE("VESO.NUMBER.max"));
    expect(v.coerce.number().max(3).validate("5")).toBe(
      TRANSLATE("VESO.NUMBER.max")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
