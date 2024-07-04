import { VesoValueTypes, getValueType, EMPTY_VALUES } from "../utils";
import { useTranslate, UseTranslateSettings } from "../translate";
import * as UTILS from "./utils";

export class VesoDate {
  private _check: UTILS.VesoDateCheck[];
  private _coerce: boolean;
  private _validationIssue: string | null = null;

  constructor(settings?: UTILS.VesoDateConstructor) {
    this._check = settings?.check || [];
    this._coerce = settings?.coerce || false;
  }

  static create(settings?: UTILS.VesoDateConstructor) {
    return new VesoDate(settings);
  }

  private _addCheck(check: UTILS.VesoDateCheck) {
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
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    })._addCheck({
      type: "max",
      method: "between",
      value: max,
      data: { min, max },
      settings: {
        ...UTILS.DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  public notIn(notIn: Date[], settings?: UTILS.VesoGetSettings<"notIn">) {
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
      value = EMPTY_VALUES.includes(value) ? null : new Date(value);
    }

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

      const message: UseTranslateSettings<"DATE"> = {
        name: "DATE",
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

        case "min": {
          if (UTILS.min(value, check.value)) {
            break;
          }

          this._validationIssue = useTranslate(message);
          break loop;
        }

        case "max": {
          if (UTILS.max(value, check.value)) {
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

export const coerceDate = (arg?: UTILS.VesoDateConstructor) =>
  VesoDate.create({ ...arg, coerce: true });
