import { required } from "./required";
import { VesoNumberValueTypes } from "./utils";

export function max(
  value: any,
  valueType: VesoNumberValueTypes,
  max: number,
  inclusive: boolean
) {
  if (!required(valueType)) {
    return true;
  }

  return inclusive ? value <= max : value < max;
}
