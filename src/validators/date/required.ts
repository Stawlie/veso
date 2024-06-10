import { VesoValueTypes } from "../utils";
import { VesoDateValueTypes } from "./utils";

export function required(value: Date, valueType: VesoDateValueTypes) {
  if (
    valueType === VesoValueTypes.null ||
    valueType === VesoValueTypes.undefined
  ) {
    return false;
  }

  // Check for non-invalid
  return !isNaN(value.getTime());
}
