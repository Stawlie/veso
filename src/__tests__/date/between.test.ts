import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates lower between range", () => {
  const between = v.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
  });
  const coerceBetween = v.coerce.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(between.validate(new Date(1))).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceBetween.validate(1)).toBe(ERROR_MESSAGE);
  });
});

describe("Validates between range", () => {
  const between = v.date().between(new Date(2), new Date(5));
  const coerceBetween = v.coerce.date().between(new Date(2), new Date(5));

  it("Without coerce", () => {
    expect(between.validate(new Date(2))).toBe(true);
    expect(between.validate(new Date(3))).toBe(true);
    expect(between.validate(new Date(4))).toBe(true);
    expect(between.validate(new Date(5))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceBetween.validate(2)).toBe(true);
    expect(coerceBetween.validate(3)).toBe(true);
    expect(coerceBetween.validate(4)).toBe(true);
    expect(coerceBetween.validate(5)).toBe(true);
  });
});

describe("Validates higher between range", () => {
  const between = v.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
  });
  const coerceBetween = v.coerce.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(between.validate(new Date(7))).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceBetween.validate(7)).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const betweenBoolean = v.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const betweenFunction = v.date().between(new Date(2), new Date(5), {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceBetweenBoolean = v.coerce
    .date()
    .between(new Date(2), new Date(5), {
      message: ERROR_MESSAGE,
      validateIf: false,
    });

  const coerceBetweenFunction = v.coerce
    .date()
    .between(new Date(2), new Date(5), {
      message: ERROR_MESSAGE,
      validateIf: () => false,
    });

  it("Without coerce", () => {
    expect(betweenBoolean.validate(new Date(7))).toBe(true);
    expect(betweenFunction.validate(new Date(7))).toBe(true);
    expect(betweenBoolean.validate(new Date(9))).toBe(true);
    expect(betweenFunction.validate(new Date(9))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceBetweenBoolean.validate(7)).toBe(true);
    expect(coerceBetweenFunction.validate(7)).toBe(true);
    expect(coerceBetweenBoolean.validate(9)).toBe(true);
    expect(coerceBetweenFunction.validate(9)).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(
      v.date().between(new Date(2), new Date(3)).validate(new Date(5))
    ).toBe(
      insertParams(DEFAULT_MAP.DATE.between, {
        min: new Date(2),
        max: new Date(3),
      })
    );
    expect(v.coerce.date().between(new Date(2), new Date(3)).validate(5)).toBe(
      insertParams(DEFAULT_MAP.DATE.between, {
        min: new Date(2),
        max: new Date(3),
      })
    );
  });

  it("MAP message", () => {
    const MAP = {
      DATE: {
        between: "Between!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(
      v.date().between(new Date(2), new Date(3)).validate(new Date(5))
    ).toBe(MAP.DATE.between);
    expect(v.coerce.date().between(new Date(2), new Date(3)).validate(5)).toBe(
      MAP.DATE.between
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.DATE.between") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(
      v.date().between(new Date(2), new Date(3)).validate(new Date(5))
    ).toBe(TRANSLATE("VESO.DATE.between"));
    expect(v.coerce.date().between(new Date(2), new Date(3)).validate(5)).toBe(
      TRANSLATE("VESO.DATE.between")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
