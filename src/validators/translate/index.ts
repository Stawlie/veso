import { VesoValidatorName, VesoRecord } from "../utils";
import { VesoTranslateFunction, VesoMap, VesoTranslateKey } from "./utils";
import { DEFAULT_MAP } from "./defaultMap";

export let translate: VesoTranslateFunction | null = null;
export let map: VesoMap = DEFAULT_MAP;

export function setTranslate(translateFn: VesoTranslateFunction | null) {
  translate = translateFn;
}

export function setMap(newMap: VesoMap | null) {
  map = newMap || DEFAULT_MAP;
}

function insertValues(message: string, data?: Record<string, unknown>) {
  if (!data) {
    return message;
  }

  for (let [dataKey, dataValue] of Object.entries(data)) {
    message = message.replaceAll(`{${dataKey}}`, String(dataValue));
  }

  return message;
}

type UseTranslateFunction = <T extends VesoValidatorName>(settings: {
  name: T;
  method: VesoRecord[T];
  data?: Record<string, unknown>;
  message?: string;
}) => string;

export const useTranslate: UseTranslateFunction = ({
  name,
  method,
  data,
  message,
}) => {
  if (message) {
    return insertValues(message, data);
  }

  const key = `VESO.${name}.${method}` as VesoTranslateKey;

  if (translate) {
    return translate(key, data);
  }

  const validatorRecord = map[name];

  if (!validatorRecord) {
    return key;
  }

  let validatorTranslation = validatorRecord[method];

  if (!validatorTranslation) {
    return key;
  }

  return insertValues(validatorTranslation, data);
};
