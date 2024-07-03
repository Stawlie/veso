import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate } from "../translate";
import * as UTILS from "./utils";

export class VesoNumber {
  private _check: UTILS.VesoNumberCheck[];
  private _coerce: boolean;
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoNumberConstructor) {
    this._check = settings?.check || [];
    this._coerce = settings?.coerce || false;
  }

  static create(settings?: UTILS.VesoNumberConstructor) {
    return new VesoNumber(settings);
  }

  private _addCheck(check: UTILS.VesoNumberCheck) {
    check.type === "required"
      ? this._check.unshift(check)
      : this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: useTranslate({
        name: "NUMBER",
        method: "required",
        message,
      }),
    });
  }

  public min(min: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "min",
        data: { min },
        message,
      }),
      value: min,
    });
  }

  public max(max: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "max",
        data: { max },
        message,
      }),
      value: max,
    });
  }

  public between(min: number, max: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "between",
        data: { min, max },
        message,
      }),
      value: min,
    })._addCheck({
      type: "max",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "between",
        data: { min, max },
        message,
      }),
      value: max,
    });
  }

  public positive(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      message: useTranslate({
        name: "NUMBER",
        method: "positive",
        message,
      }),
      value: 0,
    });
  }

  public negative(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      message: useTranslate({
        name: "NUMBER",
        method: "negative",
        message,
      }),
      value: 0,
    });
  }

  public nonpositive(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value: 0,
      message: useTranslate({
        name: "NUMBER",
        method: "nonpositive",
        message,
      }),
    });
  }

  public nonnegative(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "nonnegative",
        message,
      }),
      value: 0,
    });
  }

  public multipleOf(multipleOf: number, message?: string) {
    return this._addCheck({
      type: "multipleOf",
      message: useTranslate({
        name: "NUMBER",
        method: "multipleOf",
        data: { multipleOf },
        message,
      }),
      value: multipleOf,
    });
  }

  public safe(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "safe",
        message,
      }),
      value: Number.MIN_SAFE_INTEGER,
    })._addCheck({
      type: "max",
      inclusive: true,
      message: useTranslate({
        name: "NUMBER",
        method: "safe",
        message,
      }),
      value: Number.MAX_SAFE_INTEGER,
    });
  }

  public integer(message?: string) {
    return this._addCheck({
      type: "int",
      message: useTranslate({
        name: "NUMBER",
        method: "integer",
        message,
      }),
    });
  }

  public notIn(notIn: number[], message?: string) {
    return this._addCheck({
      type: "notIn",
      message: useTranslate({
        name: "NUMBER",
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
      value = EMPTY_VALUES.includes(value) ? null : Number(value);
    }

    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" check)
    if (
      valueType !== VesoValueTypes.number &&
      valueType !== VesoValueTypes.null &&
      valueType !== VesoValueTypes.undefined
    ) {
      console.error(
        `Number Validator:Type of the value must be valid! Current type: ${valueType}`
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
          if (UTILS.required(valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "int": {
          if (UTILS.int(value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "min": {
          if (UTILS.min(value, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "max": {
          if (UTILS.max(value, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "multipleOf": {
          if (UTILS.multipleOf(value, check.value)) {
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
          console.error(`Number Validator: Unknown check type!`, check);
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

export const number = VesoNumber.create;

export const coerceNumber = (arg?: UTILS.VesoNumberConstructor) =>
  VesoNumber.create({ ...arg, coerce: true });
