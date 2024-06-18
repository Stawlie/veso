export * from "./required";
export * from "./int";
export * from "./min";
export * from "./max";
export * from "./multipleOf";
export * from "./utils";

export const DEFAULT_MESSAGE = {
  required: "The value is required!",
  min: (value: number) => `Must be greater than or equal to ${value}!`,
  max: (value: number) => `Must be less than or equal to ${value}!`,
  between: (min: number, max: number) => `Must be between ${min} and ${max}!`,
  positive: "Must be positive!",
  negative: "Must be negative!",
  nonpositive: "Must be non-positive!",
  nonnegative: "Must be non-negative!",
  multipleOf: (value: number) => `Must be a multiple of ${value}!`,
  safe: "Must be safe!",
  integer: "Must be an integer!",
};

export type VesoNumberValueTypes = "number" | "null" | "undefined";

export type VesoNumberCheck =
  | { type: "required"; message: string }
  | { type: "int"; message: string }
  | { type: "multipleOf"; value: number; message: string }
  | {
      type: "min";
      value: number;
      inclusive: boolean;
      message: string;
    }
  | {
      type: "max";
      value: number;
      inclusive: boolean;
      message: string;
    };

export type VesoNumberConstructor = {
  check?: VesoNumberCheck[];
  coerce?: boolean;
};
