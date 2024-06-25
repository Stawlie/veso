import { VesoValueTypes, getValueType, t } from "../utils";
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
    this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message:
        message || t("VESO.DATE.required") || UTILS.DEFAULT_MESSAGE.required,
    });
  }

  public min(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      value,
      message:
        message ||
        t("VESO.DATE.min", { min: new Date(value) }) ||
        UTILS.DEFAULT_MESSAGE.min(value),
    });
  }

  public max(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      value,
      message:
        message ||
        t("VESO.DATE.max", { max: new Date(value) }) ||
        UTILS.DEFAULT_MESSAGE.max(value),
    });
  }

  public between(min: number, max: number, message?: string) {
    if (min > max) {
      console.warn(
        `Date Validator: Min(${new Date(
          min
        )}) should be less or equal than Max(${new Date(max)})!`
      );
    }

    return this._addCheck({
      type: "min",
      message:
        message ||
        t("VESO.DATE.between", { min: new Date(min), max: new Date(max) }) ||
        UTILS.DEFAULT_MESSAGE.between(min, max),
      value: min,
    })._addCheck({
      type: "max",
      message:
        message ||
        t("VESO.DATE.between", { min: new Date(min), max: new Date(max) }) ||
        UTILS.DEFAULT_MESSAGE.between(min, max),
      value: max,
    });
  }

  public notIn(value: Date[], message?: string) {
    return this._addCheck({
      type: "notIn",
      message:
        message ||
        t("VESO.DATE.notIn", { notIn: value }) ||
        UTILS.DEFAULT_MESSAGE.notIn,
      value,
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

    if (this._coerce) {
      value = new Date(value);
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
          if (UTILS.min(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "max": {
          if (UTILS.max(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "notIn": {
          if (UTILS.notIn(value, valueType, check.value)) {
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
