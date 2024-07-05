import { setMap, setTranslate, v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates numeric values", () => {
  const numeric = v.string().numeric();
  const coerceNumeric = v.coerce.string().numeric();

  it("Without coerce", () => {
    expect(numeric.validate("1234")).toBe(true);
    expect(numeric.validate("1234.54")).toBe(true);
    expect(numeric.validate("-1234.54")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNumeric.validate("1234")).toBe(true);
    expect(coerceNumeric.validate("1234.54")).toBe(true);
    expect(coerceNumeric.validate("-1234.54")).toBe(true);
  });
});

describe("Validates not numeric values", () => {
  const numeric = v.string().numeric({
    message: ERROR_MESSAGE,
  });
  const coerceNumeric = v.coerce.string().numeric({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(numeric.validate("grehre")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("testtest")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("123test")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("--321")).toBe(ERROR_MESSAGE);
    expect(numeric.validate("+321")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceNumeric.validate("grehre")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("testtest")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("123test")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("--321")).toBe(ERROR_MESSAGE);
    expect(coerceNumeric.validate("+321")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const numericBoolean = v.string().numeric({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const numericFunction = v.string().numeric({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNumericBoolean = v.coerce.string().numeric({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNumericFunction = v.coerce.string().numeric({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(numericBoolean.validate("badstring")).toBe(true);
    expect(numericFunction.validate("badstring")).toBe(true);
    expect(numericBoolean.validate("numeric")).toBe(true);
    expect(numericFunction.validate("numeric")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNumericBoolean.validate("badstring")).toBe(true);
    expect(coerceNumericFunction.validate("badstring")).toBe(true);
    expect(coerceNumericBoolean.validate("numeric")).toBe(true);
    expect(coerceNumericFunction.validate("numeric")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().numeric().validate("текст")).toBe(
      DEFAULT_MAP.STRING.numeric
    );
    expect(v.coerce.string().numeric().validate("текст")).toBe(
      DEFAULT_MAP.STRING.numeric
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        numeric: "Numeric!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().numeric().validate("текст")).toBe(MAP.STRING.numeric);
    expect(v.coerce.string().numeric().validate("текст")).toBe(
      MAP.STRING.numeric
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.numeric") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().numeric().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.numeric")
    );
    expect(v.coerce.string().numeric().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.numeric")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
