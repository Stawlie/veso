import { v } from "veso";
import { DEFAULT_MAP } from "../../validators/translate/defaultMap";

describe("VESO.STRING.required [no settings]", () => {
  const required = v.string().required();

  describe("Correct validation:", () => {
    it("Empty string - INVALID", () => {
      expect(required.validate("")).toBe(DEFAULT_MAP.STRING.required);
    });

    it("Null - INVALID", () => {
      expect(required.validate(null)).toBe(DEFAULT_MAP.STRING.required);
    });

    it("Undefined - INVALID", () => {
      expect(required.validate(undefined)).toBe(DEFAULT_MAP.STRING.required);
    });

    it("Non-empty string - VALID", () => {
      expect(required.validate("test")).toBe(true);
    });
  });
});
