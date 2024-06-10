export * from "./required";

export const LOCALE = {
  required: "The value is required!",
};

export type VesoStringValueTypes = "string" | "null" | "undefined";

export type VesoStringCheck = { type: "required"; message: string };

export type VesoStringConstructor = {
  check: VesoStringCheck[];
};
