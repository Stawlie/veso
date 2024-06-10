import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function includes(
  value: string,
  valueType: VesoStringValueTypes,
  includeValue: string,
  position?: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.includes(includeValue, position);
}
