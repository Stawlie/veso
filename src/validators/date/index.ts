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

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || UTILS.LOCALE.required,
    });
  }

  public min(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      value,
      message: message || UTILS.LOCALE.min(value),
    });
  }

  public max(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      value,
      message: message || UTILS.LOCALE.max(value),
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
      message: message || UTILS.LOCALE.between(min, max),
      value: min,
    })._addCheck({
      type: "max",
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
