import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates safe", () => {
  const safe = v.number().safe();
  const coerceSafe = v.coerce.number().safe();

  it("Without coerce", () => {
    expect(safe.validate(0)).toBe(true);
    expect(safe.validate(1)).toBe(true);
    expect(safe.validate(10)).toBe(true);
    expect(safe.validate(100)).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceSafe.validate("0")).toBe(true);
    expect(coerceSafe.validate("1")).toBe(true);
    expect(coerceSafe.validate("10")).toBe(true);
    expect(coerceSafe.validate("100")).toBe(true);
  });
});

describe("Validates not safe", () => {
  const safe = v.number().safe({
    message: ERROR_MESSAGE,
  });
  const coerceSafe = v.coerce.number().safe({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(safe.validate(9007199254740992)).toBe(ERROR_MESSAGE);
    expect(safe.validate(9007199254740993)).toBe(ERROR_MESSAGE);
    expect(safe.validate(9007199254740994)).toBe(ERROR_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceSafe.validate("9007199254740992")).toBe(ERROR_MESSAGE);
    expect(coerceSafe.validate("9007199254740993")).toBe(ERROR_MESSAGE);
    expect(coerceSafe.validate("9007199254740994")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const safeBoolean = v.number().safe({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const safeFunction = v.number().safe({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceSafeBoolean = v.coerce.number().safe({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceSafeFunction = v.coerce.number().safe({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(safeBoolean.validate(9007199254740992)).toBe(true);
    expect(safeFunction.validate(9007199254740992)).toBe(true);
    expect(safeBoolean.validate(9007199254740993)).toBe(true);
    expect(safeFunction.validate(9007199254740993)).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceSafeBoolean.validate("9007199254740992")).toBe(true);
    expect(coerceSafeFunction.validate("9007199254740992")).toBe(true);
    expect(coerceSafeBoolean.validate("9007199254740993")).toBe(true);
    expect(coerceSafeFunction.validate("9007199254740993")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.number().safe().validate(9007199254740992)).toBe(
      DEFAULT_MAP.NUMBER.safe
    );
    expect(v.coerce.number().safe().validate("9007199254740992")).toBe(
      DEFAULT_MAP.NUMBER.safe
    );
  });

  it("MAP message", () => {
    const MAP = {
      NUMBER: {
        safe: "Safe!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.number().safe().validate(9007199254740992)).toBe(MAP.NUMBER.safe);
    expect(v.coerce.number().safe().validate("9007199254740992")).toBe(
      MAP.NUMBER.safe
    );
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.NUMBER.safe") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.number().safe().validate(9007199254740992)).toBe(
      TRANSLATE("VESO.NUMBER.safe")
    );
    expect(v.coerce.number().safe().validate("9007199254740992")).toBe(
      TRANSLATE("VESO.NUMBER.safe")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
