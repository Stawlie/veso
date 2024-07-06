import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower exactLength", () => {
  const exactLength = v.array().exactLength(2, {
    message: ERROR_MESSAGE,
  });

  it("Lower exactLength", () => {
    expect(exactLength.validate([1])).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact exactLength", () => {
  const exactLength = v.array().exactLength(2);

  it("Exact exactLength", () => {
    expect(exactLength.validate([1, 2])).toBe(true);
  });
});

describe("Validates higher exactLength", () => {
  const exactLength = v.array().exactLength(2, {
    message: ERROR_MESSAGE,
  });

  it("Higher exactLength", () => {
    expect(exactLength.validate([1, 2, 3])).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const exactLengthBoolean = v.array().exactLength(1, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const exactLengthFunction = v.array().exactLength(1, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(exactLengthBoolean.validate([1, 2, 3])).toBe(true);
    expect(exactLengthFunction.validate([1, 2, 3])).toBe(true);
    expect(exactLengthBoolean.validate([1, 2])).toBe(true);
    expect(exactLengthFunction.validate([1, 2])).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.array().exactLength(1).validate([1, 2])).toBe(
      insertParams(DEFAULT_MAP.ARRAY.exactLength, { exactLength: 1 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      ARRAY: {
        exactLength: "MinLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.array().exactLength(1).validate([1, 2])).toBe(
      MAP.ARRAY.exactLength
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.ARRAY.exactLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.array().exactLength(1).validate([1, 2])).toBe(
      TRANSLATE("VESO.ARRAY.exactLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
