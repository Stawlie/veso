import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower exactLength", () => {
  const exactLength = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceExactLength = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(exactLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceExactLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact exactLength", () => {
  const exactLength = v.string().exactLength(5);
  const coerceExactLength = v.coerce.string().exactLength(5);

  it("Without coerce", () => {
    expect(exactLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceExactLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher exactLength", () => {
  const exactLength = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceExactLength = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(exactLength.validate("123456")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceExactLength.validate("123456")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const exactLengthBoolean = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const exactLengthFunction = v.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceExactLengthBoolean = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceExactLengthFunction = v.coerce.string().exactLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(exactLengthBoolean.validate("notanexactLength")).toBe(true);
    expect(exactLengthFunction.validate("notanexactLength")).toBe(true);
    expect(exactLengthBoolean.validate("amianexactLength?")).toBe(true);
    expect(exactLengthFunction.validate("amianexactLength?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceExactLengthBoolean.validate("notanexactLength")).toBe(true);
    expect(coerceExactLengthFunction.validate("notanexactLength")).toBe(true);
    expect(coerceExactLengthBoolean.validate("amianexactLength?")).toBe(true);
    expect(coerceExactLengthFunction.validate("amianexactLength?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().exactLength(3).validate("текст")).toBe(
      insertParams(DEFAULT_MAP.STRING.exactLength, { exactLength: 3 })
    );
    expect(v.coerce.string().exactLength(3).validate(534.3)).toBe(
      insertParams(DEFAULT_MAP.STRING.exactLength, { exactLength: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        exactLength: "ExactLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().exactLength(3).validate("текст")).toBe(
      MAP.STRING.exactLength
    );
    expect(v.coerce.string().exactLength(3).validate(534.3)).toBe(
      MAP.STRING.exactLength
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.exactLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().exactLength(3).validate("текст")).toBe(
      TRANSLATE("VESO.STRING.exactLength")
    );
    expect(v.coerce.string().exactLength(3).validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.exactLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
