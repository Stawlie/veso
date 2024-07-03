import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";

describe("Overrides default messages with MAP", () => {
  // Map setup
  const TEST_MAP = {
    STRING: {
      required: "Required field!",
    },
  } satisfies VesoMap;

  setMap(TEST_MAP);

  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate("")).toBe(TEST_MAP.STRING.required);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(TEST_MAP.STRING.required);
  });
});

describe("Overrides MAP messages with TRANSLATE", () => {
  // Translate function setup
  const TEST_FN: VesoTranslateFunction = (key) => {
    if (key === "VESO.STRING.required") {
      return "Value is required!";
    }
    return "";
  };

  setTranslate(TEST_FN);

  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    expect(required.validate("")).toBe(TEST_FN("VESO.STRING.required"));
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(TEST_FN("VESO.STRING.required"));
  });
});

describe("Overrides TRANSLATE messages with CUSTOM MESSAGE", () => {
  const CUSTOM_MESSAGE = "Custom message!";
  const required = v.string().required({
    message: CUSTOM_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: CUSTOM_MESSAGE,
  });

  it("Without coerce", () => {
    expect(required.validate("")).toBe(CUSTOM_MESSAGE);
  });
  it("With coerce", () => {
    expect(coerceRequired.validate("")).toBe(CUSTOM_MESSAGE);
  });
});

// Clearing settings
afterAll(() => {
  setMap(null);
  setTranslate(null);
});
