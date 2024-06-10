import { VesoValueTypes } from "../utils";
import { VesoStringValueTypes } from "./utils";

export function required(value: string, valueType: VesoStringValueTypes) {
  if (
    valueType === VesoValueTypes.null ||
    valueType === VesoValueTypes.undefined
  ) {
    return false;
  }

  return value.length > 0;
}
