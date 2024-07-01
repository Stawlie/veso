import { VesoArray } from "./array";
import { VesoDate } from "./date";
import { VesoNumber } from "./number";
import { VesoString } from "./string";

export const VesoValueTypes = {
  string: "string",
  number: "number",
  array: "array",
  date: "date",
  undefined: "undefined",
  null: "null",
  object: "object",
  nan: "nan",
  bigint: "bigint",
  boolean: "boolean",
  symbol: "symbol",
  function: "function",
  unknown: "unknown",
  promise: "promise",
  map: "map",
  set: "set",
} as const;

export type VesoValueTypes = keyof typeof VesoValueTypes;

export function getValueType(value: any): VesoValueTypes {
  const type = typeof value;

  switch (type) {
    case "undefined":
      return VesoValueTypes.undefined;

    case "string":
      return VesoValueTypes.string;

    case "number":
      return isNaN(Number(value)) ? VesoValueTypes.nan : VesoValueTypes.number;

    case "boolean":
      return VesoValueTypes.boolean;

    case "function":
      return VesoValueTypes.function;

    case "bigint":
      return VesoValueTypes.bigint;

    case "symbol":
      return VesoValueTypes.symbol;

    case "object":
      if (Array.isArray(value)) {
        return VesoValueTypes.array;
      }
      if (value === null) {
        return VesoValueTypes.null;
      }
      if (
        value.then &&
        typeof value.then === "function" &&
        value.catch &&
        typeof value.catch === "function"
      ) {
        return VesoValueTypes.promise;
      }
      if (typeof Map !== "undefined" && value instanceof Map) {
        return VesoValueTypes.map;
      }
      if (typeof Set !== "undefined" && value instanceof Set) {
        return VesoValueTypes.set;
      }
      if (typeof Date !== "undefined" && value instanceof Date) {
        return VesoValueTypes.date;
      }
      return VesoValueTypes.object;

    default:
      return VesoValueTypes.unknown;
  }
}

type VesoValidatorMethod<
  T extends
    | typeof VesoString
    | typeof VesoNumber
    | typeof VesoArray
    | typeof VesoDate
> = {
  [TKey in keyof T["prototype"]]: TKey extends "validate" ? never : TKey;
}[keyof T["prototype"]];

export type VesoRecord = {
  STRING: VesoValidatorMethod<typeof VesoString>;
  NUMBER: VesoValidatorMethod<typeof VesoNumber>;
  DATE: VesoValidatorMethod<typeof VesoDate>;
  ARRAY: VesoValidatorMethod<typeof VesoArray>;
};

export type VesoValidatorName = {
  [TKey in keyof VesoRecord]: TKey;
}[keyof VesoRecord];
