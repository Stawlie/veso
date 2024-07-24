import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { UseTranslateSettings, useTranslate } from "../translate";
import * as UTILS from "./utils";

export class VesoString {
  private _check: UTILS.VesoStringCheck[];
  private _coerce: boolean;
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoStringConstructor) {
    this._check = settings?.check || [];
    this._coerce = settings?.coerce || false;
  }

  static create(settings?: UTILS.VesoStringConstructor) {
    return new VesoString(settings);
  }

  private _addCheck(check: UTILS.VesoStringCheck) {
    check.type === "required"
      ? this._check.unshift(check)
      : this._check.push(check);

    return this;
  }

  private _validateCheck(
    validateIf: UTILS.VesoStringCheck["settings"]["validateIf"]
  ) {
    if (validateIf === undefined) {
      return true;
    }

    if (typeof validateIf === "boolean") {
      return validateIf;
    }

    return validateIf();
  }

  public required(settings?: UTILS.VesoGetSettings<"required">) {
    return this._addCheck({
      type: "required",
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public minLength(
    minLength: number,
    settings?: UTILS.VesoGetSettings<"minLength">
  ) {
    return this._addCheck({
      type: "minLength",
      value: minLength,
      data: { minLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public maxLength(
    maxLength: number,
    settings?: UTILS.VesoGetSettings<"maxLength">
  ) {
    return this._addCheck({
      type: "maxLength",
      value: maxLength,
      data: { maxLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public exactLength(
    exactLength: number,
    settings?: UTILS.VesoGetSettings<"exactLength">
  ) {
    return this._addCheck({
      type: "exactLength",
      value: exactLength,
      data: { exactLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public startsWith(
    startsWith: string,
    settings?: UTILS.VesoGetSettings<"startsWith">
  ) {
    return this._addCheck({
      type: "startsWith",
      value: startsWith,
      data: { startsWith },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public endsWith(
    endsWith: string,
    settings?: UTILS.VesoGetSettings<"endsWith">
  ) {
    return this._addCheck({
      type: "endsWith",
      value: endsWith,
      data: { endsWith },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public includes(
    includes: string,
    settings?: UTILS.VesoGetSettings<"includes">
  ) {
    return this._addCheck({
      type: "includes",
      value: includes,
      data: { includes },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public regex(regex: RegExp, settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      value: regex,
      data: { regex },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public ip(
    ip: UTILS.VesoIpTypes = "v4",
    settings?: UTILS.VesoGetSettings<"regex">
  ) {
    return this._addCheck({
      type: "regex",
      method: "ip",
      value: ip === "v4" ? UTILS.v4Regex : UTILS.v6Regex,
      data: { ip },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public mac(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "mac",
      value: UTILS.macRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public email(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "email",
      value: UTILS.emailRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public url(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "url",
      value: UTILS.urlRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public unique(unique: number, settings?: UTILS.VesoGetSettings<"unique">) {
    return this._addCheck({
      type: "unique",
      value: unique,
      data: { unique },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public numeric(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "numeric",
      value: UTILS.numericRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public alpha(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "alpha",
      value: UTILS.alphaRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public alphaNum(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "alphaNum",
      value: UTILS.alphaNumRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public hex(settings?: UTILS.VesoGetSettings<"regex">) {
    return this._addCheck({
      type: "regex",
      method: "hex",
      value: UTILS.hexRegex,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public notIn(notIn: string[], settings?: UTILS.VesoGetSettings<"notIn">) {
    return this._addCheck({
      type: "notIn",
      value: notIn,
      data: { notIn },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

    if (this._coerce) {
      value = EMPTY_VALUES.includes(value) ? null : String(value);
    }

    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" check)
    if (
      valueType !== VesoValueTypes.string &&
      valueType !== VesoValueTypes.null &&
      valueType !== VesoValueTypes.undefined
    ) {
      console.error(
        `String Validator: Type of the value must be valid! Current type: ${valueType}`
      );
      return false;
    }

    if (this._check.length === 0) {
      return true;
    }

    // Required check always first
    if (
      EMPTY_VALUES.includes(value) &&
      !(
        this._check[0].type === "required" &&
        this._validateCheck(this._check[0].settings.validateIf)
      )
    ) {
      return true;
    }

    loop: for (const check of this._check) {
      if (!this._validateCheck(check.settings.validateIf)) {
        continue;
      }

      const message: UseTranslateSettings<"STRING"> = {
        name: "STRING",
        method: check.method || check.type,
        data: check.data,
        message: check.settings.message,
      };

      switch (check.type) {
        case "required": {
          if (UTILS.required(value, valueType)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "minLength": {
          if (UTILS.minLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "exactLength": {
          if (UTILS.exactLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "startsWith": {
          if (UTILS.startsWith(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "endsWith": {
          if (UTILS.endsWith(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "includes": {
          if (UTILS.includes(value, check.value, check.settings.position)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "regex": {
          if (UTILS.regex(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "unique": {
          if (UTILS.unique(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "notIn": {
          if (UTILS.notIn(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        default: {
          console.error(`String Validator: Unknown check type!`, check);
          break loop;
        }
      }
    }

    if (!this._validationIssue) {
      return true;
    }

    return this._validationIssue;
  }
}

export const string = VesoString.create;

export const coerceString = (arg?: UTILS.VesoStringConstructor) =>
  VesoString.create({ ...arg, coerce: true });
