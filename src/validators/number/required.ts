import { VesoValueTypes } from "../../utils";
import { VesoNumberValueTypes } from "./utils";

export function required(valueType: VesoNumberValueTypes) {
  if (
    valueType === VesoValueTypes.null ||
    valueType === VesoValueTypes.undefined
  ) {
    return false;
  }

  return true;
}
