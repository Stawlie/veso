import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates null (without required)", () => {
  const required = v.array();
  const requiredWithMoreChecks = v.array().minLength(5);

  it("Null test", () => {
    expect(required.validate(null)).toBe(true);
    expect(requiredWithMoreChecks.validate(null)).toBe(true);
  });
});

describe("Validates undefined (without required)", () => {
  const required = v.array();
  const requiredWithMoreChecks = v.array().minLength(5);

  it("Undefined test", () => {
    expect(required.validate(undefined)).toBe(true);
    expect(requiredWithMoreChecks.validate(undefined)).toBe(true);
  });
});

describe("Validates null", () => {
  const required = v.array().required({
    message: ERROR_MESSAGE,
  });
  const requiredWithMoreChecks = v.array().minLength(5).required({
    message: ERROR_MESSAGE,
  });

  it("Null test", () => {
    expect(required.validate(null)).toBe(ERROR_MESSAGE);
    expect(requiredWithMoreChecks.validate(null)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates undefined", () => {
  const required = v.array().required({
    message: ERROR_MESSAGE,
  });
  const requiredWithMoreChecks = v.array().minLength(5).required({
    message: ERROR_MESSAGE,
  });

  it("Undefined test", () => {
    expect(required.validate(undefined)).toBe(ERROR_MESSAGE);
    expect(requiredWithMoreChecks.validate(undefined)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates any array", () => {
  const required = v.array().required();

  it("Array test", () => {
    expect(required.validate([1])).toBe(true);
    expect(required.validate([1, 2])).toBe(true);
    expect(required.validate([1, 2, 3])).toBe(true);
    expect(required.validate([1, 2, 3, 4])).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const requiredBoolean = v.array().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const requiredBooleanWithMoreChecks = v
    .array()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .minLength(5);

  const requiredFunction = v.array().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const requiredFunctionWithMoreChecks = v
    .array()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .minLength(5);

  it("validateIf test", () => {
    expect(requiredBoolean.validate(null)).toBe(true);
    expect(requiredBoolean.validate(undefined)).toBe(true);
    expect(requiredBooleanWithMoreChecks.validate(null)).toBe(true);
    expect(requiredBooleanWithMoreChecks.validate(undefined)).toBe(true);
    expect(requiredFunction.validate(null)).toBe(true);
    expect(requiredFunction.validate(undefined)).toBe(true);
    expect(requiredFunctionWithMoreChecks.validate(null)).toBe(true);
    expect(requiredFunctionWithMoreChecks.validate(undefined)).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.array().required().validate(null)).toBe(
      DEFAULT_MAP.NUMBER.required
    );
  });

  it("MAP message", () => {
    const MAP = {
      ARRAY: {
        required: "Required!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.array().required().validate(null)).toBe(MAP.ARRAY.required);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.ARRAY.required") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.array().required().validate(null)).toBe(
      TRANSLATE("VESO.ARRAY.required")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
