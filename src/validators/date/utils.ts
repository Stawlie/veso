import { VesoRecord } from "../utils";
export * from "./required";
export * from "./min";
export * from "./max";
export * from "./notIn";

export type VesoDateValueTypes = "date" | "null" | "undefined";

type VesoDateMethod = VesoRecord["DATE"];

type VesoCheckSettings = {
  message?: string;
  validateIf?: boolean | (() => boolean);
};

type VesoBaseCheck<T extends Record<string, unknown> = {}> = {
  settings: VesoCheckSettings & T;
  method?: VesoDateMethod;
  data?: Record<string, unknown>;
};

export const DEFAULT_SETTINGS: VesoCheckSettings = {
  validateIf: true,
};

export type VesoDateCheck =
  | ({ type: "required" } & VesoBaseCheck)
  | ({ type: "min"; value: Date } & VesoBaseCheck)
  | ({ type: "max"; value: Date } & VesoBaseCheck)
  | ({ type: "notIn"; value: Date[] } & VesoBaseCheck);

export type VesoGetSettings<K extends VesoDateCheck["type"]> = Extract<
  VesoDateCheck,
  { type: K }
>["settings"];

export type VesoDateConstructor = {
  check?: VesoDateCheck[];
  coerce?: boolean;
};
