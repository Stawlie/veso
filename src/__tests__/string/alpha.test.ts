import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates alpha", () => {
  const alpha = v.string().alpha();
  const coerceAlpha = v.coerce.string().alpha();

  it("Without coerce", () => {
    expect(alpha.validate("test")).toBe(true);
    expect(alpha.validate("hehehehe")).toBe(true);
    expect(alpha.validate("iambluedabudidabudai")).toBe(true);
    expect(alpha.validate("anynonemptystring")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceAlpha.validate("test")).toBe(true);
    expect(coerceAlpha.validate("hehehehe")).toBe(true);
    expect(coerceAlpha.validate("iambluedabudidabudai")).toBe(true);
    expect(coerceAlpha.validate("anynonemptystring")).toBe(true);
  });
});

describe("Validates not alpha", () => {
  const alpha = v.string().alpha({
    message: ERROR_MESSAGE,
  });
  const coerceAlpha = v.coerce.string().alpha({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(alpha.validate("test123")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("Это текст на русском?")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("iambluedabudidabudai123")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("523454325")).toBe(ERROR_MESSAGE);
    expect(alpha.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceAlpha.validate("test123")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("Это текст на русском?")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("iambluedabudidabudai123")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("523454325")).toBe(ERROR_MESSAGE);
    expect(coerceAlpha.validate("No spaces for you")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const alphaBoolean = v.string().alpha({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const alphaFunction = v.string().alpha({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceAlphaBoolean = v.coerce.string().alpha({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceAlphaFunction = v.coerce.string().alpha({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(alphaBoolean.validate("test123")).toBe(true);
    expect(alphaFunction.validate("test123")).toBe(true);
    expect(alphaBoolean.validate("Это текст на русском?")).toBe(true);
    expect(alphaFunction.validate("Это текст на русском?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceAlphaBoolean.validate("test123")).toBe(true);
    expect(coerceAlphaFunction.validate("test123")).toBe(true);
    expect(coerceAlphaBoolean.validate("Это текст на русском?")).toBe(true);
    expect(coerceAlphaFunction.validate("Это текст на русском?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().alpha().validate("текст")).toBe(DEFAULT_MAP.STRING.alpha);
    expect(v.coerce.string().alpha().validate(534)).toBe(
      DEFAULT_MAP.STRING.alpha
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        alpha: "Alpha!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().alpha().validate("текст")).toBe(MAP.STRING.alpha);
    expect(v.coerce.string().alpha().validate(534)).toBe(MAP.STRING.alpha);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.alpha") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().alpha().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.alpha")
    );
    expect(v.coerce.string().alpha().validate(534)).toBe(
      TRANSLATE("VESO.STRING.alpha")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
