import { v, VesoMap, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams, setMap, setTranslate } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates not in array", () => {
  const notIn = v.date().notIn([new Date(1), new Date(2)]);
  const coerceNotIn = v.coerce.date().notIn([new Date(1), new Date(2)]);

  it("Without coerce", () => {
    expect(notIn.validate(new Date(3))).toBe(true);
    expect(notIn.validate(new Date(4))).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate(3)).toBe(true);
    expect(coerceNotIn.validate(4)).toBe(true);
  });
});

describe("Validates in array", () => {
  const notIn = v.date().notIn([new Date(1), new Date(2)], {
    message: ERROR_MESSAGE,
  });
  const coerceNotIn = v.coerce.date().notIn([new Date(1), new Date(2)], {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(notIn.validate(new Date(1))).toBe(ERROR_MESSAGE);
    expect(notIn.validate(new Date(2))).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate(1)).toBe(ERROR_MESSAGE);
    expect(coerceNotIn.validate(2)).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const notInBoolean = v.date().notIn([new Date(321), new Date(123)], {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const notInFunction = v.date().notIn([new Date(321), new Date(123)], {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNotInBoolean = v.coerce
    .date()
    .notIn([new Date(321), new Date(123)], {
      message: ERROR_MESSAGE,
      validateIf: false,
    });

  const coerceNotInFunction = v.coerce
    .date()
    .notIn([new Date(321), new Date(123)], {
      message: ERROR_MESSAGE,
      validateIf: () => false,
    });

  it("Without coerce", () => {
    expect(notInBoolean.validate(new Date(321))).toBe(true);
    expect(notInFunction.validate(new Date(321))).toBe(true);
    expect(notInBoolean.validate(new Date(123))).toBe(true);
    expect(notInFunction.validate(new Date(123))).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNotInBoolean.validate(321)).toBe(true);
    expect(coerceNotInFunction.validate(321)).toBe(true);
    expect(coerceNotInBoolean.validate(123)).toBe(true);
    expect(coerceNotInFunction.validate(123)).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(
      v
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(new Date(321))
    ).toBe(
      insertParams(DEFAULT_MAP.DATE.notIn, {
        notIn: [new Date(321), new Date(123)],
      })
    );
    expect(
      v.coerce
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(123)
    ).toBe(
      insertParams(DEFAULT_MAP.DATE.notIn, {
        notIn: [new Date(321), new Date(123)],
      })
    );
  });

  it("MAP message", () => {
    const MAP = {
      DATE: {
        notIn: "NotIn!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(
      v
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(new Date(321))
    ).toBe(MAP.DATE.notIn);
    expect(
      v.coerce
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(123)
    ).toBe(MAP.DATE.notIn);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.DATE.notIn") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(
      v
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(new Date(321))
    ).toBe(TRANSLATE("VESO.DATE.notIn"));
    expect(
      v.coerce
        .date()
        .notIn([new Date(321), new Date(123)])
        .validate(123)
    ).toBe(TRANSLATE("VESO.DATE.notIn"));
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
