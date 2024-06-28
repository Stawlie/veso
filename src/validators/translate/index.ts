import { VesoTranslateKey } from "./utils";

export type VesoTranslateFunction<T = string> = (
  key: VesoTranslateKey,
  data?: Record<string, any>
) => T;

export let translate: VesoTranslateFunction | null = null;

export function setTranslate(translateFn: VesoTranslateFunction) {
  translate = translateFn;
}

export function useTranslate(
  key: VesoTranslateKey,
  data?: Record<string, any>
) {
  if (translate) {
    return translate(key, data);
  }

  return null;
}
