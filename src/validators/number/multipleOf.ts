import { required } from "./required";
import { VesoNumberValueTypes } from "./utils";

export function multipleOf(
  value: any,
  valueType: VesoNumberValueTypes,
  multipleOf: number
) {
  if (!required(valueType)) {
    return true;
  }

  // https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
  const valueDecimalCount = (value.toString().split(".")[1] || "").length;
  const multipleOfDecimalCount = (multipleOf.toString().split(".")[1] || "")
    .length;

  const decimalCount =
    valueDecimalCount > multipleOfDecimalCount
      ? valueDecimalCount
      : multipleOfDecimalCount;

  const valueInteger = parseInt(value.toFixed(decimalCount).replace(".", ""));
  const multipleOfInteger = parseInt(
    multipleOf.toFixed(decimalCount).replace(".", "")
  );

  return (valueInteger % multipleOfInteger) / Math.pow(10, decimalCount) === 0;
}
