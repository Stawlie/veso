import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower min", () => {
  const min = v.date().min(new Date(5), {
    message: ERROR_MESSAGE,
  });
  const coerceMin = v.coerce.date().min(new Date(5), {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(min.validate(new Date(1))).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceMin.validate(1)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates exact min", () => {
  const min = v.date().min(new Date(5));
  const coerceMin = v.coerce.date().min(new Date(5));

  it("Without coerce", () => {
    expect(min.validate(new Date(5))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMin.validate(5)).toBe(true);
  });
});

describe("Validates higher min", () => {
  const min = v.date().min(new Date(5));
  const coerceMin = v.coerce.date().min(new Date(5));

  it("Without coerce", () => {
    expect(min.validate(new Date(7))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMin.validate(7)).toBe(true);
  });
});

describe("Does not validate when validateIf: false", () => {
  const minBoolean = v.date().min(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const minFunction = v.date().min(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceMinBoolean = v.coerce.date().min(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceMinFunction = v.coerce.date().min(new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(minBoolean.validate(new Date(3))).toBe(true);
    expect(minFunction.validate(new Date(3))).toBe(true);
    expect(minBoolean.validate(new Date(1))).toBe(true);
    expect(minFunction.validate(new Date(1))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceMinBoolean.validate(3)).toBe(true);
    expect(coerceMinFunction.validate(3)).toBe(true);
    expect(coerceMinBoolean.validate(1)).toBe(true);
    expect(coerceMinFunction.validate(1)).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.date().min(new Date(3)).validate(new Date(1))).toBe(
      insertParams(DEFAULT_MAP.DATE.min, { min: new Date(3) })
    );
    expect(v.coerce.date().min(new Date(3)).validate(1)).toBe(
      insertParams(DEFAULT_MAP.DATE.min, { min: new Date(3) })
    );
  });

  it("MAP message", () => {
    const MAP = {
      DATE: {
        min: "Min!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.date().min(new Date(3)).validate(new Date(1))).toBe(MAP.DATE.min);
    expect(v.coerce.date().min(new Date(3)).validate(1)).toBe(MAP.DATE.min);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.DATE.min") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.date().min(new Date(3)).validate(new Date(1))).toBe(
      TRANSLATE("VESO.DATE.min")
    );
    expect(v.coerce.date().min(new Date(3)).validate(1)).toBe(
      TRANSLATE("VESO.DATE.min")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
