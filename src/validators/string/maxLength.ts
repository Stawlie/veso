import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function maxLength(
  value: string,
  valueType: VesoStringValueTypes,
  maxLength: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.length <= maxLength;
}
