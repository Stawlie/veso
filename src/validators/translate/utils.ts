import { VesoValidatorType } from "..";
import { VesoArray } from "../array";
import { VesoDate } from "../date";
import { VesoNumber } from "../number";
import { VesoString } from "../string";

type VesoValidatorMethods<T extends VesoValidatorType> = {
  [TKey in keyof T["prototype"]]: TKey extends "validate" ? never : TKey;
}[keyof T["prototype"]];

type VesoStringMethods = VesoValidatorMethods<typeof VesoString>;
type VesoNumberMethods = VesoValidatorMethods<typeof VesoNumber>;
type VesoDateMethods = VesoValidatorMethods<typeof VesoDate>;
type VesoArrayMethods = VesoValidatorMethods<typeof VesoArray>;

type VesoStringKey = `VESO.STRING.${VesoStringMethods}`;
type VesoNumberKey = `VESO.NUMBER.${VesoNumberMethods}`;
type VesoDateKey = `VESO.DATE.${VesoDateMethods}`;
type VesoArrayKey = `VESO.ARRAY.${VesoArrayMethods}`;

export type VesoTranslateKey =
  | VesoStringKey
  | VesoNumberKey
  | VesoDateKey
  | VesoArrayKey;

export type VesoMap = Partial<{
  STRING: Partial<Record<VesoStringMethods, string>>;
  NUMBER: Partial<Record<VesoNumberMethods, string>>;
  DATE: Partial<Record<VesoDateMethods, string>>;
  ARRAY: Partial<Record<VesoArrayMethods, string>>;
}>;
