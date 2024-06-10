import { VesoValueTypes, getValueType } from "../utils";
import * as UTILS from "./utils";

class VesoString {
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
    return new VesoString({
      check: [...this._check, check],
    });
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || UTILS.LOCALE.required,
    });
  }

  public minLength(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      inclusive: false,
      message: message || UTILS.LOCALE.minLength(value),
      value,
    });
  }

  public minLengthInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      inclusive: true,
      message: message || UTILS.LOCALE.minLengthInclusive(value),
      value,
    });
  }

  public maxLength(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      inclusive: false,
      message: message || UTILS.LOCALE.maxLength(value),
      value,
    });
  }

  public maxLengthInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      inclusive: true,
      message: message || UTILS.LOCALE.maxLengthInclusive(value),
      value,
    });
  }

  public startsWith(value: string, message?: string) {
    return this._addCheck({
      type: "startsWith",
      message: message || UTILS.LOCALE.startsWith(value),
      value,
    });
  }

  public endsWith(value: string, message?: string) {
    return this._addCheck({
      type: "endsWith",
      message: message || UTILS.LOCALE.endsWith(value),
      value,
    });
  }

  public includes(value: string, message?: string) {
    return this._addCheck({
      type: "includes",
      message: message || UTILS.LOCALE.includes(value),
      value,
    });
  }

  public regex(value: RegExp, message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || UTILS.LOCALE.regex(value),
      value,
    });
  }

  public ip(ipType: UTILS.VesoIpTypes = "v4", message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || UTILS.LOCALE.ip(ipType),
      value: ipType === "v4" ? UTILS.v4Regex : UTILS.v6Regex,
    });
  }

  public mac(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || UTILS.LOCALE.mac,
      value: UTILS.macRegex,
    });
  }

  public email(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || UTILS.LOCALE.email,
      value: UTILS.emailRegex,
    });
  }

  public url(message?: string) {
    return this._addCheck({
      type: "regex",
      message: message || UTILS.LOCALE.url,
      value: UTILS.urlRegex,
    });
  }

  public unique(value: number, message?: string) {
    return this._addCheck({
      type: "unique",
      inclusive: false,
      message: message || UTILS.LOCALE.unique(value),
      value,
    });
  }

  public uniqueInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "unique",
      inclusive: true,
      message: message || UTILS.LOCALE.uniqueInclusive(value),
      value,
    });
  }

  public validate(value: any) {
    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" rule)
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
          if (UTILS.minLength(value, valueType, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, valueType, check.value, check.inclusive)) {
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
          if (UTILS.unique(value, valueType, check.value, check.inclusive)) {
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
