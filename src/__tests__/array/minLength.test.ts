import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower minLength", () => {
  const minLength = v.array().minLength(2, {
    message: ERROR_MESSAGE,
  });

  it("Lower minLength", () => {
    expect(minLength.validate([1])).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact minLength", () => {
  const minLength = v.array().minLength(2);

  it("Exact minLength", () => {
    expect(minLength.validate([1, 2])).toBe(true);
  });
});

describe("Validates higher minLength", () => {
  const minLength = v.array().minLength(2);

  it("Higher minLength", () => {
    expect(minLength.validate([1, 2, 3])).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const minLengthBoolean = v.array().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const minLengthFunction = v.array().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(minLengthBoolean.validate([1])).toBe(true);
    expect(minLengthFunction.validate([1])).toBe(true);
    expect(minLengthBoolean.validate([1, 2])).toBe(true);
    expect(minLengthFunction.validate([1, 2])).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.array().minLength(3).validate([1])).toBe(
      insertParams(DEFAULT_MAP.ARRAY.minLength, { minLength: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      ARRAY: {
        minLength: "MinLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.array().minLength(3).validate([1])).toBe(MAP.ARRAY.minLength);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.ARRAY.minLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.array().minLength(3).validate([1])).toBe(
      TRANSLATE("VESO.ARRAY.minLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
