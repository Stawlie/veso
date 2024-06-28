import { VesoMap } from "./utils";

export const DEFAULT: VesoMap = {
  STRING: {
    required: "The value is required!",
    minLength:
      "The value must have more than or equal to {minLength} characters!",
    maxLength:
      "The value must have less than or equal to {maxLength} characters!",
    exactLength: "The value must have exactly {exactLength} characters!",
    startsWith: "The value must start with {startsWith}!",
    endsWith: "The value must end with {endsWith}!",
    includes: "The value must include {includes}!",
    regex: "The value must match {regex}!",
    ip: "The value must be a IP{ip}!",
    mac: "The value must be a MAC address!",
    email: "The value must be an email!",
    url: "The value must be a URL!",
    unique: "The value must contain at least {unique} unique characters!",
    numeric: "The value must be a number!",
    alpha: "The value must include only latin characters!",
    alphaNum: "The value must include only latin characters and numbers!",
    hex: "The value must include only hex characters!",
    notIn: "The value is not allowed!",
  },
  NUMBER: {
    required: "The value is required!",
    min: "The value must be greater than or equal to {min}!",
    max: "The value must be less than or equal to {max}!",
    between: "The value must be between {min} and {max}!",
    positive: "The value must be positive!",
    negative: "The value must be negative!",
    nonpositive: "The value must be non-positive!",
    nonnegative: "The value must be non-negative!",
    multipleOf: "The value must be a multiple of {multipleOf}!",
    safe: "The value must be safe!",
    integer: "The value must be an integer!",
    notIn: "The value is not allowed!",
  },
  ARRAY: {
    required: "The value is required!",
    minLength: "The value must have more than or equal to {minLength} items!",
    maxLength: "The value must have less than or equal to {maxLength} items!",
    exactLength: "The value must have exactly {exactLength} items!",
  },
  DATE: {
    required: "The value is required!",
    min: "The value must be after {min}!",
    max: "The value must be before {max}!",
    between: "The value must be between {min} and {max}!",
    notIn: "The value is not allowed!",
  },
};
