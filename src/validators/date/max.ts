import { required } from "./required";
import { VesoDateValueTypes } from "./utils";

export function max(
  value: Date,
  valueType: VesoDateValueTypes,
  max: Date | number,
  inclusive: boolean
) {
  if (!required(value, valueType)) {
    return true;
  }

  return inclusive ? value <= max : value < max;
}
