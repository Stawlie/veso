import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates empty string (without required)", () => {
  const required = v.string();
  const requiredWithMoreChecks = v.string().minLength(5).ip();
  const coerceRequired = v.coerce.string();
  const coerceRequiredWithMoreChecks = v.string().minLength(5).ip();

  it("Without coerce", () => {
    expect(required.validate("")).toBe(true);
    expect(requiredWithMoreChecks.validate("")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(true);
    expect(coerceRequiredWithMoreChecks.validate("")).toBe(true);
  });
});

describe("Validates null (without required)", () => {
  const required = v.string();
  const requiredWithMoreChecks = v.string().minLength(5).ip();
  const coerceRequired = v.coerce.string();
  const coerceRequiredWithMoreChecks = v.string().minLength(5).ip();

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
  const required = v.string();
  const requiredWithMoreChecks = v.string().minLength(5).ip();
  const coerceRequired = v.coerce.string();
  const coerceRequiredWithMoreChecks = v.string().minLength(5).ip();

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
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate("")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates null", () => {
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
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
  const required = v.string().required({
    message: ERROR_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate(undefined)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate(undefined)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates any non-empty string", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate("test")).toBe(true);
    expect(required.validate("hehehehe")).toBe(true);
    expect(required.validate("iambluedabudidabudai")).toBe(true);
    expect(required.validate("anynonemptystring")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("test")).toBe(true);
    expect(coerceRequired.validate("hehehehe")).toBe(true);
    expect(coerceRequired.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceRequired.validate("anynonemptystring")).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const requiredBoolean = v.string().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const requiredBooleanWithMoreChecks = v
    .string()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .minLength(5)
    .ip();

  const requiredFunction = v.string().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const requiredFunctionWithMoreChecks = v
    .string()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .minLength(5)
    .ip();

  const coerceRequiredBoolean = v.coerce.string().required({
    message: ERROR_MESSAGE,
    validateIf: false,
  });
  const coerceRequiredBooleanWithMoreChecks = v.coerce
    .string()
    .required({
      message: ERROR_MESSAGE,
      validateIf: false,
    })
    .minLength(5)
    .ip();

  const coerceRequiredFunction = v.coerce.string().required({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });
  const coerceRequiredFunctionWithMoreChecks = v.coerce
    .string()
    .required({
      message: ERROR_MESSAGE,
      validateIf: () => false,
    })
    .minLength(5)
    .ip();

  it("Without coerce", () => {
    expect(requiredBoolean.validate("")).toBe(true);
    expect(requiredBooleanWithMoreChecks.validate("")).toBe(true);
    expect(requiredFunction.validate("")).toBe(true);
    expect(requiredFunctionWithMoreChecks.validate("")).toBe(true);
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
    expect(v.string().required().validate("")).toBe(
      DEFAULT_MAP.STRING.required
    );
    expect(v.coerce.string().required().validate(null)).toBe(
      DEFAULT_MAP.STRING.required
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        required: "Required!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().required().validate("")).toBe(MAP.STRING.required);
    expect(v.coerce.string().required().validate(null)).toBe(
      MAP.STRING.required
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.required") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().required().validate("")).toBe(
      TRANSLATE("VESO.STRING.required")
    );
    expect(v.coerce.string().required().validate(null)).toBe(
      TRANSLATE("VESO.STRING.required")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
