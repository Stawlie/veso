import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate, UseTranslateSettings } from "../translate";
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
    check.type === "required"
      ? this._check.unshift(check)
      : this._check.push(check);

    return this;
  }

  private _validateCheck(
    validateIf: UTILS.VesoArrayCheck["settings"]["validateIf"]
  ) {
    if (validateIf === undefined) {
      return true;
    }

    if (typeof validateIf === "boolean") {
      return validateIf;
    }

    return validateIf();
  }

  public required(settings?: UTILS.VesoGetSettings<"required">) {
    return this._addCheck({
      type: "required",
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public minLength(
    minLength: number,
    settings?: UTILS.VesoGetSettings<"minLength">
  ) {
    return this._addCheck({
      type: "minLength",
      value: minLength,
      data: { minLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public maxLength(
    maxLength: number,
    settings?: UTILS.VesoGetSettings<"maxLength">
  ) {
    return this._addCheck({
      type: "maxLength",
      value: maxLength,
      data: { maxLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public exactLength(
    exactLength: number,
    settings?: UTILS.VesoGetSettings<"exactLength">
  ) {
    return this._addCheck({
      type: "exactLength",
      value: exactLength,
      data: { exactLength },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
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

    // Required check always first
    if (
      EMPTY_VALUES.includes(value) &&
      !(
        this._check[0].type === "required" &&
        this._validateCheck(this._check[0].settings.validateIf)
      )
    ) {
      return true;
    }

    loop: for (const check of this._check) {
      if (!this._validateCheck(check.settings.validateIf)) {
        continue;
      }

      const message: UseTranslateSettings<"ARRAY"> = {
        name: "ARRAY",
        method: check.method || check.type,
        data: check.data,
        message: check.settings.message,
      };

      switch (check.type) {
        case "required": {
          if (UTILS.required(value, valueType)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "exactLength": {
          if (UTILS.exactLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "maxLength": {
          if (UTILS.maxLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "minLength": {
          if (UTILS.minLength(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
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
