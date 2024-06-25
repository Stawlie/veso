import { required } from "./required";
import { VesoNumberValueTypes } from "./utils";

export function notIn(
  value: number,
  valueType: VesoNumberValueTypes,
  notIn: number[]
) {
  if (!required(valueType)) {
    return true;
  }

  return !notIn.includes(value);
}
