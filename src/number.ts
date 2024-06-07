import { VesoValueTypes, getValueType } from "./utils";
import * as NUMBER_UTILS from "./validators/number";

class VesoNumber {
  private _check: NUMBER_UTILS.VesoNumberCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: NUMBER_UTILS.VesoNumberConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  static create() {
    return new VesoNumber({
      check: [],
    });
  }

  private _addCheck(check: NUMBER_UTILS.VesoNumberCheck) {
    return new VesoNumber({
      check: [...this._check, check],
    });
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || NUMBER_UTILS.LOCALE.required,
    });
  }

  public greaterThen(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      value,
      message: message || NUMBER_UTILS.LOCALE.greaterThen(value),
    });
  }

  public greaterThenInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value,
      message: message || NUMBER_UTILS.LOCALE.greaterThenInclusive(value),
    });
  }

  public lessThen(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      value,
      message: message || NUMBER_UTILS.LOCALE.lessThen(value),
    });
  }

  public lessThenInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value,
      message: message || NUMBER_UTILS.LOCALE.lessThenInclusive(value),
    });
  }

  public positive(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      value: 0,
      message: message || NUMBER_UTILS.LOCALE.positive,
    });
  }

  public negative(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      value: 0,
      message: message || NUMBER_UTILS.LOCALE.negative,
    });
  }

  public nonpositive(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value: 0,
      message: message || NUMBER_UTILS.LOCALE.nonpositive,
    });
  }

  public nonnegative(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value: 0,
      message: message || NUMBER_UTILS.LOCALE.nonnegative,
    });
  }

  public multipleOf(value: number, message?: string) {
    return this._addCheck({
      type: "multipleOf",
      value,
      message: message || NUMBER_UTILS.LOCALE.multipleOf(value),
    });
  }

  public safe(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: message || NUMBER_UTILS.LOCALE.safe,
    })._addCheck({
      type: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: message || NUMBER_UTILS.LOCALE.safe,
    });
  }

  public integer(message?: string) {
    return this._addCheck({
      type: "int",
      message: message || NUMBER_UTILS.LOCALE.integer,
    });
  }

  public validate(value: any) {
    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" rule)
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

    loop: for (const check of this._check) {
      switch (check.type) {
        case "required": {
          if (NUMBER_UTILS.required(valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "int": {
          if (NUMBER_UTILS.int(value, valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "min": {
          if (
            NUMBER_UTILS.min(value, valueType, check.value, check.inclusive)
          ) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "max": {
          if (
            NUMBER_UTILS.max(value, valueType, check.value, check.inclusive)
          ) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "multipleOf": {
          if (NUMBER_UTILS.multipleOf(value, valueType, check.value)) {
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

export const number = VesoNumber.create;
