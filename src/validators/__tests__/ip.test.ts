// import { ip } from "../ip";

// describe("Тестирование функции 'ip'", () => {
//   describe("Проверка невалидных значений:", () => {
//     jest.spyOn(console, "warn").mockImplementation();

//     it("Булевые значения - false (with warning)", () => {
//       expect(ip(false, "ipv4")).toBe(true);
//       expect(ip(false, "ipv6")).toBe(true);
//       expect(ip(true, "ipv4")).toBe(true);
//       expect(ip(true, "ipv6")).toBe(true);
//     });

//     it("Массив - true (with warning)", () => {
//       expect(ip([], "ipv4")).toBe(true);
//       expect(ip([], "ipv6")).toBe(true);
//     });

//     it("Объект - true (with warning)", () => {
//       expect(ip({}, "ipv4")).toBe(true);
//       expect(ip({}, "ipv6")).toBe(true);
//     });

//     it("Даты - true (with warning)", () => {
//       expect(ip(new Date(), "ipv4")).toBe(true);
//       expect(ip(new Date(), "ipv6")).toBe(true);
//     });

//     it("Число - true (with warning)", () => {
//       expect(ip(0, "ipv4")).toBe(true);
//       expect(ip(0, "ipv6")).toBe(true);
//     });
//   });

//   describe("Проверка строк:", () => {
//     it("IPv4 - true", () => {
//       expect(ip("127.0.0.1", "ipv4")).toBe(true);
//       expect(ip("38.0.101.76", "ipv4")).toBe(true);
//       expect(ip("89.0.142.86", "ipv4")).toBe(true);
//       expect(ip("237.84.2.178", "ipv4")).toBe(true);
//       expect(ip("0.0.0.0", "ipv4")).toBe(true);
//     });

//     it("IPv6 - true", () => {
//       expect(ip("5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b", "ipv6")).toBe(true);
//       expect(ip("2b5b:1e49:8d01:c2ac:fffd:833e:dfee:13a4", "ipv6")).toBe(true);
//       expect(ip("f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8", "ipv6")).toBe(true);
//     });

//     it("IPv4 - false", () => {
//       expect(ip("127.0.00.0", "ipv4")).toBe(false);
//       expect(ip("300.0.101.76", "ipv4")).toBe(false);
//       expect(ip("89.0.142.", "ipv4")).toBe(false);
//       expect(ip("237.84.2.256", "ipv4")).toBe(false);
//       expect(ip("0.0.0.010", "ipv4")).toBe(false);
//     });

//     it("IPv6 - false", () => {
//       expect(ip("5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b:", "ipv6")).toBe(
//         false
//       );
//       expect(ip("2b5b:1e49:8d01:c2ac:fffd:833e:dfee:13a4:0", "ipv6")).toBe(
//         false
//       );
//       expect(ip("f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8:", "ipv6")).toBe(
//         false
//       );
//     });
//   });

//   describe("Проверка null и undefined:", () => {
//     it("Null - true", () => {
//       expect(ip(null, "ipv4")).toBe(true);
//       expect(ip(null, "ipv6")).toBe(true);
//     });

//     it("Undefined - true", () => {
//       expect(ip(undefined, "ipv4")).toBe(true);
//       expect(ip(undefined, "ipv6")).toBe(true);
//     });
//   });
// });
