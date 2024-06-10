import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function maxLength(
  value: string,
  valueType: VesoStringValueTypes,
  maxLength: number,
  inclusive: boolean
) {
  if (!required(value, valueType)) {
    return true;
  }

  return inclusive ? value.length <= maxLength : value.length < maxLength;
}
