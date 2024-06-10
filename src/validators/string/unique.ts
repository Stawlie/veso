import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function unique(
  value: string,
  valueType: VesoStringValueTypes,
  count: number,
  inclusive: boolean
) {
  if (!required(value, valueType)) {
    return true;
  }

  return inclusive ? new Set(value).size >= count : new Set(value).size > count;
}
