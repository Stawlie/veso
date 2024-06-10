import { VesoValueTypes, getValueType } from "../utils";
import * as UTILS from "./utils";

class VesoDate {
  private _check: UTILS.VesoDateCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoDateConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  static create() {
    return new VesoDate({
      check: [],
    });
  }

  private _addCheck(check: UTILS.VesoDateCheck) {
    return new VesoDate({
      check: [...this._check, check],
    });
  }

  public min(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      value,
      message: message || UTILS.LOCALE.min(value),
    });
  }

  public minInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value,
      message: message || UTILS.LOCALE.minInclusive(value),
    });
  }

  public max(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      value,
      message: message || UTILS.LOCALE.max(value),
    });
  }

  public maxInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value,
      message: message || UTILS.LOCALE.maxInclusive(value),
    });
  }

  public between(min: number, max: number, message?: string) {
    if (min > max) {
      console.warn(
        `Number Validator: Min(${min}) should be less or equal than Max(${max})!`
      );
    }

    return this._addCheck({
      type: "min",
      inclusive: true,
      message: message || UTILS.LOCALE.between(min, max),
      value: min,
    })._addCheck({
      type: "max",
      inclusive: true,
      message: message || UTILS.LOCALE.between(min, max),
      value: max,
    });
  }

  public validate(value: any) {
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
          if (UTILS.min(value, valueType, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "max": {
          if (UTILS.max(value, valueType, check.value, check.inclusive)) {
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