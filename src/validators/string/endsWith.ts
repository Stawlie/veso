import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function endsWith(
  value: string,
  valueType: VesoStringValueTypes,
  endsWith: string
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.endsWith(endsWith);
}
