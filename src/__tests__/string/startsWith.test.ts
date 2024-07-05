import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when starts with", () => {
  const startsWith = v.string().startsWith("test");
  const coerceStartsWith = v.coerce.string().startsWith("test");

  it("Without coerce", () => {
    expect(startsWith.validate("test123")).toBe(true);
    expect(startsWith.validate("testing")).toBe(true);
    expect(startsWith.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceStartsWith.validate("test123")).toBe(true);
    expect(coerceStartsWith.validate("testing")).toBe(true);
    expect(coerceStartsWith.validate("test")).toBe(true);
  });
});

describe("Validates when not starts with", () => {
  const startsWith = v.string().startsWith("test", {
    message: ERROR_MESSAGE,
  });
  const coerceStartsWith = v.coerce.string().startsWith("test", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(startsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(startsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(startsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceStartsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceStartsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceStartsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const startsWithBoolean = v.string().startsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const startsWithFunction = v.string().startsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceStartsWithBoolean = v.coerce.string().startsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceStartsWithFunction = v.coerce.string().startsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(startsWithBoolean.validate("notttesting")).toBe(true);
    expect(startsWithFunction.validate("notttesting")).toBe(true);
    expect(startsWithBoolean.validate("rest")).toBe(true);
    expect(startsWithFunction.validate("rest")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceStartsWithBoolean.validate("notttesting")).toBe(true);
    expect(coerceStartsWithFunction.validate("notttesting")).toBe(true);
    expect(coerceStartsWithBoolean.validate("rest")).toBe(true);
    expect(coerceStartsWithFunction.validate("rest")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().startsWith("123").validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.startsWith, { startsWith: "123" })
    );
    expect(v.coerce.string().startsWith("123").validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.startsWith, { startsWith: "123" })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        startsWith: "StartsWith!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().startsWith("123").validate("текст")).toBe(
      MAP.STRING.startsWith
    );
    expect(v.coerce.string().startsWith("123").validate(534.3)).toBe(
      MAP.STRING.startsWith
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.startsWith") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().startsWith("123").validate("текст")).toBe(
      TRANSLATE("VESO.STRING.startsWith")
    );
    expect(v.coerce.string().startsWith("123").validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.startsWith")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
