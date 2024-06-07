export const LOCALE = {
  required: "The value is required!",
  greaterThen: (value: number) => `Must be greater than ${value}!`,
  greaterThenInclusive: (value: number) =>
    `Must be greater than or equal to ${value}!`,
  lessThen: (value: number) => `Must be less than ${value}!`,
  lessThenInclusive: (value: number) =>
    `Must be less than or equal to ${value}!`,
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
  check: VesoNumberCheck[];
};
