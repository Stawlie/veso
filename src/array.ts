import { VesoValueTypes, getValueType } from "./utils";
import * as ARRAY_UTILS from "./validators/array";

class VesoArray {
  private _check: ARRAY_UTILS.VesoArrayCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: ARRAY_UTILS.VesoArrayConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  static create() {
    return new VesoArray({
      check: [],
    });
  }

  private _addCheck(check: ARRAY_UTILS.VesoArrayCheck) {
    return new VesoArray({
      check: [...this._check, check],
    });
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || ARRAY_UTILS.LOCALE.required,
    });
  }

  public exactLength(value: number, message?: string) {
    return this._addCheck({
      type: "exactLength",
      message: message || ARRAY_UTILS.LOCALE.exactLength(value),
      value,
    });
  }

  public minLength(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      inclusive: false,
      message: message || ARRAY_UTILS.LOCALE.minLength(value),
      value,
    });
  }

  public minLengthInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      inclusive: true,
      message: message || ARRAY_UTILS.LOCALE.minLengthInclusive(value),
      value,
    });
  }

  public maxLength(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      inclusive: false,
      message: message || ARRAY_UTILS.LOCALE.maxLength(value),
      value,
    });
  }

  public maxLengthInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      inclusive: true,
      message: message || ARRAY_UTILS.LOCALE.maxLengthInclusive(value),
      value,
    });
  }

  public validate(value: any) {
    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" rule)
    if (
      valueType !== VesoValueTypes.array &&
      valueType !== VesoValueTypes.null &&
      valueType !== VesoValueTypes.undefined
    ) {
      console.error(
        `Array Validator: Type of the value must be valid! Current type: ${valueType}`
      );
      return false;
    }

    if (this._check.length === 0) {
      return true;
    }

    loop: for (const check of this._check) {
      switch (check.type) {
        case "required": {
          if (ARRAY_UTILS.required(valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "exactLength": {
          if (ARRAY_UTILS.exactLength(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "maxLength": {
          if (
            ARRAY_UTILS.maxLength(
              value,
              valueType,
              check.value,
              check.inclusive
            )
          ) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "minLength": {
          if (
            ARRAY_UTILS.minLength(
              value,
              valueType,
              check.value,
              check.inclusive
            )
          ) {
            break;
          }

          this._validationIssue = check.message;
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

export const array = VesoArray.create;
