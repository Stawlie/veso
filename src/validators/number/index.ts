import { VesoValueTypes, getValueType, t } from "../utils";
import * as UTILS from "./utils";

export class VesoNumber {
  private _check: UTILS.VesoNumberCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoNumberConstructor) {
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

  private _addCheck(check: UTILS.VesoNumberCheck) {
    this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message:
        message || t("VESO.NUMBER.required") || UTILS.DEFAULT_MESSAGE.required,
    });
  }

  public min(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value,
      message:
        message ||
        t("VESO.NUMBER.min", { min: value }) ||
        UTILS.DEFAULT_MESSAGE.min(value),
    });
  }

  public max(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value,
      message:
        message ||
        t("VESO.NUMBER.max", { max: value }) ||
        UTILS.DEFAULT_MESSAGE.max(value),
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
      message:
        message ||
        t("VESO.NUMBER.between", { min, max }) ||
        UTILS.DEFAULT_MESSAGE.between(min, max),
      value: min,
    })._addCheck({
      type: "max",
      inclusive: true,
      message:
        message ||
        t("VESO.NUMBER.between", { min, max }) ||
        UTILS.DEFAULT_MESSAGE.between(min, max),
      value: max,
    });
  }

  public positive(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      value: 0,
      message:
        message || t("VESO.NUMBER.positive") || UTILS.DEFAULT_MESSAGE.positive,
    });
  }

  public negative(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      value: 0,
      message:
        message || t("VESO.NUMBER.negative") || UTILS.DEFAULT_MESSAGE.negative,
    });
  }

  public nonpositive(message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value: 0,
      message:
        message ||
        t("VESO.NUMBER.nonpositive") ||
        UTILS.DEFAULT_MESSAGE.nonpositive,
    });
  }

  public nonnegative(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value: 0,
      message:
        message ||
        t("VESO.NUMBER.nonnegative") ||
        UTILS.DEFAULT_MESSAGE.nonnegative,
    });
  }

  public multipleOf(value: number, message?: string) {
    return this._addCheck({
      type: "multipleOf",
      value,
      message:
        message ||
        t("VESO.NUMBER.multipleOf", { multipleOf: value }) ||
        UTILS.DEFAULT_MESSAGE.multipleOf(value),
    });
  }

  public safe(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: message || t("VESO.NUMBER.safe") || UTILS.DEFAULT_MESSAGE.safe,
    })._addCheck({
      type: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: message || t("VESO.NUMBER.safe") || UTILS.DEFAULT_MESSAGE.safe,
    });
  }

  public integer(message?: string) {
    return this._addCheck({
      type: "int",
      message:
        message || t("VESO.NUMBER.integer") || UTILS.DEFAULT_MESSAGE.integer,
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

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
          if (UTILS.int(value, valueType)) {
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

        case "multipleOf": {
          if (UTILS.multipleOf(value, valueType, check.value)) {
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
