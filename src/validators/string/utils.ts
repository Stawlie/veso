export * from "./required";
export * from "./minLength";
export * from "./maxLength";
export * from "./startsWith";
export * from "./endsWith";
export * from "./includes";
export * from "./regex";
export * from "./unique";

export const LOCALE = {
  required: "The value is required!",
  minLength: (value: number) =>
    `The value must have more than or equal to ${value} characters!`,

  maxLength: (value: number) =>
    `The value must have less than or equal to ${value} characters!`,
  exactLength: (value: number) =>
    `The value must have exactly ${value} characters!`,
  startsWith: (value: string) => `The value must start with ${value}!`,
  endsWith: (value: string) => `The value must end with ${value}!`,
  includes: (value: string) => `The value must include ${value}!`,
  regex: (value: RegExp) => `The value must match ${value}!`,
  ip: (ipType: VesoIpTypes) => `The value must be a IP${ipType}!`,
  mac: "The value must be a MAC address!",
  email: "The value must be an email!",
  url: "The value must be a URL!",
  unique: (value: number) =>
    `The value must contain at least ${value} unique characters!`,
};

export type VesoStringValueTypes = "string" | "null" | "undefined";

export type VesoStringCheck =
  | { type: "required"; message: string }
  | { type: "minLength"; value: number; message: string }
  | { type: "maxLength"; value: number; message: string }
  | { type: "exactLength"; value: number; message: string }
  | { type: "startsWith"; value: string; message: string }
  | { type: "endsWith"; value: string; message: string }
  | { type: "includes"; value: string; position?: number; message: string }
  | { type: "regex"; value: RegExp; message: string }
  | { type: "unique"; value: number; message: string };

export type VesoStringConstructor = {
  check: VesoStringCheck[];
};

export type VesoIpTypes = "v4" | "v6";

// https://github.com/colinhacks/zod/blob/4e4f3d90f639fa204e0d5ec8d114d59ab26c59ee/src/types.ts#L609
export const v4Regex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;

// https://github.com/colinhacks/zod/blob/4e4f3d90f639fa204e0d5ec8d114d59ab26c59ee/src/types.ts#L612
export const v6Regex =
  /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;

// https://stackoverflow.com/questions/29228769/mac-address-regex-for-javascript/29228841#29228841
export const macRegex =
  /^[0-9a-f]{1,2}([\.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/i;

// https://github.com/colinhacks/zod/blob/4e4f3d90f639fa204e0d5ec8d114d59ab26c59ee/src/types.ts#L599
export const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

// https://github.com/jquense/yup/blob/master/src/string.ts#L24
export const urlRegex =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
