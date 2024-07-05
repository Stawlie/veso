import { VesoMap, VesoTranslateFunction, setMap, setTranslate, v } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates alphanumeric", () => {
  const alphaNum = v.string().alphaNum();
  const coerceAlphaNum = v.coerce.string().alphaNum();

  it("Without coerce", () => {
    expect(alphaNum.validate("test")).toBe(true);
    expect(alphaNum.validate("hehehehe")).toBe(true);
    expect(alphaNum.validate("111hehehehe111")).toBe(true);
    expect(alphaNum.validate("iambluedabudidabudai")).toBe(true);
    expect(alphaNum.validate("123321")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceAlphaNum.validate("test")).toBe(true);
    expect(coerceAlphaNum.validate("hehehehe")).toBe(true);
    expect(coerceAlphaNum.validate("111hehehehe111")).toBe(true);
    expect(coerceAlphaNum.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceAlphaNum.validate("123321")).toBe(true);
  });
});

describe("Validates not alphanumeric", () => {
  const alphaNum = v.string().alphaNum({
    message: ERROR_MESSAGE,
  });
  const coerceAlphaNum = v.coerce.string().alphaNum({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(alphaNum.validate("Какой-то текст")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("alphanumer1c?")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("-----")).toBe(ERROR_MESSAGE);
    expect(alphaNum.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceAlphaNum.validate("Какой-то текст")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("alphanumer1c?")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("-----")).toBe(ERROR_MESSAGE);
    expect(coerceAlphaNum.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const alphaNumBoolean = v.string().alphaNum({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const alphaNumFunction = v.string().alphaNum({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceAlphaNumBoolean = v.coerce.string().alphaNum({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceAlphaNumFunction = v.coerce.string().alphaNum({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(alphaNumBoolean.validate("test123?")).toBe(true);
    expect(alphaNumFunction.validate("test123?")).toBe(true);
    expect(alphaNumBoolean.validate("Это текст на русском?")).toBe(true);
    expect(alphaNumFunction.validate("Это текст на русском?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceAlphaNumBoolean.validate("test123?")).toBe(true);
    expect(coerceAlphaNumFunction.validate("test123?")).toBe(true);
    expect(coerceAlphaNumBoolean.validate("Это текст на русском?")).toBe(true);
    expect(coerceAlphaNumFunction.validate("Это текст на русском?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().alphaNum().validate("текст")).toBe(
      DEFAULT_MAP.STRING.alphaNum
    );
    expect(v.coerce.string().alphaNum().validate(534.3)).toBe(
      DEFAULT_MAP.STRING.alphaNum
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        alphaNum: "AlphaNum!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().alphaNum().validate("текст")).toBe(MAP.STRING.alphaNum);
    expect(v.coerce.string().alphaNum().validate(534.3)).toBe(
      MAP.STRING.alphaNum
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.alphaNum") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().alphaNum().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.alphaNum")
    );
    expect(v.coerce.string().alphaNum().validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.alphaNum")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
