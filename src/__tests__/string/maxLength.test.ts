import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower maxLength", () => {
  const maxLength = v.string().maxLength(5);
  const coerceMaxLength = v.coerce.string().maxLength(5);

  it("Without coerce", () => {
    expect(maxLength.validate("1234")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceMaxLength.validate("1234")).toBe(true);
  });
});

describe("Validates exact maxLength", () => {
  const maxLength = v.string().maxLength(5);
  const coerceMaxLength = v.coerce.string().maxLength(5);

  it("Without coerce", () => {
    expect(maxLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMaxLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher maxLength", () => {
  const maxLength = v.string().maxLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceMaxLength = v.coerce.string().maxLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(maxLength.validate("123456")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceMaxLength.validate("123456")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const maxLengthBoolean = v.string().maxLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const maxLengthFunction = v.string().maxLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMaxLengthBoolean = v.coerce.string().maxLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMaxLengthFunction = v.coerce.string().maxLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(maxLengthBoolean.validate("notanmaxLength")).toBe(true);
    expect(maxLengthFunction.validate("notanmaxLength")).toBe(true);
    expect(maxLengthBoolean.validate("amianmaxLength?")).toBe(true);
    expect(maxLengthFunction.validate("amianmaxLength?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMaxLengthBoolean.validate("notanmaxLength")).toBe(true);
    expect(coerceMaxLengthFunction.validate("notanmaxLength")).toBe(true);
    expect(coerceMaxLengthBoolean.validate("amianmaxLength?")).toBe(true);
    expect(coerceMaxLengthFunction.validate("amianmaxLength?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().maxLength(3).validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.maxLength, { maxLength: 3 })
    );
    expect(v.coerce.string().maxLength(3).validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.maxLength, { maxLength: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        maxLength: "MaxLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().maxLength(3).validate("текст")).toBe(
      MAP.STRING.maxLength
    );
    expect(v.coerce.string().maxLength(3).validate(534.3)).toBe(
      MAP.STRING.maxLength
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.maxLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().maxLength(3).validate("текст")).toBe(
      TRANSLATE("VESO.STRING.maxLength")
    );
    expect(v.coerce.string().maxLength(3).validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.maxLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
