import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates not in array", () => {
  const notIn = v.number().notIn([1, 2]);
  const coerceNotIn = v.coerce.number().notIn([1, 2]);

  it("Without coerce", () => {
    expect(notIn.validate(3)).toBe(true);
    expect(notIn.validate(4)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("3")).toBe(true);
    expect(coerceNotIn.validate("4")).toBe(true);
  });
});

describe("Validates in array", () => {
  const notIn = v.number().notIn([1, 2], {
    message: ERROR_MESSAGE,
  });
  const coerceNotIn = v.coerce.number().notIn([1, 2], {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(notIn.validate(1)).toBe(ERROR_MESSAGE);
    expect(notIn.validate(2)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("1")).toBe(ERROR_MESSAGE);
    expect(coerceNotIn.validate("2")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const notInBoolean = v.number().notIn([321, 123], {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const notInFunction = v.number().notIn([321, 123], {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNotInBoolean = v.coerce.number().notIn([321, 123], {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNotInFunction = v.coerce.number().notIn([321, 123], {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(notInBoolean.validate(321)).toBe(true);
    expect(notInFunction.validate(321)).toBe(true);
    expect(notInBoolean.validate(123)).toBe(true);
    expect(notInFunction.validate(123)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNotInBoolean.validate("321")).toBe(true);
    expect(coerceNotInFunction.validate("321")).toBe(true);
    expect(coerceNotInBoolean.validate("123")).toBe(true);
    expect(coerceNotInFunction.validate("123")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().notIn([321, 123]).validate(321)).toBe(
      insertParams(DEFAULT_MAP.NUMBER.notIn, { notIn: [321, 123] })
    );
    expect(v.coerce.number().notIn([321, 123]).validate("123")).toBe(
      insertParams(DEFAULT_MAP.NUMBER.notIn, { notIn: [321, 123] })
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        notIn: "NotIn!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().notIn([321, 123]).validate(321)).toBe(MAP.NUMBER.notIn);
    expect(v.coerce.number().notIn([321, 123]).validate("123")).toBe(
      MAP.NUMBER.notIn
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.notIn") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().notIn([321, 123]).validate(321)).toBe(
      TRANSLATE("VESO.NUMBER.notIn")
    );
    expect(v.coerce.number().notIn([321, 123]).validate("123")).toBe(
      TRANSLATE("VESO.NUMBER.notIn")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
