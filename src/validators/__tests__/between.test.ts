import { between } from "../between";

describe("Тестирование функции 'between'", () => {
  describe("Проверка невалидных значений:", () => {
    jest.spyOn(console, "warn").mockImplementation();

    it("Для некорректного диапазона (нижняя граница больше верхней) - true (with warning)", () => {
      expect(between("", 3, 2)).toBe(true);
    });

    it("Для булевых значений - true (with warning)", () => {
      expect(between(false, 0, 1)).toBe(true);
      expect(between(true, 0, 1)).toBe(true);
    });
  });

  describe("Проверка строк:", () => {
    it("Пустая - true", () => {
      expect(between("", 2, 3)).toBe(true);
    });

    it("Из пробелов - false", () => {
      expect(between("   ", 2, 3)).toBe(false);
    });

    it("Непустая - false", () => {
      expect(between("nonemptystring", 2, 3)).toBe(false);
    });

    it("Непустая с пробелами в начале и конце - false", () => {
      expect(between("  nonemptystring  ", 2, 3)).toBe(false);
    });

    it("Unicode - false", () => {
      expect(between("✅", 2, 3)).toBe(false);
    });

    it("Математические операции в строке - false", () => {
      expect(between("3*4", 0, 20)).toBe(false);
    });

    describe("Строка - число:", () => {
      it("Меньше нижней границы - false", () => {
        expect(between("1", 2, 3)).toBe(false);
      });

      it("Равно нижней границы - true", () => {
        expect(between("2", 2, 3)).toBe(true);
      });

      it("Внутри диапазона - true", () => {
        expect(between("2.5", 2, 3)).toBe(true);
      });

      it("Равно верхней границе - true", () => {
        expect(between("3", 2, 3)).toBe(true);
      });

      it("Больше верхней границы - false", () => {
        expect(between("4", 2, 3)).toBe(false);
      });

      it("NaN - false", () => {
        expect(between("NaN", 2, 3)).toBe(false);
      });

      it("Меньше нижней границы (отрицательное число) - false", () => {
        expect(between("-1", 2, 3)).toBe(false);
      });

      it("Равно нижней границы (отрицательное число) - true", () => {
        expect(between("-2", -2, 3)).toBe(true);
      });

      it("Внутри диапазона (отрицательное число) - true", () => {
        expect(between("-1.25", -2, 3)).toBe(true);
      });

      it("Равно верхней границе (отрицательное число) - true", () => {
        expect(between("-2", -5, -2)).toBe(true);
      });

      it("Больше верхней границы (отрицательное число) - false", () => {
        expect(between("-1", -5, -2)).toBe(false);
      });
    });
  });

  describe("Проверка чисел:", () => {
    it("Меньше нижней границы - false", () => {
      expect(between(1, 2, 3)).toBe(false);
    });

    it("Равно нижней границы - true", () => {
      expect(between(2, 2, 3)).toBe(true);
    });

    it("Внутри диапазона - true", () => {
      expect(between(2.5, 2, 3)).toBe(true);
    });

    it("Равно верхней границе - true", () => {
      expect(between(3, 2, 3)).toBe(true);
    });

    it("Больше верхней границы - false", () => {
      expect(between(4, 2, 3)).toBe(false);
    });

    it("Меньше нижней границы (отрицательное число) - false", () => {
      expect(between(-1, 2, 3)).toBe(false);
    });

    it("Равно нижней границы (отрицательное число) - true", () => {
      expect(between(-2, -2, 3)).toBe(true);
    });

    it("Внутри диапазона (отрицательное число) - true", () => {
      expect(between(-1.25, -2, 3)).toBe(true);
    });

    it("Равно верхней границе (отрицательное число) - true", () => {
      expect(between(-2, -5, -2)).toBe(true);
    });

    it("Больше верхней границы (отрицательное число) - false", () => {
      expect(between(-1, -5, -2)).toBe(false);
    });

    it("NaN - false", () => {
      expect(between(NaN, 2, 3)).toBe(false);
    });
  });

  describe("Проверка массивов:", () => {
    it("Пустой массив - true", () => {
      expect(between([], 2, 3)).toBe(true);
    });

    it("Массив из одного элемента (числа) - true", () => {
      expect(between([2], 2, 3)).toBe(true);
    });

    it("Массив из одного элемента (строки-числа) - true", () => {
      expect(between(["2"], 2, 3)).toBe(true);
    });

    it("Массив из одного элемента (строки) - false", () => {
      expect(between(["nonemptystring"], 2, 3)).toBe(false);
    });

    it("Массив из нескольких элементов - false", () => {
      expect(between([2, 3], 2, 3)).toBe(false);
    });
  });

  describe("Проверка объектов:", () => {
    it("Пустой - true", () => {
      expect(between({}, 1, 2)).toBe(true);
    });

    it("Непустой - false", () => {
      expect(between({ key: "nonemptyobject" }, 1, 2)).toBe(false);
    });
  });

  describe("Проверка null и undefined:", () => {
    it("Null - true", () => {
      expect(between(null, 1, 2)).toBe(true);
    });

    it("Undefined - true", () => {
      expect(between(undefined, 1, 2)).toBe(true);
    });
  });

  describe("Проверка дат:", () => {
    it("Невалидная дата - false", () => {
      expect(between(new Date("rheher"), new Date(100), new Date(1000))).toBe(
        false
      );
    });

    it("Меньше нижней границы - false", () => {
      expect(between(new Date(10), new Date(100), new Date(1000))).toBe(false);
    });

    it("Равно нижней границы - true", () => {
      expect(between(new Date(100), new Date(100), new Date(1000))).toBe(true);
    });

    it("Внутри диапазона - true", () => {
      expect(between(new Date(500), new Date(100), new Date(1000))).toBe(true);
    });

    it("Равно верхней границе - true", () => {
      expect(between(new Date(1000), new Date(100), new Date(1000))).toBe(true);
    });

    it("Больше верхней границы - false", () => {
      expect(between(new Date(1010), new Date(100), new Date(1000))).toBe(
        false
      );
    });
  });
});
