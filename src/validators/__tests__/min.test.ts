// import { min } from "../min";

// describe("Тестирование функции 'min'", () => {
//   describe("Проверка невалидных значений:", () => {
//     jest.spyOn(console, "warn").mockImplementation();

//     it("Булевые значения - true (with warning)", () => {
//       expect(min(false, 0)).toBe(true);
//       expect(min(true, 0)).toBe(true);
//     });

//     it("Массив - true (with warning)", () => {
//       expect(min([], 0)).toBe(true);
//     });

//     it("Объект - true (with warning)", () => {
//       expect(min({}, 0)).toBe(true);
//     });
//   });

//   describe("Проверка строк:", () => {
//     it("Пустая - true", () => {
//       expect(min("", 0)).toBe(true);
//     });

//     it("Строки, которые не преобразуются в числа - true", () => {
//       expect(min("32,", 0)).toBe(true);
//       expect(min("egwge", 0)).toBe(true);
//     });

//     describe("Строки, которые преобразуются в числа:", () => {
//       it("Дробные - true", () => {
//         expect(min("32.0", 20)).toBe(true);
//       });

//       it("Дробные - false", () => {
//         expect(min("32.0", 50)).toBe(false);
//       });

//       it("Целые - true", () => {
//         expect(min("32", 20)).toBe(true);
//       });

//       it("Целые - false", () => {
//         expect(min("32", 50)).toBe(false);
//       });

//       it("Ведущие пробелы - true", () => {
//         expect(min("   32", 20)).toBe(true);
//       });

//       it("Ведущие пробелы - false", () => {
//         expect(min("   32", 50)).toBe(false);
//       });

//       it("С пробелами в конце строки - true", () => {
//         expect(min("32   ", 20)).toBe(true);
//       });

//       it("С пробелами в конце строки - false", () => {
//         expect(min("32   ", 50)).toBe(false);
//       });

//       it("С пробелами в начале и в конце строки - true", () => {
//         expect(min("   32   ", 20)).toBe(true);
//       });

//       it("С пробелами в начале и в конце строки - false", () => {
//         expect(min("   32   ", 50)).toBe(false);
//       });
//     });
//   });

//   describe("Проверка чисел:", () => {
//     it("Ноль (меньше значения) - false", () => {
//       expect(min(0, 2)).toBe(false);
//     });

//     it("Ноль (равное значение) - true", () => {
//       expect(min(0, 0)).toBe(true);
//     });

//     it("Ноль (больше значения) - true", () => {
//       expect(min(0, -1)).toBe(true);
//     });

//     it("Положительное число (меньше значения) - false", () => {
//       expect(min(1, 2)).toBe(false);
//     });

//     it("Положительное число (равное значение) - true", () => {
//       expect(min(1, 1)).toBe(true);
//     });

//     it("Положительное число (больше значения) - true", () => {
//       expect(min(1, 0)).toBe(true);
//     });

//     it("Отрицательное число (меньше значения) - false", () => {
//       expect(min(-1, 2)).toBe(false);
//     });

//     it("Отрицательное число (равное значение) - true", () => {
//       expect(min(-1, -1)).toBe(true);
//     });

//     it("Отрицательное число (больше значения) - true", () => {
//       expect(min(-1, -3)).toBe(true);
//     });

//     it("NaN - false", () => {
//       expect(min(NaN, 0)).toBe(false);
//     });
//   });

//   describe("Проверка null и undefined:", () => {
//     it("Null - true", () => {
//       expect(min(null, 0)).toBe(true);
//     });

//     it("Undefined - true", () => {
//       expect(min(undefined, 0)).toBe(true);
//     });
//   });
// });
