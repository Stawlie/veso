import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower max", () => {
  const max = v.date().max(new Date(5), {
    message: ERROR_MESSAGE,
  });
  const coerceMax = v.coerce.date().max(new Date(5), {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(max.validate(new Date(7))).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMax.validate(7)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact max", () => {
  const max = v.date().max(new Date(5));
  const coerceMax = v.coerce.date().max(new Date(5));

  it("Without coerce", () => {
    expect(max.validate(new Date(5))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMax.validate(5)).toBe(true);
  });
});

describe("Validates higher max", () => {
  const max = v.date().max(new Date(5));
  const coerceMax = v.coerce.date().max(new Date(5));

  it("Without coerce", () => {
    expect(max.validate(new Date(3))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMax.validate(3)).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const maxBoolean = v.date().max(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const maxFunction = v.date().max(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMaxBoolean = v.coerce.date().max(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMaxFunction = v.coerce.date().max(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(maxBoolean.validate(new Date(7))).toBe(true);
    expect(maxFunction.validate(new Date(7))).toBe(true);
    expect(maxBoolean.validate(new Date(9))).toBe(true);
    expect(maxFunction.validate(new Date(9))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMaxBoolean.validate(7)).toBe(true);
    expect(coerceMaxFunction.validate(7)).toBe(true);
    expect(coerceMaxBoolean.validate(9)).toBe(true);
    expect(coerceMaxFunction.validate(9)).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.date().max(new Date(3)).validate(new Date(5))).toBe(
      insertParams(DEFAULT_MAP.DATE.max, { max: new Date(3) })
    );
    expect(v.coerce.date().max(new Date(3)).validate(5)).toBe(
      insertParams(DEFAULT_MAP.DATE.max, { max: new Date(3) })
    );
  });

  it("MAP message", () => {
    const MAP = {
      DATE: {
        max: "Max!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.date().max(new Date(3)).validate(new Date(5))).toBe(MAP.DATE.max);
    expect(v.coerce.date().max(new Date(3)).validate(5)).toBe(MAP.DATE.max);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.DATE.max") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.date().max(new Date(3)).validate(new Date(5))).toBe(
      TRANSLATE("VESO.DATE.max")
    );
    expect(v.coerce.date().max(new Date(3)).validate(5)).toBe(
      TRANSLATE("VESO.DATE.max")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
