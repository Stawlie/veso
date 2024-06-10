import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function exactLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  exactLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length === exactLength;
}
