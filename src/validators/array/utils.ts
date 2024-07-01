export * from "./required";
export * from "./exactLength";
export * from "./minLength";
export * from "./maxLength";

export type VesoArrayValueTypes = "array" | "null" | "undefined";

export type VesoArrayCheck =
  | { type: "required"; message: string }
  | { type: "exactLength"; value: number; message: string }
  | {
      type: "minLength";
      value: number;
      message: string;
    }
  | {
      type: "maxLength";
      value: number;
      message: string;
    };

export type VesoArrayConstructor = {
  check: VesoArrayCheck[];
};
