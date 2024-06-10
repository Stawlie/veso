import { required } from "./required";
import { VesoArrayValueTypes } from "./utils";

export function minLength(
  value: any[],
  valueType: VesoArrayValueTypes,
  minLength: number,
  inclusive: boolean
) {
  if (!required(valueType)) {
    return true;
  }

  return inclusive ? value.length >= minLength : value.length > minLength;
}
