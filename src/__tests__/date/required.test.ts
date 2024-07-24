import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates empty string (without required)", () => {
  const coerceRequired = v.coerce.date();
  const coerceRequiredWithMoreChecks = v.coerce.date().min(new Date(1000));

  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(true);
    expect(coerceRequiredWithMoreChecks.validate("")).toBe(true);
  });
});

describe("Validates null (without required)", () => {
  const required = v.date();
  const requiredWithMoreChecks = v.date().min(new Date(1000));
  const coerceRequired = v.coerce.date();
  const coerceRequiredWithMoreChecks = v.coerce.date().min(new Date(1000));

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
  const required = v.date();
  const requiredWithMoreChecks = v.date().min(new Date(1000));
  const coerceRequired = v.coerce.date();
  const coerceRequiredWithMoreChecks = v.coerce.date().min(new Date(1000));

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
  const coerceRequired = v.coerce.date().required({
    message: ERROR_MESSAGE,
  });

  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates null", () => {
  const required = v.date().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.date().required({
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
  const required = v.date().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.date().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates any date", () => {
  const required = v.date().required();
  const coerceRequired = v.coerce.date().required();

  it("Without coerce", () => {
    expect(required.validate(new Date(10))).toBe(true);
    expect(required.validate(new Date(100))).toBe(true);
    expect(required.validate(new Date(1000))).toBe(true);
    expect(required.validate(new Date())).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(new Date(10).toDateString())).toBe(true);
    expect(coerceRequired.validate(new Date(100).toDateString())).toBe(true);
    expect(coerceRequired.validate(new Date(1000).toDateString())).toBe(true);
    expect(coerceRequired.validate(new Date().toDateString())).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const requiredBoolean = v.date().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const requiredBooleanWithMoreChecks = v
    .date()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .min(new Date(1000));

  const requiredFunction = v.date().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const requiredFunctionWithMoreChecks = v
    .date()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .min(new Date(1000));

  const coerceRequiredBoolean = v.coerce.date().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const coerceRequiredBooleanWithMoreChecks = v.coerce
    .date()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .min(new Date(1000));

  const coerceRequiredFunction = v.coerce.date().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const coerceRequiredFunctionWithMoreChecks = v.coerce
    .date()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .min(new Date(1000));

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
    expect(v.date().required().validate(null)).toBe(
      DEFAULT_MAP.NUMBER.required
    );
    expect(v.coerce.date().required().validate("")).toBe(
      DEFAULT_MAP.NUMBER.required
    );
  });

  it("MAP message", () => {
    const MAP = {
      DATE: {
        required: "Required!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.date().required().validate(null)).toBe(MAP.DATE.required);
    expect(v.coerce.date().required().validate("")).toBe(MAP.DATE.required);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.DATE.required") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.date().required().validate(null)).toBe(
      TRANSLATE("VESO.DATE.required")
    );
    expect(v.coerce.date().required().validate("")).toBe(
      TRANSLATE("VESO.DATE.required")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
