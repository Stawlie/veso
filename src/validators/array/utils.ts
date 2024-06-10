export * from "./required";
export * from "./exactLength";
export * from "./minLength";
export * from "./maxLength";

export const LOCALE = {
  required: "The value is required!",
  minLength: (value: number) => `The value must have more than ${value} items!`,
  minLengthInclusive: (value: number) =>
    `The value must have more than or equal to ${value} items!`,
  maxLength: (value: number) => `The value must have less than ${value} items!`,
  maxLengthInclusive: (value: number) =>
    `The value must have less than or equal to ${value} items!`,
  exactLength: (value: number) => `The value must have exactly ${value} items!`,
};

export type VesoArrayValueTypes = "array" | "null" | "undefined";

export type VesoArrayCheck =
  | { type: "required"; message: string }
  | { type: "exactLength"; value: number; message: string }
  | {
      type: "minLength";
      value: number;
      inclusive: boolean;
      message: string;
    }
  | {
      type: "maxLength";
      value: number;
      inclusive: boolean;
      message: string;
    };

export type VesoArrayConstructor = {
  check: VesoArrayCheck[];
};
