import { required } from "./required";
import { VesoDateValueTypes } from "./utils";

export function min(
  value: Date,
  valueType: VesoDateValueTypes,
  min: Date | number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value >= min;
}
