import { maxLength } from "../maxLength";

describe("Тестирование функции 'maxLength'", () => {
  describe("Проверка невалидных значений:", () => {
    jest.spyOn(console, "warn").mockImplementation();

    it("Отрицательная минимальная длина - true (with warning)", () => {
      expect(maxLength("", -1)).toBe(true);
    });

    it("Дробная минимальная длина - true (with warning)", () => {
      expect(maxLength("", 0.5)).toBe(true);
    });

    it("Булевые значения - true (with warning)", () => {
      expect(maxLength(false, 0)).toBe(true);
      expect(maxLength(true, 0)).toBe(true);
    });

    it("Даты - true (with warning)", () => {
      expect(maxLength(new Date(), 0)).toBe(true);
      expect(maxLength(new Date("egwweg"), 0)).toBe(true);
    });
  });

  describe("Проверка строк:", () => {
    it("Пустая - true", () => {
      expect(maxLength("", 5)).toBe(true);
    });

    it("Из пробелов (меньше значения) - true", () => {
      expect(maxLength("   ", 5)).toBe(true);
    });

    it("Из пробелов (равное значение) - true", () => {
      expect(maxLength("    ", 4)).toBe(true);
    });

    it("Из пробелов (больше значения) - false", () => {
      expect(maxLength("   ", 2)).toBe(false);
    });

    it("Обычная строка (меньше значения) - true", () => {
      expect(maxLength("test", 5)).toBe(true);
    });

    it("Обычная строка (равное значение) - true", () => {
      expect(maxLength("test", 4)).toBe(true);
    });

    it("Обычная строка (больше значения) - false", () => {
      expect(maxLength("nonemptystring", 5)).toBe(false);
    });
  });

  describe("Проверка чисел:", () => {
    it("Ноль - true", () => {
      expect(maxLength(0, 5)).toBe(true);
    });

    it("Положительное число (меньше значения) - true", () => {
      expect(maxLength(100, 5)).toBe(true);
    });

    it("Положительное число (равное значение) - true", () => {
      expect(maxLength(100, 3)).toBe(true);
    });

    it("Положительное число (больше значения) - false", () => {
      expect(maxLength(100, 2)).toBe(false);
    });

    it("Отрицательное число (меньше значения) - true", () => {
      expect(maxLength(-100, 5)).toBe(true);
    });

    it("Отрицательное число (равное значение) - true", () => {
      expect(maxLength(-100, 4)).toBe(true);
    });

    it("Отрицательное число (больше значения) - false", () => {
      expect(maxLength(-100, 3)).toBe(false);
    });

    it("NaN (меньше значения) - true", () => {
      expect(maxLength(NaN, 5)).toBe(true);
    });

    it("NaN (равное значение) - true", () => {
      expect(maxLength(NaN, 3)).toBe(true);
    });

    it("NaN (больше значения) - false", () => {
      expect(maxLength(NaN, 2)).toBe(false);
    });

    it("Положительное дробное число (меньше значения) - true", () => {
      expect(maxLength(0.5, 5)).toBe(true);
    });

    it("Положительное дробное число (равное значение) - true", () => {
      expect(maxLength(0.5, 3)).toBe(true);
    });

    it("Положительное дробное число (больше значения) - false", () => {
      expect(maxLength(0.5, 2)).toBe(false);
    });

    it("Отрицательное дробное число (меньше значения) - true", () => {
      expect(maxLength(-0.5, 5)).toBe(true);
    });

    it("Отрицательное дробное число (равное значение) - true", () => {
      expect(maxLength(-0.5, 4)).toBe(true);
    });

    it("Отрицательное дробное число (больше значения) - false", () => {
      expect(maxLength(-0.5, 3)).toBe(false);
    });
  });

  describe("Проверка массивов:", () => {
    it("Пустой - true", () => {
      expect(maxLength([], 0)).toBe(true);
    });

    it("Непустой (меньше значения) - true", () => {
      expect(maxLength(["nonemptyarray"], 5)).toBe(true);
    });

    it("Непустой (равное значение) - true", () => {
      expect(maxLength(["test1", "test2", "test3", "test4"], 4)).toBe(true);
    });

    it("Непустой (больше значения) - false", () => {
      expect(maxLength(["test1", "test2", "test3"], 2)).toBe(false);
    });
  });

  describe("Проверка объектов:", () => {
    it("Пустой - true", () => {
      expect(maxLength({}, 0)).toBe(true);
    });

    it("Непустой (меньше значения) - true", () => {
      expect(maxLength({ key: "nonemptyobject" }, 5)).toBe(true);
    });

    it("Непустой (равное значение) - true", () => {
      expect(maxLength({ key1: "value1", key2: "value2" }, 2)).toBe(true);
    });

    it("Непустой (больше значения) - false", () => {
      expect(maxLength({ key1: "value1", key2: "value2" }, 1)).toBe(false);
    });
  });

  describe("Проверка null и undefined:", () => {
    it("Null - true", () => {
      expect(maxLength(null, 2)).toBe(true);
    });

    it("Undefined - true", () => {
      expect(maxLength(undefined, 3)).toBe(true);
    });
  });
});
