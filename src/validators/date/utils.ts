export * from "./required";
export * from "./min";
export * from "./max";

export const LOCALE = {
  required: "The value is required!",
  min: (value: Date | number) => `Must be greater than ${new Date(value)}!`,
  minInclusive: (value: Date | number) =>
    `Must be greater than or equal to ${new Date(value)}!`,
  max: (value: Date | number) => `Must be less than ${new Date(value)}!`,
  maxInclusive: (value: Date | number) =>
    `Must be less than or equal to ${new Date(value)}!`,
  between: (min: Date | number, max: Date | number) =>
    `Must be between ${new Date(min)} and ${new Date(max)}!`,
};

export type VesoDateValueTypes = "date" | "null" | "undefined";

export type VesoDateCheck =
  | { type: "required"; message: string }
  | { type: "min"; value: Date | number; inclusive: boolean; message: string }
  | { type: "max"; value: Date | number; inclusive: boolean; message: string };

export type VesoDateConstructor = {
  check: VesoDateCheck[];
};
