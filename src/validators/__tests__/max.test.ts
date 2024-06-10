// import { max } from "../max";

// describe("Тестирование функции 'max'", () => {
//   describe("Проверка невалидных значений:", () => {
//     jest.spyOn(console, "warn").mockImplementation();

//     it("Булевые значения - true (with warning)", () => {
//       expect(max(false, 0)).toBe(true);
//       expect(max(true, 0)).toBe(true);
//     });

//     it("Массив - true (with warning)", () => {
//       expect(max([], 0)).toBe(true);
//     });

//     it("Объект - true (with warning)", () => {
//       expect(max({}, 0)).toBe(true);
//     });
//   });

//   describe("Проверка строк:", () => {
//     it("Пустая - true", () => {
//       expect(max("", 0)).toBe(true);
//     });

//     it("Строки, которые не преобразуются в числа - true", () => {
//       expect(max("32,", 0)).toBe(true);
//       expect(max("egwge", 0)).toBe(true);
//     });

//     describe("Строки, которые преобразуются в числа:", () => {
//       it("Дробные - true", () => {
//         expect(max("32.0", 50)).toBe(true);
//       });

//       it("Дробные - false", () => {
//         expect(max("32.0", 20)).toBe(false);
//       });

//       it("Целые - true", () => {
//         expect(max("32", 50)).toBe(true);
//       });

//       it("Целые - false", () => {
//         expect(max("32", 20)).toBe(false);
//       });

//       it("Ведущие пробелы - true", () => {
//         expect(max("   32", 50)).toBe(true);
//       });

//       it("Ведущие пробелы - false", () => {
//         expect(max("   32", 20)).toBe(false);
//       });

//       it("С пробелами в конце строки - true", () => {
//         expect(max("32   ", 50)).toBe(true);
//       });

//       it("С пробелами в конце строки - false", () => {
//         expect(max("32   ", 20)).toBe(false);
//       });

//       it("С пробелами в начале и в конце строки - true", () => {
//         expect(max("   32   ", 50)).toBe(true);
//       });

//       it("С пробелами в начале и в конце строки - false", () => {
//         expect(max("   32   ", 20)).toBe(false);
//       });
//     });
//   });

//   describe("Проверка чисел:", () => {
//     it("Ноль (меньше значения) - true", () => {
//       expect(max(0, 2)).toBe(true);
//     });

//     it("Ноль (равное значение) - true", () => {
//       expect(max(0, 0)).toBe(true);
//     });

//     it("Ноль (больше значения) - false", () => {
//       expect(max(0, -1)).toBe(false);
//     });

//     it("Положительное число (меньше значения) - true", () => {
//       expect(max(1, 2)).toBe(true);
//     });

//     it("Положительное число (равное значение) - true", () => {
//       expect(max(1, 1)).toBe(true);
//     });

//     it("Положительное число (больше значения) - false", () => {
//       expect(max(1, 0)).toBe(false);
//     });

//     it("Отрицательное число (меньше значения) - true", () => {
//       expect(max(-1, 2)).toBe(true);
//     });

//     it("Отрицательное число (равное значение) - true", () => {
//       expect(max(-1, -1)).toBe(true);
//     });

//     it("Отрицательное число (больше значения) - false", () => {
//       expect(max(-1, -3)).toBe(false);
//     });

//     it("NaN - false", () => {
//       expect(max(NaN, 0)).toBe(false);
//     });
//   });

//   describe("Проверка null и undefined:", () => {
//     it("Null - true", () => {
//       expect(max(null, 0)).toBe(true);
//     });

//     it("Undefined - true", () => {
//       expect(max(undefined, 0)).toBe(true);
//     });
//   });
// });
