import { VesoValueTypes, getValueType } from "../utils";
import * as UTILS from "./utils";

class VesoString {
  private _check: UTILS.VesoStringCheck[] = [];
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoStringConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  static create() {
    return new VesoString({
      check: [],
    });
  }

  private _addCheck(check: UTILS.VesoStringCheck) {
    return new VesoString({
      check: [...this._check, check],
    });
  }

  public required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || UTILS.LOCALE.required,
    });
  }

  public validate(value: any) {
    const valueType = getValueType(value);

    // Base type validation (null and undefined should be invalid only with "required" rule)
    if (
      valueType !== VesoValueTypes.string &&
      valueType !== VesoValueTypes.null &&
      valueType !== VesoValueTypes.undefined
    ) {
      console.error(
        `String Validator: Type of the value must be valid! Current type: ${valueType}`
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
      }
    }

    if (!this._validationIssue) {
      return true;
    }

    return this._validationIssue;
  }
}

export const string = VesoString.create;
