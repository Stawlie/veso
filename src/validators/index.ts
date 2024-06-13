import { string, VesoString } from "./string";
import { number, VesoNumber } from "./number";
import { array, VesoArray } from "./array";
import { date, VesoDate } from "./date";

export { setTranslate } from "./translate";
export type VesoValidator = VesoString | VesoNumber | VesoArray | VesoDate;

export { string, number, array, date };
