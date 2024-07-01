import { VesoArray } from "../array";
import { VesoDate } from "../date";
import { VesoNumber } from "../number";
import { VesoString } from "../string";

type VesoValidatorMethods<
  T extends
    | typeof VesoString
    | typeof VesoNumber
    | typeof VesoArray
    | typeof VesoDate
> = {
  [TKey in keyof T["prototype"]]: TKey extends "validate" ? never : TKey;
}[keyof T["prototype"]];
