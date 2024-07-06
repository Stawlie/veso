import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower maxLength", () => {
  const maxLength = v.array().maxLength(2);

  it("Lower maxLength", () => {
    expect(maxLength.validate([1])).toBe(true);
  });
});

describe("Validates exact maxLength", () => {
  const maxLength = v.array().maxLength(2);

  it("Exact maxLength", () => {
    expect(maxLength.validate([1, 2])).toBe(true);
  });
});

describe("Validates higher maxLength", () => {
  const maxLength = v.array().maxLength(2, {
    message: ERROR_MESSAGE,
  });

  it("Higher maxLength", () => {
    expect(maxLength.validate([1, 2, 3])).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const maxLengthBoolean = v.array().maxLength(1, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const maxLengthFunction = v.array().maxLength(1, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(maxLengthBoolean.validate([1, 2, 3])).toBe(true);
    expect(maxLengthFunction.validate([1, 2, 3])).toBe(true);
    expect(maxLengthBoolean.validate([1, 2])).toBe(true);
    expect(maxLengthFunction.validate([1, 2])).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.array().maxLength(1).validate([1, 2])).toBe(
      insertParams(DEFAULT_MAP.ARRAY.maxLength, { maxLength: 1 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      ARRAY: {
        maxLength: "MinLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.array().maxLength(1).validate([1, 2])).toBe(MAP.ARRAY.maxLength);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.ARRAY.maxLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.array().maxLength(1).validate([1, 2])).toBe(
      TRANSLATE("VESO.ARRAY.maxLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
