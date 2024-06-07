import { required } from "./required";
import { VesoNumberValueTypes } from "./utils";

export function min(
  value: any,
  valueType: VesoNumberValueTypes,
  min: number,
  inclusive: boolean
) {
  if (!required(valueType)) {
    return true;
  }

  return inclusive ? value >= min : value > min;
}
