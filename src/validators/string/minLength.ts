import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function minLength(
  value: string,
  valueType: VesoStringValueTypes,
  minLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length >= minLength;
}
