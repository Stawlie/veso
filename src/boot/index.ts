import number from "../rules/number";

// import * as validators from "../validators";
// import { ValidationRule } from "quasar/dist/types";

// class Veso {
//   private _rules: ValidationRule[] = [];

//   constructor() {}

//   required(message?: string) {
//     this._rules.push(
//       (value: unknown) => validators.required(value) || message || "Required"
//     );
//     return this;
//   }

//   minLength(length: number, message?: string) {
//     this._rules.push(
//       (value: unknown) =>
//         validators.minLength(value, length) ||
//         message ||
//         `Min length: ${length}`
//     );
//     return this;
//   }

//   maxLength(length: number, message?: string) {
//     this._rules.push(
//       (value: unknown) =>
//         validators.maxLength(value, length) ||
//         message ||
//         `Max length: ${length}`
//     );
//     return this;
//   }

//   between(min: number | Date, max: number | Date, message?: string) {
//     this._rules.push(
//       (value: unknown) =>
//         validators.between(value, min, max) ||
//         message ||
//         `Between ${min} and ${max}`
//     );
//     return this;
//   }

//   min(min: number, message?: string) {
//     this._rules.push(
//       (value: unknown) => validators.min(value, min) || message || `Min: ${min}`
//     );
//     return this;
//   }

//   max(max: number, message?: string) {
//     this._rules.push(
//       (value: unknown) => validators.max(value, max) || message || `Max: ${max}`
//     );
//     return this;
//   }

//   end() {
//     const returnValue = [...this._rules];
//     this._rules = [];
//     return returnValue;
//   }
// }

// export default new Veso();

// const test = new Veso();

// test.min(3).required().end();

// console.log(validators.ip(3, "ipv4"));
