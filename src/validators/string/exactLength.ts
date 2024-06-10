import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function exactLength(
  value: string,
  valueType: VesoStringValueTypes,
  exactLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length === exactLength;
}
