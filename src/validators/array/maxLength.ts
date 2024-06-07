import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function maxLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  maxLength: number,
  inclusive: boolean
) {
  if (!required(valueType)) {
    return false;
  }

  return inclusive ? value.length <= maxLength : value.length < maxLength;
}
