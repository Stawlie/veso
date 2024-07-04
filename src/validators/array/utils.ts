import { VesoRecord } from "../utils";
export * from "./required";
export * from "./exactLength";
export * from "./minLength";
export * from "./maxLength";

export type VesoArrayValueTypes = "array" | "null" | "undefined";

type VesoArrayMethod = VesoRecord["ARRAY"];

type VesoCheckSettings = {
  message?: string;
  validateIf?: boolean | (() => boolean);
};

type VesoBaseCheck<T extends Record<string, unknown> = {}> = {
  settings: VesoCheckSettings & T;
  method?: VesoArrayMethod;
  data?: Record<string, unknown>;
};

export const DEFAULT_SETTINGS: VesoCheckSettings = {
  validateIf: true,
};

export type VesoArrayCheck =
  | ({ type: "required" } & VesoBaseCheck)
  | ({ type: "exactLength"; value: number } & VesoBaseCheck)
  | ({
      type: "minLength";
      value: number;
    } & VesoBaseCheck)
  | ({
      type: "maxLength";
      value: number;
    } & VesoBaseCheck);

export type VesoGetSettings<K extends VesoArrayCheck["type"]> = Extract<
  VesoArrayCheck,
  { type: K }
>["settings"];

export type VesoArrayConstructor = {
  check: VesoArrayCheck[];
};
