import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate, UseTranslateSettings } from "../translate";
import * as UTILS from "./utils";

export class VesoNumber {
  private _check: UTILS.VesoNumberCheck[];
  private _coerce: boolean;
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoNumberConstructor) {
    this._check = settings?.check || [];
    this._coerce = settings?.coerce || false;
  }

  static create(settings?: UTILS.VesoNumberConstructor) {
    return new VesoNumber(settings);
  }

  private _addCheck(check: UTILS.VesoNumberCheck) {
    check.type === "required"
      ? this._check.unshift(check)
      : this._check.push(check);

    return this;
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

  public min(min: number, settings?: UTILS.VesoGetSettings<"min">) {
    return this._addCheck({
      type: "min",
      value: min,
      data: { min },
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public max(max: number, settings?: UTILS.VesoGetSettings<"max">) {
    return this._addCheck({
      type: "max",
      value: max,
      data: { max },
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public between(
    min: number,
    max: number,
    settings?: UTILS.VesoGetSettings<"min"> | UTILS.VesoGetSettings<"max">
  ) {
    return this._addCheck({
      type: "min",
      method: "between",
      value: min,
      data: { min, max },
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    })._addCheck({
      type: "max",
      method: "between",
      value: max,
      data: { min, max },
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public positive(settings?: UTILS.VesoGetSettings<"min">) {
    return this._addCheck({
      type: "min",
      method: "positive",
      value: 0,
      inclusive: false,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public negative(settings?: UTILS.VesoGetSettings<"max">) {
    return this._addCheck({
      type: "max",
      method: "negative",
      value: 0,
      inclusive: false,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public nonpositive(settings?: UTILS.VesoGetSettings<"max">) {
    return this._addCheck({
      type: "max",
      method: "nonnegative",
      value: 0,
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public nonnegative(settings?: UTILS.VesoGetSettings<"min">) {
    return this._addCheck({
      type: "min",
      method: "nonnegative",
      value: 0,
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public multipleOf(
    multipleOf: number,
    settings?: UTILS.VesoGetSettings<"multipleOf">
  ) {
    return this._addCheck({
      type: "multipleOf",
      value: multipleOf,
      data: { multipleOf },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public safe(
    settings?: UTILS.VesoGetSettings<"min"> | UTILS.VesoGetSettings<"max">
  ) {
    return this._addCheck({
      type: "min",
      method: "safe",
      value: Number.MIN_SAFE_INTEGER,
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    })._addCheck({
      type: "max",
      method: "safe",
      value: Number.MAX_SAFE_INTEGER,
      inclusive: true,
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public integer(settings?: UTILS.VesoGetSettings<"integer">) {
    return this._addCheck({
      type: "integer",
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public notIn(notIn: number[], settings?: UTILS.VesoGetSettings<"notIn">) {
    return this._addCheck({
      type: "notIn",
      value: notIn,
      data: { notIn },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public validate(value: any) {
    this._validationIssue = null;

    if (this._coerce) {
      value = EMPTY_VALUES.includes(value) ? null : Number(value);
    }

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

    // Required check always first
    if (this._check[0].type !== "required" && EMPTY_VALUES.includes(value)) {
      return true;
    }

    loop: for (const check of this._check) {
      if (
        !check.settings.validateIf &&
        check.settings.validateIf !== undefined
      ) {
        continue;
      }

      if (
        typeof check.settings.validateIf === "function" &&
        !check.settings.validateIf()
      ) {
        continue;
      }

      const message: UseTranslateSettings<"NUMBER"> = {
        name: "NUMBER",
        method: check.method || check.type,
        data: check.data,
        message: check.settings.message,
      };

      switch (check.type) {
        case "required": {
          if (UTILS.required(valueType)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "integer": {
          if (UTILS.integer(value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "min": {
          if (UTILS.min(value, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "max": {
          if (UTILS.max(value, check.value, check.inclusive)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "multipleOf": {
          if (UTILS.multipleOf(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "notIn": {
          if (UTILS.notIn(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
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

export const coerceNumber = (arg?: UTILS.VesoNumberConstructor) =>
  VesoNumber.create({ ...arg, coerce: true });
