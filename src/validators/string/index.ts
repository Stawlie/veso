import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate } from "../translate";
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

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: useTranslate({
        name: "STRING",
        method: "required",
        message,
      }),
    });
  }

  public minLength(minLength: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      message: useTranslate({
        name: "STRING",
        method: "minLength",
        data: { minLength },
        message,
      }),
      value: minLength,
    });
  }

  public maxLength(maxLength: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      message: useTranslate({
        name: "STRING",
        method: "maxLength",
        data: { maxLength },
        message,
      }),
      value: maxLength,
    });
  }

  public exactLength(exactLength: number, message?: string) {
    return this._addCheck({
      type: "exactLength",
      message: useTranslate({
        name: "STRING",
        method: "exactLength",
        data: { exactLength },
        message,
      }),
      value: exactLength,
    });
  }

  public startsWith(startsWith: string, message?: string) {
    return this._addCheck({
      type: "startsWith",
      message: useTranslate({
        name: "STRING",
        method: "startsWith",
        data: { startsWith },
        message,
      }),
      value: startsWith,
    });
  }

  public endsWith(endsWith: string, message?: string) {
    return this._addCheck({
      type: "endsWith",
      message: useTranslate({
        name: "STRING",
        method: "endsWith",
        data: { endsWith },
        message,
      }),
      value: endsWith,
    });
  }

  public includes(includes: string, message?: string) {
    return this._addCheck({
      type: "includes",
      message: useTranslate({
        name: "STRING",
        method: "includes",
        data: { includes },
        message,
      }),
      value: includes,
    });
  }

  public regex(regex: RegExp, message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "regex",
        data: { regex },
        message,
      }),
      value: regex,
    });
  }

  public ip(ip: UTILS.VesoIpTypes = "v4", message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "ip",
        data: { ip },
        message,
      }),
      value: ip === "v4" ? UTILS.v4Regex : UTILS.v6Regex,
    });
  }

  public mac(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "mac",
        message,
      }),
      value: UTILS.macRegex,
    });
  }

  public email(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "email",
        message,
      }),
      value: UTILS.emailRegex,
    });
  }

  public url(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "url",
        message,
      }),
      value: UTILS.urlRegex,
    });
  }

  public unique(unique: number, message?: string) {
    return this._addCheck({
      type: "unique",
      message: useTranslate({
        name: "STRING",
        method: "unique",
        data: { unique },
        message,
      }),
      value: unique,
    });
  }

  public numeric(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "numeric",
        message,
      }),
      value: UTILS.numericRegex,
    });
  }

  public alpha(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "alpha",
        message,
      }),
      value: UTILS.alphaRegex,
    });
  }

  public alphaNum(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "alphaNum",
        message,
      }),
      value: UTILS.alphaNumRegex,
    });
  }

  public hex(message?: string) {
    return this._addCheck({
      type: "regex",
      message: useTranslate({
        name: "STRING",
        method: "hex",
        message,
      }),
      value: UTILS.hexRegex,
    });
  }

  public notIn(notIn: string[], message?: string) {
    return this._addCheck({
      type: "notIn",
      message: useTranslate({
        name: "STRING",
        method: "notIn",
        data: { notIn },
        message,
      }),
      value: notIn,
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
    if (this._check[0].type !== "required" && EMPTY_VALUES.includes(value)) {
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
          if (UTILS.minLength(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "exactLength": {
          if (UTILS.exactLength(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "startsWith": {
          if (UTILS.startsWith(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "endsWith": {
          if (UTILS.endsWith(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "includes": {
          if (UTILS.includes(value, check.value, check.position)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "regex": {
          if (UTILS.regex(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "unique": {
          if (UTILS.unique(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "notIn": {
          if (UTILS.notIn(value, check.value)) {
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

export const coerceString = (arg?: UTILS.VesoStringConstructor) =>
  VesoString.create({ ...arg, coerce: true });
