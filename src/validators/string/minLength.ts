import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function minLength(
  value: string,
  valueType: VesoStringValueTypes,
  minLength: number,
  inclusive: boolean
) {
  if (!required(value, valueType)) {
    return true;
  }

  return inclusive ? value.length >= minLength : value.length > minLength;
}
