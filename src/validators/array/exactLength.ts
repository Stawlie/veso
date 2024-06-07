import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function exactLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  exactLength: number
) {
  if (!required(valueType)) {
    return false;
  }

  return value.length === exactLength;
}
