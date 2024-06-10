import { VesoValueTypes } from "../utils";
import { VesoArrayValueTypes } from "./utils";

export function required(value: any[], valueType: VesoArrayValueTypes) {
  if (
    valueType === VesoValueTypes.null ||
    valueType === VesoValueTypes.undefined
  ) {
    return false;
  }

  return value.length > 0;
}
