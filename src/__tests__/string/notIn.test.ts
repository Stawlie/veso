import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";
import { insertParams } from "../../validators/translate";

const ERROR_MESSAGE = "Custom message!";

describe("Validates not in array", () => {
  const notIn = v.string().notIn(["test1", "test2"]);
  const coerceNotIn = v.coerce.string().notIn(["test1", "test2"]);

  it("Without coerce", () => {
    expect(notIn.validate("test3")).toBe(true);
    expect(notIn.validate("432432")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("test3")).toBe(true);
    expect(coerceNotIn.validate("432432")).toBe(true);
  });
});

describe("Validates in array", () => {
  const notIn = v.string().notIn(["test1", "test2"], {
    message: ERROR_MESSAGE,
  });
  const coerceNotIn = v.coerce.string().notIn(["test1", "test2"], {
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(notIn.validate("test1")).toBe(ERROR_MESSAGE);
    expect(notIn.validate("test2")).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceNotIn.validate("test1")).toBe(ERROR_MESSAGE);
    expect(coerceNotIn.validate("test2")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const notInBoolean = v.string().notIn(["321", "123"], {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const notInFunction = v.string().notIn(["321", "123"], {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceNotInBoolean = v.coerce.string().notIn(["321", "123"], {
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceNotInFunction = v.coerce.string().notIn(["321", "123"], {
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(notInBoolean.validate("321")).toBe(true);
    expect(notInFunction.validate("321")).toBe(true);
    expect(notInBoolean.validate("123")).toBe(true);
    expect(notInFunction.validate("123")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceNotInBoolean.validate("321")).toBe(true);
    expect(coerceNotInFunction.validate("321")).toBe(true);
    expect(coerceNotInBoolean.validate("123")).toBe(true);
    expect(coerceNotInFunction.validate("123")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().notIn(["test1", "3"]).validate("test1")).toBe(
      insertParams(DEFAULT_MAP.STRING.notIn, { notIn: ["test1", "3"] })
    );
    expect(v.coerce.string().notIn(["test1", "3"]).validate(3)).toBe(
      insertParams(DEFAULT_MAP.STRING.notIn, { notIn: ["test1", "3"] })
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        notIn: "NotIn!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().notIn(["test1", "3"]).validate("test1")).toBe(
      MAP.STRING.notIn
    );
    expect(v.coerce.string().notIn(["test1", "3"]).validate(3)).toBe(
      MAP.STRING.notIn
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.notIn") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().notIn(["test1", "3"]).validate("test1")).toBe(
      TRANSLATE("VESO.STRING.notIn")
    );
    expect(v.coerce.string().notIn(["test1", "3"]).validate(3)).toBe(
      TRANSLATE("VESO.STRING.notIn")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
