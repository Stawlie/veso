export const VesoValueTypes = {
  string: "string",
  nan: "nan",
  number: "number",
  // integer: "integer",
  // float: "float",
  boolean: "boolean",
  date: "date",
  bigint: "bigint",
  symbol: "symbol",
  function: "function",
  undefined: "undefined",
  null: "null",
  array: "array",
  object: "object",
  unknown: "unknown",
  // void: "void",
  // never: "never",
  map: "map",
  set: "set",
} as const;

export type VesoValueTypes = keyof typeof VesoValueTypes;

export function getValueType(value: unknown): VesoValueTypes {
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
