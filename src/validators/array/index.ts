import { VesoValueTypes, getValueType, t } from "../utils";
import * as UTILS from "./utils";

export class VesoArray {
  private _check: UTILS.VesoArrayCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoArrayConstructor) {
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

  private _addCheck(check: UTILS.VesoArrayCheck) {
    this._check.push(check);

    return this;
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message:
        message || t("VESO.ARRAY.required") || UTILS.DEFAULT_MESSAGE.required,
    });
  }

  public minLength(value: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      message:
        message ||
        t("VESO.ARRAY.minLength", { minLength: value }) ||
        UTILS.DEFAULT_MESSAGE.minLength(value),
      value,
    });
  }

  public maxLength(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      message:
        message ||
        t("VESO.ARRAY.maxLength", { maxLength: value }) ||
        UTILS.DEFAULT_MESSAGE.maxLength(value),
      value,
    });
  }

  public exactLength(value: number, message?: string) {
    return this._addCheck({
      type: "exactLength",
      message:
        message ||
        t("VESO.ARRAY.exactLength", { exactLength: value }) ||
        UTILS.DEFAULT_MESSAGE.exactLength(value),
      value,
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" check)
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
          if (UTILS.required(value, valueType)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "exactLength": {
          if (UTILS.exactLength(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, valueType, check.value)) {
            break;
          }

          this._validationIssue = check.message;
          break loop;
        }

        case "minLength": {
          if (UTILS.minLength(value, valueType, check.value)) {
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

export const array = VesoArray.create;
