import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate } from "../translate";
import * as UTILS from "./utils";

export class VesoDate {
  private _check: UTILS.VesoDateCheck[];
  private _coerce: boolean;
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoDateConstructor) {
    this._check = settings?.check || [];
    this._coerce = settings?.coerce || false;
  }

  static create(settings?: UTILS.VesoDateConstructor) {
    return new VesoDate(settings);
  }

  private _addCheck(check: UTILS.VesoDateCheck) {
    check.type === "required"
      ? this._check.unshift(check)
      : this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: useTranslate({
        name: "DATE",
        method: "required",
        message,
      }),
    });
  }

  public min(min: number, message?: string) {
    return this._addCheck({
      type: "min",
      message: useTranslate({
        name: "DATE",
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
      message: useTranslate({
        name: "DATE",
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
      message: useTranslate({
        name: "DATE",
        method: "between",
        data: { min, max },
        message,
      }),
      value: min,
    })._addCheck({
      type: "max",
      message: useTranslate({
        name: "DATE",
        method: "between",
        data: { min, max },
        message,
      }),
      value: max,
    });
  }

  public notIn(notIn: Date[], message?: string) {
    return this._addCheck({
      type: "notIn",
      message: useTranslate({
        name: "DATE",
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
      value = EMPTY_VALUES.includes(value) ? null : new Date(value);
    }

    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" check)
    if (
      valueType !== VesoValueTypes.date &&
      valueType !== VesoValueTypes.null &&
      valueType !== VesoValueTypes.undefined
    ) {
      console.error(
        `Date Validator: Type of the value must be valid! Current type: ${valueType}`
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

        case "min": {
          if (UTILS.min(value, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "max": {
          if (UTILS.max(value, check.value)) {
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
          console.error(`Array Validator: Unknown check type!`, check);
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

export const date = VesoDate.create;

export const coerceDate = (arg?: UTILS.VesoDateConstructor) =>
  VesoDate.create({ ...arg, coerce: true });
