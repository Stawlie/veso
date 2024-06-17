import { VesoValueTypes, getValueType, t } from "../utils";
import * as UTILS from "./utils";

export class VesoString {
  private _check: UTILS.VesoStringCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoStringConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  static create() {
    return new VesoString({
      check: [],
    });
  }

  private _addCheck(check: UTILS.VesoStringCheck) {
    this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message:
        message || t("VESO.STRING.required") || UTILS.DEFAULT_MESSAGE.required,
    });
  }

  public minLength(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      message:
        message ||
        t("VESO.STRING.minLength", { minLength: value }) ||
        UTILS.DEFAULT_MESSAGE.minLength(value),
      value,
    });
  }

  public maxLength(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      message:
        message ||
        t("VESO.STRING.maxLength", { maxLength: value }) ||
        UTILS.DEFAULT_MESSAGE.maxLength(value),
      value,
    });
  }

  public exactLength(value: number, message?: string) {
    return this._addCheck({
      type: "exactLength",
      message:
        message ||
        t("VESO.STRING.exactLength", { exactLength: value }) ||
        UTILS.DEFAULT_MESSAGE.exactLength(value),
      value,
    });
  }

  public startsWith(value: string, message?: string) {
    return this._addCheck({
      type: "startsWith",
      message:
        message ||
        t("VESO.STRING.startsWith", { startsWith: value }) ||
        UTILS.DEFAULT_MESSAGE.startsWith(value),
      value,
    });
  }

  public endsWith(value: string, message?: string) {
    return this._addCheck({
      type: "endsWith",
      message:
        message ||
        t("VESO.STRING.endsWith", { endsWith: value }) ||
        UTILS.DEFAULT_MESSAGE.endsWith(value),
      value,
    });
  }

  public includes(value: string, message?: string) {
    return this._addCheck({
      type: "includes",
      message:
        message ||
        t("VESO.STRING.includes", { includes: value }) ||
        UTILS.DEFAULT_MESSAGE.includes(value),
      value,
    });
  }

  public regex(value: RegExp, message?: string) {
    return this._addCheck({
      type: "regex",
      message:
        message ||
        t("VESO.STRING.regex", { regex: value }) ||
        UTILS.DEFAULT_MESSAGE.regex(value),
      value,
    });
  }

  public ip(ipType: UTILS.VesoIpTypes = "v4", message?: string) {
    return this._addCheck({
      type: "regex",
      message:
        message ||
        t("VESO.STRING.ip", { ip: ipType }) ||
        UTILS.DEFAULT_MESSAGE.ip(ipType),
      value: ipType === "v4" ? UTILS.v4Regex : UTILS.v6Regex,
    });
  }

  public mac(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || t("VESO.STRING.mac") || UTILS.DEFAULT_MESSAGE.mac,
      value: UTILS.macRegex,
    });
  }

  public email(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || t("VESO.STRING.email") || UTILS.DEFAULT_MESSAGE.email,
      value: UTILS.emailRegex,
    });
  }

  public url(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || t("VESO.STRING.url") || UTILS.DEFAULT_MESSAGE.url,
      value: UTILS.urlRegex,
    });
  }

  public unique(value: number, message?: string) {
    return this._addCheck({
      type: "unique",
      message:
        message ||
        t("VESO.STRING.unique") ||
        UTILS.DEFAULT_MESSAGE.unique(value),
      value,
    });
  }

  public numeric(message?: string) {
    return this._addCheck({
      type: "regex",
      message:
        message || t("VESO.STRING.numeric") || UTILS.DEFAULT_MESSAGE.numeric,
      value: UTILS.numericRegex,
    });
  }

  public alpha(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || t("VESO.STRING.alpha") || UTILS.DEFAULT_MESSAGE.alpha,
      value: UTILS.alphaRegex,
    });
  }

  public alphaNum(message?: string) {
    return this._addCheck({
      type: "regex",
      message:
        message || t("VESO.STRING.alphaNum") || UTILS.DEFAULT_MESSAGE.alphaNum,
      value: UTILS.alphaNumRegex,
    });
  }

  public hex(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || t("VESO.STRING.hex") || UTILS.DEFAULT_MESSAGE.hex,
      value: UTILS.hexRegex,
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

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

    loop: for (const check of this._check) {
      switch (check.type) {
        case "required": {
          if (UTILS.required(value, valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "minLength": {
          if (UTILS.minLength(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "startsWith": {
          if (UTILS.startsWith(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "endsWith": {
          if (UTILS.endsWith(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "includes": {
          if (UTILS.includes(value, valueType, check.value, check.position)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "regex": {
          if (UTILS.regex(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "unique": {
          if (UTILS.unique(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
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
