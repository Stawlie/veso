import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when satisfies regex", () => {
  const regex = v.string().regex(/^test$/);
  const coerceRegex = v.coerce.string().regex(/^test$/);

  it("Without coerce", () => {
    expect(regex.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceRegex.validate("test")).toBe(true);
  });
});

describe("Validates when not satisfies regex", () => {
  const regex = v.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
  });
  const coerceRegex = v.coerce.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(regex.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(regex.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(regex.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRegex.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceRegex.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceRegex.validate("rest")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const regexBoolean = v.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const regexFunction = v.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceRegexBoolean = v.coerce.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceRegexFunction = v.coerce.string().regex(/^test321$/, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(regexBoolean.validate("badstring")).toBe(true);
    expect(regexFunction.validate("badstring")).toBe(true);
    expect(regexBoolean.validate("regex")).toBe(true);
    expect(regexFunction.validate("regex")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceRegexBoolean.validate("badstring")).toBe(true);
    expect(coerceRegexFunction.validate("badstring")).toBe(true);
    expect(coerceRegexBoolean.validate("regex")).toBe(true);
    expect(coerceRegexFunction.validate("regex")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(
      v
        .string()
        .regex(/^test321$/)
        .validate("текст")
    ).toBe(insertParams(DEFAULT_MAP.STRING.regex, { regex: /^test321$/ }));
    expect(
      v.coerce
        .string()
        .regex(/^test321$/)
        .validate(534.3)
    ).toBe(insertParams(DEFAULT_MAP.STRING.regex, { regex: /^test321$/ }));
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        regex: "ExactLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(
      v
        .string()
        .regex(/^test321$/)
        .validate("текст")
    ).toBe(MAP.STRING.regex);
    expect(
      v.coerce
        .string()
        .regex(/^test321$/)
        .validate(534.3)
    ).toBe(MAP.STRING.regex);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.regex") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(
      v
        .string()
        .regex(/^test321$/)
        .validate("текст")
    ).toBe(TRANSLATE("VESO.STRING.regex"));
    expect(
      v.coerce
        .string()
        .regex(/^test321$/)
        .validate(534.3)
    ).toBe(TRANSLATE("VESO.STRING.regex"));
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
