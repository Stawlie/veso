import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";

const TEST_MAP = {
  STRING: {
    required: "Required field!",
  },
} satisfies VesoMap;

const TEST_FN: VesoTranslateFunction = (key) => {
  if (key === "VESO.STRING.required") {
    return "Value is required!";
  }
  return "";
};

const CUSTOM_MESSAGE = "Custom message!";

describe("Overrides ALL messages with CUSTOM MESSAGE", () => {
  const required = v.string().required({
    message: CUSTOM_MESSAGE,
  });
  const coerceRequired = v.coerce.string().required({
    message: CUSTOM_MESSAGE,
  });

  it("Without coerce", () => {
    setMap(TEST_MAP);
    setTranslate(TEST_FN);
    expect(required.validate("")).toBe(CUSTOM_MESSAGE);
  });
  it("With coerce", () => {
    setMap(TEST_MAP);
    setTranslate(TEST_FN);
    expect(coerceRequired.validate("")).toBe(CUSTOM_MESSAGE);
  });
});

describe("Overrides MAP messages with TRANSLATE", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    setMap(TEST_MAP);
    setTranslate(TEST_FN);
    expect(required.validate("")).toBe(TEST_FN("VESO.STRING.required"));
  });
  it("With coerce", () => {
    setMap(TEST_MAP);
    setTranslate(TEST_FN);
    expect(coerceRequired.validate("")).toBe(TEST_FN("VESO.STRING.required"));
  });
});

describe("Overrides default messages with MAP", () => {
  const required = v.string().required();
  const coerceRequired = v.coerce.string().required();

  it("Without coerce", () => {
    setMap(TEST_MAP);
    expect(required.validate("")).toBe(TEST_MAP.STRING.required);
  });
  it("With coerce", () => {
    setMap(TEST_MAP);
    expect(coerceRequired.validate("")).toBe(TEST_MAP.STRING.required);
  });
});

// Clearing settings
afterEach(() => {
  setMap(null);
  setTranslate(null);
});
