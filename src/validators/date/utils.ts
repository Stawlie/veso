export * from "./required";
export * from "./min";
export * from "./max";
export * from "./notIn";

export type VesoDateValueTypes = "date" | "null" | "undefined";

export type VesoDateCheck =
  | { type: "required"; message: string }
  | { type: "min"; value: Date | number; message: string }
  | { type: "max"; value: Date | number; message: string }
  | { type: "notIn"; value: Date[]; message: string };

export type VesoDateConstructor = {
  check?: VesoDateCheck[];
  coerce?: boolean;
};
