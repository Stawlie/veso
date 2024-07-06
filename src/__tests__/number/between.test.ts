import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower between range", () => {
  const between = v.number().between(2, 5, {
    message: ERROR_MESSAGE,
  });
  const coerceBetween = v.coerce.number().between(2, 5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(between.validate(1)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceBetween.validate("1")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates between range", () => {
  const between = v.number().between(2, 5);
  const coerceBetween = v.coerce.number().between(2, 5);

  it("Without coerce", () => {
    expect(between.validate(2)).toBe(true);
    expect(between.validate(3)).toBe(true);
    expect(between.validate(4)).toBe(true);
    expect(between.validate(5)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceBetween.validate("2")).toBe(true);
    expect(coerceBetween.validate("3")).toBe(true);
    expect(coerceBetween.validate("4")).toBe(true);
    expect(coerceBetween.validate("5")).toBe(true);
  });
});

describe("Validates higher between range", () => {
  const between = v.number().between(2, 5, {
    message: ERROR_MESSAGE,
  });
  const coerceBetween = v.coerce.number().between(2, 5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(between.validate(7)).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceBetween.validate("7")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const betweenBoolean = v.number().between(2, 5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const betweenFunction = v.number().between(2, 5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceBetweenBoolean = v.coerce.number().between(2, 5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceBetweenFunction = v.coerce.number().between(2, 5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(betweenBoolean.validate(7)).toBe(true);
    expect(betweenFunction.validate(7)).toBe(true);
    expect(betweenBoolean.validate(9)).toBe(true);
    expect(betweenFunction.validate(9)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceBetweenBoolean.validate("7")).toBe(true);
    expect(coerceBetweenFunction.validate("7")).toBe(true);
    expect(coerceBetweenBoolean.validate("9")).toBe(true);
    expect(coerceBetweenFunction.validate("9")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().between(2, 3).validate(5)).toBe(
      insertParams(DEFAULT_MAP.NUMBER.between, { min: 2, max: 3 })
    );
    expect(v.coerce.number().between(2, 3).validate("5")).toBe(
      insertParams(DEFAULT_MAP.NUMBER.between, { min: 2, max: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        between: "Between!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().between(2, 3).validate(5)).toBe(MAP.NUMBER.between);
    expect(v.coerce.number().between(2, 3).validate("5")).toBe(
      MAP.NUMBER.between
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.between") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().between(2, 3).validate(5)).toBe(
      TRANSLATE("VESO.NUMBER.between")
    );
    expect(v.coerce.number().between(2, 3).validate("5")).toBe(
      TRANSLATE("VESO.NUMBER.between")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
