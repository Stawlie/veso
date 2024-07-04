import { VesoRecord } from "../utils";
export * from "./required";
export * from "./integer";
export * from "./min";
export * from "./max";
export * from "./multipleOf";
export * from "./notIn";

export type VesoNumberValueTypes = "number" | "null" | "undefined";

type VesoNumberMethod = VesoRecord["NUMBER"];

type VesoCheckSettings = {
  message?: string;
  validateIf?: boolean | (() => boolean);
};

type VesoBaseCheck<T extends Record<string, unknown> = {}> = {
  settings: VesoCheckSettings & T;
  method?: VesoNumberMethod;
  data?: Record<string, unknown>;
};

export const DEFAULT_SETTINGS: VesoCheckSettings = {
  validateIf: true,
};

export type VesoNumberCheck =
  | ({ type: "required" } & VesoBaseCheck)
  | ({ type: "integer" } & VesoBaseCheck)
  | ({ type: "multipleOf"; value: number } & VesoBaseCheck)
  | ({
      type: "min";
      value: number;
      inclusive: boolean;
    } & VesoBaseCheck)
  | ({
      type: "max";
      value: number;
      inclusive: boolean;
    } & VesoBaseCheck)
  | ({ type: "notIn"; value: number[] } & VesoBaseCheck);

export type VesoGetSettings<K extends VesoNumberCheck["type"]> = Extract<
  VesoNumberCheck,
  { type: K }
>["settings"];

export type VesoNumberConstructor = {
  check?: VesoNumberCheck[];
  coerce?: boolean;
};
