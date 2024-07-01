import { string, coerceString, VesoString } from "./string";
import { number, coerceNumber, VesoNumber } from "./number";
import { date, coerceDate, VesoDate } from "./date";
import { array, VesoArray } from "./array";

export { setTranslate, setMap } from "./translate";
export type {
  VesoTranslateFunction,
  VesoTranslateKey,
  VesoMap,
} from "./translate/utils";
export type VesoValidator = VesoString | VesoNumber | VesoArray | VesoDate;

export { string, number, array, date };

export const coerce = {
  string: coerceString,
  number: coerceNumber,
  date: coerceDate,
};
