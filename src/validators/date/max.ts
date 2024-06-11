import { required } from "./required";
import { VesoDateValueTypes } from "./utils";

export function max(
  value: Date,
  valueType: VesoDateValueTypes,
  max: Date | number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value <= max;
}
