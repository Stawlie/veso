import { array } from "../validators/array";

const DEFAULT_ERROR_MESSAGE = "The value is required!";

describe("Testing 'required' validator", () => {
  const v = array().required();

  it("Empty - error text", () => {
    expect(v.validate([])).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it("Null - error text", () => {
    expect(v.validate(null)).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it("Undefined - error text", () => {
    expect(v.validate(undefined)).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it("Not Empty - true", () => {
    expect(v.validate(["nonemptyarray"])).toBe(true);
  });
});
