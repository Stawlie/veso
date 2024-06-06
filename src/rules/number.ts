import { VesoValueTypes } from "./utils";

const LOCALE = {
  required: "The field is required!",
  greaterThen: (value: number) => `Must be greater than ${value}!`,
  greaterThenInclusive: (value: number) =>
    `Must be greater than or equal to ${value}!`,
  lessThen: (value: number) => `Must be less than ${value}!`,
  lessThenInclusive: (value: number) =>
    `Must be less than or equal to ${value}!`,
  multipleOf: (value: number) => `Must be a multiple of ${value}!`,
  safe: "Must be safe!",
  integer: "Must be an integer!",
  maxLength: (value: number) => `Must be less than ${value} characters!`,
  minLength: (value: number) => `Must be more than ${value} characters!`,
};

const VALID_VALUE_TYPES: VesoValueTypes[] = [
  VesoValueTypes.number,
  VesoValueTypes.null,
  VesoValueTypes.undefined,
];

type VesoNumberConstructor = {
  check: VesoNumberCheck[];
};

type VesoNumberCheck =
  | { type: "required"; message?: string }
  | { type: "int"; message?: string }
  | { type: "multipleOf"; value: number; message?: string }
  | {
      type: "minLength";
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      type: "maxLength";
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      type: "min";
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      type: "max";
      value: number;
      inclusive: boolean;
      message?: string;
    };

class VesoNumber {
  private _check: VesoNumberCheck[] = [];

  constructor(settings?: VesoNumberConstructor) {
    if (!settings) {
      return;
    }

    this._check = settings.check;
  }

  public validate(value: unknown) {
    const type = typeof value;

    if (!VALID_VALUE_TYPES.includes(type)) {
      console.error(`Type of the value must be valid! Current type: ${type}`);
      return false;
    }

    if (this._check.length === 0) {
      return true;
    }

    console.log(this._check);
  }

  static create() {
    return new VesoNumber({
      check: [],
    });
  }

  private _addCheck(check: VesoNumberCheck) {
    return new VesoNumber({
      check: [...this._check, check],
    });
  }

  required(message?: string) {
    return this._addCheck({
      type: "required",
      message: message || LOCALE.required,
    });
  }

  greaterThen(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: false,
      value,
      message: message || LOCALE.greaterThen(value),
    });
  }

  greaterThenInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value,
      message: message || LOCALE.greaterThenInclusive(value),
    });
  }

  lessThen(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: false,
      value,
      message: message || LOCALE.lessThen(value),
    });
  }

  lessThenInclusive(value: number, message?: string) {
    return this._addCheck({
      type: "max",
      inclusive: true,
      value,
      message: message || LOCALE.lessThenInclusive(value),
    });
  }

  positive(message?: string) {
    return this.greaterThen(0, message);
  }

  negative(message?: string) {
    return this.lessThen(0, message);
  }

  nonpositive(message?: string) {
    return this.lessThenInclusive(0, message);
  }

  nonnegative(message?: string) {
    return this.greaterThenInclusive(0, message);
  }

  multipleOf(value: number, message?: string) {
    return this._addCheck({
      type: "multipleOf",
      value,
      message: message || LOCALE.multipleOf(value),
    });
  }

  safe(message?: string) {
    return this._addCheck({
      type: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: message || LOCALE.safe,
    })._addCheck({
      type: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: message || LOCALE.safe,
    });
  }

  integer(message?: string) {
    return this._addCheck({
      type: "int",
      message: message || LOCALE.integer,
    });
  }

  maxLength(value: number, message?: string) {
    return this._addCheck({
      type: "maxLength",
      value,
      inclusive: true,
      message: message || LOCALE.maxLength(value),
    });
  }
}

export default VesoNumber.create;
