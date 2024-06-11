import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function minLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  minLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length >= minLength;
}
