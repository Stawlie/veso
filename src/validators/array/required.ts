import { VesoValueTypes } from "../../utils";
import { VesoArrayValueTypes } from "./utils";

export function required(valueType: VesoArrayValueTypes) {
  if (
    valueType === VesoValueTypes.null ||
    valueType === VesoValueTypes.undefined
  ) {
    return false;
  }

  return true;
}
