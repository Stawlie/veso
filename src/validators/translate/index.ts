import { VesoValidatorName, VesoRecord } from "../utils";
import { VesoTranslateFunction } from "./utils";

export let translate: VesoTranslateFunction | null = null;

export function setTranslate(translateFn: VesoTranslateFunction) {
  translate = translateFn;
}

export function useTranslate<T extends VesoValidatorName>(
  name: T,
  method: VesoRecord[T],
  data?: Record<string, unknown>
) {
  const key = `VESO.${name}.${method}`;

  if (translate) {
    return translate(key, data);
  }

  return null;
}
