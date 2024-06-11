import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function maxLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  maxLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length <= maxLength;
}
