export * from "./required";
export * from "./int";
export * from "./min";
export * from "./max";
export * from "./multipleOf";
export * from "./notIn";

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
    }
  | { type: "notIn"; value: number[]; message: string };

export type VesoNumberConstructor = {
  check?: VesoNumberCheck[];
  coerce?: boolean;
};
