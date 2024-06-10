import { required } from "./required";
import { VesoStringValueTypes } from "./utils";

export function regex(
  value: string,
  valueType: VesoStringValueTypes,
  regex: RegExp
) {
  if (!required(value, valueType)) {
    return true;
  }

  return regex.test(value);
}
