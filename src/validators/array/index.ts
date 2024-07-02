import { VesoValueTypes, getValueType } from "../utils";
import { useTranslate } from "../translate";
import * as UTILS from "./utils";

export class VesoArray {
  private _check: UTILS.VesoArrayCheck[] = [];
  private _validationIssue: string | null = null;
  private _isRequired = false;

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
    this._isRequired = true;

    return this._addCheck({
      type: "required",
      message: useTranslate({
        name: "ARRAY",
        method: "required",
        message,
      }),
    });
  }

  public minLength(minLength: number, message?: string) {
    return this._addCheck({
      type: "minLength",
      message: useTranslate({
        name: "ARRAY",
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
        name: "ARRAY",
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
        name: "ARRAY",
        method: "exactLength",
        data: { exactLength },
        message,
      }),
      value: exactLength,
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

    if (!this._isRequired) {
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
          if (UTILS.exactLength(value, check.value)) {
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

        case "minLength": {
          if (UTILS.minLength(value, check.value)) {
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
