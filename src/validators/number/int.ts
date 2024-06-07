import { required } from "./required";
import { VesoNumberValueTypes } from "./utils";

export function int(value: any, valueType: VesoNumberValueTypes) {
  if (!required(valueType)) {
    return true;
  }

  return Math.floor(value) === value;
}
