import { int } from "../int";

describe("Тестирование функции 'int'", () => {
  describe("Проверка невалидных значений:", () => {
    it("Булевые значения - false", () => {
      expect(int(false)).toBe(false);
      expect(int(true)).toBe(false);
    });

    it("Массив - false", () => {
      expect(int([])).toBe(false);
    });

    it("Объект - false", () => {
      expect(int({})).toBe(false);
    });

    it("Null - false", () => {
      expect(int(null)).toBe(false);
    });

    it("Undefined - false", () => {
      expect(int(undefined)).toBe(false);
    });

    it("NaN - false", () => {
      expect(int(NaN)).toBe(false);
    });

    it("Строка - false", () => {
      expect(int("string")).toBe(false);
    });

    it("Дата - false", () => {
      expect(int(new Date())).toBe(false);
    });
  });

  describe("Проверка валидных значений:", () => {
    it("Число - true", () => {
      expect(int(0)).toBe(true);
      expect(int(1)).toBe(true);
      expect(int(100)).toBe(true);
    });

    it("Пустая строка - true", () => {
      expect(int("")).toBe(true);
    });
  });
});
