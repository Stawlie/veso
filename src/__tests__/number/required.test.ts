import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates empty string (without required)", () => {
  const coerceRequired = v.coerce.number();
  const coerceRequiredWithMoreChecks = v.coerce.number().min(5).multipleOf(5);

  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(true);
    expect(coerceRequiredWithMoreChecks.validate("")).toBe(true);
  });
});

describe("Validates null (without required)", () => {
  const required = v.number();
  const requiredWithMoreChecks = v.number().min(5).multipleOf(5);
  const coerceRequired = v.coerce.number();
  const coerceRequiredWithMoreChecks = v.coerce.number().min(5).multipleOf(5);

  it("Without coerce", () => {
    expect(required.validate(null)).toBe(true);
    expect(requiredWithMoreChecks.validate(null)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(null)).toBe(true);
    expect(coerceRequiredWithMoreChecks.validate(null)).toBe(true);
  });
});

describe("Validates undefined (without required)", () => {
  const required = v.number();
  const requiredWithMoreChecks = v.number().min(5).multipleOf(5);
  const coerceRequired = v.coerce.number();
  const coerceRequiredWithMoreChecks = v.coerce.number().min(5).multipleOf(5);

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(true);
    expect(requiredWithMoreChecks.validate(undefined)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(true);
    expect(coerceRequiredWithMoreChecks.validate(undefined)).toBe(true);
  });
});

describe("Validates empty string", () => {
  const coerceRequired = v.coerce.number().required({
    message: ERROR_MESSAGE,
  });

  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates null", () => {
  const required = v.number().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.number().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(null)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(null)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates undefined", () => {
  const required = v.number().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.number().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates any number", () => {
  const required = v.number().required();
  const coerceRequired = v.coerce.number().required();

  it("Without coerce", () => {
    expect(required.validate(365)).toBe(true);
    expect(required.validate(65535)).toBe(true);
    expect(required.validate(255)).toBe(true);
    expect(required.validate(13.37)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(365)).toBe(true);
    expect(coerceRequired.validate(65535)).toBe(true);
    expect(coerceRequired.validate(255)).toBe(true);
    expect(coerceRequired.validate(13.37)).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const requiredBoolean = v.number().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const requiredBooleanWithMoreChecks = v
    .number()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .min(5)
    .multipleOf(5);

  const requiredFunction = v.number().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const requiredFunctionWithMoreChecks = v
    .number()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .min(5)
    .multipleOf(5);

  const coerceRequiredBoolean = v.coerce.number().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const coerceRequiredBooleanWithMoreChecks = v.coerce
    .number()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .min(5)
    .multipleOf(5);

  const coerceRequiredFunction = v.coerce.number().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const coerceRequiredFunctionWithMoreChecks = v.coerce
    .number()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .min(5)
    .multipleOf(5);

  it("Without coerce", () => {
    expect(requiredBoolean.validate(null)).toBe(true);
    expect(requiredBooleanWithMoreChecks.validate(null)).toBe(true);
    expect(requiredFunction.validate(null)).toBe(true);
    expect(requiredFunctionWithMoreChecks.validate(null)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceRequiredBoolean.validate("")).toBe(true);
    expect(coerceRequiredBooleanWithMoreChecks.validate("")).toBe(true);
    expect(coerceRequiredFunction.validate("")).toBe(true);
    expect(coerceRequiredFunctionWithMoreChecks.validate("")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().required().validate(null)).toBe(
      DEFAULT_MAP.NUMBER.required
    );
    expect(v.coerce.number().required().validate("")).toBe(
      DEFAULT_MAP.NUMBER.required
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        required: "Required!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().required().validate(null)).toBe(MAP.NUMBER.required);
    expect(v.coerce.number().required().validate("")).toBe(MAP.NUMBER.required);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.required") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().required().validate(null)).toBe(
      TRANSLATE("VESO.NUMBER.required")
    );
    expect(v.coerce.number().required().validate("")).toBe(
      TRANSLATE("VESO.NUMBER.required")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
