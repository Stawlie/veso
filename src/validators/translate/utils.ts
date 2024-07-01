import { VesoRecord } from "../utils";

export type VesoTranslateKey =
  | `VESO.STRING.${VesoRecord["STRING"]}`
  | `VESO.NUMBER.${VesoRecord["NUMBER"]}`
  | `VESO.DATE.${VesoRecord["DATE"]}`
  | `VESO.ARRAY.${VesoRecord["ARRAY"]}`;

export type VesoTranslateFunction<T = string> = (
  key: VesoTranslateKey,
  data?: Record<string, unknown>
) => T;

export type VesoMap = Partial<{
  [TKey in keyof VesoRecord]: Partial<Record<VesoRecord[TKey], string>>;
}>;
