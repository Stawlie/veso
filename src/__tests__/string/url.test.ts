import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates url", () => {
  const url = v.string().url();
  const coerceUrl = v.coerce.string().url();

  it("Without coerce", () => {
    expect(url.validate("https://google.com")).toBe(true);
    expect(url.validate("http://google.com")).toBe(true);
    expect(url.validate("ftp://google.com")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceUrl.validate("https://google.com")).toBe(true);
    expect(coerceUrl.validate("http://google.com")).toBe(true);
    expect(coerceUrl.validate("ftp://google.com")).toBe(true);
  });
});

describe("Validates not url", () => {
  const url = v.string().url({
    message: ERROR_MESSAGE,
  });
  const coerceUrl = v.coerce.string().url({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(url.validate("noturl")).toBe(ERROR_MESSAGE);
    expect(url.validate("http:/test.com")).toBe(ERROR_MESSAGE);
    expect(url.validate("http://test.")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceUrl.validate("noturl")).toBe(ERROR_MESSAGE);
    expect(coerceUrl.validate("http:/test.com")).toBe(ERROR_MESSAGE);
    expect(coerceUrl.validate("http://test.")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const urlBoolean = v.string().url({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const urlFunction = v.string().url({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceUrlBoolean = v.coerce.string().url({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceUrlFunction = v.coerce.string().url({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(urlBoolean.validate("notttesting")).toBe(true);
    expect(urlFunction.validate("notttesting")).toBe(true);
    expect(urlBoolean.validate("rest")).toBe(true);
    expect(urlFunction.validate("rest")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceUrlBoolean.validate("notttesting")).toBe(true);
    expect(coerceUrlFunction.validate("notttesting")).toBe(true);
    expect(coerceUrlBoolean.validate("rest")).toBe(true);
    expect(coerceUrlFunction.validate("rest")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().url().validate("текст")).toBe(DEFAULT_MAP.STRING.url);
    expect(v.coerce.string().url().validate("текст")).toBe(
      DEFAULT_MAP.STRING.url
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        url: "Url!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().url().validate("текст")).toBe(MAP.STRING.url);
    expect(v.coerce.string().url().validate("текст")).toBe(MAP.STRING.url);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.url") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().url().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.url")
    );
    expect(v.coerce.string().url().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.url")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
