import { required } from "./required";
import { VesoDateValueTypes } from "./utils";

export function notIn(
  value: Date,
  valueType: VesoDateValueTypes,
  notIn: Date[]
) {
  if (!required(value, valueType)) {
    return true;
  }

  return !notIn.map((item) => item.getTime()).includes(value.getTime());
}
