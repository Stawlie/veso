import { v, setMap, VesoMap, setTranslate, VesoTranslateFunction } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

const ERROR_MESSAGE = "Custom message!";

describe("Validates email", () => {
  const email = v.string().email();
  const coerceEmail = v.coerce.string().email();

  it("Without coerce", () => {
    expect(email.validate("admin@admin.com")).toBe(true);
    expect(email.validate("a@a.com")).toBe(true);
    expect(email.validate("test@test.com")).toBe(true);
  });
  it("With coerce", () => {
    expect(coerceEmail.validate("admin@admin.com")).toBe(true);
    expect(coerceEmail.validate("a@a.com")).toBe(true);
    expect(coerceEmail.validate("test@test.com")).toBe(true);
  });
});

describe("Validates not email", () => {
  const email = v.string().email({
    message: ERROR_MESSAGE,
  });
  const coerceEmail = v.coerce.string().email({
    message: ERROR_MESSAGE,
  });

  it("Without coerce", () => {
    expect(email.validate("amianemail?")).toBe(ERROR_MESSAGE);
    expect(email.validate("notanemail")).toBe(ERROR_MESSAGE);
    expect(email.validate("fake@email.g")).toBe(ERROR_MESSAGE);
  });

  it("With coerce", () => {
    expect(coerceEmail.validate("amianemail?")).toBe(ERROR_MESSAGE);
    expect(coerceEmail.validate("notanemail")).toBe(ERROR_MESSAGE);
    expect(coerceEmail.validate("fake@email.g")).toBe(ERROR_MESSAGE);
  });
});

describe("Does not validate when validateIf: false", () => {
  const emailBoolean = v.string().email({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const emailFunction = v.string().email({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  const coerceEmailBoolean = v.coerce.string().email({
    message: ERROR_MESSAGE,
    validateIf: false,
  });

  const coerceEmailFunction = v.coerce.string().email({
    message: ERROR_MESSAGE,
    validateIf: () => false,
  });

  it("Without coerce", () => {
    expect(emailBoolean.validate("notanemail")).toBe(true);
    expect(emailFunction.validate("notanemail")).toBe(true);
    expect(emailBoolean.validate("amianemail?")).toBe(true);
    expect(emailFunction.validate("amianemail?")).toBe(true);
  });

  it("With coerce", () => {
    expect(coerceEmailBoolean.validate("notanemail")).toBe(true);
    expect(coerceEmailFunction.validate("notanemail")).toBe(true);
    expect(coerceEmailBoolean.validate("amianemail?")).toBe(true);
    expect(coerceEmailFunction.validate("amianemail?")).toBe(true);
  });
});

describe("Returns right error messages", () => {
  it("Default message", () => {
    expect(v.string().email().validate("текст")).toBe(DEFAULT_MAP.STRING.email);
    expect(v.coerce.string().email().validate(534.3)).toBe(
      DEFAULT_MAP.STRING.email
    );
  });

  it("MAP message", () => {
    const MAP = {
      STRING: {
        email: "Email!",
      },
    } satisfies VesoMap;

    setMap(MAP);

    expect(v.string().email().validate("текст")).toBe(MAP.STRING.email);
    expect(v.coerce.string().email().validate(534.3)).toBe(MAP.STRING.email);
  });

  it("TRANSLATE message", () => {
    const TRANSLATE: VesoTranslateFunction = (key) => {
      if (key === "VESO.STRING.email") {
        return "Custom message!";
      }

      return "Something else!";
    };

    setTranslate(TRANSLATE);

    expect(v.string().email().validate("текст")).toBe(
      TRANSLATE("VESO.STRING.email")
    );
    expect(v.coerce.string().email().validate(534.3)).toBe(
      TRANSLATE("VESO.STRING.email")
    );
  });
});

afterAll(() => {
  setMap(null);
  setTranslate(null);
});
