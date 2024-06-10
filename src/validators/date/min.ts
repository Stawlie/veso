import { required } from "./required";
import { VesoDateValueTypes } from "./utils";

export function min(
  value: Date,
  valueType: VesoDateValueTypes,
  min: Date | number,
  inclusive: boolean
) {
  if (!required(value, valueType)) {
    return true;
  }

  return inclusive ? value >= min : value > min;
}
