import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function unique(
  value: string,
  valueType: VesoStringValueTypes,
  count: number
) {
  if (!required(value, valueType)) {
    return true;
  }

  return new Set(value).size >= count;
}
