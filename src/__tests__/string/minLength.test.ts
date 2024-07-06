import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower minLength", () => {
  const minLength = v.string().minLength(5, {
    message: ERROR_MESSAGE,
  });
  const coerceMinLength = v.coerce.string().minLength(5, {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(minLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMinLength.validate("1234")).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact minLength", () => {
  const minLength = v.string().minLength(5);
  const coerceMinLength = v.coerce.string().minLength(5);

  it("Without coerce", () => {
    expect(minLength.validate("12345")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinLength.validate("12345")).toBe(true);
  });
});

describe("Validates higher minLength", () => {
  const minLength = v.string().minLength(5);
  const coerceMinLength = v.coerce.string().minLength(5);

  it("Without coerce", () => {
    expect(minLength.validate("123456")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinLength.validate("123456")).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const minLengthBoolean = v.string().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const minLengthFunction = v.string().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMinLengthBoolean = v.coerce.string().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMinLengthFunction = v.coerce.string().minLength(5, {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(minLengthBoolean.validate("not")).toBe(true);
    expect(minLengthFunction.validate("not")).toBe(true);
    expect(minLengthBoolean.validate("ami?")).toBe(true);
    expect(minLengthFunction.validate("ami?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinLengthBoolean.validate("not")).toBe(true);
    expect(coerceMinLengthFunction.validate("not")).toBe(true);
    expect(coerceMinLengthBoolean.validate("ami?")).toBe(true);
    expect(coerceMinLengthFunction.validate("ami?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().minLength(3).validate("те")).toBe(
      insertParams(DEFAULT_MAP.STRING.minLength, { minLength: 3 })
    );
    expect(v.coerce.string().minLength(3).validate(53)).toBe(
      insertParams(DEFAULT_MAP.STRING.minLength, { minLength: 3 })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        minLength: "MinLength!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().minLength(3).validate("те")).toBe(MAP.STRING.minLength);
    expect(v.coerce.string().minLength(3).validate(53)).toBe(
      MAP.STRING.minLength
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.minLength") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().minLength(3).validate("те")).toBe(
      TRANSLATE("VESO.STRING.minLength")
    );
    expect(v.coerce.string().minLength(3).validate(53)).toBe(
      TRANSLATE("VESO.STRING.minLength")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
