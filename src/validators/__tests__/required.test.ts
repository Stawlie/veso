import { required } from "../required";

describe("Тестирование функции 'required'", () => {
  describe("Проверка строк:", () => {
    it("Пустая - false", () => {
      expect(required("")).toBe(false);
    });

    it("Из пробелов - false", () => {
      expect(required("   ")).toBe(false);
    });

    it("Непустая - true", () => {
      expect(required("nonemptystring")).toBe(true);
    });

    it("Непустая с пробелами в начале и конце - true", () => {
      expect(required("  nonemptystring  ")).toBe(true);
    });
  });

  describe("Проверка чисел:", () => {
    it("Ноль - true", () => {
      expect(required(0)).toBe(true);
    });

    it("Положительное число - true", () => {
      expect(required(100)).toBe(true);
    });

    it("Отрицательное число - true", () => {
      expect(required(-100)).toBe(true);
    });

    it("Положительное дробное число - true", () => {
      expect(required(0.5)).toBe(true);
    });

    it("Отрицательное дробное число - true", () => {
      expect(required(-0.5)).toBe(true);
    });

    it("NaN - true", () => {
      expect(required(NaN)).toBe(true);
    });
  });

  describe("Проверка массивов:", () => {
    it("Пустой - false", () => {
      expect(required([])).toBe(false);
    });

    it("Непустой - true", () => {
      expect(required(["nonemptyarray"])).toBe(true);
    });
  });

  describe("Проверка объектов:", () => {
    it("Пустой - false", () => {
      expect(required({})).toBe(false);
    });

    it("Непустой - true", () => {
      expect(required({ key: "nonemptyobject" })).toBe(true);
    });
  });

  describe("Проверка null и undefined:", () => {
    it("Null - false", () => {
      expect(required(null)).toBe(false);
    });

    it("Undefined - false", () => {
      expect(required(undefined)).toBe(false);
    });
  });

  describe("Проверка булевых значение:", () => {
    it("False - true", () => {
      expect(required(false)).toBe(true);
    });

    it("True - true", () => {
      expect(required(true)).toBe(true);
    });
  });

  describe("Проверка дат:", () => {
    it("Корректная - true", () => {
      expect(required(new Date())).toBe(true);
    });

    it("Некорректная дата - true", () => {
      expect(required(new Date("abc"))).toBe(true);
    });
  });
});
