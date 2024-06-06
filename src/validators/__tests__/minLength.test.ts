import { minLength } from "../minLength";

describe("Тестирование функции 'minLength'", () => {
  describe("Проверка невалидных значений:", () => {
    jest.spyOn(console, "warn").mockImplementation();

    it("Отрицательная минимальная длина - true (with warning)", () => {
      expect(minLength("", -1)).toBe(true);
    });

    it("Дробная минимальная длина - true (with warning)", () => {
      expect(minLength("", 0.5)).toBe(true);
    });

    it("Булевые значения - true (with warning)", () => {
      expect(minLength(false, 0)).toBe(true);
      expect(minLength(true, 0)).toBe(true);
    });

    it("Даты - true (with warning)", () => {
      expect(minLength(new Date(), 0)).toBe(true);
      expect(minLength(new Date("egwweg"), 0)).toBe(true);
    });
  });

  describe("Проверка строк:", () => {
    it("Пустая - true", () => {
      expect(minLength("", 5)).toBe(true);
    });

    it("Из пробелов (меньше значения) - false", () => {
      expect(minLength("   ", 5)).toBe(false);
    });

    it("Из пробелов (равное значение) - true", () => {
      expect(minLength("    ", 4)).toBe(true);
    });

    it("Из пробелов (больше значения) - true", () => {
      expect(minLength("   ", 2)).toBe(true);
    });

    it("Обычная строка (меньше значения) - false", () => {
      expect(minLength("test", 5)).toBe(false);
    });

    it("Обычная строка (равное значение) - true", () => {
      expect(minLength("test", 4)).toBe(true);
    });

    it("Обычная строка (больше значения) - true", () => {
      expect(minLength("nonemptystring", 5)).toBe(true);
    });
  });

  describe("Проверка чисел:", () => {
    it("Ноль (меньше значения) - false", () => {
      expect(minLength(0, 5)).toBe(false);
    });

    it("Ноль (равное значение) - true", () => {
      expect(minLength(0, 0)).toBe(true);
    });

    it("Положительное число (меньше значения) - false", () => {
      expect(minLength(100, 5)).toBe(false);
    });

    it("Положительное число (равное значение) - true", () => {
      expect(minLength(100, 3)).toBe(true);
    });

    it("Положительное число (больше значения) - true", () => {
      expect(minLength(100, 2)).toBe(true);
    });

    it("Отрицательное число (меньше значения) - false", () => {
      expect(minLength(-100, 5)).toBe(false);
    });

    it("Отрицательное число (равное значение) - true", () => {
      expect(minLength(-100, 4)).toBe(true);
    });

    it("Отрицательное число (больше значения) - true", () => {
      expect(minLength(-100, 3)).toBe(true);
    });

    it("NaN (меньше значения) - false", () => {
      expect(minLength(NaN, 5)).toBe(false);
    });

    it("NaN (равное значение) - true", () => {
      expect(minLength(NaN, 3)).toBe(true);
    });

    it("NaN (больше значения) - true", () => {
      expect(minLength(NaN, 2)).toBe(true);
    });

    it("Положительное дробное число (меньше значения) - false", () => {
      expect(minLength(0.5, 5)).toBe(false);
    });

    it("Положительное дробное число (равное значение) - true", () => {
      expect(minLength(0.5, 3)).toBe(true);
    });

    it("Положительное дробное число (больше значения) - true", () => {
      expect(minLength(0.5, 2)).toBe(true);
    });

    it("Отрицательное дробное число (меньше значения) - false", () => {
      expect(minLength(-0.5, 5)).toBe(false);
    });

    it("Отрицательное дробное число (равное значение) - true", () => {
      expect(minLength(-0.5, 4)).toBe(true);
    });

    it("Отрицательное дробное число (больше значения) - true", () => {
      expect(minLength(-0.5, 3)).toBe(true);
    });
  });

  describe("Проверка массивов:", () => {
    it("Пустой - true", () => {
      expect(minLength([], 0)).toBe(true);
    });

    it("Непустой (меньше значения) - false", () => {
      expect(minLength(["nonemptyarray"], 5)).toBe(false);
    });

    it("Непустой (равное значение) - true", () => {
      expect(minLength(["test1", "test2", "test3", "test4"], 4)).toBe(true);
    });

    it("Непустой (больше значения) - true", () => {
      expect(minLength(["test1", "test2", "test3"], 2)).toBe(true);
    });
  });

  describe("Проверка объектов:", () => {
    it("Пустой - true", () => {
      expect(minLength({}, 0)).toBe(true);
    });

    it("Непустой (меньше значения) - false", () => {
      expect(minLength({ key: "nonemptyobject" }, 5)).toBe(false);
    });

    it("Непустой (равное значение) - true", () => {
      expect(minLength({ key1: "value1", key2: "value2" }, 2)).toBe(true);
    });

    it("Непустой (больше значения) - true", () => {
      expect(minLength({ key1: "value1", key2: "value2" }, 1)).toBe(true);
    });
  });

  describe("Проверка null и undefined:", () => {
    it("Null - true", () => {
      expect(minLength(null, 2)).toBe(true);
    });

    it("Undefined - true", () => {
      expect(minLength(undefined, 3)).toBe(true);
    });
  });
});
