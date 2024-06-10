import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function startsWith(
  value: string,
  valueType: VesoStringValueTypes,
  startsWith: string
) {
  if (!required(value, valueType)) {
    return true;
  }

  return value.startsWith(startsWith);
}
