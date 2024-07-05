import { VesoMap, VesoTranslateFunction, setMap, setTranslate, v } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when ends with", () => {
  const endsWith = v.string().endsWith("test");
  const coerceEndsWith = v.coerce.string().endsWith("test");

  it("Without coerce", () => {
    expect(endsWith.validate("123test")).toBe(true);
    expect(endsWith.validate("newtest")).toBe(true);
    expect(endsWith.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceEndsWith.validate("123test")).toBe(true);
    expect(coerceEndsWith.validate("newtest")).toBe(true);
    expect(coerceEndsWith.validate("test")).toBe(true);
  });
});

describe("Validates when not ends with", () => {
  const endsWith = v.string().endsWith("test", {
    message: ERROR_MESSAGE,
  });
  const coerceEndsWith = v.coerce.string().endsWith("test", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(endsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(endsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(endsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceEndsWith.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceEndsWith.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceEndsWith.validate("rest")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const endsWithBoolean = v.string().endsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const endsWithFunction = v.string().endsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceEndsWithBoolean = v.coerce.string().endsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceEndsWithFunction = v.coerce.string().endsWith("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(endsWithBoolean.validate("notttesting")).toBe(true);
    expect(endsWithFunction.validate("notttesting")).toBe(true);
    expect(endsWithBoolean.validate("rest")).toBe(true);
    expect(endsWithFunction.validate("rest")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceEndsWithBoolean.validate("notttesting")).toBe(true);
    expect(coerceEndsWithFunction.validate("notttesting")).toBe(true);
    expect(coerceEndsWithBoolean.validate("rest")).toBe(true);
    expect(coerceEndsWithFunction.validate("rest")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().endsWith("123").validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.endsWith, { endsWith: "123" })
    );
    expect(v.coerce.string().endsWith("123").validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.endsWith, { endsWith: "123" })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        endsWith: "EndsWith!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().endsWith("123").validate("текст")).toBe(
      MAP.STRING.endsWith
    );
    expect(v.coerce.string().endsWith("123").validate(534.3)).toBe(
      MAP.STRING.endsWith
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.endsWith") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().endsWith("123").validate("текст")).toBe(
      TRANSLATE("VESO.STRING.endsWith")
    );
    expect(v.coerce.string().endsWith("123").validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.endsWith")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
