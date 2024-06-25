import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function notIn(
  value: string,
  valueType: VesoStringValueTypes,
  notIn: string[]
) {
  if (!required(value, valueType)) {
    return true;
  }

  return !notIn.includes(value);
}
