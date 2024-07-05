import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates when includes", () => {
  const includes = v.string().includes("test");
  const coerceIncludes = v.coerce.string().includes("test");

  it("Without coerce", () => {
    expect(includes.validate("123test")).toBe(true);
    expect(includes.validate("newtest")).toBe(true);
    expect(includes.validate("test")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceIncludes.validate("123test")).toBe(true);
    expect(coerceIncludes.validate("newtest")).toBe(true);
    expect(coerceIncludes.validate("test")).toBe(true);
  });
});

describe("Validates when not includes", () => {
  const includes = v.string().includes("test321", {
    message: ERROR_MESSAGE,
  });
  const coerceIncludes = v.coerce.string().includes("test321", {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(includes.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(includes.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(includes.validate("rest")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceIncludes.validate("ntest123")).toBe(ERROR_MESSAGE);
    expect(coerceIncludes.validate("notttesting")).toBe(ERROR_MESSAGE);
    expect(coerceIncludes.validate("rest")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const includesBoolean = v.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const includesFunction = v.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceIncludesBoolean = v.coerce.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceIncludesFunction = v.coerce.string().includes("123", {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(includesBoolean.validate("badstring")).toBe(true);
    expect(includesFunction.validate("badstring")).toBe(true);
    expect(includesBoolean.validate("includes")).toBe(true);
    expect(includesFunction.validate("includes")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceIncludesBoolean.validate("badstring")).toBe(true);
    expect(coerceIncludesFunction.validate("badstring")).toBe(true);
    expect(coerceIncludesBoolean.validate("includes")).toBe(true);
    expect(coerceIncludesFunction.validate("includes")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().includes("2").validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.includes, { includes: "2" })
    );
    expect(v.coerce.string().includes("2").validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.includes, { includes: "2" })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        includes: "Includes!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().includes("2").validate("текст")).toBe(
      MAP.STRING.includes
    );
    expect(v.coerce.string().includes("2").validate(534.3)).toBe(
      MAP.STRING.includes
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.includes") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().includes("2").validate("текст")).toBe(
      TRANSLATE("VESO.STRING.includes")
    );
    expect(v.coerce.string().includes("2").validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.includes")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
